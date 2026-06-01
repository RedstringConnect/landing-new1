"use client";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { useTheme } from "next-themes";

const ImageDithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.ImageDithering }))
);

const features = [
  {
    title: "AI-Powered Screening",
    description:
      "Automatically evaluate candidates based on your custom criteria. Our AI learns what matters most to your team and surfaces the best matches instantly.",
    gradient: "from-primary/20 to-primary/0",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Collaborative Hiring",
    description:
      "Bring your entire team into the hiring process. Share feedback, score candidates, and make decisions together with real-time collaboration tools.",
    gradient: "from-primary/20 to-primary/0",
    image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Pipeline Analytics",
    description:
      "Track every stage of your hiring funnel with deep analytics. Identify bottlenecks, optimize your process, and hire faster with data-driven insights.",
    gradient: "from-primary/20 to-primary/0",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop",
  },
];

export function WhyRedstring() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const ditherColor = mounted && resolvedTheme === "dark" ? "#ffffff" : "#000000";

  return (
    <section className="py-[120px] flex flex-col items-center" id="about">
      <h2
        className="font-[540] font-denton text-foreground text-[36px] md:text-[44px] lg:text-[48px] text-center mb-[64px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Why Redstring
      </h2>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {features.map((feature, i) => (
          <div
            key={i}
            className="group relative bg-card border border-border rounded-3xl hover:border-primary/50 transition-all duration-500 flex flex-col overflow-hidden shadow-sm hover:shadow-xl"
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

            {/* ImageDithering Full Width Square Header */}
            <div className="relative w-full aspect-4/3 border-b border-border/50 overflow-hidden bg-secondary shrink-0 z-10">
              <Suspense fallback={<div className="w-full h-full bg-muted animate-pulse" />}>
                {mounted && (
                  <div className="w-full h-full transition-transform duration-1200 ease-out">
                    <ImageDithering
                      width={600}
                      height={600}
                      image={feature.image}
                      colorBack="#00000000"
                      colorFront={ditherColor}
                      colorHighlight="#875bf7"
                      originalColors={false}
                      inverted={false}
                      type="2x2"
                      size={2}
                      colorSteps={2}
                      fit="cover"
                    />
                  </div>
                )}
              </Suspense>
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80 pointer-events-none" />
            </div>

            <div className="relative z-10 flex flex-col gap-[12px] p-8 mt-auto bg-card">
              <h3
                className="text-foreground text-[22px] font-[600] tracking-tight"
                style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-[15px] text-muted-foreground leading-relaxed"
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
