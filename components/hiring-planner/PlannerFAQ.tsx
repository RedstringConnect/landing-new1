"use client";
import React, { useState } from "react";
import { motion } from "motion/react";

const faqs = [
  {
    question: "How accurate is the timeline estimation?",
    answer: "Our AI uses data from over 10,000 successful hires across similar industries and roles. While external factors play a part, our estimates are typically accurate within a 1-week margin of error.",
  },
  {
    question: "Can I export the hiring plan?",
    answer: "Yes, you can export your completed hiring plan as a CSV, PDF presentation, or sync it directly to supported ATS platforms like Greenhouse and Lever.",
  },
  {
    question: "Does the budget estimator include recruiter fees?",
    answer: "The default calculation includes standard salary ranges, benefits overhead, and average sourcing costs. You can toggle agency fees on or off in the advanced settings.",
  },
  {
    question: "Is this tool free to use?",
    answer: "The basic Hiring Planner is free for up to 3 roles. For comprehensive team planning and ATS integration, it is included in our Pro and Enterprise tiers.",
  },
  {
    question: "How often is the market data updated?",
    answer: "Our compensation and time-to-hire benchmarks are updated in real-time by aggregating anonymized data from the Redstring network and major job boards.",
  }
];

function FAQItem({ question, answer }: (typeof faqs)[0]) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span
          className="text-[16px] md:text-[18px] text-foreground font-[500] group-hover:text-primary transition-colors pr-8"
        >
          {question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-border bg-white/5 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[300px] opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-[15px] text-muted-foreground leading-relaxed max-w-[800px]">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function PlannerFAQ() {
  return (
    <section className="py-[120px] flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="font-[540] font-denton text-foreground text-[28px] md:text-[36px] lg:text-[48px] text-center mb-[60px] max-w-[700px] leading-[1.15]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        FAQ
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-[800px] mx-auto px-6 lg:px-8 w-full"
      >
        <div className="bg-card/50 backdrop-blur-md border border-border rounded-3xl p-6 md:p-8">
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
