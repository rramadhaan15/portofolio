import React from "react";
import {
  Code2,
  Terminal,
  ArrowUpRight,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  BarChart3,
  Globe,
} from "lucide-react";

export default function AboutSection() {
  const skills = [
    "Web Development",
    "React.js",
    "Tailwind CSS",
    "JavaScript (ES6+)",
    "TypeScript",
    "Cybersecurity Fundamentals",
    "Network Security",
    "Business Intelligence",
    "SQL & Database",
    "Data Analytics",
    "Git & GitHub",
    "UI/UX Principles",
  ];

  const focusAreas = [
    {
      title: "Web Development",
      desc: "Merancang dan membangun antarmuka web modern yang responsif, interaktif, dan optimal dengan kode bersih.",
      icon: Code2,
    },
    {
      title: "Cybersecurity",
      desc: "Mempelajari fundamental keamanan siber, proteksi data, analisis kerentanan, dan integritas sistem informasi.",
      icon: ShieldCheck,
    },
    {
      title: "Business Intelligence",
      desc: "Mengeksplorasi pengolahan data, pemodelan informasi, serta visualisasi metrik bisnis untuk pengambilan keputusan.",
      icon: BarChart3,
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-20 transition-colors duration-300 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 overflow-hidden"
    >
      {/* Background Subtle Accent Glow */}
      <div
        className="pointer-events-none absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-[140px] opacity-20 dark:opacity-15"
        style={{ backgroundColor: "#C3E41D" }}
      />
      <div
        className="pointer-events-none absolute bottom-10 -right-20 w-96 h-96 rounded-full blur-[160px] opacity-15 dark:opacity-10"
        style={{ backgroundColor: "#C3E41D" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md mb-4 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#C3E41D" }} />
            <span style={{ color: "#C3E41D" }}>01 // ABOUT ME</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            Passionate About Tech, <br className="hidden sm:inline" />
            <span style={{ color: "#C3E41D" }}>Data & Security</span>
          </h2>
          <p
            className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl"
            style={{ fontFamily: "'Antic', sans-serif" }}
          >
            Menjembatani pengembangan perangkat lunak, ketahanan sistem siber, dan analisis data bisnis strategis.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Narrative Bio & Status */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800">
                  <GraduationCap className="w-6 h-6" style={{ color: "#C3E41D" }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-mono">Rizki Ramadhan</h3>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    Mahasiswa D3 Sistem Informasi • UPN "Veteran" Jakarta
                  </p>
                </div>
              </div>

              <div
                className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed text-base md:text-lg"
                style={{ fontFamily: "'Antic', sans-serif" }}
              >
                <p>
                  Halo! Saya <span className="font-semibold text-neutral-950 dark:text-white">Rizki Ramadhan</span>, mahasiswa program studi <span className="font-semibold text-neutral-950 dark:text-white">D3 Sistem Informasi di Universitas Pembangunan Nasional "Veteran" Jakarta (UPNVJ)</span>.
                </p>
                <p>
                  Saya memiliki ketertarikan dan antusiasme tinggi di dunia teknologi digital, khususnya dalam bidang{" "}
                  <span className="font-semibold text-neutral-950 dark:text-white underline decoration-2 underline-offset-4" style={{ textDecorationColor: "#C3E41D" }}>
                    Web Development
                  </span>
                  ,{" "}
                  <span className="font-semibold text-neutral-950 dark:text-white underline decoration-2 underline-offset-4" style={{ textDecorationColor: "#C3E41D" }}>
                    Cybersecurity
                  </span>
                  , serta{" "}
                  <span className="font-semibold text-neutral-950 dark:text-white underline decoration-2 underline-offset-4" style={{ textDecorationColor: "#C3E41D" }}>
                    Business Intelligence
                  </span>
                  .
                </p>
                <p>
                  Melalui perkuliahan dan eksplorasi mandiri, saya aktif mengasah keahlian membangun antarmuka web interaktif yang modern, memahami arsitektur keamanan sistem informasi untuk melindungi data, serta mengolah data mentah menjadi wawasan bisnis yang bernilai strategis.
                </p>
              </div>

              {/* Status Badge */}
              <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm font-mono text-neutral-600 dark:text-neutral-400">
                  <span className="relative flex h-3 w-3">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: "#C3E41D" }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-3 w-3"
                      style={{ backgroundColor: "#C3E41D" }}
                    />
                  </span>
                  <span>Active Student • Ready for Collaboration</span>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-colors hover:underline"
                  style={{ color: "#C3E41D" }}
                >
                  Hubungi Saya <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Focus Areas Trio */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {focusAreas.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-md transition-all duration-300 hover:border-[#C3E41D]/60 hover:-translate-y-1 shadow-sm"
                  >
                    <Icon className="w-5 h-5 mb-3" style={{ color: "#C3E41D" }} />
                    <h4 className="font-bold text-sm font-mono mb-1.5">{item.title}</h4>
                    <p className="text-xs text-neutral-500 leading-normal">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Code Terminal & Skills */}
          <div className="lg:col-span-5 space-y-6">
            {/* Terminal Window Widget */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-neutral-200 shadow-2xl overflow-hidden font-mono text-xs">
              {/* Terminal Bar */}
              <div className="px-4 py-3 bg-neutral-950/80 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>rizki@upnvj:~</span>
                </div>
                <div className="w-10" />
              </div>

              {/* Terminal Code Content */}
              <div className="p-5 space-y-2 overflow-x-auto leading-relaxed">
                <div>
                  <span className="text-neutral-500">// Academic & Profile Record</span>
                </div>
                <div>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-400">studentProfile</span> = &#123;
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">name:</span>{" "}
                  <span className="text-emerald-400">"Rizki Ramadhan"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">university:</span>{" "}
                  <span className="text-emerald-400">"UPN Veteran Jakarta"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">major:</span>{" "}
                  <span className="text-emerald-400">"D3 Sistem Informasi"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">interests:</span> [
                  <br />
                  <span className="pl-4" style={{ color: "#C3E41D" }}>
                    "Web Development"
                  </span>
                  ,
                  <br />
                  <span className="pl-4" style={{ color: "#C3E41D" }}>
                    "Cybersecurity"
                  </span>
                  ,
                  <br />
                  <span className="pl-4" style={{ color: "#C3E41D" }}>
                    "Business Intelligence"
                  </span>
                  <br />
                  ],
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">status:</span>{" "}
                  <span className="text-yellow-300">"Active Student"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">github:</span>{" "}
                  <span className="text-emerald-400">"rramadhaan15"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">email:</span>{" "}
                  <span className="text-emerald-400">"rizkiramadhan2175@gmail.com"</span>
                </div>
                <div>&#125;;</div>
                <div className="pt-2 text-neutral-500 flex items-center gap-1">
                  <span style={{ color: "#C3E41D" }}>❯</span>
                  <span>ready_to_learn_and_grow === true</span>
                </div>
              </div>
            </div>

            {/* Core Tech Stack */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl shadow-xl">
              <h4
                className="text-xs uppercase font-mono tracking-widest text-neutral-500 mb-4 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" style={{ color: "#C3E41D" }} />
                <span>Competencies & Interests</span>
              </h4>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 text-neutral-800 dark:text-neutral-200 transition-colors duration-200 hover:border-[#C3E41D] hover:text-[#C3E41D] cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
