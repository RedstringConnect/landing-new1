import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToolHero } from "@/components/tools/ToolHero";
import { ToolWhy } from "@/components/tools/ToolWhy";
import { ToolHow } from "@/components/tools/ToolHow";
import { ToolFAQ } from "@/components/tools/ToolFAQ";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Hiring Playbook Generator | Redstring",
  description: "Stop guessing. Generate a highly customized, AI-driven hiring strategy tailored specifically for your target role and industry.",
};

export default function HiringPlaybookGeneratorPage() {
  const meta = {
    title: "Hiring Playbook Generator",
    description: "Stop guessing. Generate a highly customized, AI-driven hiring strategy tailored specifically for your target role and industry."
  };

  const form = {
    buttonText: "Generate My Playbook",
    systemPrompt: "PLACEHOLDER: You are an expert hiring manager. Generate a complete playbook for the role...",
    rows: [
      [
        { name: "companyName", type: "text" as const, label: "Company Name", placeholder: "Company (e.g. Acme Corp)" },
        { name: "industry", type: "dropdown" as const, label: "Industry", placeholder: "Select industry...", options: ["SaaS", "E-commerce", "Fintech", "Healthtech", "Edtech", "AI/ML", "Consumer", "Services"] },
        { name: "businessType", type: "dropdown" as const, label: "Business Type", placeholder: "B2B or B2C?", options: ["B2B", "B2C"] }
      ],
      [
        { name: "roleCategory", type: "dropdown" as const, label: "Role Category", placeholder: "Role Category...", options: ["Engineering", "Sales", "Marketing", "Product", "Design", "Operations", "Customer Success"] },
        { 
          name: "specificRole", 
          type: "dropdownDependent" as const, 
          label: "Specific Role", 
          placeholder: "Specific Role...", 
          dependsOn: "roleCategory",
          optionsMap: {
            "Engineering": ["Frontend Engineer", "Backend Engineer", "Full-Stack Developer", "Founding Engineer", "DevOps Engineer"],
            "Sales": ["SDR", "Account Executive", "Sales Manager", "Partnerships Manager"],
            "Marketing": ["Growth Marketer", "Performance Marketer", "Content Marketer", "Demand Generation Manager"],
            "Product": ["Product Manager", "Technical Product Manager", "Product Analyst"],
            "Design": ["Product Designer", "Brand Designer", "UX Researcher"],
            "Operations": ["Business Operations Manager", "Recruiting Coordinator", "Chief of Staff"],
            "Customer Success": ["Customer Success Manager", "Implementation Manager", "Support Lead"]
          }
        },
        { name: "seniorityLevel", type: "dropdown" as const, label: "Seniority Level", placeholder: "Seniority...", options: ["Junior", "Mid-Level", "Senior"] }
      ]
    ],
    drawer: {
      title: "Your Playbook is Ready",
      description: "Enter your work email so we can send your custom {seniorityLevel} {specificRole} hiring framework.",
      buttonText: "Unlock Playbook"
    }
  };

  const whySection = {
    title: "Why Teams Use the Hiring Playbook",
    cards: [
      { title: "Hire with Confidence", description: "Know exactly what to evaluate at every stage of the interview process with a structured framework tailored to the role you're hiring for.", icon: "chartRadar", layout: "large" as const },
      { title: "Keep Every Interviewer Aligned", description: "Ensure recruiters, founders, and hiring managers follow the same interview process, ask consistent questions, and evaluate candidates using shared criteria.", icon: "hourglass", layout: "small" as const },
      { title: "Save Hours of Preparation", description: "Skip the time spent researching interview frameworks and building documents from scratch. Generate a complete hiring playbook in minutes and start hiring with confidence.", icon: "chevron", layout: "small" as const },
      { title: "Build a Process You Can Repeat", description: "A Hiring Playbook gives every interviewer a shared framework, helping your team evaluate candidates consistently and make better hiring decisions.", icon: "crosshair", layout: "large" as const }
    ]
  };

  const howSection = {
    title: "How it works",
    steps: [
      { step: "01", title: "Tell Us About the Role", description: "Share a few details about the position you're hiring for, your company, and what you're looking for in an ideal candidate.", icon: "sliders" },
      { step: "02", title: "We Build Your Playbook", description: "Our AI analyzes your inputs and generates a tailored hiring playbook, including interview stages, evaluation criteria, interview questions, and hiring recommendations.", icon: "math" },
      { step: "03", title: "Download and start using", description: "Review your personalized playbook, download it instantly, and use it to run structured, consistent, and confident interviews.", icon: "download" }
    ]
  };

  const faqs = [
    { question: "What is the Hiring Playbook?", answer: "The Hiring Playbook is an AI-powered planning tool that creates a structured hiring strategy for any role. It helps you define interview stages, evaluation criteria, sourcing channels, interview questions, and hiring recommendations—all tailored to your requirements." },
    { question: "Who is this tool built for?", answer: "The Hiring Playbook is designed for founders, recruiters, hiring managers, HR teams, and growing businesses that want a more structured and repeatable hiring process." },
    { question: "How are the recommendations generated?", answer: "The playbook is created using the information you provide—such as your company stage, industry, role, and seniority—combined with proven hiring frameworks and best practices." },
    { question: "Can I customize the generated playbook?", answer: "Absolutely. Think of the playbook as a starting point. You can edit, expand, or adapt it to match your company's hiring philosophy and interview process." },
    { question: "Will this work for any role?", answer: "Yes. Whether you're hiring a software engineer, sales executive, designer, or operations lead, the generator creates relevant interview stages and questions based on the specific function and seniority." }
  ];

  return (
    <div className="bg-background min-h-screen w-full overflow-x-clip">
      <Navbar />
      <main>
        <ToolHero slug="hiring-playbook-generator" meta={meta} form={form} />
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
