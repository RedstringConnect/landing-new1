"use client";

import React from "react";
import { FAQItem } from "./FAQItem";

const faqs = [
  {
    question: "What is Redstring?",
    answer:
      "Redstring builds AI-powered workflow systems that help businesses automate repetitive work while keeping people at the center of important decisions. We believe technology should reduce operational chaos not replace human judgment.",
  },
  {
    question: "How do I know if Redstring is right for my business?",
    answer:
      "If your team spends hours on repetitive operational tasks, manual coordination, or disconnected processes, Redstring can help automate and simplify those workflows.",
  },
  {
    question: "How reliable are the team structure and capital recommendations? or Can I use these projections to set my hiring budget with confidence?",
    answer:
      "Absolutely. Our metrics aggregate real-time data from startup hiring activity across Indian tech hubs like Bengaluru, Hyderabad, and Pune. While every startup has unique needs, our benchmarks reflect current market realities, giving you a data-backed starting point for your budget rather than a guess.",
  },
  {
    question: "Does Redstring replace recruiters or hiring managers?",
    answer:
      "No. Our goal is to automate repetitive tasks, not human decision-making. Recruiters and hiring managers remain at the center of every hiring decision.",
  },
  {
    question: "How is Redstring different from other hiring tools?",
    answer:
      "Most tools focus on managing applicants. We focus on eliminating repetitive work. From planning and screening to communication and workflow automation, Redstring helps your team spend less time on operations and more time making great hiring decisions.",
  },
  {
    question: "Can Redstring be customized for our hiring process?",
    answer:
      "Yes. Our solutions are designed to adapt to your hiring workflow rather than forcing you into a one-size-fits-all process.",
  },
];

// The custom FAQItem has been moved to components/FAQItem.tsx

export function FAQ() {
  return (
    <section id="faq" className="py-[60px] md:py-[120px] container mx-auto flex flex-col items-center">
      <h2
        className="font-[540] font-denton text-foreground text-[24px] md:text-[36px] lg:text-[48px] text-center mb-[28px] md:mb-[48px] max-w-[700px] leading-[1.15]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        We&apos;ve Got the Answers You&apos;re Looking For
      </h2>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="bg-card/50 backdrop-blur-md border border-border rounded-3xl p-6 md:p-8">
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
