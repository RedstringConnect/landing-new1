"use client";
import React from "react";
import { motion } from "motion/react";
import { FAQItem } from "@/components/FAQItem";

interface ToolFAQProps {
  faqs: { question: string, answer: string }[];
}

export function ToolFAQ({ faqs }: ToolFAQProps) {
  if (!faqs || faqs.length === 0) return null;

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
        className="max-w-5xl mx-auto w-full px-6 lg:px-8"
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
