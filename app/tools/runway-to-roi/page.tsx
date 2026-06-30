import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToolHero } from "@/components/tools/ToolHero";
import { ToolWhy } from "@/components/tools/ToolWhy";
import { ToolHow } from "@/components/tools/ToolHow";
import { ToolFAQ } from "@/components/tools/ToolFAQ";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Runway to ROI Calculator | Redstring",
  description: "Tell us your stage, the outcome you need next, and the budget allocated for this phase. We'll calculate the leanest team, compensation bands, and capital split to move that goal forward.",
};

export default function RunwayToRoiPage() {
  const meta = {
    title: "Runway to ROI",
    description: "Tell us your stage, the outcome you need next, and the budget allocated for this phase. We'll calculate the leanest team, compensation bands, and capital split to move that goal forward."
  };

  const form = {
    buttonText: "Calculate ROI",
    systemPrompt: "PLACEHOLDER: You are an expert hiring planner. Given the user's status, budget, and goal, output a lean roadmap.",
    rows: [
      [
        { name: "currentStatus", type: "dropdown" as const, label: "Current Status", placeholder: "Select Status", options: ["Pre-product", "MVP Ready", "Post-Revenue", "Scaling"] },
        { name: "budget", type: "numberWithUnit" as const, label: "Budget Allocation", placeholder: "30", units: ["Lakhs", "Crores"] }
      ],
      [
        { name: "goal", type: "text" as const, label: "Primary Goal", placeholder: "Goal (e.g. Expand to a new market)" }
      ]
    ],
    drawer: {
      title: "Unlock Your Hiring Roadmap",
      description: "Enter your work email to reveal your leanest team setup and capital split.",
      buttonText: "Unlock Report"
    }
  };

  const whySection = {
    title: "Why Hiring planner",
    cards: [
      { title: "Hire with Purpose", description: "Know exactly which roles your business needs based on your current stage and growth objectives not assumptions.", icon: "crosshair", layout: "large" as const },
      { title: "Protect Your Runway", description: "Build a hiring roadmap that balances team growth with available budget, helping you avoid overhiring while investing in the roles that matter most.", icon: "hourglass", layout: "small" as const },
      { title: "Plan for Sustainable Growth", description: "Receive a structured hiring strategy that evolves with your company, making it easier to scale your team as your business grows.", icon: "chevron", layout: "small" as const },
      { title: "Every Hire Is an Investment", description: "The Hiring Planner gives you a strategic hiring roadmap so you can invest in the roles that create the greatest impact, avoid unnecessary hiring costs, and build a team that's ready for your next stage of growth.", icon: "chartRadar", layout: "large" as const }
    ]
  };

  const howSection = {
    title: "How it works",
    steps: [
      { step: "01", title: "Tell us your requirements", description: "Answer a few simple questions about your company, role, or hiring goals. The more context you provide, the better the output.", icon: "sliders" },
      { step: "02", title: "Get Actionable Recommendations", description: "Receive a report that's practical, not generic.", icon: "math" },
      { step: "03", title: "Put it into action", description: "Take the insights and start building your lean hiring roadmap immediately.", icon: "download" }
    ]
  };

  const faqs = [
    { question: "What is the Runway-to-ROI Hiring Planner?", answer: "The Runway-to-ROI Hiring Planner helps founders determine who to hire, when to hire, and how to allocate their hiring budget based on their current stage, business goals, and available runway." },
    { question: "How does the Hiring Planner make recommendations?", answer: "Based on your company's stage, available budget, and primary business goal, the planner suggests a lean hiring roadmap, recommended roles, compensation bands, and budget allocation to maximize impact." },
    { question: "Does this tool replace HR or recruitment planning?", answer: "No. The Hiring Planner is designed to support strategic workforce planning, helping you decide what roles to hire before you begin the recruitment process." },
    { question: "How accurate are the recommendations?", answer: "The recommendations are based on proven startup hiring principles, workforce planning strategies, and the information you provide. They are intended to guide decision-making rather than replace business judgment." },
    { question: "Can I use this tool if I'm an early-stage startup?", answer: "Absolutely. Whether you're pre-revenue, bootstrapped, or venture-backed, the planner helps you prioritize hires based on your current resources and growth goals." },
    { question: "Will this help me avoid overhiring?", answer: "Yes. One of the planner's primary goals is to help you build the leanest team required to achieve your next milestone while making the most of your available budget." }
  ];

  return (
    <div className="bg-background min-h-screen w-full overflow-x-clip">
      <Navbar />
      <main>
        <ToolHero slug="runway-to-roi" meta={meta} form={form} />
        <ToolWhy data={whySection} />
        <ToolHow data={howSection} />
        <ToolFAQ faqs={faqs} />
        <div className="w-full h-px bg-border" />
        <FinalCTA />
        <div className="w-full h-px bg-border" />
      </main>
      <Footer />
    </div>
  );
}
