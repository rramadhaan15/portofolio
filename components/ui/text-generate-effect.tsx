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
  once?: boolean;
}

interface ParsedWord {
  text: string;
  isBold?: boolean;
  isHighlight?: boolean;
}

const parseContent = (str: string): ParsedWord[] => {
  const result: ParsedWord[] = [];
  const regex = /(\*\*[^*]+\*\*[,.!?:;]?)|(__[^_]+__[,.!?:;]?)|(\S+)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(str)) !== null) {
    if (match[1]) {
      const punct = match[1].match(/[,.!?:;]$/)?.[0] || "";
      const raw = punct ? match[1].slice(2, -2 - punct.length) : match[1].slice(2, -2);
      const innerWords = raw.split(/\s+/).filter(Boolean);
      innerWords.forEach((w, i) => {
        const isLast = i === innerWords.length - 1;
        result.push({ text: w + (isLast ? punct : ""), isBold: true });
      });
    } else if (match[2]) {
      const punct = match[2].match(/[,.!?:;]$/)?.[0] || "";
      const raw = punct ? match[2].slice(2, -2 - punct.length) : match[2].slice(2, -2);
      const innerWords = raw.split(/\s+/).filter(Boolean);
      innerWords.forEach((w, i) => {
        const isLast = i === innerWords.length - 1;
        result.push({ text: w + (isLast ? punct : ""), isHighlight: true });
      });
    } else if (match[3]) {
      result.push({ text: match[3] });
    }
  }

  return result;
};

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
  once = false,
}: TextGenerateEffectProps) => {
  const content = typeof children === "string" ? children : words || "";
  const wordsArray = parseContent(content);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-40px" });

  const shouldAnimate = trigger && isInView;

  return (
    <Component ref={ref} className={cn("leading-relaxed", className)}>
      {wordsArray.map((item, idx) => (
        <motion.span
          key={item.text + idx}
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
          className={cn(
            "inline-block mr-1",
            item.isBold && "font-semibold text-neutral-950 dark:text-white",
            item.isHighlight && "font-semibold text-[#a8cc0e] dark:text-[#C3E41D]"
          )}
        >
          {item.text}
        </motion.span>
      ))}
    </Component>
  );
};

export default TextGenerateEffect;
