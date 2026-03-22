"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X, Play } from "lucide-react";
import YouTubePlayer from "./YouTubePlayer";

type PopupData = {
  type: "image" | "video";
  media_url: string;
};

export default function QuickNeedsPopup() {
  const pathname = usePathname();
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [visible, setVisible] = useState(false);

  // Don't show popup on admin pages
  const isAdminPage = pathname?.startsWith("/genius/admin");

  useEffect(() => {
    // Skip loading on admin pages
    if (isAdminPage) return;

    const load = async () => {
      try {
        const res = await fetch("/api/quick-needs", { cache: "no-store" });
        const data = await res.json();
        if (data.popup) {
          setPopup(data.popup);
          // Show popup after 1-2 seconds
          const delay = 1000 + Math.random() * 1000;
          setTimeout(() => setVisible(true), delay);
        }
      } catch {
        setPopup(null);
      }
    };
    void load();
  }, [isAdminPage]);

  const closePopup = () => {
    setVisible(false);
  };

  if (!popup || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={closePopup}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] mx-4 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closePopup}
          className="absolute -top-12 right-0 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {popup.type === "image" ? (
          <img
            src={popup.media_url}
            alt="Promotional"
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
        ) : (
          <div className="w-[85vw] max-w-3xl aspect-video">
            <YouTubePlayer
              url={popup.media_url}
              title="Promotional Video"
              className="w-full h-full rounded-lg overflow-hidden"
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
