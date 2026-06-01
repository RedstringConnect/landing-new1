"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "What is Redstring and how does it work?",
    answer:
      "Redstring is an AI-powered hiring operating system that automates candidate sourcing, screening, and interview scheduling. It connects to 50+ platforms, uses smart algorithms to match candidates to your criteria, and streamlines your entire hiring workflow.",
  },
  {
    question: "How does AI-powered screening work?",
    answer:
      "Our AI analyzes resumes, portfolios, and profiles against your custom criteria. It learns from your team's hiring patterns and continuously improves its matching accuracy, helping you identify the best candidates faster than manual review.",
  },
  {
    question: "Can I collaborate with my team on hiring?",
    answer:
      "Absolutely. Redstring is built for team hiring. Share candidate profiles, leave structured feedback, score applicants, and make data-driven hiring decisions together — all in real-time with built-in collaboration tools.",
  },
  {
    question: "What platforms does Redstring integrate with?",
    answer:
      "Redstring integrates with 50+ sourcing platforms including LinkedIn, Indeed, GitHub, AngelList, and more. We also connect with your existing tools like Slack, email, calendar, and ATS systems for a seamless workflow.",
  },
  {
    question: "How long does it take to set up?",
    answer:
      "Most teams are up and running in under 15 minutes. Simply create your account, define your hiring criteria, and start sourcing candidates. Our onboarding wizard guides you through every step.",
  },
  {
    question: "Is there a free plan available?",
    answer:
      "Yes! Redstring offers a generous free tier that includes AI screening for up to 50 candidates per month, basic collaboration features, and access to our core sourcing tools. Upgrade anytime for unlimited usage.",
  },
];

function FAQItem({ question, answer }: (typeof faqs)[0]) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span
          className="text-[16px] md:text-[18px] text-foreground font-[500] group-hover:text-primary transition-colors pr-8"
          style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
        >
          {question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[300px] opacity-100 pb-5" : "max-h-0 opacity-0"
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

export function FAQ() {
  return (
    <section className="py-[120px] flex flex-col items-center">
      <h2
        className="font-[540] font-denton text-foreground text-[28px] md:text-[36px] lg:text-[48px] text-center mb-[48px] max-w-[700px] leading-[1.15]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        We&apos;ve Got the Answers You&apos;re Looking For
      </h2>

      <div className="max-w-[988px] mx-auto px-6 lg:px-8 w-full bg-card border border-border rounded-2xl p-6 md:p-8">
        {faqs.map((faq, i) => (
          <FAQItem key={i} {...faq} />
        ))}
      </div>
    </section>
  );
}
