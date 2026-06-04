"use client";

import React, { Suspense, lazy, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HiringPlannerResult } from "@/components/thankyou/HiringPlannerResult";
import { GenericDownloadResult } from "@/components/thankyou/GenericDownloadResult";
import { LoopXPromo } from "@/components/thankyou/LoopXPromo";
import { RedstringPromo } from "@/components/thankyou/RedstringPromo";

const Dithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

function ThankYouContent() {
  const searchParams = useSearchParams();
  const tool = searchParams.get("tool");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const ditherColor = mounted && resolvedTheme === "dark" ? "#ffffff" : "#000000";
  
  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* Hero Result Section */}
      <section className="relative min-h-[650px] md:min-h-[750px] pt-[120px] pb-[60px] md:pt-[160px] md:pb-[100px] flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Dithering Effect */}
        <Suspense fallback={<div className="absolute inset-x-4 top-16 bottom-0 md:inset-x-16 md:inset-be-40 bg-muted/20 rounded-xl" />}>
          <div className="absolute inset-x-4 top-16 bottom-0 md:inset-bs-16 md:inset-x-16 md:inset-be-0 z-0 pointer-events-none opacity-[0.08] dark:opacity-[0.15] overflow-hidden">
            {mounted && (
              <Dithering
                colorBack="#00000000"
                colorFront={ditherColor}  
                shape="warp"
                type="4x4"
                speed={0.15}
                className="size-full"
                minPixelRatio={1}
              />
            )}
          </div>
        </Suspense>

        {/* Framing Borders */}
        <div className="pointer-events-none absolute inset-x-0 top-16 h-px w-full bg-border z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full bg-border z-10" />

        <div className="relative z-10 w-full max-w-[1200px] px-6 lg:px-12 mx-auto">
          {tool === "hiring-planner" ? (
            <HiringPlannerResult 
              role={searchParams.get("role") || "Software Engineer"} 
              headcount={parseInt(searchParams.get("headcount") || "1")} 
            />
          ) : (
            <GenericDownloadResult title={searchParams.get("title") || "Your Report"} />
          )}
        </div>
      </section>

      {/* Promos Section */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="w-full max-w-[1200px] px-6 lg:px-12 mx-auto flex flex-col gap-8 md:gap-12">
          <LoopXPromo />
          <RedstringPromo />
        </div>
      </section>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <div className="bg-background min-h-screen w-full overflow-x-clip">
      <Navbar />
      <main>
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
          <ThankYouContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
