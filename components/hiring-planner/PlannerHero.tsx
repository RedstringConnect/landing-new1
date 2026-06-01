"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Calculator, Users, DollarSign, Calendar } from "lucide-react";

export function PlannerHero() {
  const [role, setRole] = useState("Software Engineer");
  const [headcount, setHeadcount] = useState(5);
  
  return (
    <section className="relative pt-[160px] pb-[100px] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] px-6 lg:px-8 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-muted-foreground text-[13px] mb-8 font-medium tracking-wide uppercase"
        >
          <span>Home</span>
          <span className="text-muted-foreground">&gt;</span>
          <span>Templates</span>
          <span className="text-muted-foreground">&gt;</span>
          <span className="text-foreground">Hiring Planner</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-[540] font-denton text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 text-[48px] md:text-[64px] leading-tight text-center mb-16"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Hiring Planner
        </motion.h1>

        {/* Interactive Tool UI */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[800px] bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl shadow-black/50"
        >
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-border flex items-center justify-center">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-foreground text-[18px] font-medium">Headcount Calculator</h3>
              <p className="text-muted-foreground text-[14px]">Estimate your hiring budget and timeline.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-muted-foreground text-[13px] font-medium">Target Role</label>
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-muted-foreground text-[13px] font-medium">Headcount Required</label>
              <input 
                type="number" 
                value={headcount}
                onChange={(e) => setHeadcount(Number(e.target.value))}
                min="1"
                max="100"
                className="bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-background border border-border rounded-2xl p-5 flex flex-col items-center justify-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              <span className="text-[24px] text-foreground font-medium">{headcount * 12}</span>
              <span className="text-muted-foreground text-[12px] uppercase tracking-wider">Candidates Needed</span>
            </div>
            <div className="bg-background border border-border rounded-2xl p-5 flex flex-col items-center justify-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              <span className="text-[24px] text-foreground font-medium">{Math.max(4, Math.ceil(headcount * 1.5))} wks</span>
              <span className="text-muted-foreground text-[12px] uppercase tracking-wider">Est. Timeline</span>
            </div>
            <div className="bg-background border border-border rounded-2xl p-5 flex flex-col items-center justify-center gap-2">
              <DollarSign className="w-6 h-6 text-primary" />
              <span className="text-[24px] text-foreground font-medium">${(headcount * 4500).toLocaleString()}</span>
              <span className="text-muted-foreground text-[12px] uppercase tracking-wider">Est. Cost</span>
            </div>
          </div>

          <button className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary text-foreground font-medium text-[16px] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
            Generate Detailed Report
          </button>
        </motion.div>
      </div>
    </section>
  );
}
