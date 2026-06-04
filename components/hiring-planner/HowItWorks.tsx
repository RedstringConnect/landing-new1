"use client";
import React from "react";
import { motion } from "motion/react";
import { DotLoader } from "../ui/dot-loader";
import { slidersFramesMapped, mathFrames, downloadFrames } from "../ui/why-how-animations";

const steps = [
  {
    step: "01",
    title: "Define Roles",
    description: "Input your required roles, seniority levels, and target start dates into the planner.",
    frames: slidersFramesMapped,
  },
  {
    step: "02",
    title: "Calculate Needs",
    description: "Our AI calculates required pipeline size, budget, and estimated time to hire.",
    frames: mathFrames,
  },
  {
    step: "03",
    title: "Get Result",
    description: "Export the plan or seamlessly integrate it with your ATS to begin sourcing.",
    frames: downloadFrames,
  }
];

type StepItem = {
  step: string;
  title: string;
  description: string;
  frames: number[][];
};

const StepCard = ({ item }: { item: StepItem }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="w-full flex justify-center">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative bg-card border border-foreground/5 rounded-[24px] p-6 md:p-8 overflow-hidden group w-full shadow-lg dark:shadow-[0_-8px_30px_rgba(0,0,0,0.25)]"
      >
        {/* Refined Content Layout */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 w-full">
          
          {/* Abstract Icon */}
          <div className="w-[64px] h-[64px] md:w-[80px] md:h-[80px] rounded-2xl bg-secondary/30 border border-foreground/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
            <div className="scale-90 md:scale-100">
              <DotLoader 
                frames={item.frames} 
                isPlaying={isHovered} 
                duration={150}
                repeatCount={1}
                dotClassName="bg-black/10 dark:bg-white/15 [&.active]:bg-primary [&.active]:scale-125 [&.active]:opacity-100 transition-all duration-300 w-[4px] h-[4px]"
                className="gap-[3px] w-auto grid-cols-7"
              />
            </div>
          </div>

          {/* Typography */}
          <div className="flex flex-col gap-2 md:gap-2.5">
            <h3 className="text-foreground text-[22px] md:text-[26px] font-semibold tracking-tight leading-tight">
              {item.title}
            </h3>
            <p className="text-[14px] md:text-[15px] text-muted-foreground leading-relaxed max-w-[460px]">
              {item.description}
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export function HowItWorks() {
  return (
    <section className="py-[120px] relative z-10 flex flex-col items-center max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="font-[540] font-denton text-foreground text-[36px] md:text-[48px] lg:text-[56px] text-center mb-[60px] md:mb-[80px] w-full tracking-tight"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        How it works
      </motion.h2>

      {/* Standard List Container */}
      <div className="relative flex flex-col gap-6 w-full max-w-[760px] mx-auto">
        {steps.map((item, i) => (
          <StepCard 
            key={i} 
            item={item} 
          />
        ))}
      </div>
    </section>
  );
}
