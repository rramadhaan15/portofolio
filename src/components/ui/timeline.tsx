"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  subtitle?: string;
  period?: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  badge?: string;
  title?: string;
  subtitle?: string;
}

export const Timeline = ({
  data,
  badge = "02 // EDUCATION",
  title = "Academic Journey & Growth",
  subtitle = "Jejak langkah pendidikan formal dan perjalanan akademis dari sekolah dasar hingga perguruan tinggi.",
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setHeight(ref.current.getBoundingClientRect().height);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  return (
    <div
      id="education"
      className="w-full bg-neutral-50 dark:bg-black font-sans px-4 sm:px-6 md:px-10 py-24 transition-colors duration-300 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background Subtle Accent Glow */}
      <div
        className="pointer-events-none absolute top-1/3 -right-24 w-96 h-96 rounded-full blur-[150px] opacity-15 dark:opacity-10"
        style={{ backgroundColor: "#C3E41D" }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -left-24 w-96 h-96 rounded-full blur-[150px] opacity-15 dark:opacity-10"
        style={{ backgroundColor: "#C3E41D" }}
      />

      {/* Header Container */}
      <div className="max-w-6xl mx-auto relative z-10 mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md mb-4 text-xs font-mono tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#C3E41D" }} />
          <span style={{ color: "#C3E41D" }}>{badge}</span>
        </div>

        <h2
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase text-neutral-900 dark:text-neutral-100"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          Academic Journey, <br className="hidden sm:inline" />
          <span style={{ color: "#C3E41D" }}>Roots & Milestones</span>
        </h2>
        <p
          className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          {subtitle}
        </p>
      </div>

      {/* Timeline Stream */}
      <div ref={ref} className="relative max-w-6xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-12 md:pt-28 md:gap-10"
          >
            {/* Sticky Label / Year / Stage */}
            <div className="sticky flex flex-col md:flex-row z-30 items-center top-32 md:top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Timeline Indicator Dot */}
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-lg">
                <div
                  className="h-3.5 w-3.5 rounded-full transition-transform duration-300 hover:scale-125"
                  style={{
                    backgroundColor: "#C3E41D",
                    boxShadow: "0 0 10px #C3E41D",
                  }}
                />
              </div>

              {/* Title on Desktop */}
              <div className="hidden md:block md:pl-20">
                <h3
                  className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100 font-mono tracking-tight"
                >
                  {item.title}
                </h3>
                {item.period && (
                  <p
                    className="text-xs font-mono font-semibold tracking-wider uppercase mt-1"
                    style={{ color: "#C3E41D" }}
                  >
                    {item.period}
                  </p>
                )}
                {item.subtitle && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Content Body */}
            <div className="relative pl-16 pr-2 md:pl-4 w-full">
              {/* Mobile Title */}
              <div className="md:hidden block mb-4 text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 font-mono tracking-tight">
                  {item.title}
                </h3>
                {item.period && (
                  <p
                    className="text-xs font-mono font-semibold tracking-wider uppercase mt-0.5"
                    style={{ color: "#C3E41D" }}
                  >
                    {item.period}
                  </p>
                )}
                {item.subtitle && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    {item.subtitle}
                  </p>
                )}
              </div>

              {/* Injected Content */}
              {item.content}
            </div>
          </div>
        ))}

        {/* Central Connecting Vertical Line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-neutral-200 dark:via-neutral-800 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_95%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-transparent via-[#C3E41D] to-[#C3E41D] rounded-full shadow-[0_0_12px_#C3E41D]"
          />
        </div>
      </div>
    </div>
  );
};
