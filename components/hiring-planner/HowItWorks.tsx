"use client";
import React from "react";
import { motion } from "motion/react";

const steps = [
  {
    step: "step 1",
    title: "Define Roles",
    description: "Input your required roles, seniority levels, and target start dates into the planner.",
  },
  {
    step: "step 2",
    title: "Calculate Needs",
    description: "Our AI calculates required pipeline size, budget, and estimated time to hire.",
  },
  {
    step: "step 3",
    title: "Execute Plan",
    description: "Export the plan or seamlessly integrate it with your ATS to begin sourcing.",
  }
];

export function HowItWorks() {
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
        how it works
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {steps.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="group relative bg-card border border-border rounded-[32px] p-10 hover:border-border transition-all duration-500 overflow-hidden flex flex-col items-center text-center min-h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 mt-auto mb-8 flex flex-col items-center gap-6">
              <span className="text-primary text-[14px] font-semibold tracking-[0.2em] uppercase">
                {item.step}
              </span>
              <h3 className="text-foreground text-[28px] font-medium tracking-tight">
                {item.title}
              </h3>
              <p className="text-[16px] text-muted-foreground leading-relaxed max-w-[280px]">
                {item.description}
              </p>
            </div>
            
            <div className="mt-auto w-full h-[4px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-0 group-hover:scale-100 transition-transform duration-700" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
