"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { VolumeOffIcon } from "lucide-react";
import { motion } from "framer-motion";
import { getAssetUrl, cn } from "@/lib/utils";

interface ToggleMuteUnmuteProps {
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
  className?: string;
  audioSrc?: string;
}

const EqualizerBar = ({ delay, duration }: { delay: number; duration: number }) => (
  <motion.span
    className="w-[2px] bg-[#C3E41D] rounded-full inline-block origin-bottom"
    animate={{ height: ["4px", "14px", "6px", "12px", "4px"] }}
    transition={{
      repeat: Infinity,
      repeatType: "mirror",
      duration,
      delay,
      ease: "easeInOut",
    }}
  />
);

export default function ToggleMuteUnmute({
  size = "sm",
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
    audio.volume = 0.05;
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
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
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
    <div className={cn("flex items-center justify-center", className)}>
      <button
        type="button"
        onClick={toggleSound}
        aria-label="Toggle music playback"
        title={
          isPlaying
            ? "Playing: Reality Club - 2112 (Click to mute)"
            : "Click to play Reality Club - 2112"
        }
        className={cn(
          "group relative inline-flex items-center justify-center rounded-full select-none cursor-pointer",
          "backdrop-blur-md transition-all duration-300 ease-out",
          "border shadow-sm active:scale-95",
          size === "sm"
            ? "h-8 px-3 gap-2"
            : size === "lg"
            ? "h-10 px-4 gap-2.5"
            : "h-9 px-3.5 gap-2",
          isPlaying
            ? "bg-background/80 border-[#C3E41D]/40 text-foreground hover:border-[#C3E41D] hover:shadow-[0_0_12px_rgba(195,228,29,0.22)]"
            : "bg-background/60 border-border/80 text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-background/80"
        )}
      >
        {isPlaying ? (
          <div className="flex items-center gap-2">
            {/* Animated Equalizer Wave */}
            <div className="flex items-end gap-[2px] h-3.5">
              <EqualizerBar delay={0} duration={0.8} />
              <EqualizerBar delay={0.15} duration={0.65} />
              <EqualizerBar delay={0.3} duration={0.9} />
              <EqualizerBar delay={0.1} duration={0.75} />
            </div>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-foreground">
              Music
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <VolumeOffIcon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
            <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
              Muted
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
