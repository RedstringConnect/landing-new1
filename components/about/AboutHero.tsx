"use client";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "motion/react";
import { Sparkles, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

const Dithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

export function AboutHero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const ditherColor = mounted && resolvedTheme === "dark" ? "#ffffff" : "#000000";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Background Dithering Effect */}
      <Suspense fallback={<div className="absolute inset-0 bg-muted/20" />}>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] inset-4 md:inset-16 dark:opacity-[0.12]">
          {mounted && (
            <Dithering
              colorBack="#00000000"
              colorFront={ditherColor}  
              shape="warp"
              type="4x4"
              speed={0.3}
              className="size-full"
              minPixelRatio={1}
            />
          )}
        </div>
      </Suspense>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white/5 backdrop-blur-md mb-8"
      >
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-[13px] font-medium text-foreground uppercase tracking-widest">Our Story</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="relative z-10 font-[540] font-denton text-foreground text-[48px] sm:text-[64px] md:text-[80px] leading-[1.05] text-center tracking-tight max-w-[800px] px-6"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Building the future of hiring
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 mt-[40px] w-full max-w-[640px] px-6"
      >
        <p className="text-[18px] md:text-[20px] text-muted-foreground leading-relaxed text-center font-light">
          We&apos;re on a mission to make hiring effortless, intelligent, and fair for everyone. 
          By combining AI with human intuition, we&apos;re building the operating system for modern teams.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-10"
      >
        <span className="text-[12px] uppercase tracking-[2px] font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
