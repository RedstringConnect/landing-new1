"use client";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

const ImageDithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.ImageDithering }))
);

const values = [
  {
    title: "Human-First Automation",
    description: "We automate repetitive tasks while keeping people at the center of every important decision.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&auto=format&fit=crop",
    gradient: "from-primary/20 to-transparent",
  },
  {
    title: "Built Around Real Problems",
    description: "Every tool starts with a challenge founders and hiring teams face every day \u2014 not with technology for technology\u2019s sake.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop",
    gradient: "from-primary/20 to-transparent",
  },
  {
    title: "Engineered to Grow With You",
    description: "From your first hire to your hundredth, Redstring helps you build hiring systems that scale alongside your business.",
    image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=400&auto=format&fit=crop",
    gradient: "from-primary/20 to-transparent",
  },
];

export function WhoWeAre() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const ditherColor = mounted && resolvedTheme === "dark" ? "#ffffff" : "#000000";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="py-[120px] relative z-10 flex flex-col items-center max-w-[1280px] mx-auto px-6 lg:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="font-[540] font-denton text-foreground text-[36px] md:text-[44px] lg:text-[48px] text-center mb-[80px] w-full"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Why Redstring
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {values.map((value, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            onMouseMove={handleMouseMove}
            className={`group relative bg-card/80 backdrop-blur-md rounded-[32px] transition-all duration-500 flex flex-col overflow-hidden p-1 border border-border min-h-[400px]`}
          >
            {/* ImageDithering Full Width Header */}
            <div className="relative w-full h-[240px] md:h-[280px] border-b rounded-t-[28px] rounded-b-[24px] border-border/50 overflow-hidden bg-muted">
              <Suspense fallback={<div className="w-full h-full bg-muted animate-pulse" />}>
                {mounted && (
                  <div className="w-full h-full transition-transform duration-[1200ms] ease-out">
                    <ImageDithering
                      width={1200}
                      height={600}
                      image={value.image}
                      colorBack="#00000000"
                      colorFront={ditherColor}
                      colorHighlight="#875bf7"
                      originalColors={false}
                      inverted={false}
                      type="8x8"
                      size={2}
                      colorSteps={2}
                      fit="cover"
                    />
                  </div>
                )}
              </Suspense>
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
            </div>

            <div className="relative z-10 flex flex-col gap-4 justify-between p-4">
              <h3 className="text-foreground text-[28px] font-semibold tracking-tight">
                {value.title}
              </h3>
              <p className="text-[16px] text-muted-foreground leading-normal max-w-[800px]">
                {value.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
