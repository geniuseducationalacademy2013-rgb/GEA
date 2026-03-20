"use client";

import { useEffect, useState } from "react";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: ["500", "600", "700"] });

type QuickNeedsData = {
  tagline: { content: string } | null;
  popup: { type: string; media_url: string } | null;
};

export default function QuickNeedsBanner() {
  const [tagline, setTagline] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/quick-needs", { cache: "no-store" });
        const data: QuickNeedsData = await res.json();
        setTagline(data.tagline?.content || null);
      } catch {
        setTagline(null);
      }
    };
    void load();
  }, []);

  if (!tagline) return null;

  return (
    <div className="bg-red-600 py-2 overflow-hidden">
      <div className={"animate-marquee whitespace-nowrap " + oswald.className}>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="mx-8 font-semibold text-yellow-200"
            style={{
              textShadow:
                "0 0 8px rgba(255, 255, 255, 0.55), 0 0 18px rgba(253, 224, 71, 0.65), 0 0 28px rgba(253, 224, 71, 0.45)",
            }}
          >
            {tagline}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 6s linear infinite;
        }
      `}</style>
    </div>
  );
}
