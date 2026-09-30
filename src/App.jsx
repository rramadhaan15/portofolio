import React from "react";
import Demo from "@/components/ui/demo";
import AboutSection from "@/components/ui/about-section";
import { Component as FlipLinks } from "@/components/ui/flip-links";

export default function App() {
  return (
    <div className="w-full min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors overflow-x-hidden">
      <Demo />
      <AboutSection />
      <FlipLinks />
    </div>
  );
}

