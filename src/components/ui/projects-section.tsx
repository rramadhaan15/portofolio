"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn, getAssetUrl } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* Physical Skeuomorphic Materials */
  .text-3d-matte {
      color: var(--color-foreground);
      text-shadow: 
          0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent), 
          0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent)) 
          drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }

  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  /* Card 1: Navy Tech Aesthetics (Internesia) */
  .premium-depth-card-1 {
      background: linear-gradient(145deg, #0e1e4a 0%, #070d18 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.15),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.05);
      position: relative;
  }

  /* Card 2: Deep Dark Court Green & Neon Lime (Padel Prime) */
  .premium-depth-card-2 {
      background: linear-gradient(145deg, #122115 0%, #070e09 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(195, 228, 29, 0.18),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(195, 228, 29, 0.1);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* Realistic Laptop Mockup Hardware */
  .laptop-chassis {
      background: linear-gradient(180deg, #18181b 0%, #09090b 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0,0,0,0.95),
          0 20px 40px -15px rgba(0,0,0,0.8),
          inset 0 1px 2px rgba(255,255,255,0.18),
          inset 0 -1px 2px rgba(0,0,0,0.8);
      border: 1px solid rgba(255,255,255,0.08);
      transform-style: preserve-3d;
  }

  .laptop-base-lip {
      background: linear-gradient(180deg, #27272a 0%, #18181b 40%, #09090b 100%);
      box-shadow: 
          0 30px 60px -10px rgba(0,0,0,0.9),
          inset 0 1px 1px rgba(255,255,255,0.25),
          inset 0 -2px 4px rgba(0,0,0,0.9);
      border: 1px solid rgba(255,255,255,0.06);
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }
`;

export interface ProjectsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  tagline1?: string;
  tagline2?: string;
}

export function ProjectsSection({
  tagline1 = "Explore the craft,",
  tagline2 = "engineered to scale.",
  className,
  id = "projects",
  ...props
}: ProjectsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef1 = useRef<HTMLDivElement>(null);
  const mainCardRef2 = useRef<HTMLDivElement>(null);
  const mockupRef1 = useRef<HTMLDivElement>(null);
  const mockupRef2 = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // 1. Interactive 3D Mouse Tilt Logic for both laptop bodies
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
        const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

        if (mainCardRef1.current) {
          const rect1 = mainCardRef1.current.getBoundingClientRect();
          mainCardRef1.current.style.setProperty("--mouse-x", `${e.clientX - rect1.left}px`);
          mainCardRef1.current.style.setProperty("--mouse-y", `${e.clientY - rect1.top}px`);
        }

        if (mainCardRef2.current) {
          const rect2 = mainCardRef2.current.getBoundingClientRect();
          mainCardRef2.current.style.setProperty("--mouse-x", `${e.clientX - rect2.left}px`);
          mainCardRef2.current.style.setProperty("--mouse-y", `${e.clientY - rect2.top}px`);
        }

        if (mockupRef1.current) {
          gsap.to(mockupRef1.current, {
            rotationY: xVal * 10,
            rotationX: -yVal * 10,
            ease: "power3.out",
            duration: 1.2,
          });
        }

        if (mockupRef2.current) {
          gsap.to(mockupRef2.current, {
            rotationY: xVal * 10,
            rotationX: -yVal * 10,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Sequential 2-Laptop GSAP ScrollTrigger Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial States
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      
      // Card 1 (Internesia)
      gsap.set(".main-card-1", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text-1", ".card-right-text-1", ".mockup-scroll-wrapper-1", ".floating-badge-1"], { autoAlpha: 0 });
      
      // Card 2 (Padel Prime)
      gsap.set(".main-card-2", { y: window.innerHeight + 200, autoAlpha: 0 });
      gsap.set([".card-left-text-2", ".card-right-text-2", ".mockup-scroll-wrapper-2", ".floating-badge-2"], { autoAlpha: 0 });

      // Stepper
      gsap.set(".project-stepper", { autoAlpha: 0, y: -20 });

      // Intro title reveal
      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      // Continuous scrub timeline for 2 sequential projects
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=7600",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        // PHASE 1: Intro texts fade & Card 1 (Internesia) enters
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 1.5 }, 0)
        .to(".main-card-1", { y: 0, ease: "power3.inOut", duration: 1.8 }, 0)
        .to(".project-stepper", { autoAlpha: 1, y: 0, ease: "power2.out", duration: 1 }, 0.4)
        .fromTo(
          ".mockup-scroll-wrapper-1",
          { y: 260, z: -400, rotationX: 35, rotationY: -20, autoAlpha: 0, scale: 0.65 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2 },
          "-=0.6"
        )
        .fromTo(
          ".floating-badge-1",
          { y: 80, autoAlpha: 0, scale: 0.75 },
          { y: 0, autoAlpha: 1, scale: 1, ease: "back.out(1.5)", duration: 1.2, stagger: 0.15 },
          "-=1.4"
        )
        .fromTo(".card-left-text-1", { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.2 }, "-=1.2")
        .fromTo(".card-right-text-1", { x: 40, autoAlpha: 0, scale: 0.85 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.2 }, "<")
        
        // HOLD on Project 1
        .to({}, { duration: 2.8 })

        // PHASE 2: Transition from Project 1 to Project 2
        .to([".mockup-scroll-wrapper-1", ".floating-badge-1", ".card-left-text-1", ".card-right-text-1"], {
          scale: 0.9,
          y: -50,
          z: -150,
          autoAlpha: 0,
          ease: "power2.in",
          duration: 1.2,
          stagger: 0.04,
        })
        .to(".main-card-1", {
          y: -window.innerHeight - 100,
          opacity: 0,
          ease: "power2.inOut",
          duration: 1.4,
        }, "-=0.6")

        // Switch Stepper dots & label
        .to(".stepper-dot-1", { backgroundColor: "rgba(255,255,255,0.2)", scale: 0.9, boxShadow: "none", duration: 0.4 }, "-=0.6")
        .to(".stepper-dot-2", { backgroundColor: "#C3E41D", scale: 1.2, boxShadow: "0 0 10px #C3E41D", duration: 0.4 }, "-=0.6")
        .set(".stepper-text-1", { display: "none" }, "-=0.4")
        .set(".stepper-text-2", { display: "inline-block" }, "-=0.4")

        // PHASE 3: Enter Card 2 (Padel Prime)
        .set(".main-card-2", { autoAlpha: 1, y: window.innerHeight + 100 })
        .to(".main-card-2", { y: 0, ease: "power3.out", duration: 1.8 })
        .fromTo(
          ".mockup-scroll-wrapper-2",
          { y: 260, z: -400, rotationX: 35, rotationY: -20, autoAlpha: 0, scale: 0.65 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2 },
          "-=1.0"
        )
        .fromTo(
          ".floating-badge-2",
          { y: 80, autoAlpha: 0, scale: 0.75 },
          { y: 0, autoAlpha: 1, scale: 1, ease: "back.out(1.5)", duration: 1.2, stagger: 0.15 },
          "-=1.4"
        )
        .fromTo(".card-left-text-2", { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.2 }, "-=1.2")
        .fromTo(".card-right-text-2", { x: 40, autoAlpha: 0, scale: 0.85 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.2 }, "<")

        // HOLD on Project 2
        .to({}, { duration: 2.8 })

        // PHASE 4: Exit Card 2 upwards to Social Media
        .to([".mockup-scroll-wrapper-2", ".floating-badge-2", ".card-left-text-2", ".card-right-text-2", ".project-stepper"], {
          scale: 0.92,
          y: -40,
          z: -150,
          autoAlpha: 0,
          ease: "power2.in",
          duration: 1.2,
          stagger: 0.04,
        })
        .to(".main-card-2", {
          y: -window.innerHeight - 200,
          opacity: 0.8,
          ease: "power3.in",
          duration: 1.5,
        }, "-=0.4");
    }, containerRef);

    // Refresh scroll triggers after mount to guarantee offset alignment
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id={id}
      className={cn(
        "relative w-screen h-screen overflow-hidden flex items-center justify-center bg-background text-foreground font-sans antialiased",
        className
      )}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* BACKGROUND LAYER: Hero Texts */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md mb-4 text-xs font-mono tracking-widest uppercase gsap-reveal text-track">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#C3E41D" }} />
          <span style={{ color: "#C3E41D" }}>04 // PROJECTS</span>
        </div>
        <h1 className="text-track gsap-reveal text-3d-matte text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight mb-2">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter">
          {tagline2}
        </h1>
      </div>

      {/* TOP FLOATING PROJECT STEPPER PILL */}
      <div className="project-stepper absolute top-6 sm:top-8 z-30 flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl font-mono text-xs text-neutral-300 pointer-events-none">
        <span className="text-[#C3E41D] font-bold text-[10px] tracking-widest uppercase">PROJECT SHOWCASE</span>
        <span className="text-white/20">|</span>
        <div className="flex items-center gap-1.5">
          <div className="stepper-dot-1 w-2 h-2 rounded-full bg-[#C3E41D] shadow-[0_0_8px_#C3E41D] transition-all" />
          <div className="stepper-dot-2 w-2 h-2 rounded-full bg-white/20 transition-all" />
        </div>
        <span className="stepper-text-1 text-[11px] font-semibold text-white tracking-wide">
          01 // INTERNESIA
        </span>
        <span className="stepper-text-2 text-[11px] font-semibold text-white tracking-wide hidden">
          02 // PADEL PRIME
        </span>
      </div>

      {/* ========================================================================= */}
      {/* 1. FIRST LAPTOP STAGE: INTERNESIA                                          */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef1}
          className="main-card-1 premium-depth-card-1 relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-8 flex flex-col justify-evenly lg:grid lg:grid-cols-12 items-center lg:gap-6 z-10 py-6 lg:py-0">
            {/* 1. TOP (Mobile) / RIGHT (Desktop): BRAND NAME */}
            <div className="card-right-text-1 gsap-reveal order-1 lg:order-3 lg:col-span-2 flex justify-center lg:justify-end z-20 w-full">
              <div className="flex flex-col items-center lg:items-end">
                <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase mb-1">
                  Featured App
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black uppercase tracking-tighter text-card-silver-matte lg:text-right leading-none">
                  INTERNESIA
                </h2>
              </div>
            </div>

            {/* 2. MIDDLE (Mobile) / CENTER (Desktop): LAPTOP MOCKUP */}
            <div
              className="mockup-scroll-wrapper-1 order-2 lg:order-2 lg:col-span-6 relative w-full h-[320px] sm:h-[400px] lg:h-[500px] flex items-center justify-center z-10"
              style={{ perspective: "1200px" }}
            >
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.62] sm:scale-[0.8] md:scale-[0.92] lg:scale-[1.0]">
                <div
                  ref={mockupRef1}
                  className="relative flex flex-col items-center will-change-transform transform-style-3d select-none"
                >
                  {/* LAPTOP SCREEN (LID) */}
                  <div className="relative w-[340px] sm:w-[480px] md:w-[580px] lg:w-[660px] h-[215px] sm:h-[295px] md:h-[355px] lg:h-[405px] rounded-t-2xl sm:rounded-t-3xl laptop-chassis p-2 sm:p-2.5 flex flex-col">
                    {/* Top Webcam Notch */}
                    <div className="absolute top-[4px] sm:top-[6px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-1.5 z-50">
                      <div className="w-1.5 h-1.5 rounded-full bg-black/80 border border-white/20 flex items-center justify-center">
                        <div className="w-0.5 h-0.5 rounded-full bg-neutral-600" />
                      </div>
                      <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)] animate-pulse" />
                    </div>

                    {/* Inner Screen Container */}
                    <div className="relative w-full h-full bg-[#050914] rounded-t-xl sm:rounded-t-2xl overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)] text-white flex flex-col border border-white/5">
                      <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                      {/* Mac Window Header Bar */}
                      <div className="relative z-30 flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 bg-neutral-950/90 border-b border-white/[0.08] backdrop-blur-md flex-shrink-0">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 border border-[#dc2626]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80 border border-[#d97706]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80 border border-[#059669]" />
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-mono text-neutral-300 font-semibold tracking-wider flex items-center gap-1.5 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
                          <span className="text-neutral-400">https://</span>
                          <span className="text-white">internesia.vercel.app</span>
                        </div>
                        <a
                          href="https://github.com/rramadhaan15/Internesia"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View Internesia on GitHub"
                          className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/10 hover:bg-[#C3E41D] hover:text-black text-neutral-200 text-[10px] font-mono border border-white/10 transition-colors pointer-events-auto"
                        >
                          <span>GitHub</span>
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>

                      {/* Project Screenshot */}
                      <div className="relative w-full flex-1 overflow-hidden bg-neutral-950 flex flex-col justify-between group">
                        <img
                          src={getAssetUrl("/project-internesia.png")}
                          alt="Internesia - Platform Magang & Pelacak Lamaran"
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="eager"
                        />

                        {/* Floating Status Pill over screen */}
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none z-30">
                          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-mono text-neutral-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                            <span>Role-Based: SEEKER & EMPLOYER</span>
                          </div>
                          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-mono text-cyan-400">
                            <span>@dnd-kit Kanban Board</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LAPTOP CHASSIS BASE */}
                  <div className="relative w-[380px] sm:w-[540px] md:w-[650px] lg:w-[740px] h-[12px] sm:h-[15px] md:h-[17px] laptop-base-lip rounded-b-xl sm:rounded-b-2xl flex items-start justify-center shadow-2xl z-20">
                    <div className="w-16 sm:w-20 md:w-24 h-1.5 sm:h-2 bg-neutral-900 rounded-b-md shadow-inner border-b border-white/10" />
                  </div>
                </div>

                {/* Floating Glass Badges */}
                <div className="floating-badge-1 absolute flex top-2 lg:top-8 left-[-10px] sm:left-[-25px] lg:left-[-45px] floating-ui-badge rounded-xl lg:rounded-2xl p-2.5 sm:p-3 lg:p-4 items-center gap-2.5 sm:gap-3 lg:gap-4 z-30 pointer-events-none">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-[#C3E41D]/20 to-[#C3E41D]/5 flex items-center justify-center border border-[#C3E41D]/30 shadow-inner">
                    <span className="text-sm sm:text-base lg:text-xl drop-shadow-lg" aria-hidden="true">
                      ⚡
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Next.js 16 App Router</p>
                    <p className="text-[#C3E41D]/90 text-[9px] sm:text-[10px] lg:text-xs font-mono font-medium">Server Actions & React 18</p>
                  </div>
                </div>

                <div className="floating-badge-1 absolute flex bottom-6 lg:bottom-12 right-[-10px] sm:right-[-25px] lg:right-[-45px] floating-ui-badge rounded-xl lg:rounded-2xl p-2.5 sm:p-3 lg:p-4 items-center gap-2.5 sm:gap-3 lg:gap-4 z-30 pointer-events-none">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-cyan-500/20 to-blue-900/10 flex items-center justify-center border border-cyan-400/30 shadow-inner">
                    <span className="text-sm sm:text-base lg:text-lg drop-shadow-lg" aria-hidden="true">
                      🛡️
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">HMAC SHA-256 Auth</p>
                    <p className="text-cyan-200/80 text-[9px] sm:text-[10px] lg:text-xs font-mono font-medium">Prisma ORM & SQLite</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. BOTTOM (Mobile) / LEFT (Desktop): ACCOUNTABILITY & DETAILS */}
            <div className="card-left-text-1 gsap-reveal order-3 lg:order-1 lg:col-span-4 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mb-2 sm:mb-3 w-fit mx-auto lg:mx-0 text-[10px] sm:text-xs font-mono tracking-wider text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>FEATURED PROJECT // 01</span>
              </div>

              <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 tracking-tight" style={{ fontFamily: "'Fira Code', monospace" }}>
                Internesia
              </h3>

              <p className="text-cyan-400 text-xs sm:text-sm font-mono font-medium mb-3">
                Internship Ecosystem & Live Application Tracker
              </p>

              <div className="text-blue-100/80 text-xs sm:text-sm font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none font-sans mb-4">
                <span className="text-white font-semibold">Internesia</span> adalah ekosistem pencarian dan pengelolaan magang terpadu. Memfasilitasi mahasiswa mencari peluang magang serta melacak progres lamaran secara real-time via Kanban board interaktif, sekaligus portal bagi perusahaan untuk mempublikasikan lowongan kerja.
              </div>

              {/* Tech Stack Pills Grid */}
              <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start mb-5">
                {[
                  "Next.js 16 (App Router)",
                  "TypeScript",
                  "Tailwind CSS",
                  "@dnd-kit Kanban",
                  "Prisma ORM & SQLite",
                  "HMAC SHA-256 Auth",
                  "Recharts Analytics",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300 text-[10px] sm:text-[11px] font-mono hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Direct GitHub Action Button */}
              <div className="flex justify-center lg:justify-start">
                <a
                  href="https://github.com/rramadhaan15/Internesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Explore Internesia on GitHub"
                  className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white/10 hover:bg-[#00E5FF] text-white hover:text-black border border-white/20 hover:border-[#00E5FF] shadow-lg transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm font-semibold font-mono">Explore Repository</span>
                  <svg className="w-3.5 h-3.5 text-[#00E5FF] group-hover:text-black transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SECOND LAPTOP STAGE: PADEL PRIME                                        */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef2}
          className="main-card-2 premium-depth-card-2 relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-8 flex flex-col justify-evenly lg:grid lg:grid-cols-12 items-center lg:gap-6 z-10 py-6 lg:py-0">
            {/* 1. TOP (Mobile) / RIGHT (Desktop): BRAND NAME */}
            <div className="card-right-text-2 gsap-reveal order-1 lg:order-3 lg:col-span-2 flex justify-center lg:justify-end z-20 w-full">
              <div className="flex flex-col items-center lg:items-end">
                <span className="text-[10px] font-mono tracking-widest text-[#C3E41D] uppercase mb-1">
                  Sport Tech App
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black uppercase tracking-tighter text-card-silver-matte lg:text-right leading-none">
                  PADEL PRIME
                </h2>
              </div>
            </div>

            {/* 2. MIDDLE (Mobile) / CENTER (Desktop): LAPTOP MOCKUP */}
            <div
              className="mockup-scroll-wrapper-2 order-2 lg:order-2 lg:col-span-6 relative w-full h-[320px] sm:h-[400px] lg:h-[500px] flex items-center justify-center z-10"
              style={{ perspective: "1200px" }}
            >
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.62] sm:scale-[0.8] md:scale-[0.92] lg:scale-[1.0]">
                <div
                  ref={mockupRef2}
                  className="relative flex flex-col items-center will-change-transform transform-style-3d select-none"
                >
                  {/* LAPTOP SCREEN (LID) */}
                  <div className="relative w-[340px] sm:w-[480px] md:w-[580px] lg:w-[660px] h-[215px] sm:h-[295px] md:h-[355px] lg:h-[405px] rounded-t-2xl sm:rounded-t-3xl laptop-chassis p-2 sm:p-2.5 flex flex-col">
                    {/* Top Webcam Notch */}
                    <div className="absolute top-[4px] sm:top-[6px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-1.5 z-50">
                      <div className="w-1.5 h-1.5 rounded-full bg-black/80 border border-white/20 flex items-center justify-center">
                        <div className="w-0.5 h-0.5 rounded-full bg-neutral-600" />
                      </div>
                      <div className="w-1 h-1 rounded-full bg-[#C3E41D] shadow-[0_0_6px_rgba(195,228,29,0.9)] animate-pulse" />
                    </div>

                    {/* Inner Screen Container */}
                    <div className="relative w-full h-full bg-[#050914] rounded-t-xl sm:rounded-t-2xl overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)] text-white flex flex-col border border-white/5">
                      <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                      {/* Mac Window Header Bar */}
                      <div className="relative z-30 flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 bg-neutral-950/90 border-b border-white/[0.08] backdrop-blur-md flex-shrink-0">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 border border-[#dc2626]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80 border border-[#d97706]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80 border border-[#059669]" />
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-mono text-neutral-300 font-semibold tracking-wider flex items-center gap-1.5 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C3E41D] animate-ping" />
                          <span className="text-neutral-400">https://</span>
                          <span className="text-white">padelprime.com</span>
                        </div>
                        <a
                          href="https://github.com/rramadhaan15/padel-prime"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View Padel Prime on GitHub"
                          className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/10 hover:bg-[#C3E41D] hover:text-black text-neutral-200 text-[10px] font-mono border border-white/10 transition-colors pointer-events-auto"
                        >
                          <span>GitHub</span>
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>

                      {/* Project Screenshot */}
                      <div className="relative w-full flex-1 overflow-hidden bg-neutral-950 flex flex-col justify-between group">
                        <img
                          src={getAssetUrl("/project-padel-prime.png")}
                          alt="Padel Prime - Reservasi Lapangan Padel Online Cepat"
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="eager"
                        />

                        {/* Floating Status Pill over screen */}
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none z-30">
                          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-mono text-neutral-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C3E41D]" />
                            <span>Anti Double-Booking: Redis Lock (10m)</span>
                          </div>
                          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-mono text-[#C3E41D]">
                            <span>QRIS Dynamic & VA Gateway</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LAPTOP CHASSIS BASE */}
                  <div className="relative w-[380px] sm:w-[540px] md:w-[650px] lg:w-[740px] h-[12px] sm:h-[15px] md:h-[17px] laptop-base-lip rounded-b-xl sm:rounded-b-2xl flex items-start justify-center shadow-2xl z-20">
                    <div className="w-16 sm:w-20 md:w-24 h-1.5 sm:h-2 bg-neutral-900 rounded-b-md shadow-inner border-b border-white/10" />
                  </div>
                </div>

                {/* Floating Glass Badges */}
                <div className="floating-badge-2 absolute flex top-2 lg:top-8 left-[-10px] sm:left-[-25px] lg:left-[-45px] floating-ui-badge rounded-xl lg:rounded-2xl p-2.5 sm:p-3 lg:p-4 items-center gap-2.5 sm:gap-3 lg:gap-4 z-30 pointer-events-none">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-[#C3E41D]/20 to-[#C3E41D]/5 flex items-center justify-center border border-[#C3E41D]/30 shadow-inner">
                    <span className="text-sm sm:text-base lg:text-xl drop-shadow-lg" aria-hidden="true">
                      🎾
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Next.js 15 & React 19</p>
                    <p className="text-[#C3E41D]/90 text-[9px] sm:text-[10px] lg:text-xs font-mono font-medium">PostgreSQL & Drizzle ORM</p>
                  </div>
                </div>

                <div className="floating-badge-2 absolute flex bottom-6 lg:bottom-12 right-[-10px] sm:right-[-25px] lg:right-[-45px] floating-ui-badge rounded-xl lg:rounded-2xl p-2.5 sm:p-3 lg:p-4 items-center gap-2.5 sm:gap-3 lg:gap-4 z-30 pointer-events-none">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-emerald-500/20 to-teal-900/10 flex items-center justify-center border border-emerald-400/30 shadow-inner">
                    <span className="text-sm sm:text-base lg:text-lg drop-shadow-lg" aria-hidden="true">
                      🔒
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Redis & BullMQ Lock</p>
                    <p className="text-emerald-200/80 text-[9px] sm:text-[10px] lg:text-xs font-mono font-medium">Zero Double-Booking Concurrency</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. BOTTOM (Mobile) / LEFT (Desktop): ACCOUNTABILITY & DETAILS */}
            <div className="card-left-text-2 gsap-reveal order-3 lg:order-1 lg:col-span-4 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C3E41D]/30 bg-[#C3E41D]/10 backdrop-blur-md mb-2 sm:mb-3 w-fit mx-auto lg:mx-0 text-[10px] sm:text-xs font-mono tracking-wider text-[#C3E41D]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C3E41D] animate-pulse" />
                <span>FEATURED PROJECT // 02</span>
              </div>

              <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 tracking-tight" style={{ fontFamily: "'Fira Code', monospace" }}>
                Padel Prime
              </h3>

              <p className="text-[#C3E41D] text-xs sm:text-sm font-mono font-medium mb-3">
                Instant Court Reservation & Concurrency Management
              </p>

              <div className="text-emerald-100/80 text-xs sm:text-sm font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none font-sans mb-4">
                Sistem pemesanan lapangan padel online cepat dan praktis dari mana saja. Menggunakan <span className="text-white font-semibold">distributed pessimistic lock (Redis)</span> untuk mencegah double-booking, background worker queue (<span className="text-white font-semibold">BullMQ</span>), verifikasi webhook payment gateway QRIS & VA, serta tiket digital QR code check-in venue.
              </div>

              {/* Tech Stack Pills Grid */}
              <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start mb-5">
                {[
                  "Next.js 15 & React 19",
                  "TypeScript 5.7",
                  "Tailwind CSS & Radix UI",
                  "PostgreSQL & Drizzle ORM",
                  "Redis Pessimistic Lock",
                  "BullMQ Worker Queue",
                  "QRIS & VA Payment Gateway",
                  "Vitest Testing",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300 text-[10px] sm:text-[11px] font-mono hover:border-[#C3E41D]/50 hover:text-[#C3E41D] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Direct GitHub Action Button */}
              <div className="flex justify-center lg:justify-start">
                <a
                  href="https://github.com/rramadhaan15/padel-prime"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Explore Padel Prime on GitHub"
                  className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white/10 hover:bg-[#C3E41D] text-white hover:text-black border border-white/20 hover:border-[#C3E41D] shadow-lg transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#C3E41D]"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm font-semibold font-mono">Explore Repository</span>
                  <svg className="w-3.5 h-3.5 text-[#C3E41D] group-hover:text-black transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsSection;
