import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export const Component = () => {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = "mailto:rizkiramadhan2175@gmail.com";
    } else {
      // Langsung buka Gmail compose di browser tab baru dengan email tujuan sudah terisi
      window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&to=rizkiramadhan2175@gmail.com",
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <section
      id="socials"
      className="relative grid place-content-center gap-3 md:gap-4 bg-neutral-50 dark:bg-black w-full min-h-screen py-24 px-6 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 overflow-hidden"
    >
      <div id="contact" className="absolute top-0 pointer-events-none" />
      {/* Background Subtle Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/3 -right-24 w-96 h-96 rounded-full blur-[160px] opacity-15 dark:opacity-10"
        style={{ backgroundColor: "#C3E41D" }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -left-24 w-96 h-96 rounded-full blur-[160px] opacity-15 dark:opacity-10"
        style={{ backgroundColor: "#C3E41D" }}
      />

      {/* Section Header Tag */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md text-xs font-mono tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#C3E41D" }} />
          <span style={{ color: "#C3E41D" }}>02 // SOCIAL MEDIA & CONNECT</span>
        </div>
        <p className="text-xs sm:text-sm font-mono text-neutral-500 mt-2">
          Hover atau klik untuk terhubung dengan saya
        </p>
      </div>

      {/* Flip Links List */}
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 relative z-10">
        <FlipLink href="https://www.instagram.com/ramadhaaaann_?stkn=MWd1OWswM2Z3YTJ4dA%3D%3D&utm_source=qr">
          Instagram
        </FlipLink>
        <FlipLink href="https://github.com/rramadhaan15">
          Github
        </FlipLink>
        <FlipLink href="https://www.linkedin.com/in/rizki-ramadhan-a2888031b/">
          Linkedin
        </FlipLink>
        <FlipLink
          href="https://mail.google.com/mail/?view=cm&fs=1&to=rizkiramadhan2175@gmail.com"
          onClick={handleEmailClick}
        >
          Email
        </FlipLink>
      </div>

      {/* Quick Direct Email & Copy Action */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10 text-xs font-mono text-neutral-500">
        <span>Atau salin alamat email:</span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText("rizkiramadhan2175@gmail.com");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 hover:border-[#C3E41D] hover:text-[#C3E41D] transition-all cursor-pointer shadow-sm"
          title="Klik untuk menyalin email"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" style={{ color: "#C3E41D" }} />
              <span style={{ color: "#C3E41D" }}>Email Berhasil Disalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-neutral-700 dark:text-neutral-300">rizkiramadhan2175@gmail.com</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};

const FlipLink = ({
  children,
  href,
  onClick,
}: {
  children: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className="group relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl tracking-tight transition-colors duration-300"
      style={{
        lineHeight: 0.8,
        fontFamily: "'Fira Code', monospace",
      }}
    >
      {/* Default Layer (Slides up on hover) */}
      <div className="flex text-neutral-900 dark:text-neutral-100">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[115%]"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Flipped Hover Layer (Slides in from bottom with neon accent) */}
      <div className="absolute inset-0 flex" style={{ color: "#C3E41D" }}>
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-[115%] transition-transform duration-300 ease-in-out group-hover:translate-y-0"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </a>
  );
};

export default Component;
