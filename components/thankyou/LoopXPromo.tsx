import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export function LoopXPromo() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 p-8 md:p-12 bg-card border border-foreground/5 rounded-[24px] shadow-lg dark:shadow-[0_-8px_30px_rgba(0,0,0,0.25)] overflow-hidden group w-full relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="flex-1 z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[12px] font-semibold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Featured Tool
        </div>
        
        <h2 className="font-denton text-[32px] md:text-[40px] font-medium leading-[1.1] text-foreground tracking-tight mb-4">
          Automate your entire hiring workflow with LoopX
        </h2>
        
        <p className="text-[16px] md:text-[18px] text-muted-foreground mb-8 max-w-[500px]">
          Replace manual sourcing, endless email threads, and resume theater with an intelligent platform that finds, screens, and engages top talent on autopilot.
        </p>
        
        <ul className="space-y-3 mb-8">
          {["AI-powered candidate sourcing", "Automated technical screening", "Seamless interview scheduling"].map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-[15px] font-medium text-foreground/80">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>
        
        <a href="#" className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-full text-[14px] font-medium hover:bg-foreground/90 transition-all shadow-sm w-fit cursor-pointer">
          Explore LoopX <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      
      <div className="flex-1 w-full relative z-10 hidden md:block">
        <div className="aspect-[4/3] rounded-2xl bg-secondary/30 border border-foreground/5 overflow-hidden flex items-center justify-center">
          <div className="text-center p-6 text-muted-foreground">
            <div className="w-16 h-16 rounded-2xl bg-card border border-foreground/5 mx-auto mb-4 flex items-center justify-center shadow-sm">
              <Sparkles className="w-8 h-8 text-foreground" />
            </div>
            <p className="font-semibold text-foreground tracking-tight">LoopX Platform</p>
            <p className="text-[14px]">Interactive Demo / UI Preview</p>
          </div>
        </div>
      </div>
    </div>
  );
}
