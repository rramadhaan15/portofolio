"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  href: string;
}

const defaultNavItems: NavItem[] = [
  { name: "HOME", href: "#hero" },
  { name: "ABOUT", href: "#about" },
  { name: "EDUCATION", href: "#education" },
  { name: "EXPERIENCE", href: "#experience" },
  { name: "PROJECTS", href: "#projects" },
  { name: "CERTIFICATES", href: "#certificates" },
  { name: "SOCIAL MEDIA", href: "#socials" },
];

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      y: { type: "spring", damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: "spring",
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const logoVariants = {
  expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
};

const itemVariants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300,
      delay: 0.15,
    },
  },
};

export interface AnimatedNavFramerProps {
  items?: NavItem[];
  activeSection?: string;
  className?: string;
  onItemClick?: (name: string, href: string) => void;
}

export function AnimatedNavFramer({
  items = defaultNavItems,
  activeSection,
  className,
  onItemClick,
}: AnimatedNavFramerProps) {
  const [isExpanded, setExpanded] = React.useState(true);

  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    } else if (
      !isExpanded &&
      latest < previous &&
      scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
    ) {
      setExpanded(true);
    }

    lastScrollY.current = latest;
  });

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    name: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (onItemClick) {
      onItemClick(name, href);
    }

    if (href === "#" || href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = document.querySelector(href);
      if (target) {
        const scrollTarget =
          (target.closest(".pin-spacer") as HTMLElement) || target;
        scrollTarget.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className={cn("fixed top-6 left-1/2 -translate-x-1/2 z-50", className)}>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.1 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        onClick={handleNavClick}
        className={cn(
          "flex items-center overflow-hidden rounded-full border border-border bg-background/80 shadow-lg backdrop-blur-md h-12 transition-colors",
          !isExpanded && "cursor-pointer justify-center"
        )}
      >
        {/* Expanded Left Logo: Signature Cursive "R" */}
        <motion.div
          variants={logoVariants}
          className="flex-shrink-0 flex items-center justify-center pl-4 pr-2 cursor-pointer select-none"
          onClick={(e) => {
            e.stopPropagation();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          title="Rizki Ramadhan"
        >
          <span
            className="text-2xl font-bold leading-none select-none text-foreground hover:text-[#C3E41D] transition-colors"
            style={{
              fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
            }}
          >
            R
          </span>
        </motion.div>

        {/* Navigation Items */}
        <motion.div
          className={cn(
            "flex items-center gap-1 sm:gap-3 pr-4",
            !isExpanded && "pointer-events-none"
          )}
        >
          {items.map((item) => {
            const isActive = activeSection === item.name;
            return (
              <motion.a
                key={item.name}
                href={item.href}
                variants={itemVariants}
                onClick={(e) => handleLinkClick(e, item.href, item.name)}
                className={cn(
                  "text-xs sm:text-sm font-semibold tracking-wider px-2 py-1 transition-colors select-none whitespace-nowrap",
                  isActive
                    ? "text-[#C3E41D]"
                    : "text-muted-foreground hover:text-[#C3E41D]"
                )}
              >
                {item.name}
              </motion.a>
            );
          })}
        </motion.div>

        {/* Collapsed State Icon: Signature Cursive "R" */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            variants={collapsedIconVariants}
            animate={isExpanded ? "expanded" : "collapsed"}
            className="flex items-center justify-center"
          >
            <span
              className="text-2xl font-bold leading-none select-none text-foreground"
              style={{
                fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
              }}
            >
              R
            </span>
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
}

export default AnimatedNavFramer;
