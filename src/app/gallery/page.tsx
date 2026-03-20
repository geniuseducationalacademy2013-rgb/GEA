"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Play, X, Image as ImageIcon, Video } from "lucide-react";
import YouTubePlayer from "@/components/YouTubePlayer";

type GalleryItem = {
  id: number;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  sort_order: number;
};

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/gallery", { cache: "no-store" });
        const data = await res.json();
        setItems(data.items || []);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };
    void load();
  }, []);

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const elements = document.querySelectorAll(".gallery-item");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [items, filter]);

  const filteredItems = items.filter(
    (item) => filter === "all" || item.type === filter
  );

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of memorable moments, events, and achievements.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-white sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-4">
            {(["all", "image", "video"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === type
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type === "all" ? "All" : type === "image" ? "Images" : "Videos"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="gallery-item opacity-0 translate-y-8 transition-all duration-500 cursor-pointer group"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        alt="Gallery image"
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="relative w-full aspect-square bg-gray-900">
                        <img
                          src={item.thumbnail || `https://img.youtube.com/vi/${extractYouTubeId(item.url)}/hqdefault.jpg`}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2">
                      {item.type === "image" ? (
                        <ImageIcon className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <Video className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ImageIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No items in gallery yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div
            className="max-w-5xl max-h-[90vh] mx-4 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.type === "image" ? (
              <img
                src={selectedItem.url}
                alt="Gallery image"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            ) : (
              <div className="w-[90vw] max-w-4xl aspect-video">
                <YouTubePlayer
                  url={selectedItem.url}
                  title="Gallery video"
                  className="w-full h-full rounded-lg overflow-hidden"
                />
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}
