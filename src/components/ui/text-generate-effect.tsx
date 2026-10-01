"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextGenerateEffectProps {
  children?: React.ReactNode;
  words?: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  staggerDuration?: number;
  as?: React.ElementType;
  transition?: { duration?: number; ease?: string | number[] };
  trigger?: boolean;
}

export const TextGenerateEffect = ({
  children,
  words,
  className,
  filter = true,
  duration = 0.35,
  staggerDuration = 0.035,
  as: Component = "p",
  transition,
  trigger = true,
}: TextGenerateEffectProps) => {
  const content = typeof children === "string" ? children : words || "";
  const wordsArray = content.split(" ");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });

  const shouldAnimate = trigger && isInView;

  return (
    <Component ref={ref} className={cn("leading-relaxed", className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          initial={{
            opacity: 0,
            filter: filter ? "blur(8px)" : "none",
            y: 4,
          }}
          animate={
            shouldAnimate
              ? {
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                }
              : {
                  opacity: 0,
                  filter: filter ? "blur(8px)" : "none",
                  y: 4,
                }
          }
          transition={{
            duration: transition?.duration ?? duration,
            delay: idx * staggerDuration,
            ease: "easeOut",
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
};

export default TextGenerateEffect;
