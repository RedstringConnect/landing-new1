"use client";
import React, { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between py-6 text-left group cursor-pointer"
      >
        <span
          className="text-[16px] md:text-[18px] text-foreground font-[500] group-hover:text-primary transition-colors pr-8"
          style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
        >
          {question}
        </span>
        {/* Custom Minimal Animated Plus/Minus in a circle */}
        <div className={`shrink-0 mt-0.5 relative w-8 h-8 rounded-full border border-border bg-white/5 flex items-center justify-center transition-transform duration-500`}>
          <div className="absolute w-3 h-[1.5px] bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          <div className={`absolute w-3 h-[1.5px] bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "rotate-0 opacity-0" : "rotate-90 opacity-100"}`} />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "max-h-[300px] opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        <p 
          className="text-[14px] md:text-[15px] text-muted-foreground leading-relaxed"
          style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}
