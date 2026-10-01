//biome-ignore-all lint/style/noNonNullAssertion:<>

"use client";

import React, { useState } from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const responses = [
  "Here are 164 animated components built on Motion and Tailwind CSS, ready to copy and paste into your project.",
  "Each component ships with a source file, three real-world examples, and a CLI install command.",
];

export default function TextGenerateEffectAI() {
  const [index, setIndex] = useState(0);
  const [trigger, setTrigger] = useState(true);

  const regenerate = () => {
    setTrigger(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % responses.length);
      setTrigger(true);
    }, 50);
  };

  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
          <span className="font-semibold text-neutral-500 dark:text-neutral-400 text-xs">
            AI Assistant
          </span>
        </div>
        <TextGenerateEffect
          as="p"
          className="text-neutral-900 dark:text-neutral-100 text-sm leading-relaxed"
          filter
          key={index}
          staggerDuration={0.06}
          transition={{ duration: 0.4 }}
          trigger={trigger}
        >
          {responses[index]!}
        </TextGenerateEffect>
        <button
          className="mt-4 text-neutral-500 dark:text-neutral-400 text-xs hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors"
          onClick={regenerate}
          type="button"
        >
          ↺ Regenerate
        </button>
      </div>
    </div>
  );
}
