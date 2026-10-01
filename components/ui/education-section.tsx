import React from "react";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";
import {
  GraduationCap,
  School,
  MapPin,
  Calendar,
} from "lucide-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function EducationSection() {
  const educationData: TimelineEntry[] = [
    {
      title: "Kuliah",
      subtitle: "Pendidikan Tinggi",
      period: "2024 — Sekarang",
      content: (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl shadow-lg hover:border-[#C3E41D]/50 transition-all duration-300">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#C3E41D]/10 text-[#a8cc0e] dark:text-[#C3E41D] border border-[#C3E41D]/30 mb-2">
                <GraduationCap className="w-3.5 h-3.5" /> Perguruan Tinggi Negeri
              </span>
              <h4 className="text-xl md:text-2xl font-bold font-mono text-neutral-900 dark:text-white">
                Universitas Pembangunan Nasional "Veteran" Jakarta
              </h4>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-mono mt-1">
                D3 Sistem Informasi • Fakultas Ilmu Komputer
              </p>

              <div className="flex flex-col items-start gap-1 text-xs font-mono text-neutral-500 mt-3">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" style={{ color: "#C3E41D" }} /> 2024 — Sekarang
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Jakarta Selatan, Indonesia
                </span>
              </div>
            </div>

            <TextGenerateEffect
              as="p"
              className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm md:text-base font-sans mb-6"
              filter
              staggerDuration={0.018}
              transition={{ duration: 0.25 }}
            >
              {"Mendalami perancangan sistem informasi terintegrasi, arsitektur aplikasi berbasis web modern, keamanan siber (__Cybersecurity__), dan analisis data (__Business Intelligence__) untuk solusi teknologi efisien."}
            </TextGenerateEffect>

            {/* Core Competencies Learned */}
            <div className="mb-6">
              <h5 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3">
                // Fokus Studi & Kompetensi Kunci:
              </h5>
              <div className="flex flex-wrap gap-2">
                {[
                  "Web Development",
                  "Cybersecurity Fundamentals",
                  "Business Intelligence",
                  "Database Systems (SQL)",
                  "System Analysis & Design",
                  "Object-Oriented Programming",
                  "Network & Data Security",
                ].map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 group h-48 sm:h-56">
                <img
                  src="/education-kuliah-1.jpg"
                  alt="Mahasiswa D3 Sistem Informasi UPNVJ"
                  className="w-full h-full object-cover object-[center_60%] group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 group h-48 sm:h-56">
                <img
                  src="/education-kuliah-2.jpg"
                  alt="Kebersamaan Angkatan Mahasiswa"
                  className="w-full h-full object-cover object-[center_70%] group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "SMA",
      subtitle: "SMAN 22 Jakarta",
      period: "2021 — 2024",
      content: (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl shadow-lg hover:border-[#C3E41D]/50 transition-all duration-300">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 mb-2">
                <School className="w-3.5 h-3.5" style={{ color: "#C3E41D" }} /> Sekolah Menengah Atas
              </span>
              <h4 className="text-xl md:text-2xl font-bold font-mono text-neutral-900 dark:text-white">
                SMAN 22 Jakarta
              </h4>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-mono mt-1">
                Sekolah Menengah Atas Negeri 22 Jakarta
              </p>

              <div className="flex flex-col items-start gap-1 text-xs font-mono text-neutral-500 mt-3">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" style={{ color: "#C3E41D" }} /> 2021 — 2024
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Jakarta Timur, Indonesia
                </span>
              </div>
            </div>

            <TextGenerateEffect
              as="p"
              className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm md:text-base font-sans mb-6"
              filter
              staggerDuration={0.018}
              transition={{ duration: 0.25 }}
            >
              {"Membangun fondasi logika berpikir dan penalaran ilmiah di sekolah, sekaligus aktif mendalami dunia teknologi komputer dan ekosistem digital secara otodidak melalui platform edukasi YouTube, dokumentasi teknis, serta berbagai proyek __open source__ di internet."}
            </TextGenerateEffect>

            <div className="flex flex-wrap gap-2 mb-6">
              {[
                "Belajar Mandiri (Otodidak)",
                "YouTube & Open Source",
                "Dasar Teknologi Komputer",
                "Logika & Penalaran Ilmiah",
              ].map((item, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800"
                >
                  ✓ {item}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 group h-48 sm:h-56">
                <img
                  src="/education-sma-1.jpg"
                  alt="Dokumentasi Kelulusan SMAN 22 Jakarta"
                  className="w-full h-full object-cover object-[center_65%] group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 group h-48 sm:h-56">
                <img
                  src="/education-sma-2.jpg"
                  alt="Kebersamaan Siswa dan Guru SMAN 22 Jakarta"
                  className="w-full h-full object-cover object-[center_55%] group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Timeline
      data={educationData}
      badge="02 // EDUCATION"
      subtitle="Jejak langkah pendidikan formal dan perjalanan akademis dari masa SMA hingga perguruan tinggi."
    />
  );
}
