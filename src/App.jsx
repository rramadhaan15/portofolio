import React from "react";
import Demo from "@/components/ui/demo";
import AboutSection from "@/components/ui/about-section";
import EducationSection from "@/components/ui/education-section";
import ExperienceSection from "@/components/ui/experience-section";
import ProjectsSection from "@/components/ui/projects-section";
import CertificatesSection from "@/components/ui/certificates-section";
import { Component as FlipLinks } from "@/components/ui/flip-links";
import ShutterGlyphFooter from "@/components/ui/shutter-glyph-footer";

export default function App() {
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

