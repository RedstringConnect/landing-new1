"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, Variants, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface FloatingTOCProps {
  headings: Heading[];
}

const menuVariants: Variants = {
  hidden: { height: 0, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  visible: { 
    height: "auto", 
    opacity: 1, 
    transition: { duration: 0.4, ease: "easeInOut", staggerChildren: 0.05, delayChildren: 0.1 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const titleVariants: Variants = {
  initial: (dir: number) => ({ y: dir > 0 ? 20 : -20, opacity: 0 }),
  animate: { y: 0, opacity: 1 },
  exit: (dir: number) => ({ y: dir > 0 ? -20 : 20, opacity: 0 })
};

export function FloatingTOC({ headings }: FloatingTOCProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const targetRef = useRef<HTMLElement | null>(null);
  const [, setMounted] = useState(false);

  useEffect(() => {
    targetRef.current = document.getElementById("blog-content");
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const scrollDirection = useRef(1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const previous = scrollYProgress.getPrevious() ?? 0;
    if (latest > previous) {
      scrollDirection.current = 1;
    } else if (latest < previous) {
      scrollDirection.current = -1;
    }
  });
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const radius = 14;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 1.0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isExpanded && !target.closest('.floating-toc-container')) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  const activeHeadingText = headings.find((h) => h.id === activeId)?.text || "Table of Contents";

  if (headings.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <motion.div
        layout
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="floating-toc-container bg-background/80 backdrop-blur-xl border border-border shadow-xl rounded-2xl pointer-events-auto overflow-hidden flex flex-col w-full max-w-[320px]"
      >
        {/* Main Dock Bar - Always Visible */}
        <div 
          className={`flex items-center justify-between p-3 gap-4 cursor-pointer transition-colors ${isExpanded ? 'border-b border-border bg-muted/50' : ''}`}
          onClick={() => !isExpanded && setIsExpanded(true)}
        >
          {/* Circular Progress Indicator */}
          <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
            <svg className="w-8 h-8 transform -rotate-90 absolute inset-0" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r={radius}
                className="stroke-muted fill-none"
                strokeWidth="3"
              />
              <motion.circle
                cx="18"
                cy="18"
                r={radius}
                className="stroke-primary fill-none"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ pathLength: scrollYProgress }}
              />
            </svg>
          </div>

          {/* Active Heading Title */}
          <motion.div layoutId="toc-heading-container" className="flex-1 overflow-hidden h-6 relative">
            <AnimatePresence mode="popLayout" custom={scrollDirection.current}>
              <motion.div
                key={isExpanded ? "expanded-title" : activeHeadingText}
                custom={scrollDirection.current}
                variants={titleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 text-sm font-medium truncate flex items-center"
              >
                {isExpanded ? "Table of Contents" : activeHeadingText}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Toggle Button */}
          <button 
            className="p-1 hover:bg-muted rounded-md transition-colors shrink-0 relative w-6 h-6 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            aria-label="Toggle Table of Contents"
          >
            <AnimatePresence mode="popLayout">
              {isExpanded ? (
                <motion.div 
                  key="close" 
                  layoutId="toc-toggle-icon"
                  initial={{ opacity: 0, scale: 0.8, rotate: -90 }} 
                  animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                  exit={{ opacity: 0, scale: 0.8, rotate: 90 }} 
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <X size={18} />
                </motion.div>
              ) : (
                <motion.div 
                  key="menu" 
                  layoutId="toc-toggle-icon"
                  initial={{ opacity: 0, scale: 0.8, rotate: 90 }} 
                  animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                  exit={{ opacity: 0, scale: 0.8, rotate: -90 }} 
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Menu size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="overflow-hidden bg-background"
            >
              <div className="max-h-[50vh] overflow-y-auto p-4 flex flex-col">
                <ul className="space-y-3 text-sm">
                  {headings.map((heading, i) => (
                    <motion.li key={i} variants={itemVariants} className={heading.level === 3 ? "ml-4" : ""}>
                      <a
                        href={`#${heading.id}`}
                        onClick={() => setIsExpanded(false)}
                        className={`block transition-colors ${
                          activeId === heading.id 
                            ? "text-primary font-medium" 
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {heading.text}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
