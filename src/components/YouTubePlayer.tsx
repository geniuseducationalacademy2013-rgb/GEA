"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/utils";

interface YouTubePlayerProps {
  url: string;
  title?: string;
  className?: string;
}

export default function YouTubePlayer({ url, title = "Video", className = "" }: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoId = extractYouTubeId(url);

  const handlePlayPause = () => {
    if (!videoId) return;
    
    if (isPlaying && !isPaused) {
      // Pause the video
      iframeRef.current?.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      setIsPaused(true);
    } else {
      // Play the video
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  useEffect(() => {
    if (isPlaying && !isPaused && iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
  }, [isPlaying, isPaused]);

  if (!videoId) {
    return (
      <div className={`bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <p className="text-gray-500">Invalid YouTube URL</p>
      </div>
    );
  }

  const thumbnailUrl = getYouTubeThumbnail(videoId);

  return (
    <div className={`relative rounded-lg overflow-hidden bg-black ${className}`}>
      {!isPlaying ? (
        <div className="relative cursor-pointer w-full h-full" onClick={handlePlayPause}>
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-fill"
            onError={(e) => {
              e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <button className="w-16 h-16 bg-primary rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors shadow-lg">
              <Play className="w-8 h-8 text-white ml-1" />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
          <button
            onClick={handlePlayPause}
            className="absolute top-2 right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors shadow-lg z-10"
          >
            {isPaused ? (
              <Play className="w-5 h-5 text-white ml-0.5" />
            ) : (
              <Pause className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
