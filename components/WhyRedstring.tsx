"use client";
import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const ImageDithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.ImageDithering }))
);

type FeaturesType = {
  title: string;
  description: string;
  gradient: string;
  image: string;
}

const features:FeaturesType[] = [
  {
    title: "AI-Powered Screening",
    description:
      "Automatically evaluate candidates based on your custom criteria. Our AI learns what matters most to your team and surfaces the best matches instantly.",
    gradient: "from-primary/20 to-primary/0",
    image: "/whyredstring/ranking.png",
  },
  {
    title: "Collaborative Hiring",
    description:
      "Bring your entire team into the hiring process. Share feedback, score candidates, and make decisions together with real-time collaboration tools.",
    gradient: "from-primary/20 to-primary/0",
    image: "/whyredstring/collab.png",
  },
  {
    title: "Pipeline Analytics",
    description:
      "Track every stage of your hiring funnel with deep analytics. Identify bottlenecks, optimize your process, and hire faster with data-driven insights.",
    gradient: "from-primary/20 to-primary/0",
    image: "/whyredstring/analytics.png",
  },
];

function FeatureCardImage({ feature, ditherColor }: { feature: FeaturesType, ditherColor: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[160px] md:h-auto md:aspect-4/3 overflow-hidden rounded-t-[16px] md:rounded-t-[28px] rounded-b-[12px] md:rounded-b-[24px] bg-secondary shrink-0 z-10">
      <Image src={feature.image} alt={feature.title} width={500} height={500} className="absolute inset-0 w-full h-full object-cover" />
      
      <div className="absolute inset-0 transition-transform duration-1200 ease-out z-10">
        {dimensions.width > 0 && dimensions.height > 0 && (
          <ImageDithering
            width={dimensions.width}
            height={dimensions.height}
            image={feature.image}
            colorBack="#00000000"
            colorFront={ditherColor}
            colorHighlight="#875bf7"
            originalColors={true}
            inverted={false}
            type="2x2"
            size={1}
            colorSteps={4}
            fit="cover"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-linear-to-t translate-y-12 from-card via-transparent to-transparent opacity-80 pointer-events-none z-20" />
    </div>
  );
}

export function WhyRedstring() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const ditherColor = mounted && resolvedTheme === "dark" ? "#ffffff" : "#000000";

  return (
    <section className="py-[48px] md:py-[120px] flex flex-col items-center" id="about">
      <h2
        className="font-[540] font-denton text-foreground text-[24px] md:text-[44px] lg:text-[48px] text-center mb-[28px] md:mb-[64px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Why Redstring
      </h2>

      <div className="max-w-[1280px] mx-auto px-6 md:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-[24px]">
        {features.map((feature, i) => (
          <div
            key={i}
            className="group relative bg-card border border-border rounded-[16px] md:rounded-[32px] transition-all duration-500 flex flex-col overflow-hidden shadow-sm hover:shadow-lg p-1"
          >
            <Suspense fallback={<div className="w-full h-[160px] md:h-auto md:aspect-4/3 bg-muted animate-pulse shrink-0 z-10" />}>
              {mounted && <FeatureCardImage feature={feature} ditherColor={ditherColor} />}
            </Suspense>

            <div className="relative z-10 flex flex-col gap-1 md:gap-2 pb-4 md:pb-8 pt-3 md:pt-4 px-3 md:px-2 bg-card">
              <h3
                className="text-foreground text-[15px] md:text-[22px] font-semibold tracking-tight"
                style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-[13px] md:text-[15px] text-muted-foreground leading-relaxed"
                style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
              >
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
