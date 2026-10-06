import React, { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { getAssetUrl } from "@/lib/utils";
import ToggleMuteUnmute from "@/components/ui/c-toggle-14";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";

// Inline Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// BlurText animation component
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

export default function Component() {
  const [activeSection, setActiveSection] = useState("HOME");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. Extreme Top Boundary (Hero / Home)
      if (scrollY < 120) {
        setActiveSection("HOME");
        return;
      }

      // 2. Extreme Bottom Boundary (Social Media / Contact)
      if (scrollY + viewportHeight >= documentHeight - 120) {
        setActiveSection("SOCIAL MEDIA");
        return;
      }

      // 3. Section Definitions (in exact vertical DOM order)
      const sectionDefinitions = [
        { name: "HOME", id: "hero" },
        { name: "ABOUT", id: "about" },
        { name: "EDUCATION", id: "education" },
        { name: "EXPERIENCE", id: "experience" },
        { name: "PROJECTS", id: "projects" },
        { name: "CERTIFICATES", id: "certificates" },
        { name: "SOCIAL MEDIA", id: "socials" },
      ];

      // Measure using user's focus point at 35% of viewport height
      const focusPoint = viewportHeight * 0.35;

      // Check each section from bottom to top
      for (let i = sectionDefinitions.length - 1; i >= 0; i--) {
        const { name, id } = sectionDefinitions[i];
        const rawEl = document.getElementById(id);
        if (!rawEl) continue;

        // CRITICAL FIX: For GSAP pinned elements (like #projects), measure the .pin-spacer parent
        // which reflects the true page scroll height and position, avoiding child offsetTop=0 bug!
        const targetEl = (rawEl.closest(".pin-spacer") as HTMLElement) || rawEl;
        const rect = targetEl.getBoundingClientRect();

        // Check if focus point is vertically inside this section
        if (rect.top <= focusPoint && rect.bottom > focusPoint) {
          setActiveSection(name);
          return;
        }
      }

      // Fallback: choose the section with the largest visible portion
      let maxVisible = 0;
      let dominantSection = "HOME";

      for (const { name, id } of sectionDefinitions) {
        const rawEl = document.getElementById(id);
        if (!rawEl) continue;

        const targetEl = (rawEl.closest(".pin-spacer") as HTMLElement) || rawEl;
        const rect = targetEl.getBoundingClientRect();
        const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));

        if (visibleHeight > maxVisible) {
          maxVisible = visibleHeight;
          dominantSection = name;
        }
      }

      if (maxVisible > 0) {
        setActiveSection(dominantSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial check after slight delay to allow GSAP pins to register
    const timer = setTimeout(handleScroll, 300);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch (e) {}
    } else {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch (e) {}
    }
  };

  return (
    <div 
      id="hero"
      className="min-h-screen text-foreground transition-colors overflow-x-hidden"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      {/* Header Controls (Right side: Music & Theme Toggle) */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-6 pointer-events-none">
        <nav className="relative flex items-center justify-end max-w-screen-2xl mx-auto">
          {/* Controls: Music Mute/Unmute Toggle & Theme Toggle */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
            <ToggleMuteUnmute size="sm" />

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="relative w-16 h-8 rounded-full hover:opacity-80 transition-opacity"
              style={{ backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 90%)" }}
              aria-label="Toggle theme"
            >
              <div
                className="absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                  transform: isDark ? "translateX(2rem)" : "translateX(0)",
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Floating Animated Navigation Menu */}
      <AnimatedNavFramer activeSection={activeSection} />

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col overflow-x-hidden">
        {/* Centered Main Name - Always Perfectly Centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="relative text-center">
            <div>
              <BlurText
                text="RIZKI"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[55px] min-[420px]:text-[75px] sm:text-[110px] md:text-[150px] lg:text-[190px] xl:text-[210px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
              />
            </div>
            <div>
              <BlurText
                text="RAMADHAN"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[55px] min-[420px]:text-[75px] sm:text-[110px] md:text-[150px] lg:text-[190px] xl:text-[210px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
              />
            </div>

            {/* Cutout Portrait (No Background) in front of text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
              <div className="relative group transition-transform duration-500 ease-out hover:scale-105 cursor-pointer">
                {/* Subtle Neon Aura Glow Behind Figure */}
                <div
                  className="pointer-events-none absolute inset-x-4 top-1/4 bottom-16 rounded-full blur-3xl opacity-20 -z-10 transition-opacity duration-300 group-hover:opacity-35"
                  style={{ backgroundColor: "#C3E41D" }}
                />

                <img
                  src={getAssetUrl("/profile-cutout.png")}
                  alt="Rizki Ramadhan"
                  className="h-[200px] sm:h-[285px] md:h-[370px] lg:h-[440px] xl:h-[480px] w-auto max-w-none object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tagline - Proper Distance Below Hero */}
        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-32 xl:bottom-36 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center">
            <BlurText
              text="Engineering modern web solutions and secure information systems."
              delay={150}
              animateBy="words"
              direction="top"
              className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center transition-colors duration-300 text-neutral-500 hover:text-black dark:hover:text-white"
              style={{ fontFamily: "'Antic', sans-serif" }}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-all duration-300 cursor-pointer animate-bounce hover:scale-125"
          aria-label="Scroll down to About"
        >
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8 text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-300" />
        </button>
      </main>
    </div>
  );
}
