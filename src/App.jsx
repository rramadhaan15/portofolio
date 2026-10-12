import React, { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Demo from "@/components/ui/demo";
import AboutSection from "@/components/ui/about-section";
import EducationSection from "@/components/ui/education-section";
import ExperienceSection from "@/components/ui/experience-section";
import ProjectsSection from "@/components/ui/projects-section";
import CertificatesSection from "@/components/ui/certificates-section";
import { Component as FlipLinks } from "@/components/ui/flip-links";
import ShutterGlyphFooter from "@/components/ui/shutter-glyph-footer";

export default function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize silky-smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis RAF inside GSAP ticker for frame-perfect animation sync
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Turn off lagSmoothing to eliminate stutter/jumps during scrubbed scroll
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors overflow-x-hidden">
      <Demo />
      <AboutSection />
      <EducationSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificatesSection />
      <FlipLinks />
      <ShutterGlyphFooter />
    </div>
  );
}

