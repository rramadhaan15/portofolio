import React, { useState, useEffect } from "react";
import {
  Layers,
  Megaphone,
  Camera,
  Calendar,
  Building2,
  MapPin,
  ChevronRight,
  Briefcase,
} from "lucide-react";

interface ExperienceItem {
  id: string;
  title: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  skills: string[];
  image: string;
  icon: React.ReactNode;
}

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  const experiences: ExperienceItem[] = [
    {
      id: "system-analyst-kemenperin",
      title: "System Analyst",
      role: "Internship • System Analyst",
      company: "Kementerian Perindustrian Republik Indonesia",
      period: "Sep 2026 — Present",
      location: "Gatot Subroto, Jakarta • On-site",
      description:
        "Menganalisis kebutuhan sistem perangkat lunak, memetakan alur proses bisnis digital, serta merumuskan spesifikasi teknis dan fungsional sistem informasi di lingkungan Kementerian Perindustrian RI untuk mendukung efisiensi operasional dan tata kelola digital.",
      skills: [
        "Software System Analysis",
        "Systems Analysis",
        "Business Process Modeling",
        "Requirement Engineering",
        "Information Systems Architecture",
      ],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      icon: <Layers className="w-5 h-5 text-white" />,
    },
    {
      id: "head-of-pr-hima",
      title: "Head of Public Relations",
      role: "Divisional Leadership",
      company: "HIMA D3SI UPNVJ - Himpunan Mahasiswa D3 Sistem Informasi",
      period: "Jan 2026 — Present",
      location: "UPN 'Veteran' Jakarta",
      description:
        "Memimpin divisi Hubungan Masyarakat (Public Relations) dalam mengelola citra organisasi, membangun kemitraan strategis eksternal dengan berbagai stakeholder dan alumni, serta mengorkestrasi alur komunikasi publik dan branding HIMA D3SI UPNVJ.",
      skills: [
        "Public Relations",
        "Leadership",
        "Strategic Communication",
        "Partnership & Networking",
        "Event Management",
      ],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80",
      icon: <Megaphone className="w-5 h-5 text-white" />,
    },
    {
      id: "hpd-officer-upcome",
      title: "HPD Officer",
      role: "Humas, Publikasi & Dokumentasi",
      company: "UPCOME 4.0",
      period: "Jun 2025 — Oct 2025",
      location: "Jakarta, Indonesia • On-site",
      description:
        "Bertanggung jawab atas perencanaan strategi publikasi media sosial, koordinasi hubungan masyarakat, serta produksi dokumentasi multimedia dan liputan visual secara menyeluruh untuk mensukseskan rangkaian acara UPCOME 4.0.",
      skills: [
        "Public Relations",
        "Teamwork",
        "Media Publication",
        "Event Documentation",
        "Content Creation",
      ],
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
      icon: <Camera className="w-5 h-5 text-white" />,
    },
  ];

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    experiences.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 160 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <section
      id="experience"
      className="w-full bg-neutral-50 dark:bg-black font-sans px-4 sm:px-6 md:px-10 py-24 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Accent Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/2 -left-32 w-96 h-96 rounded-full blur-[150px] opacity-15 dark:opacity-10"
        style={{ backgroundColor: "#C3E41D" }}
      />
      <div
        className="pointer-events-none absolute bottom-10 -right-32 w-96 h-96 rounded-full blur-[150px] opacity-15 dark:opacity-10"
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

        {/* Interactive Selector Experience Showcase */}
        {/* Desktop & Tablet View: Expanding Accordion Cards */}
        <div className="hidden md:flex w-full h-[520px] items-stretch overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl bg-neutral-900">
          {experiences.map((exp, index) => {
            const isActive = activeIndex === index;
            const isAnimated = animatedOptions.includes(index);

            return (
              <div
                key={exp.id}
                onClick={() => handleOptionClick(index)}
                className={`
                  relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out cursor-pointer select-none
                  ${isActive ? "active" : "hover:brightness-110"}
                `}
                style={{
                  backgroundImage: `url('${exp.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: isAnimated ? 1 : 0,
                  transform: isAnimated ? "translateX(0)" : "translateX(-50px)",
                  minWidth: "100px",
                  flex: isActive ? "5 1 0%" : "1 1 0%",
                  borderRight: index < experiences.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
                  zIndex: isActive ? 10 : 1,
                  boxShadow: isActive ? "0 25px 60px rgba(0,0,0,0.6)" : "none",
                }}
              >
                {/* Backdrop Overlay: Darker when collapsed, smooth gradient when active */}
                <div
                  className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                  style={{
                    backgroundColor: isActive ? "rgba(0, 0, 0, 0.45)" : "rgba(0, 0, 0, 0.78)",
                  }}
                />

                {/* Bottom to Top Deep Black Gradient for Content Readability */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-700"
                  style={{
                    background: isActive
                      ? "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.2) 80%, transparent 100%)"
                      : "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 100%)",
                  }}
                />

                {/* Collapsed State Header Indicator (Vertical Text or Compact Icon) */}
                {!isActive && (
                  <div className="absolute inset-0 flex flex-col items-center justify-between p-6 pointer-events-none z-20">
                    <div className="w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
                      {exp.icon}
                    </div>
                    <div className="flex items-center justify-center [writing-mode:vertical-rl] rotate-180 text-sm font-mono tracking-wider text-white/80 uppercase">
                      {exp.title}
                    </div>
                    <span className="text-xs font-mono text-white/50">0{index + 1}</span>
                  </div>
                )}

                {/* Expanded State Full Card Content */}
                <div
                  className="relative z-20 p-8 sm:p-10 flex flex-col justify-end transition-all duration-700"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(30px)",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {/* Top Badge & Metadata */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg border border-white/20"
                      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                    >
                      {exp.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#C3E41D]/20 text-[#C3E41D] border border-[#C3E41D]/40">
                      0{index + 1} // {exp.role}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300">
                      <Calendar className="w-3.5 h-3.5 text-[#C3E41D]" /> {exp.period}
                    </span>
                    {exp.location && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300">
                        <MapPin className="w-3.5 h-3.5 text-[#C3E41D]" /> {exp.location}
                      </span>
                    )}
                  </div>

                  {/* Main Title & Organization */}
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-mono text-[#C3E41D] mb-4">
                    <Building2 className="w-4 h-4 flex-shrink-0" />
                    <span>{exp.company}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-sans mb-6 max-w-2xl drop-shadow">
                    {exp.description}
                  </p>

                  {/* Skills / Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-black/60 text-white/90 border border-white/15 backdrop-blur-md"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View: Vertical Accordion Cards (< md screens) */}
        <div className="flex md:hidden flex-col gap-4">
          {experiences.map((exp, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={exp.id}
                onClick={() => handleOptionClick(index)}
                className={`
                  relative rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer
                  ${
                    isActive
                      ? "border-[#C3E41D]/60 shadow-xl ring-1 ring-[#C3E41D]/30"
                      : "border-neutral-200 dark:border-neutral-800"
                  }
                `}
                style={{
                  backgroundImage: `url('${exp.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Dark Gradient Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    backgroundColor: isActive ? "rgba(0, 0, 0, 0.65)" : "rgba(0, 0, 0, 0.8)",
                  }}
                />

                <div className="relative z-10 p-6 flex flex-col justify-between min-h-[160px]">
                  {/* Header / Trigger */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/20 flex items-center justify-center flex-shrink-0">
                        {exp.icon}
                      </div>
                      <div>
                        <span className="text-xs font-mono text-[#C3E41D] block">
                          0{index + 1} • {exp.period}
                        </span>
                        <h4 className="text-lg font-bold text-white font-mono">{exp.title}</h4>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-[#C3E41D] transition-transform duration-300 flex-shrink-0 ${
                        isActive ? "rotate-90" : "rotate-0"
                      }`}
                    />
                  </div>

                  {/* Expanded Content on Mobile */}
                  {isActive && (
                    <div className="mt-4 pt-4 border-t border-white/10 animate-fadeIn">
                      <p className="text-xs font-mono text-neutral-300 flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                        <span className="inline-flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#C3E41D]" /> {exp.company}
                        </span>
                        {exp.location && (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#C3E41D]" /> {exp.location}
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-neutral-200 leading-relaxed font-sans mb-4">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-black/70 text-white/90 border border-white/15"
                          >
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
