"use client"
import React, { useState, useEffect, Suspense, lazy } from "react";
import { CompanyMarquee } from "./CompanyMarquee";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const Dithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
)

import { DotFlow } from "@/components/ui/dot-flow";

const syncing = [
    [45, 38, 31, 24, 17, 23, 25],
    [38, 31, 24, 17, 10, 16, 18],
    [31, 24, 17, 10, 3, 9, 11],
    [24, 17, 10, 3, 2, 4],
    [17, 10, 3],
    [10, 3],
    [3],
    [],
    [45],
    [45, 38, 44, 46],
    [45, 38, 31, 37, 39],
    [45, 38, 31, 24, 30, 32],
];

const searching = [
    [9, 16, 17, 15, 23],
    [10, 17, 18, 16, 24],
    [11, 18, 19, 17, 25],
    [18, 25, 26, 24, 32],
    [25, 32, 33, 31, 39],
    [32, 39, 40, 38, 46],
    [31, 38, 39, 37, 45],
    [30, 37, 38, 36, 44],
    [23, 30, 31, 29, 37],
    [31, 29, 37, 22, 24, 23, 38, 36],
    [16, 23, 24, 22, 30],
];

const heartbit = [
    [],
    [3],
    [10, 2, 4, 3],
    [17, 9, 1, 11, 5, 10, 4, 3, 2],
    [24, 16, 8, 1, 3, 5, 18, 12, 17, 11, 4, 10, 9, 2],
    [31, 23, 15, 8, 10, 2, 4, 12, 25, 19, 24, 18, 11, 17, 16, 9],
    [38, 30, 22, 15, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16],
    [38, 30, 22, 15, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16],
    [38, 30, 22, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16, 45, 37, 29, 21, 14, 8, 15, 12, 20, 27, 33, 39],
    [38, 30, 22, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16, 45, 37, 29, 21, 14, 8, 15, 12, 20, 27, 33, 39],
    [38, 30, 22, 15, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16],
    [38, 30, 22, 15, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16],
    [38, 30, 22, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16, 45, 37, 29, 21, 14, 8, 15, 12, 20, 27, 33, 39],
    [38, 30, 22, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16, 45, 37, 29, 21, 14, 8, 15, 12, 20, 27, 33, 39],
    [38, 30, 22, 15, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16],
    [38, 30, 22, 15, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16],
    [38, 30, 22, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16, 45, 37, 29, 21, 14, 8, 15, 12, 20, 27, 33, 39],
    [38, 30, 22, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16, 45, 37, 29, 21, 14, 8, 15, 12, 20, 27, 33, 39],
    [39, 33, 37, 29, 17, 38, 30, 22, 15, 16, 23, 24, 31, 32, 25, 18, 26, 19],
    [17, 30, 16, 23, 24, 31, 32, 25, 18],
    [24],
];

const ctaItems = [
    {
        title: "Find Candidates",
        frames: searching,
        repeatCount: 2,
        duration: 150,
    },
    {
        title: "Screen Automatically",
        frames: syncing,
        repeatCount: 2,
        duration: 100,
    },
    {
        title: "Hire Top Talent",
        frames: heartbit,
        repeatCount: 2,
    },
];

const words = ["startups", "solo founders", "recruiters", "enterprises"];

const backedByLogos = [
  { url: "/backedby/18startup.png", name: "18startup", className: "bg-white p-[2px] object-contain" },
  { url: "/backedby/tie.png", name: "TiE", className: "bg-white p-[3px] object-contain" },
  { url: "/backedby/iima.png", name: "IIMA", className: "bg-black p-[4px] object-contain dark:invert" },
];

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Typing effect state
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const i = loopNum % words.length;
    const fullText = words[i];

    if (isDeleting) {
      if (text === "") {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setLoopNum((prev) => prev + 1);
        }, 400);
      } else {
        timer = setTimeout(() => {
          setText(fullText.substring(0, text.length - 1));
        }, 40);
      }
    } else {
      if (text === fullText) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      } else {
        timer = setTimeout(() => {
          setText(fullText.substring(0, text.length + 1));
        }, 100);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  // Elegant neutral noise on both light and dark modes
  const ditherColor = mounted && resolvedTheme === "dark" ? "#ffffff" : "#000000";

  return (
    <section 
      className="relative pt-[180px] pb-[40px] flex flex-col items-center overflow-hidden" 
      id="home"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Dithering Effect */}
      <Suspense fallback={<div className="absolute inset-4 md:inset-16 bg-muted/20 rounded-xl" />}>
        <div className="absolute inset-4 md:inset-16 z-0 pointer-events-none opacity-[0.08] dark:opacity-[0.15] overflow-hidden">
          {mounted && (
            <Dithering
              colorBack="#00000000" // Transparent
              colorFront={ditherColor}  
              shape="warp"
              type="4x4"
              speed={isHovered ? 0.6 : 0.2}
              className="size-full"
              minPixelRatio={1}
            />
          )}
        </div>
      </Suspense>

      {/* Framing Borders */}
      <div className="pointer-events-none absolute inset-x-0 top-4 h-px w-full bg-border md:top-16 z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full bg-border z-10" />

      <div className="relative z-10 flex flex-col items-center gap-[12px] mb-[24px]">
        <div className="flex items-center gap-[10px] px-4 py-2">
          <span className="text-[16px] text-muted-foreground" style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}>
            backed by
          </span>
          <div className="flex -space-x-2">
            {backedByLogos.map((logo, i) => (
              <div key={i} className="relative group cursor-pointer">
                <Image
                  src={logo.url}
                  width={50}
                  height={50}
                  alt={logo.name}
                  className={`w-10 h-10 rounded-full border-2 border-background relative z-10 transition-transform duration-200 group-hover:scale-110 group-hover:z-20 ${logo.className}`}
                />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-foreground text-background text-[12px] font-medium rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none z-50 translate-y-1 group-hover:translate-y-0">
                  {logo.name}
                  <div className="absolute -bottom-[4px] left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h1
        className="relative z-10 font-[540] font-denton text-foreground text-[32px] sm:text-[48px] md:text-[64px] lg:text-[72px] leading-[1.05] flex items-center justify-center whitespace-nowrap overflow-visible"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <span>The Hiring OS for&nbsp;</span>
        <span className="text-primary inline-block text-left w-[160px] sm:w-[240px] md:w-[320px] lg:w-[360px]">
          {text}
        </span>
      </h1>

      <p className="relative z-10 mt-6 text-[18px] md:text-[22px] text-muted-foreground text-center max-w-[700px] leading-relaxed px-6 font-[400]">
        We provide premier hiring services to top companies, sourcing the absolute best talent from our own cherry-picked candidates.
      </p>

      <div className="relative z-10 mt-[48px] flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6">
        <DotFlow items={ctaItems} />
        <button
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-secondary border border-border text-foreground text-[16px] font-[500] hover:bg-secondary/80 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-300"
          style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
        >
          Book a Demo
        </button>
      </div>

      <div className="w-full mt-24 relative z-10 px-4 md:px-16 overflow-hidden">
        <CompanyMarquee />
      </div>
    </section>
  );
}
