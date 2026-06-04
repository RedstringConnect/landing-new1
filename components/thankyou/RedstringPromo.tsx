import React from "react";
import { ArrowRight, Globe } from "lucide-react";

export function RedstringPromo() {
  return (
    <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-10 md:gap-16 p-8 md:p-12 bg-foreground text-background border border-foreground/5 rounded-[24px] shadow-lg dark:shadow-[0_-8px_30px_rgba(0,0,0,0.25)] overflow-hidden group w-full relative">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      
      <div className="flex-1 z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/10 text-primary-foreground text-[12px] font-semibold uppercase tracking-widest mb-6">
          <Globe className="w-3.5 h-3.5" />
          The Ecosystem
        </div>
        
        <h2 className="font-denton text-[32px] md:text-[40px] font-medium leading-[1.1] tracking-tight mb-4 text-background">
          Connect with Redstring
        </h2>
        
        <p className="text-[16px] md:text-[18px] text-background/80 mb-8 max-w-[500px]">
          Redstring brings together the best minds in talent, product, and engineering. Join our network to access exclusive insights, playbooks, and a community of high-growth founders.
        </p>
        
        <ul className="space-y-3 mb-8">
          {["Exclusive founder community", "Deep-dive industry reports", "Strategic advisory & playbooks"].map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-[15px] font-medium text-background/90">
              <div className="w-1.5 h-1.5 rounded-full bg-background/40" />
              {feature}
            </li>
          ))}
        </ul>
        
        <a href="#" className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3.5 rounded-full text-[14px] font-medium hover:bg-background/90 transition-all shadow-sm w-fit cursor-pointer">
          Discover Redstring <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      
      <div className="flex-1 w-full relative z-10 hidden md:block">
        <div className="aspect-[4/3] rounded-2xl bg-background/5 border border-background/10 overflow-hidden flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />
            <div className="text-center p-6 text-background/80">
                <Globe className="w-16 h-16 text-background/60 mx-auto mb-4 opacity-80" />
                <p className="font-semibold text-background text-[18px] tracking-tight">Redstring Network</p>
                <p className="text-[14px] opacity-70">Community & Ecosystem</p>
            </div>
        </div>
      </div>
    </div>
  );
}
