"use client";
import React, { useState } from "react";
import { motion } from "motion/react";

import { chartRadarFrames, hourglassFrames, chevronFrames, crosshairFrames } from "../ui/why-how-animations";
import { DotLoader } from "../ui/dot-loader";

export function WhyPlanner() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
        Why Hiring planner
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1000px] mx-auto">
        
        {/* Row 1, Col 1: Large Box (Data-Driven) */}
        <motion.div
          onMouseEnter={() => setHoveredCard('data')}
          onMouseLeave={() => setHoveredCard(null)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="group relative bg-card border border-border rounded-3xl p-8 hover:border-border transition-all duration-500 overflow-hidden flex flex-col md:col-span-2 gap-6"
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-start group-hover:scale-110 transition-transform duration-500 origin-left">
              <DotLoader 
                frames={chartRadarFrames} 
                isPlaying={hoveredCard === 'data'} 
                duration={100}
                repeatCount={1}
                dotClassName="bg-black/10 dark:bg-white/15 [&.active]:bg-primary [&.active]:scale-125 [&.active]:opacity-100 transition-all duration-300 w-[4px] h-[4px]"
                className="gap-[3px] w-auto grid-cols-7"
              />
          </div>
          
          <div className="relative z-10 mt-auto">
            <h3 className="text-foreground text-[24px] md:text-[28px] font-medium mb-3 tracking-tight">Data-Driven Forecasting</h3>
            <p className="text-[15px] md:text-[16px] text-muted-foreground leading-relaxed max-w-[500px]">
              Stop guessing your hiring needs. Our planner uses historical data and industry benchmarks to accurately predict time-to-hire, costs, and candidate pipeline requirements.
            </p>
          </div>
        </motion.div>

        {/* Row 1, Col 2: Small Box (Save Time) */}
        <motion.div
          onMouseEnter={() => setHoveredCard('time')}
          onMouseLeave={() => setHoveredCard(null)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="group relative bg-card border border-border rounded-3xl p-8 hover:border-border transition-all duration-500 overflow-hidden flex flex-col md:col-span-1 gap-4"
        >
          <div className="absolute inset-0 bg-linear-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 w-[48px] h-[48px] rounded-xl flex items-center justify-start group-hover:scale-110 transition-transform duration-500 origin-left">
            <DotLoader 
              frames={hourglassFrames} 
              isPlaying={hoveredCard === 'time'} 
              duration={150}
              repeatCount={1}
              dotClassName="bg-black/10 dark:bg-white/15 [&.active]:bg-primary [&.active]:scale-125 [&.active]:opacity-100 transition-all duration-300 w-[3px] h-[3px] md:w-[4px] md:h-[4px]"
              className="gap-[2px] md:gap-[3px] w-auto grid-cols-7 scale-90 md:scale-100"
            />
          </div>
          
          <div className="relative z-10 mt-auto">
            <h3 className="text-foreground text-[24px] md:text-[28px] font-medium mb-2 tracking-tight">Save Time</h3>
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              Cut planning cycles by weeks. Automate manual spreadsheet calculations and focus on strategy.
            </p>
          </div>
        </motion.div>

        {/* Row 2, Col 1: Small Box (Fast Execution) */}
        <motion.div
          onMouseEnter={() => setHoveredCard('fast')}
          onMouseLeave={() => setHoveredCard(null)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group relative bg-card border border-border rounded-3xl p-8 hover:border-border transition-all duration-500 overflow-hidden flex flex-col md:col-span-1 gap-4"
        >
          <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 w-[48px] h-[48px] rounded-xl flex items-center justify-start group-hover:scale-110 transition-transform duration-500 origin-left">
            <DotLoader 
              frames={chevronFrames} 
              isPlaying={hoveredCard === 'fast'} 
              duration={120}
              repeatCount={1}
              dotClassName="bg-black/10 dark:bg-white/15 [&.active]:bg-primary [&.active]:scale-125 [&.active]:opacity-100 transition-all duration-300 w-[3px] h-[3px] md:w-[4px] md:h-[4px]"
              className="gap-[2px] md:gap-[3px] w-auto grid-cols-7 scale-90 md:scale-100"
            />
          </div>
          
          <div className="relative z-10 mt-auto">
            <h3 className="text-foreground text-[24px] md:text-[28px] font-medium mb-2 tracking-tight">Fast Execution</h3>
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              Deploy plans instantly. Export your headcount strategy seamlessly into your ATS.
            </p>
          </div>
        </motion.div>

        {/* Row 2, Col 2: Large Box (Align with OKRs) */}
        <motion.div
          onMouseEnter={() => setHoveredCard('okrs')}
          onMouseLeave={() => setHoveredCard(null)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="group relative bg-card border border-border rounded-3xl p-8 hover:border-border transition-all duration-500 overflow-hidden flex flex-col md:col-span-2 gap-6"
        >
          <div className="absolute inset-0 bg-linear-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 w-[56px] h-[56px] md:w-[64px] md:h-[64px] rounded-2xl flex items-center justify-start group-hover:scale-110 transition-transform duration-500 origin-left">
            <DotLoader 
              frames={crosshairFrames} 
              isPlaying={hoveredCard === 'okrs'} 
              duration={150}
              repeatCount={1}
              dotClassName="bg-black/10 dark:bg-white/15 [&.active]:bg-primary [&.active]:scale-125 [&.active]:opacity-100 transition-all duration-300 w-[4px] h-[4px]"
              className="gap-[3px] w-auto grid-cols-7 scale-90 md:scale-100"
            />
          </div>
          
          <div className="relative z-10 mt-auto">
            <h3 className="text-foreground text-[24px] md:text-[28px] font-medium mb-2 tracking-tight">Align with OKRs</h3>
            <p className="text-[15px] md:text-[16px] text-muted-foreground leading-relaxed max-w-[500px]">
              Directly tie your headcount planning to business objectives and revenue targets.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
