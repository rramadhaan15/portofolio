"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import { cn, getAssetUrl } from "@/lib/utils";


export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category?: string;
  date: string;
  credentialId: string;
  credentialUrl?: string;
  skills: string[];
  image?: string;
  description?: string;
  issuerBadgeColor?: string;
}

const DEFAULT_CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-google-education",
    title: "Google for Education",
    issuer: "Google",
    category: "Generative AI",
    date: "24 September 2026 - 24 September 2029",
    credentialId: "195032373",
    credentialUrl: "https://edu.google.accredible.com/9a40b88d-e3f7-475a-8c5e-dce2b8c50646#acc.B0frm2OP",
    skills: ["Generative AI", "Problem Solving", "Critical Thinking", "Google Workspace"],
    description: "Google for Education Academy adalah platform pembelajaran profesional resmi dari Google yang dirancang untuk membekali peserta dengan keterampilan digital dan pemanfaatan teknologi modern. Program ini berfokus pada peningkatan produktivitas melalui integrasi perangkat digital dan kecerdasan buatan seperti Google Workspace dan AI, pengembangan kompetensi melalui modul interaktif yang praktis, serta pemberian kesempatan untuk memperoleh sertifikasi atau lencana pengakuan resmi setelah menyelesaikan seluruh rangkaian materi.",
    image: getAssetUrl("/certificate-google-gemini.png"),
    issuerBadgeColor: "#4285F4",
  },
  {
    id: "cert-ibm-data",
    title: "Getting Start With Data",
    issuer: "IBM SkillsBuild",
    category: "Data Analytics",
    date: "3 Agustus 2026",
    credentialId: "6cce579d-952e-475c-a4bc-8fed34ffea9d",
    credentialUrl: "https://www.credly.com/earner/earned/badge/6cce579d-952e-475c-a4bc-8fed34ffea9d",
    skills: ["Data Analytics", "Data Visualization", "Problem Solving", "Critical Thinking"],
    description: "Kredensial digital profesional dari IBM SkillsBuild yang memvalidasi kompetensi fundamental dalam pengolahan data, pemahaman struktur data relasional, visualisasi data analitik, serta pemecahan masalah dan pemikiran kritis berbasis data.",
    image: getAssetUrl("/certificate-ibm-data.png"),
    issuerBadgeColor: "#0062FF",
  },
  {
    id: "cert-ibm-granite",
    title: "Code Generation and Optimization Using IBM Granite",
    issuer: "IBM SkillsBuild",
    category: "Generative AI",
    date: "7 Oktober 2025",
    credentialId: "9a391463-1d3c-40b0-b2bf-80a8c0a2c48b",
    credentialUrl: "https://www.credly.com/badges/9a391463-1d3c-40b0-b2bf-80a8c0a2c48b/public_url",
    skills: ["Generative AI", "Code Optimization", "IBM Granite", "Problem Solving"],
    description: "Code Generation and Optimization Using IBM Granite adalah lencana kredensial digital dari IBM SkillsBuild yang menunjukkan bahwa seseorang telah mempelajari dan memiliki keterampilan praktis dalam menggunakan model AI IBM Granite untuk menghasilkan dan mengoptimalkan kode pemrograman.",
    image: getAssetUrl("/certificate-ibm-granite.png"),
    issuerBadgeColor: "#0062FF",
  },
];

export interface CertificatesSectionProps extends React.HTMLAttributes<HTMLElement> {
  certificates?: CertificateItem[];
}

export function CertificatesSection({
  certificates = DEFAULT_CERTIFICATES,
  className,
  id = "certificates",
  ...props
}: CertificatesSectionProps) {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id={id}
      className={cn(
        "relative w-full min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-300 overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Background Subtle Ambient Glows */}
      <div
        className="pointer-events-none absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[160px] opacity-15 dark:opacity-10"
        style={{ backgroundColor: "#00E5FF" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-[160px] opacity-15 dark:opacity-10"
        style={{ backgroundColor: "#C3E41D" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#C3E41D" }} />
            <span style={{ color: "#C3E41D" }}>05 // LICENSES & CERTIFICATIONS</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            Validated Expertise.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
            Koleksi sertifikasi profesional, kompetensi terverifikasi, dan lisensi terakreditasi dalam bidang{" "}
            <span className="text-neutral-900 dark:text-white font-semibold">Generative AI</span>,{" "}
            <span className="text-neutral-900 dark:text-white font-semibold">Data Analytics</span>, serta{" "}
            <span className="text-neutral-900 dark:text-white font-semibold">Code Optimization</span>.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {certificates.map((cert) => (
              <motion.div
                layout
                key={cert.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedCert(cert)}
                className="group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800/80 hover:border-[#C3E41D]/60 dark:hover:border-[#C3E41D]/50 shadow-lg hover:shadow-2xl dark:hover:shadow-[#C3E41D]/5 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Glowing Top Edge Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C3E41D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card Top: Issuer & Verified Status */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-white/10 group-hover:border-[#C3E41D]/40 transition-colors">
                        <Award className="w-4 h-4 text-[#C3E41D]" />
                      </div>
                      <span className="text-xs font-mono font-semibold text-neutral-600 dark:text-neutral-400">
                        {cert.issuer}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Certificate Title */}
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white mb-2 group-hover:text-[#C3E41D] transition-colors line-clamp-2">
                    {cert.title}
                  </h3>

                  {/* Stylized Digital Certificate Mockup Preview */}
                  <div className="relative w-full h-48 sm:h-52 rounded-xl my-4 overflow-hidden border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center p-2 shadow-inner">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <>
                        {/* Decorative Security Border */}
                        <div className="absolute inset-1.5 rounded-lg border border-dashed border-neutral-300 dark:border-white/10 pointer-events-none" />

                        {/* Certificate Inner Top */}
                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#C3E41D]" />
                            <span className="text-[9px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400 font-bold">
                              CERTIFICATE OF COMPETENCY
                            </span>
                          </div>
                          <span className="text-[9px] font-mono text-neutral-400 font-semibold">{cert.date}</span>
                        </div>

                        {/* Recipient & Signature Center */}
                        <div className="relative z-10 text-center py-1">
                          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest text-[8px]">
                            PROUDLY PRESENTED TO
                          </div>
                          <div
                            className="text-sm font-black tracking-tight text-neutral-900 dark:text-white uppercase my-0.5"
                            style={{ fontFamily: "'Fira Code', monospace" }}
                          >
                            RIZKI RAMADHAN
                          </div>
                          <div className="text-[9px] font-sans text-neutral-500 dark:text-neutral-400 truncate max-w-[240px] mx-auto">
                            {cert.title}
                          </div>
                        </div>

                        {/* Certificate Bottom Watermark & Seal */}
                        <div className="relative z-10 flex items-center justify-between pt-1 border-t border-neutral-200 dark:border-white/5">
                          <span className="text-[8px] font-mono text-neutral-400 truncate">
                            ID: {cert.credentialId}
                          </span>
                          <div className="flex items-center gap-1 text-[8px] font-mono text-[#C3E41D] font-bold">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>OFFICIAL CREDENTIAL</span>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Hover Click-to-preview Glass Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <div className="px-3.5 py-1.5 rounded-lg bg-black/80 border border-white/20 text-white text-xs font-mono font-semibold flex items-center gap-1.5 shadow-xl">
                        <span>Lihat Sertifikat</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#C3E41D]" />
                      </div>
                    </div>
                  </div>

                  {/* Certificate Short Description */}
                  {cert.description && (
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3 font-sans leading-relaxed">
                      {cert.description}
                    </p>
                  )}

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[10px] font-mono border border-neutral-200 dark:border-neutral-700/60"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 text-[10px] font-mono">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Bottom Action Row */}
                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between">
                  {/* Credential ID button with copy */}
                  <button
                    type="button"
                    onClick={(e) => handleCopyId(cert.credentialId, e)}
                    className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    title="Klik untuk salin Credential ID"
                  >
                    <span>ID: {cert.credentialId}</span>
                    {copiedId === cert.credentialId ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 animate-bounce" />
                    ) : (
                      <Copy className="w-3 h-3 text-neutral-400 group-hover:text-neutral-200" />
                    )}
                  </button>

                  <div className="flex items-center gap-1 text-xs font-mono font-semibold text-[#C3E41D] group-hover:translate-x-1 transition-transform">
                    <span>Detail</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Trust & Verification Banner */}
        <div className="mt-16 rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-neutral-100 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#C3E41D]/10 border border-[#C3E41D]/30 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
              <ShieldCheck className="w-6 h-6 text-[#C3E41D]" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white font-mono">
                Authentic & Industry-Verified Credentials
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Seluruh lisensi dan sertifikat dapat divalidasi langsung melalui lembaga penerbit resmi terkait.
              </p>
            </div>
          </div>

          <a
            href="https://www.linkedin.com/in/rizki-ramadhan-a2888031b/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-black text-xs sm:text-sm font-mono font-semibold transition-all duration-300 shadow-md flex-shrink-0"
          >
            <span>Verifikasi di LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE FULLSCREEN LIGHTBOX MODAL                                    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              className="relative w-full max-w-4xl lg:max-w-5xl max-h-[92vh] overflow-y-auto md:overflow-visible rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700/80 shadow-2xl p-5 sm:p-7 md:p-8 z-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300 transition-colors shadow-sm"
                aria-label="Tutup modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left Column: Full Certificate Visual */}
                <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
                  <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 p-2 sm:p-3 shadow-inner flex items-center justify-center">
                    {selectedCert.image ? (
                      <img
                        src={selectedCert.image}
                        alt={selectedCert.title}
                        className="w-full h-auto max-h-[320px] md:max-h-[380px] object-contain rounded-xl shadow-sm"
                      />
                    ) : (
                      <div className="relative z-10 flex flex-col items-center text-center py-6 px-4">
                        <div className="w-12 h-12 rounded-xl bg-[#C3E41D]/15 border border-[#C3E41D]/40 flex items-center justify-center mb-3 shadow-lg">
                          <Award className="w-6 h-6 text-[#C3E41D]" />
                        </div>
                        <div className="text-[10px] font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase font-bold mb-1">
                          OFFICIAL CERTIFICATE
                        </div>
                        <div
                          className="text-lg font-black tracking-tight text-neutral-900 dark:text-white uppercase mb-1"
                          style={{ fontFamily: "'Fira Code', monospace" }}
                        >
                          RIZKI RAMADHAN
                        </div>
                        <div className="text-xs font-semibold text-[#C3E41D] max-w-xs mx-auto mb-3">
                          {selectedCert.title}
                        </div>
                        <div className="w-full pt-2 border-t border-neutral-300 dark:border-neutral-800 text-[10px] font-mono text-neutral-500 flex justify-between">
                          <span>{selectedCert.issuer}</span>
                          <span>ID: {selectedCert.credentialId}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Information, Description, Skills & Verification Actions */}
                <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    {/* Top Status & Date Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {selectedCert.category && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#C3E41D]/20 text-[#C3E41D] border border-[#C3E41D]/40">
                          {selectedCert.category}
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                        {selectedCert.date}
                      </span>
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Active
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-1.5 leading-snug">
                      {selectedCert.title}
                    </h3>

                    {/* Issuer */}
                    <p className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400 mb-3">
                      Diterbitkan oleh:{" "}
                      <span className="text-neutral-900 dark:text-white font-semibold">
                        {selectedCert.issuer}
                      </span>
                    </p>

                    {/* Description */}
                    {selectedCert.description && (
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans mb-4">
                        {selectedCert.description}
                      </p>
                    )}

                    {/* Skills Grid */}
                    <div className="mb-4">
                      <h4 className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5 font-bold">
                        Kompetensi & Keahlian Teruji:
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[11px] font-mono border border-neutral-200 dark:border-neutral-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 gap-3 w-full">
                    <button
                      type="button"
                      onClick={(e) => handleCopyId(selectedCert.credentialId, e)}
                      className="w-full h-11 flex items-center justify-center gap-1.5 px-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white text-xs font-mono transition-all overflow-hidden min-w-0"
                      title={`Klik untuk salin ID: ${selectedCert.credentialId}`}
                    >
                      {copiedId === selectedCert.credentialId ? (
                        <span className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                          <Check className="w-4 h-4 text-emerald-500 animate-bounce flex-shrink-0" />
                          <span className="truncate">ID Berhasil Disalin!</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 truncate max-w-full">
                          <Copy className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                          <span className="truncate">Salin ID: {selectedCert.credentialId}</span>
                        </span>
                      )}
                    </button>

                    {selectedCert.credentialUrl && (
                      <a
                        href={selectedCert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-11 flex items-center justify-center gap-1.5 px-2.5 sm:px-3 rounded-xl bg-[#C3E41D] hover:bg-[#b0cf19] text-black font-mono font-bold text-[11px] sm:text-xs shadow-md transition-all text-center overflow-hidden min-w-0"
                      >
                        <span className="leading-tight">Verifikasi Kredensial Resmi</span>
                        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default CertificatesSection;
