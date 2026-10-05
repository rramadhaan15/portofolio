"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2Icon, VolumeOffIcon } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";
import { getAssetUrl } from "@/lib/utils";

interface ToggleMuteUnmuteProps {
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
  className?: string;
  audioSrc?: string;
}

export default function ToggleMuteUnmute({
  size = "lg",
  variant = "outline",
  className = "",
  audioSrc,
}: ToggleMuteUnmuteProps = {}) {
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMutedRef = useRef(false);

  useEffect(() => {
    isMutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    const src = audioSrc || getAssetUrl("/bg-music.mp3");
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    // Attempt autoplay when website loads
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Modern browser autoplay policy: start audio on first user gesture
        const startOnInteraction = () => {
          if (!isMutedRef.current && audioRef.current) {
            audioRef.current.play().catch(() => {});
          }
          window.removeEventListener("click", startOnInteraction);
          window.removeEventListener("touchstart", startOnInteraction);
          window.removeEventListener("keydown", startOnInteraction);
        };

        window.addEventListener("click", startOnInteraction, { once: true });
        window.addEventListener("touchstart", startOnInteraction, { once: true });
        window.addEventListener("keydown", startOnInteraction, { once: true });
      });
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [audioSrc]);

  const handleToggle = (pressed: boolean) => {
    setMuted(pressed);
    if (!audioRef.current) return;

    if (pressed) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Toggle
        size={size}
        variant={variant}
        aria-label="Toggle mute"
        title={muted ? "Muted: Reality Club - 2112" : "Playing: Reality Club - 2112"}
        pressed={muted}
        onPressedChange={handleToggle}
        className="cursor-pointer gap-1.5 transition-all duration-300 rounded-full"
      >
        {muted ? (
          <VolumeOffIcon className="w-4 h-4 text-neutral-400" />
        ) : (
          <Volume2Icon className="w-4 h-4 text-[#C3E41D] animate-pulse" />
        )}
        <span className="text-xs font-semibold">{muted ? "Muted" : "2112"}</span>
      </Toggle>
    </div>
  );
}
