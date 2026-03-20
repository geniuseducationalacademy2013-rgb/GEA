"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, Award, X } from "lucide-react";

type ResultImage = {
  id: number;
  url: string;
  sort_order: number;
};

type Result = {
  id: number;
  images: ResultImage[];
};

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [wideImageIds, setWideImageIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/results", { cache: "no-store" });
        const data = (await response.json()) as Result[];
        setResults(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    void load();
  }, []);

  // Flatten all images from all results and sort by sort_order
  const allImages = results
    .flatMap((r) => r.images)
    .sort((a, b) => a.sort_order - b.sort_order);

  const openImage = (url: string) => {
    setSelectedImage(url);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const handleImageLoad = (id: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    if (!w || !h) return;

    // Mark noticeably wide images so they can span all columns.
    const isWide = w / h >= 1.35;
    if (!isWide) return;

    setWideImageIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Results</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Celebrating the achievements of our talented students. Our toppers make us proud!
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <p className="text-4xl font-bold">92%</p>
              <p className="text-white/80">Highest Score</p>
            </div>
            <div>
              <p className="text-4xl font-bold">100%</p>
              <p className="text-white/80">Pass Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold">50+</p>
              <p className="text-white/80">Distinction Holders</p>
            </div>
            <div>
              <p className="text-4xl font-bold">12+</p>
              <p className="text-white/80">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Toppers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Our Achievers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Toppers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Students who have excelled in their board examinations and made us proud.
            </p>
          </div>
          
          {allImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allImages.map((img) => {
                const spanAll = wideImageIds.has(img.id);

                return (
                  <div
                    key={img.id}
                    className={spanAll ? "md:col-span-2" : ""}
                  >
                    <img
                      src={img.url}
                      alt="Topper"
                      className="block w-full h-auto object-contain rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => openImage(img.url)}
                      onLoad={(e) => handleImageLoad(img.id, e)}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <Award className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-gray-600">Result images will be uploaded by admin.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeImage}
        >
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Topper"
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </main>
  );
}
