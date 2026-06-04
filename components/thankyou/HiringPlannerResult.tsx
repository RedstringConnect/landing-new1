import React from "react";
import { Calculator, Users, Calendar, DollarSign, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface HiringPlannerResultProps {
  role: string;
  headcount: number;
}

export function HiringPlannerResult({ role, headcount }: HiringPlannerResultProps) {
  const candidates = headcount * 12;
  const cost = headcount * 4500;
  const time = Math.max(4, Math.ceil(headcount * 1.5));

  const items = [
    {
      title: "Sourcing Target",
      value: `${candidates}+`,
      subtext: "Qualified candidates needed",
      icon: Users,
    },
    {
      title: "Estimated Time",
      value: `${time} wks`,
      subtext: "Time to complete hiring",
      icon: Calendar,
    },
    {
      title: "Total Budget",
      value: `$${cost.toLocaleString()}`,
      subtext: "Expected hiring cost",
      icon: DollarSign,
    },
  ];

  return (
    <div className="w-full max-w-[900px] mx-auto flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/30 border border-foreground/5 mb-6 shadow-sm">
          <Calculator className="w-8 h-8 text-foreground" />
        </div>
        <h1 className="font-denton text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] text-foreground font-[540] tracking-tight mb-4">
          Your Hiring Blueprint
        </h1>
        <p className="text-[16px] md:text-[18px] text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
          Based on your goal to hire <strong className="text-foreground">{headcount} {role}</strong>{headcount > 1 ? "s" : ""}, here is what you need to prepare for a successful process.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
            className="flex flex-col items-start p-6 md:p-8 bg-card border border-foreground/5 rounded-[24px] shadow-lg dark:shadow-[0_-8px_30px_rgba(0,0,0,0.25)] w-full"
          >
            <div className="w-12 h-12 rounded-2xl bg-secondary/30 border border-foreground/5 flex items-center justify-center mb-6">
              <item.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-[36px] md:text-[42px] font-semibold text-foreground tracking-tight mb-2 leading-none">
              {item.value}
            </div>
            <div className="text-[16px] md:text-[18px] font-semibold tracking-tight text-foreground mb-1.5">
              {item.title}
            </div>
            <div className="text-[14px] text-muted-foreground leading-relaxed">
              {item.subtext}
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12 text-center"
      >
        <button className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3.5 md:py-4 rounded-full text-[14px] md:text-[15px] font-medium hover:bg-foreground/90 transition-all shadow-sm cursor-pointer">
          Download PDF Report <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
