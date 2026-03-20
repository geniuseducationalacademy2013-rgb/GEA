"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import YouTubePlayer from "@/components/YouTubePlayer";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";

interface ActivityMedia {
  id: number;
  type: string;
  url: string;
  thumbnail_url: string | null;
}

interface Activity {
  id: number;
  name: string;
  description: string | null;
  media: ActivityMedia[];
}

function ActivitiesPageContent() {
  const searchParams = useSearchParams();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [openActivity, setOpenActivity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    const activityParam = searchParams.get("activity");
    if (activityParam) {
      setOpenActivity(activityParam);
      setTimeout(() => {
        const element = document.getElementById(`activity-${activityParam.replace(/\s+/g, "-").toLowerCase()}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
  }, [searchParams, activities]);

  const fetchActivities = async () => {
    try {
      const response = await fetch("/api/activities");
      const data = await response.json();
      setActivities(data.activities || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleActivity = (name: string) => {
    setOpenActivity(openActivity === name ? null : name);
  };

  const defaultActivities = [
    { id: 1, name: "Picnic", description: "Annual picnic for students and staff", media: [] },
    { id: 2, name: "Price Distribution", description: "Award ceremony for achievers", media: [] },
    { id: 3, name: "Yoga Day", description: "International Yoga Day celebration", media: [] },
    { id: 4, name: "PTM", description: "Parent-Teacher Meeting", media: [] },
    { id: 5, name: "Garba Celebration", description: "Navratri Garba celebration", media: [] },
    { id: 6, name: "Farewell Party", description: "Farewell party for outgoing students", media: [] },
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Activities</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the vibrant activities and events at Genius Educational Academy. Click on each activity to view photos and videos.
          </p>
        </div>
      </section>

      {/* Activities List */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading activities...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayActivities.map((activity) => (
                <div
                  key={activity.id}
                  id={`activity-${activity.name.replace(/\s+/g, "-").toLowerCase()}`}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleActivity(activity.name)}
                    className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Calendar className="w-6 h-6 text-primary" />
                      <span className="text-xl font-semibold text-gray-800">{activity.name}</span>
                    </div>
                    {openActivity === activity.name ? (
                      <ChevronUp className="w-6 h-6 text-primary" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                  
                  {openActivity === activity.name && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      {activity.description && (
                        <p className="text-gray-600 mb-4 pt-4">{activity.description}</p>
                      )}
                      
                      {activity.media && activity.media.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                          {activity.media.map((media) => (
                            <div key={media.id} className="rounded-lg overflow-hidden">
                              {media.type === "youtube" ? (
                                <YouTubePlayer
                                  url={media.url}
                                  title={activity.name}
                                  className="aspect-video"
                                />
                              ) : (
                                <img
                                  src={media.url}
                                  alt={activity.name}
                                  className="w-full h-48 object-cover"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-8">
                          No media available for this activity yet.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ActivitiesPage() {
  return (
    <Suspense>
      <ActivitiesPageContent />
    </Suspense>
  );
}
