import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Megaphone,
  Camera,
  Calendar,
  Building2,
  MapPin,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { GlowEffect } from "@/components/ui/glow-effect";
import { getAssetUrl } from "@/lib/utils";


interface ExperienceItem {
  id: string;
  number: string;
  tabLabel: string;
  title: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
  image: string;
  imagePosition: string;
  caption: string;
  icon: React.ReactNode;
  glowColors: string[];
}

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const experiences: ExperienceItem[] = [
    {
      id: "system-analyst-kemenperin",
      number: "01",
      tabLabel: "System Analyst",
      title: "System Analyst",
      role: "Internship • System Analyst",
      company: "Kementerian Perindustrian Republik Indonesia",
      period: "Sep 2026 — Present",
      location: "Gatot Subroto, Jakarta • On-site",
      description:
        "Menganalisis kebutuhan sistem perangkat lunak, memetakan alur proses bisnis digital, serta merumuskan spesifikasi teknis dan fungsional sistem informasi di lingkungan Kementerian Perindustrian RI guna mewujudkan efisiensi operasional dan integrasi layanan publik yang andal.",
      skills: [
        "Software System Analysis",
        "Systems Analysis",
        "Business Process Modeling",
        "Requirement Engineering",
        "Information Systems Architecture",
      ],
      image: getAssetUrl("/experience-kemenperin.jpg"),
      imagePosition: "object-[center_35%]",
      caption: "Dokumentasi di Kementerian Perindustrian RI",
      icon: <Layers className="w-4 h-4" />,
      glowColors: ["#C3E41D", "#06B6D4", "#3B82F6", "#C3E41D"],
    },
    {
      id: "head-of-pr-hima",
      number: "02",
      tabLabel: "Head of Public Relations",
      title: "Head of Public Relations",
      role: "Divisional Leadership",
      company: "HIMA D3SI UPNVJ - Himpunan Mahasiswa D3 Sistem Informasi",
      period: "Jan 2026 — Present",
      location: "UPN 'Veteran' Jakarta",
      description:
        "Memimpin divisi Hubungan Masyarakat (Public Relations) dalam mengelola citra organisasi, membangun kemitraan strategis eksternal dengan berbagai institusi dan jejaring alumni, serta mengorkestrasi publikasi komunikasi publik dan branding HIMA D3SI UPNVJ.",
      skills: [
        "Public Relations",
        "Leadership",
        "Strategic Communication",
        "Partnership & Networking",
        "Event Management",
      ],
      image: getAssetUrl("/experience-hima.jpg"),
      imagePosition: "object-[center_60%]",
      caption: "Kebersamaan Pengurus HIMA D3SI UPNVJ di Monas",
      icon: <Megaphone className="w-4 h-4" />,
      glowColors: ["#C3E41D", "#10B981", "#14B8A6", "#C3E41D"],
    },
    {
      id: "hpd-officer-upcome",
      number: "03",
      tabLabel: "HPD Officer",
      title: "HPD Officer",
      role: "Humas, Publikasi & Dokumentasi",
      company: "UPCOME 4.0",
      period: "Jun 2025 — Oct 2025",
      location: "Jakarta, Indonesia • On-site",
      description:
        "UPCOME 4.0 adalah program kerja dari BEM UPNVJ. Bertanggung jawab atas perencanaan strategi publikasi media sosial, koordinasi hubungan masyarakat, serta produksi dokumentasi multimedia dan liputan visual secara menyeluruh untuk mensukseskan seluruh rangkaian acara.",
      skills: [
        "Public Relations",
        "Teamwork",
        "Media Publication",
        "Event Documentation",
      ],
      image: getAssetUrl("/experience-upcome.jpg"),
      imagePosition: "object-[center_55%]",
      caption: "Kepanitiaan & Tim Publikasi Dokumentasi UPCOME 4.0",
      icon: <Camera className="w-4 h-4" />,
      glowColors: ["#C3E41D", "#8B5CF6", "#EC4899", "#C3E41D"],
    },
  ];

  const current = experiences[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? experiences.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === experiences.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="experience"
      className="w-full bg-neutral-50 dark:bg-black font-sans px-4 sm:px-6 md:px-10 py-24 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Accent Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/3 -left-32 w-96 h-96 rounded-full blur-[160px] opacity-15 dark:opacity-10"
        style={{ backgroundColor: "#C3E41D" }}
      />
      <div
        className="pointer-events-none absolute bottom-10 -right-32 w-96 h-96 rounded-full blur-[160px] opacity-15 dark:opacity-10"
        style={{ backgroundColor: "#C3E41D" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md mb-4 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#C3E41D" }} />
            <span style={{ color: "#C3E41D" }}>03 // EXPERIENCE</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase text-neutral-900 dark:text-neutral-100"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            Professional Path & <br className="hidden sm:inline" />
            <span style={{ color: "#C3E41D" }}>Leadership Roles</span>
          </h2>
          <p
            className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl"
            style={{ fontFamily: "'Antic', sans-serif" }}
          >
            Rekam jejak pengalaman profesional, kepemimpinan organisasi kemahasiswaan, dan kontribusi divisi pada institusi pemerintah maupun kepanitiaan nasional.
          </p>
        </div>

        {/* Interactive Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
          {experiences.map((exp, index) => {
            const isActive = activeIndex === index;
            return (
              <div key={exp.id} className="relative group rounded-2xl">
                {/* Glow Effect for each Experience Card */}
                <GlowEffect
                  colors={exp.glowColors}
                  mode="rotate"
                  blur="medium"
                  scale={1.03}
                  duration={6}
                  className={`rounded-2xl transition-opacity duration-500 ${
                    isActive
                      ? "opacity-90 dark:opacity-100"
                      : "opacity-0 group-hover:opacity-60 dark:group-hover:opacity-75"
                  }`}
                />

                <button
                  onClick={() => setActiveIndex(index)}
                  className={`
                    w-full text-left p-4 rounded-2xl border transition-all duration-300 relative z-10 overflow-hidden
                    ${
                      isActive
                        ? "bg-white dark:bg-neutral-900/95 border-[#C3E41D] shadow-lg shadow-[#C3E41D]/10 ring-1 ring-[#C3E41D]/40"
                        : "bg-white/85 dark:bg-neutral-950/85 backdrop-blur-sm border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                    }
                  `}
                >
                  {/* Active Indicator Top Accent Bar */}
                  {isActive && (
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: "#C3E41D" }}
                    />
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`
                          w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                          ${
                            isActive
                              ? "bg-[#C3E41D] text-black"
                              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"
                          }
                        `}
                      >
                        {exp.icon}
                      </div>
                      <span
                        className={`text-xs font-mono font-bold tracking-wider ${
                          isActive ? "text-[#a8cc0e] dark:text-[#C3E41D]" : "text-neutral-400 dark:text-neutral-500"
                        }`}
                      >
                        {exp.number}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                      {exp.period.split("—")[0].trim()}
                    </span>
                  </div>

                  <h4 className="font-mono font-bold text-sm sm:text-base text-neutral-900 dark:text-white truncate">
                    {exp.tabLabel}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5 font-sans">
                    {exp.company}
                  </p>
                </button>
              </div>
            );
          })}
        </div>

        {/* Main Split-Panel Showcase Card */}
        <div className="relative group rounded-3xl">
          {/* Ambient Glow for Main Active Experience Card */}
          <GlowEffect
            key={`main-glow-${current.id}`}
            colors={current.glowColors}
            mode="rotate"
            blur="strong"
            scale={1.012}
            duration={7}
            className="rounded-3xl opacity-35 dark:opacity-50 transition-opacity duration-700"
          />

          <div className="relative z-10 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl shadow-2xl p-6 sm:p-8 lg:p-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left Column: Full Information & Details (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Badges & Navigation Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#C3E41D]/15 text-[#a8cc0e] dark:text-[#C3E41D] border border-[#C3E41D]/30">
                        {current.number} // {current.role}
                      </span>

                      {/* Pagination Arrows */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={handlePrev}
                          aria-label="Previous experience"
                          className="w-8 h-8 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center hover:border-[#C3E41D] transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                        </button>
                        <span className="text-xs font-mono px-1 text-neutral-500">
                          {activeIndex + 1}/{experiences.length}
                        </span>
                        <button
                          onClick={handleNext}
                          aria-label="Next experience"
                          className="w-8 h-8 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center hover:border-[#C3E41D] transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                        </button>
                      </div>
                    </div>

                    {/* Role Title */}
                    <h3
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight mb-3"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      {current.title}
                    </h3>

                    {/* Company, Date & Location Metadata */}
                    <div className="space-y-1.5 mb-6 text-xs sm:text-sm font-mono text-neutral-600 dark:text-neutral-400">
                      <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-200 font-semibold">
                        <Building2 className="w-4 h-4 text-[#a8cc0e] dark:text-[#C3E41D] flex-shrink-0" />
                        <span>{current.company}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-neutral-500 dark:text-neutral-400">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#a8cc0e] dark:text-[#C3E41D]" /> {current.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#a8cc0e] dark:text-[#C3E41D]" /> {current.location}
                        </span>
                      </div>
                    </div>

                    {/* Narrative Description with Text Generate / Typewriter Effect */}
                    <TextGenerateEffect
                      key={current.id}
                      as="p"
                      className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed font-sans mb-6"
                      filter
                      staggerDuration={0.02}
                      transition={{ duration: 0.3 }}
                    >
                      {current.description}
                    </TextGenerateEffect>
                  </div>

                  {/* Skill Badges */}
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2.5">
                      // Keahlian & Ruang Lingkup Kerja:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {current.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: 100% Crystal-Clear Photo Showcase (5 cols) */}
                <div className="lg:col-span-5">
                  <div className="relative group/photo rounded-2xl">
                    {/* Subtle Glow around photo border on hover */}
                    <GlowEffect
                      colors={current.glowColors}
                      mode="rotate"
                      blur="soft"
                      scale={1.02}
                      duration={6}
                      className="rounded-2xl opacity-0 group-hover/photo:opacity-75 dark:group-hover/photo:opacity-85 transition-opacity duration-500"
                    />
                    <div className="relative z-10 w-full h-[320px] sm:h-[400px] lg:h-[460px] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl bg-neutral-900">
                      <img
                        src={current.image}
                        alt={current.title}
                        className={`w-full h-full object-cover ${current.imagePosition} group-hover/photo:scale-105 transition-transform duration-500`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
