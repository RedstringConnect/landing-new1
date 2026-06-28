import { notFound } from "next/navigation";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToolHero } from "@/components/tools/ToolHero";
import { ToolWhy } from "@/components/tools/ToolWhy";
import { ToolHow } from "@/components/tools/ToolHow";
import { ToolFAQ } from "@/components/tools/ToolFAQ";
import { FinalCTA } from "@/components/FinalCTA";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const filePath = path.join(process.cwd(), "content", "tools.json");
    const fileContents = await fs.promises.readFile(filePath, "utf8");
    const tools = JSON.parse(fileContents) as Array<{ slug: string; meta?: { title?: string; description?: string } }>;
    const tool = tools.find((t) => t.slug === slug);
    if (tool?.meta) {
      return {
        title: tool.meta.title ? `${tool.meta.title} | Redstring` : undefined,
        description: tool.meta.description,
      };
    }
  } catch {}
  return {
    title: `${slug.replace(/-/g, ' ')} | Redstring`,
    description: `Learn how to optimize your hiring with Redstring's ${slug.replace(/-/g, ' ')} tool.`,
  };
}

// Disable caching for this route so we don't need to rebuild when JSON changes during dev
export const dynamic = "force-dynamic";

// Simple typed interface based on our JSON structure
interface ToolData {
  slug: string;
  meta: any;
  form: any;
  whySection: any;
  howSection: any;
  faqs: any[];
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  // Read JSON from file system (this can be swapped with a fetch to a DB later!)
  const filePath = path.join(process.cwd(), "content", "tools.json");
  let tools: ToolData[] = [];
  
  try {
    const fileContents = await fs.promises.readFile(filePath, "utf8");
    tools = JSON.parse(fileContents);
  } catch (error) {
    console.error("Failed to load tools.json", error);
  }

  const resolvedParams = await params;
  const toolData = tools.find((t) => t.slug === resolvedParams.slug);

  if (!toolData) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen w-full overflow-x-clip">
      <Navbar />
      <main>
        <ToolHero slug={toolData.slug} meta={toolData.meta} form={toolData.form} />
        {toolData.whySection && <ToolWhy data={toolData.whySection} />}
        {toolData.howSection && <ToolHow data={toolData.howSection} />}
        {toolData.faqs && <ToolFAQ faqs={toolData.faqs} />}
        <div className="w-full h-px bg-border" />
        <FinalCTA />
        <div className="w-full h-px bg-border" />
      </main>
      <Footer />
    </div>
  );
}
