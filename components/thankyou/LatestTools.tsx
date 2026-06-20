"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import toolsData from "@/content/tools.json";

export function LatestTools({ currentTool }: { currentTool?: string | null }) {
  // Filter out the current tool and take the first few
  const otherTools = toolsData.filter(tool => tool.slug !== currentTool);

  if (otherTools.length === 0) return null;

  return (
    <section className="py-[120px] max-w-7xl mx-auto px-6 w-full flex flex-col items-center">
      <div className="flex flex-col items-center text-center gap-4 mb-16 max-w-2xl">
        <h2 
          className="font-[540] font-denton text-foreground text-[36px] md:text-[44px] lg:text-[48px] leading-[1.1]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Explore More AI Tools
        </h2>
        <p className="text-[16px] md:text-[18px] text-muted-foreground leading-relaxed text-balance">
          Supercharge your hiring workflows with our suite of free AI-powered planning tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
        {otherTools.map((tool) => (
          <Link 
            key={tool.slug} 
            href={`/tools/${tool.slug}`}
            className="group flex flex-col justify-between bg-card/50 backdrop-blur-md border border-border rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-[20px] md:text-[22px] font-medium text-foreground tracking-tight">
                {tool.meta.title}
              </h3>
              <p className="text-[14px] md:text-[15px] text-muted-foreground leading-relaxed line-clamp-3">
                {tool.meta.description}
              </p>
            </div>
            <div className="mt-8 flex items-center text-[14px] font-medium text-primary group-hover:text-primary/80 transition-colors">
              Try this tool 
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRightIcon />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
