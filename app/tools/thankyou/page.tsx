"use client";

import React, { Suspense, lazy, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getHiringPlannerData, clearHiringPlannerData } from "@/lib/store/hiringPlannerStore";
import type { HiringPlannerSessionData } from "@/lib/store/hiringPlannerStore";
import { clearPlaybookData, getPlaybookData } from "@/lib/store/playbookStore";
import type { PlaybookSessionData } from "@/lib/store/playbookStore";
import { HiringPlannerResult } from "@/components/thankyou/HiringPlannerResult";
import { HiringPlaybookResult } from "@/components/thankyou/HiringPlaybookResult";
import { GenericDownloadResult } from "@/components/thankyou/GenericDownloadResult";
import { LatestTools } from "@/components/thankyou/LatestTools";
import { FinalCTA } from "@/components/FinalCTA";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Lock, AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { hiringPlannerService } from "@/lib/services/hiringPlannerService";

const Dithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

function ThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tool = searchParams.get("tool");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Read session storage once on mount via lazy initialisers (avoids setState-in-effect lint error)
  const [plannerData] = useState<HiringPlannerSessionData | null>(() =>
    typeof window !== "undefined" && tool === "runway-to-roi" ? getHiringPlannerData() : null
  );
  const [playbookData] = useState<PlaybookSessionData | null>(() =>
    typeof window !== "undefined" && tool === "hiring-playbook-generator" ? getPlaybookData() : null
  );

  const isLockedTool = tool === "runway-to-roi" || tool === "hiring-playbook-generator";
  const [isUnlocked, setIsUnlocked] = useState(() => !isLockedTool);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [closeWarningCount, setCloseWarningCount] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleUnlock = async () => {
    const result = z.string().email("Please enter a valid work email").safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setError("");

    setIsUnlocking(true);
    try {
      if (tool === "runway-to-roi" && plannerData) {
        await hiringPlannerService.unlockPlaybook({
          email,
          input: plannerData.input,
          roadmap: plannerData.roadmap
        });
        clearHiringPlannerData();
      } else if (tool === "hiring-playbook-generator") {
        // Playbook is unlocked client-side; clear session data
        clearPlaybookData();
      }
      setIsUnlocked(true);
    } catch {
      setError("Failed to unlock. Please try again.");
    } finally {
      setIsUnlocking(false);
    }
  };

  const handleDrawerOpenChange = (open: boolean) => {
    if (!open) {
      if (closeWarningCount === 0) {
        setCloseWarningCount(1);
        // Force drawer to stay open by not updating the actual Drawer open state
      } else {
        // Second attempt -> Redirect back to tool
        router.push(`/tools/${tool}`);
      }
    }
  };

  const ditherColor = mounted && resolvedTheme === "dark" ? "#ffffff" : "#000000";
  
  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* Hero Result Section */}
      <section className="relative min-h-screen pt-[120px] pb-[60px] md:pt-[160px] md:pb-[100px] flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Dithering Effect */}
        <Suspense fallback={<div className="absolute inset-x-4 top-16 bottom-0 md:inset-x-16 md:inset-be-40 bg-muted/20 rounded-xl" />}>
          <div className="absolute inset-x-4 top-16 bottom-0 md:inset-bs-16 md:inset-x-16 md:inset-be-0 z-0 pointer-events-none opacity-[0.08] dark:opacity-[0.15] overflow-hidden">
            {mounted && (
              <Dithering colorBack="#00000000" colorFront={ditherColor} shape="warp" type="4x4" speed={0.15} className="size-full" minPixelRatio={1} />
            )}
          </div>
        </Suspense>

        <div className="pointer-events-none absolute inset-x-0 top-16 h-px w-full bg-border z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full bg-border z-10" />

        <div className={`relative z-10 w-full max-w-[1200px] px-6 lg:px-12 mx-auto transition-all duration-1000 ${!isUnlocked ? "blur-md opacity-50 select-none pointer-events-none" : ""}`}>
          {tool === "runway-to-roi" && plannerData ? (
            <HiringPlannerResult roadmap={plannerData.roadmap} input={plannerData.input} />
          ) : tool === "hiring-playbook-generator" && playbookData ? (
            <HiringPlaybookResult playbook={playbookData.playbook} input={playbookData.input} />
          ) : (
            <GenericDownloadResult title={searchParams.get("title") || "Your Report"} />
          )}
        </div>

        {/* Lock Drawer */}
        {isLockedTool && !isUnlocked && (
          <Drawer open={true} onOpenChange={handleDrawerOpenChange}>
            <DrawerContent className="mx-auto w-[calc(100%-2rem)] max-w-[800px] rounded-t-[24px]! md:rounded-t-[32px]! bg-background/95 backdrop-blur-xl border border-border shadow-2xl p-0 outline-none">
               <DrawerTitle title="Unlock Your Result" className="sr-only"/>
               <div className="relative p-6 md:p-8 flex flex-col items-center text-center w-full">
                  
                  {closeWarningCount > 0 && (
                    <div className="flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-lg mb-4 text-[13px] font-medium animate-in fade-in slide-in-from-top-2">
                      <AlertCircle className="w-4 h-4" /> Please enter your email to unlock the content. Closing again will discard your result.
                    </div>
                  )}

                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h3 className="text-[20px] md:text-[24px] font-semibold text-foreground tracking-tight mb-2">
                    {tool === "hiring-playbook-generator" ? "Your Hiring Playbook is Ready" : "Your AI Roadmap is Ready"}
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-muted-foreground leading-relaxed max-w-[400px] mb-6">
                    {tool === "hiring-playbook-generator"
                      ? "Enter your work email below to unlock your custom hiring playbook with interview stages, scorecards, and question banks."
                      : "Enter your work email below to unlock your custom capital split, hiring roster, and budget recommendations."
                    }
                  </p>
                  
                  <div className="flex flex-col sm:flex-row w-full max-w-[500px] gap-3">
                    <div className="flex flex-col w-full relative">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                        placeholder="work@company.com" 
                        className={`w-full bg-secondary/50 border rounded-full px-5 py-3.5 text-[14px] focus:outline-none focus:bg-background transition-colors ${error ? "border-destructive text-destructive" : "border-border focus:border-foreground"}`} 
                      />
                      {error && <span className="text-[12px] text-destructive mt-1.5 absolute -bottom-5 left-4">{error}</span>}
                    </div>
                    <button 
                      onClick={handleUnlock} 
                      disabled={isUnlocking}
                      className="shrink-0 bg-foreground text-background px-8 py-3.5 rounded-full text-[14px] font-medium hover:bg-foreground/90 hover:-translate-y-0.5 transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isUnlocking ? <Loader2 className="w-4 h-4 animate-spin" /> : tool === "hiring-playbook-generator" ? "Unlock Playbook" : "Unlock Report"}
                    </button>
                  </div>
               </div>
            </DrawerContent>
          </Drawer>
        )}
      </section>

      <div className="w-full h-px bg-border" />
      <LatestTools currentTool={tool} />
      <div className="w-full h-px bg-border" />
      <FinalCTA />
      <div className="w-full h-px bg-border" />
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
