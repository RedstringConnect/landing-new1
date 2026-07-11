"use client"
import { Suspense, lazy, useState , useEffect} from "react";
import { useTheme } from "next-themes";
import { DotFlow } from "@/components/ui/dot-flow";
import { BookDemoButton } from "@/components/ui/book-demo-button";
import { ctaItems } from "@/components/HeroSection";
import { PhoneAnimation } from "@/components/ui/PhoneAnimation";

const Dithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

export function FinalCTA() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
    });
     return () => cancelAnimationFrame(id);
   }, []);

  const ditherColor = resolvedTheme === "dark" ? "#ffffff" : "#ed0004";

  return (
    <section className="py-16 md:py-28 relative px-6 md:px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20" id="cta">
      {/* Background Dithering from old layout */}
      <Suspense fallback={<div className="absolute inset-x-4 top-16 bottom-0 md:inset-x-16 md:inset-be-40 bg-muted/20 rounded-xl z-0" />}>
        <div className="absolute inset-x-4 top-0 bottom-0 md:inset-x-16 z-0 pointer-events-none opacity-10 dark:opacity-20 overflow-hidden rounded-xl">
          {mounted && (
            <Dithering
              colorBack="#00000000"
              colorFront={ditherColor}  
              shape="simplex"
              type="4x4"
              speed={0.15}
              className="size-full"
              minPixelRatio={1}
            />
          )}
        </div>
      </Suspense>

      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20 z-10 relative">
        {/* Left Column */}
        <div className="flex-1 flex flex-col items-start w-full">
          <h2
            className="font-bold font-denton text-foreground text-[28px] md:text-5xl lg:text-6xl leading-tight max-w-xl"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Want to hire <br/> <span className="text-primary">10x faster?</span>
          </h2>

          <p
            className="mt-6 text-[15px] md:text-xl text-muted-foreground leading-relaxed max-w-lg"
            style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
          >
            Eliminate the manual effort in hiring by removing sheets, email tools and organise the data. Interesting?
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <DotFlow items={ctaItems} href="https://loopx.redstring.co.in" className="w-fit sm:w-auto justify-center" />
            <BookDemoButton variant="secondary" size="md" className="w-fit sm:w-auto" />
          </div>

          <p className="mt-10 text-sm md:text-base text-muted-foreground max-w-sm leading-relaxed italic font-medium opacity-80">
            Lets discuss your Hiring plans and grow your team together with Redstring
          </p>
        </div>

        {/* Right Column / Animation Container */}
        <div className="w-full lg:flex-1 lg:max-w-[480px]">
          <PhoneAnimation />
        </div>
      </div>
    </section>
  );
}
