"use client";
import React from "react";
import { motion } from "motion/react";
import { LineChart, Clock, Target, Zap } from "lucide-react";

export function WhyPlanner() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-auto md:h-[500px]">
        {/* Large Left Box */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="group relative bg-card border border-border rounded-3xl p-8 hover:border-border transition-all duration-500 overflow-hidden flex flex-col justify-end"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 w-[64px] h-[64px] rounded-2xl bg-white/5 border border-border flex items-center justify-center mb-auto mt-4 group-hover:scale-110 transition-transform duration-500">
            <LineChart className="w-8 h-8 text-primary" strokeWidth={1.5} />
          </div>
          <div className="relative z-10 mt-8">
            <h3 className="text-foreground text-[24px] font-medium mb-3 tracking-tight">Data-Driven Forecasting</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed max-w-[400px]">
              Stop guessing your hiring needs. Our planner uses historical data and industry benchmarks to accurately predict time-to-hire, costs, and candidate pipeline requirements.
            </p>
          </div>
        </motion.div>

        {/* Right Column Grid */}
        <div className="flex flex-col gap-6 h-full">
          {/* Top Wide Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative bg-card border border-border rounded-3xl p-8 hover:border-border transition-all duration-500 overflow-hidden flex-1 flex flex-col justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-start gap-6">
              <div className="w-[56px] h-[56px] rounded-2xl bg-white/5 border border-border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                <Target className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-foreground text-[20px] font-medium mb-2 tracking-tight">Align with OKRs</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  Directly tie your headcount planning to business objectives and revenue targets.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bottom Two Boxes */}
          <div className="grid grid-cols-2 gap-6 flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-card border border-border rounded-3xl p-6 hover:border-border transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 w-[48px] h-[48px] rounded-xl bg-white/5 border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Clock className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <div className="relative z-10 mt-4">
                <h3 className="text-foreground text-[16px] font-medium mb-1 tracking-tight">Save Time</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">Cut planning cycles by weeks.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative bg-card border border-border rounded-3xl p-6 hover:border-border transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 w-[48px] h-[48px] rounded-xl bg-white/5 border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Zap className="w-6 h-6 text-foreground" strokeWidth={1.5} />
              </div>
              <div className="relative z-10 mt-4">
                <h3 className="text-foreground text-[16px] font-medium mb-1 tracking-tight">Fast Execution</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">Deploy plans instantly.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
