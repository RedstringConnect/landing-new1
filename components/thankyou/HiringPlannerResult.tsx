"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, CheckCircle2, Loader2, PieChart as PieChartIcon } from "lucide-react";
import { motion } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { HiringPlannerRoadmap, HiringPlannerNormalizedInput } from "@/types/hiring-planner";

interface HiringPlannerResultProps {
  roadmap: HiringPlannerRoadmap;
  input: HiringPlannerNormalizedInput;
}

export function HiringPlannerResult({ roadmap, input }: HiringPlannerResultProps) {
  const { overview, budgetBreakdown, hiringRoster, justification } = roadmap;
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('/api/hiring-planner/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, roadmap })
      });
      
      if (!response.ok) throw new Error("Failed to download PDF");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'loopx-hiring-roadmap.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const COLORS = ['#2563eb', '#3b82f6', '#60a5fa']; // Primary blues

  return (
    <div className="w-full mx-auto flex flex-col md:flex-row gap-8 lg:gap-12 pb-20 items-stretch min-h-[calc(100vh-140px)] py-8">
      
      {/* Left Column - Overview and Action */}
      <div className="flex-1 flex flex-col gap-8 justify-between">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 shadow-sm text-primary">
            <Calculator className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-denton text-[40px] md:text-[48px] leading-[1.1] text-foreground font-[540] tracking-tight mb-4">
              {overview.headline}
            </h1>
            <p className="text-[16px] text-muted-foreground leading-relaxed max-w-md">
              {overview.summary}
            </p>
          </div>
        </motion.div>

        {/* Justification */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full p-6 rounded-2xl bg-secondary/30 border border-border shadow-sm">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[16px] font-bold text-foreground mb-1">{justification.headline}</h4>
              <p className="text-[14px] text-muted-foreground leading-relaxed">{justification.body}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-auto pt-8">
          <button onClick={handleDownload} disabled={isDownloading} className="inline-flex items-center justify-center w-full md:w-auto gap-2 bg-foreground text-background px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-foreground/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            {isDownloading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...</> : <>Download Detailed PDF <ArrowRight className="w-4 h-4" /></>}
          </button>
        </motion.div>
      </div>

      {/* Right Column - Data Visualization */}
      <div className="flex-1 flex flex-col gap-6 w-full lg:max-w-[500px]">
        
        {/* Chart Card */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="w-full p-6 lg:p-8 rounded-[32px] bg-card border border-border shadow-lg flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-6">
            <div>
              <h3 className="text-[18px] font-semibold text-foreground">Budget Distribution</h3>
              <p className="text-[13px] text-muted-foreground">{budgetBreakdown.recommendedRunway} Runway</p>
            </div>
            <div className="text-right">
              <div className="text-[24px] font-bold text-foreground">{budgetBreakdown.totalBudget}</div>
              <p className="text-[13px] text-muted-foreground uppercase tracking-wider font-semibold">Total Allocation</p>
            </div>
          </div>

          <div className="w-full h-[220px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetBreakdown.allocations.map(a => ({ name: a.label, value: a.percentage }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  animationDuration={1500}
                >
                  {budgetBreakdown.allocations.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`${value || 0}%`, 'Allocation']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <PieChartIcon className="w-6 h-6 text-muted-foreground/50 mb-1" />
              <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-widest">Split</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-2 mt-6">
            {budgetBreakdown.allocations.map((alloc, i) => (
              <div key={alloc.label} className="flex flex-col items-center text-center p-3 rounded-2xl bg-secondary/40">
                <div className="w-3 h-3 rounded-full mb-2" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-[16px] font-bold text-foreground">{alloc.percentage}%</span>
                <span className="text-[11px] font-medium text-muted-foreground mt-0.5">{alloc.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hiring Roster Card */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full p-6 rounded-[32px] bg-secondary/20 border border-border flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-[18px] font-semibold text-foreground">Hiring Roster</h3>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[13px] font-semibold">
              {hiringRoster.totalHeadcount} Hires
            </span>
          </div>
          
          <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar max-h-[220px]">
            {hiringRoster.hires.map((hire, i) => (
              <div key={i} className="flex items-start justify-between p-4 rounded-2xl bg-background border border-foreground/5 hover:border-foreground/10 transition-colors">
                <div>
                  <h4 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                    <span className="text-primary">{hire.count}x</span> {hire.role}
                  </h4>
                  <p className="text-[13px] text-muted-foreground mt-1 line-clamp-2">{hire.why}</p>
                </div>
                <div className="text-[13px] font-semibold text-muted-foreground whitespace-nowrap pl-4">
                  {hire.formattedAnnualCompensation}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
