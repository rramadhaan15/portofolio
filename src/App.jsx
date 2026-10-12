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
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Refresh ScrollTrigger to ensure all pin spacers match exact layout
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
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

