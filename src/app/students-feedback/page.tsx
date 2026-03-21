"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/utils";
import { Play, X } from "lucide-react";

type StudentFeedbackItem = {
  id: number;
  student_name: string;
  feedback: string;
  media_type: "image" | "youtube";
  media_url: string;
  thumbnail_url: string | null;
  sort_order: number;
};

export default function StudentsFeedbackPage() {
  const [items, setItems] = useState<StudentFeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [modalVideoId, setModalVideoId] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/student-feedback", { cache: "no-store" });
        const data = (await res.json()) as { items?: StudentFeedbackItem[] };
        setItems(data.items || []);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  return (
    <main>
      <Navbar />

      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Students Feedback</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Hear what our students say about Genius Educational Academy.</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-sm text-gray-600">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-sm text-gray-600">No feedback available yet.</div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => {
                const ytId = item.media_type === "youtube" ? extractYouTubeId(item.media_url) : null;
                const thumb =
                  item.media_type === "youtube"
                    ? item.thumbnail_url || (ytId ? getYouTubeThumbnail(ytId) : null)
                    : null;

                const isExpanded = expandedIds.has(item.id);
                const isLong = (item.feedback || "").length > 320;

                return (
                  <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                    <div className="flex flex-row gap-3 sm:gap-6 items-stretch">
                      <div className="w-44 sm:w-80 md:w-96 flex-shrink-0 self-stretch">
                        <div
                          className={
                            "w-full rounded-xl overflow-hidden bg-gray-100 " +
                            (item.media_type === "image" ? "h-full min-h-32 sm:min-h-48 flex items-center justify-center" : "aspect-video")
                          }
                        >
                          {item.media_type === "image" ? (
                            <img src={item.media_url} alt={item.student_name} className="w-full h-full object-contain bg-white p-2" />
                          ) : ytId ? (
                            <div className="relative w-full h-full">
                              <img
                                src={thumb || ""}
                                alt={item.student_name}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setModalVideoId(ytId);
                                  setModalTitle(item.student_name);
                                }}
                                className="absolute inset-0 flex items-center justify-center"
                                aria-label="Play video"
                              >
                                <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/90 text-white shadow-lg">
                                  <Play className="w-6 h-6 ml-0.5" />
                                </span>
                              </button>
                            </div>
                          ) : (
                            <img src={thumb || ""} alt={item.student_name} className="w-full h-full object-contain bg-white p-2" />
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{item.student_name}</h3>
                            <div className="h-1 w-16 bg-primary rounded-full mt-2" />
                          </div>
                        </div>

                        <p
                          className={
                            "mt-4 text-gray-700 leading-relaxed whitespace-pre-line " +
                            (isExpanded ? "" : "overflow-hidden") +
                            " lg:max-h-none lg:overflow-visible"
                          }
                          style={isExpanded ? undefined : { maxHeight: "7.5em" }}
                        >
                          {item.feedback}
                        </p>

                        {isLong && (
                          <button
                            type="button"
                            onClick={() => {
                              setExpandedIds((prev) => {
                                const next = new Set(prev);
                                if (next.has(item.id)) next.delete(item.id);
                                else next.add(item.id);
                                return next;
                              });
                            }}
                            className="mt-2 text-sm text-primary font-semibold hover:underline lg:hidden"
                          >
                            {isExpanded ? "View less" : "View more"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {modalVideoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={() => setModalVideoId(null)}
            aria-label="Close video"
          />

          <div className="relative w-full max-w-5xl">
            <button
              type="button"
              onClick={() => setModalVideoId(null)}
              className="absolute -top-3 -right-3 z-10 inline-flex items-center justify-center rounded-full bg-white text-gray-900 shadow-lg w-10 h-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
              <div className="w-full aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${modalVideoId}?autoplay=1&rel=0&modestbranding=1&controls=0&playsinline=1`}
                  title={modalTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
