"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  size = "sm",
  variant = "outline",
  className = "",
  audioSrc,
}: ToggleMuteUnmuteProps = {}) {
  // Default to playing / unmuted on initial visit
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userMutedRef = useRef(false);

  useEffect(() => {
    // Resolve audio URL
    const src = audioSrc || getAssetUrl("/bg-music.mp3");
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.33;
    audio.preload = "auto";
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => {
      if (userMutedRef.current) {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Safely attempt audio playback
    const startAudio = () => {
      if (!audioRef.current || userMutedRef.current) return;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        // Modern browser autoplay policy: blocked until first user gesture
        console.log("Autoplay waiting for user gesture:", err);
      });
    };

    // 1. Immediate attempt on page load
    startAudio();

    // 2. Play on first user interaction anywhere on the website
    const handleUserGesture = () => {
      if (!userMutedRef.current && audioRef.current && audioRef.current.paused) {
        startAudio();
      }
    };

    window.addEventListener("click", handleUserGesture, { passive: true });
    window.addEventListener("touchstart", handleUserGesture, { passive: true });
    window.addEventListener("keydown", handleUserGesture, { passive: true });
    window.addEventListener("pointerdown", handleUserGesture, { passive: true });
    window.addEventListener("scroll", handleUserGesture, { passive: true });

    return () => {
      window.removeEventListener("click", handleUserGesture);
      window.removeEventListener("touchstart", handleUserGesture);
      window.removeEventListener("keydown", handleUserGesture);
      window.removeEventListener("pointerdown", handleUserGesture);
      window.removeEventListener("scroll", handleUserGesture);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioSrc]);

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      // User explicitly paused/muted
      userMutedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    } else {
      // User explicitly unmuted/played
      userMutedRef.current = false;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Failed to play audio:", err);
      });
    }
  }, []);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Toggle
        size={size}
        variant={variant}
        aria-label="Toggle mute"
        title={isPlaying ? "Playing: Reality Club - 2112 (Click to mute)" : "Click to play Reality Club - 2112"}
        pressed={isPlaying}
        onPressedChange={toggleSound}
        className="cursor-pointer select-none transition-all duration-300 rounded-full min-w-[88px] h-8 px-3 gap-1.5"
      >
        {isPlaying ? (
          <Volume2Icon className="w-3.5 h-3.5 text-[#C3E41D] animate-pulse shrink-0" />
        ) : (
          <VolumeOffIcon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
        )}
        <span className="text-xs font-semibold">{isPlaying ? "Music" : "Muted"}</span>
      </Toggle>
    </div>
  );
}
