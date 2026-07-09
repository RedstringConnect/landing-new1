"use client"
import React, { useState, useEffect, Suspense, lazy } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const Dithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
)

import { CompanyMarquee } from "./CompanyMarquee";
import { DotFlow } from "@/components/ui/dot-flow";
import { BookDemoButton } from "@/components/ui/book-demo-button";
import { LineShadowText } from "./ui/line-shadow-text";

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

export const ctaItems = [
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

const words = ["Startups", "Solo Founders", "Recruiters", "Enterprises"];

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
      className="relative pt-[240px] flex flex-col items-center overflow-x-hidden" 
      id="home"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Dithering Effect */}
      <Suspense fallback={<div className="absolute inset-x-4 top-16 bottom-0 md:inset-x-16 md:inset-be-40 bg-muted/20 rounded-xl" />}>
        <div className="absolute inset-x-4 top-16 bottom-0 md:inset-bs-16 md:inset-x-16 md:inset-be-0 z-0 pointer-events-none opacity-[0.08] dark:opacity-[0.15] overflow-hidden">
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
      <div className="pointer-events-none absolute inset-x-0 top-16 h-px w-full bg-border z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full bg-border z-10" />

      <div className="relative z-10 flex flex-col items-center gap-[12px] mb-[24px]">
        <div className="flex items-center gap-2.5 px-4 py-2">
          <span className="text-[18px] text-muted-foreground" style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}>
            backed by
          </span>
          <Image
            src="/logos/the founding co.svg"
            alt="The Founding Co"
            width={120}
            height={28}
            className="h-[22px] w-auto dark:invert"
            priority={true}
          />
        </div>
      </div>

      <h1
        className="relative z-10 font-[540] font-denton text-foreground text-[32px] sm:text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] flex items-center justify-center whitespace-nowrap overflow-visible px-4"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <span>The Hiring OS for&nbsp;</span>
        <LineShadowText shadowColor={mounted && resolvedTheme === "dark" ? "#fff" : "#000"} className="text-primary inline-block text-left w-[160px] sm:w-[240px] md:w-[320px] lg:w-[360px]">
          {text}
        </LineShadowText>
      </h1>

      <p className="relative z-10 mt-6 text-[18px] md:text-[20px] text-muted-foreground text-center max-w-[700px] leading-relaxed px-6 font-normal text-balance">
       Building your hiring brain with human intelligence 
      </p>

      <div className="relative z-10 mt-[48px] flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6">
        <DotFlow items={ctaItems} href="https://loopx.redstring.co.in" />
        <BookDemoButton variant="secondary" size="md" className="w-full sm:w-auto" />
      </div>

      <div className="w-full mt-12 relative z-10 px-4 md:px-16">
        <CompanyMarquee />
      </div>
    </section>
  );
}
