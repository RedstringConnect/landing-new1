"use client";
import React, { useState } from "react";
import { motion } from "motion/react";

import { chartRadarFrames, hourglassFrames, chevronFrames, crosshairFrames } from "../ui/why-how-animations";
import { DotLoader } from "../ui/dot-loader";

const ANIMATIONS: Record<string, number[][]> = {
  chartRadar: chartRadarFrames,
  hourglass: hourglassFrames,
  chevron: chevronFrames,
  crosshair: crosshairFrames,
};

interface ToolWhyCard {
  title: string;
  description: string;
  icon: string;
  layout: "large" | "small";
}

interface ToolWhyProps {
  data: {
    title: string;
    cards: ToolWhyCard[];
  }
}

export function ToolWhy({ data }: ToolWhyProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const getLayoutClasses = (layout: "large" | "small", index: number) => {
    if (layout === "large") {
      const gradient = index % 2 === 0 ? "bg-linear-to-br from-primary/10" : "bg-linear-to-bl from-primary/10";
      return {
        colSpan: "md:col-span-2",
        gradient: `${gradient} to-transparent`,
        iconSize: "w-[56px] h-[56px] md:w-[72px] md:h-[72px] rounded-2xl",
        dotDuration: 100,
        dotClasses: "w-[4px] h-[4px]",
        loaderClasses: "gap-[3px] w-auto grid-cols-7 scale-90 md:scale-100",
        titleClasses: "text-[24px] md:text-[28px]",
        descClasses: "text-[15px] md:text-[16px] max-w-[500px]"
      };
    } else {
      const gradient = index % 2 === 0 ? "bg-linear-to-t from-primary/10" : "bg-linear-to-tr from-white/5";
      return {
        colSpan: "md:col-span-1",
        gradient: `${gradient} to-transparent`,
        iconSize: "w-[48px] h-[48px] rounded-xl",
        dotDuration: 150,
        dotClasses: "w-[3px] h-[3px] md:w-[4px] md:h-[4px]",
        loaderClasses: "gap-[2px] md:gap-[3px] w-auto grid-cols-7 scale-90 md:scale-100",
        titleClasses: "text-[24px] md:text-[28px]",
        descClasses: "text-[14px]"
      };
    }
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
        {data.title}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
        {data.cards.map((card, i) => {
          const layout = getLayoutClasses(card.layout, i);
          const frames = ANIMATIONS[card.icon] || chartRadarFrames; // fallback

          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative bg-card border border-border rounded-3xl p-8 hover:border-border transition-all duration-500 overflow-hidden flex flex-col ${layout.colSpan} gap-4`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${layout.gradient}`} />
              
              <div className={`relative z-10 ${layout.iconSize} flex items-center justify-start group-hover:scale-110 transition-transform duration-500 origin-left`}>
                  <DotLoader 
                    frames={frames} 
                    isPlaying={hoveredCard === i} 
                    duration={layout.dotDuration}
                    repeatCount={1}
                    dotClassName={`bg-black/10 dark:bg-white/15 [&.active]:bg-primary [&.active]:scale-125 [&.active]:opacity-100 transition-all duration-300 ${layout.dotClasses}`}
                    className={layout.loaderClasses}
                  />
              </div>
              
              <div className="relative z-10 mt-auto">
                <h3 className={`text-foreground font-medium mb-2 md:mb-3 tracking-tight ${layout.titleClasses}`}>
                  {card.title}
                </h3>
                <p className={`text-muted-foreground leading-relaxed ${layout.descClasses}`}>
                  {card.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
