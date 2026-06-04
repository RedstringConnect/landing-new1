"use client";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Users, Calendar, DollarSign, Lock, Sparkles, X, Minus, Plus } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";

const Dithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

export function PlannerHero() {
  const [role, setRole] = useState("");
  const [headcount, setHeadcount] = useState<number | string>(1);
  const [email, setEmail] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const ditherColor = mounted && resolvedTheme === "dark" ? "#ffffff" : "#000000";
  const numHeadcount = typeof headcount === 'number' ? headcount : (parseInt(headcount as string) || 1);
  const candidates = numHeadcount * 12;
  const cost = numHeadcount * 4500;
  const time = Math.max(4, Math.ceil(numHeadcount * 1.5));

  const handleGenerate = () => {
    if (role && headcount) {
      setHasGenerated(true);
    }
  };

  const handleUnlock = () => {
    if (email && role && headcount) {
      router.push(`/tools/thankyou?tool=hiring-planner&role=${encodeURIComponent(role)}&headcount=${encodeURIComponent(headcount)}`);
    }
  };

  return (
    <section 
      className="relative h-screen min-h-[650px] md:min-h-[750px] pt-[80px] md:pt-[100px] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Dithering Effect */}
      <Suspense fallback={<div className="absolute inset-x-4 top-16 bottom-0 md:inset-x-16 md:inset-be-40 bg-muted/20 rounded-xl" />}>
        <div className="absolute inset-x-4 top-16 bottom-0 md:inset-bs-16 md:inset-x-16 md:inset-be-0 z-0 pointer-events-none opacity-[0.08] dark:opacity-[0.15] overflow-hidden">
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

      {/* Framing Borders */}
      <div className="pointer-events-none absolute inset-x-0 top-16 h-px w-full bg-border z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full bg-border z-10" />

      <div className="relative z-10 w-full max-w-[1200px] px-6 lg:px-12 flex flex-col items-center justify-between h-full">
        
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[800px] mt-4 md:mt-8">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-denton text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] text-foreground font-[540] tracking-tight text-center mb-6"
          >
            Hiring Planner
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-[16px] md:text-[18px] text-muted-foreground text-center max-w-[540px] text-balance leading-relaxed"
          >
            Input your hiring requirements to instantly calculate the candidates, timeline, and budget needed to hit your targets.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[800px] mt-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between w-full py-2 px-3 rounded-full md:rounded-full bg-background border border-border shadow-md transition-all duration-300 hover:shadow-lg">
              
              <div className="flex flex-col md:flex-row items-center w-full divide-y md:divide-y-0 md:divide-x divide-border">
                
                {/* Role Input */}
                <div className="flex items-center px-6 w-full md:w-[50%] relative">
                  <AnimatePresence>
                    {role && (
                      <motion.label 
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-2.5 left-6 text-[9px] font-bold text-muted-foreground tracking-widest pointer-events-none"
                      >
                        Target Role
                      </motion.label>
                    )}
                  </AnimatePresence>
                  <input 
                    type="text" 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`w-full bg-transparent focus:outline-none text-[15px] md:text-[16px] text-foreground font-medium placeholder-muted-foreground/40 transition-all ${role ? 'pt-6 pb-2' : 'py-4'}`}
                    placeholder="Target Role (e.g. Frontend Engineer)"
                  />
                </div>

                {/* Headcount Input */}
                <div className="flex items-center gap-4  px-6 w-full md:w-[50%] h-[56px] md:h-[60px]">
                  <label className="text-sm font-semibold text-[#737373]  tracking-widest pointer-events-none">
                    Headcount:
                  </label>
                  
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <button 
                      onClick={() => setHeadcount(Math.max(1, (Number(headcount) || 0) - 1))}
                      className="w-7 h-7 md:w-6 md:h-6 rounded-full flex items-center justify-center bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors shrink-0 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>

                    <input 
                      type="number" 
                      value={headcount}
                      onChange={(e) => setHeadcount(e.target.value)}
                      min="1"
                      className="w-10 md:min-w-10 bg-transparent text-center focus:outline-none text-[15px] md:text-[16px] text-foreground font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                    />

                    <button 
                      onClick={() => setHeadcount((Number(headcount) || 0) + 1)}
                      className="w-7 h-7 md:w-6 md:h-6 rounded-full flex items-center justify-center bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors shrink-0 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Calculate Button - Inner Radius = Outer Radius (32/24) - Padding (6) */}
              <button 
                onClick={handleGenerate}
                disabled={!role || !headcount}
                className="w-full md:w-auto px-8 py-3.5 md:py-4 rounded-[18px] md:rounded-full bg-foreground text-background text-[14px] md:text-[15px] font-medium flex items-center justify-center gap-2 shrink-0 hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed group mt-2 md:mt-0"
              >
                <Sparkles className="w-4 h-4" />
                Calculate
              </button>

            </div>
          </motion.div>
        </div>


        {/* Lead Magnet Drawer */}
        <Drawer open={hasGenerated} onOpenChange={setHasGenerated}>
          <DrawerContent className=" mx-auto w-[calc(100%-2rem)] max-w-[800px] rounded-t-[24px]! md:rounded-t-[32px]! bg-background/95 backdrop-blur-xl border border-border shadow-2xl p-0 outline-none">
             <DrawerTitle title="Your Hiring Bluepring" className="sr-only"/>
             <div className="relative p-6 md:p-8 flex flex-col lg:flex-row items-center gap-6 md:gap-8 w-full">
                
                <DrawerClose asChild>
                  <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors z-10 cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </DrawerClose>

                <div className="flex items-start gap-4 flex-1 w-full pt-4 lg:pt-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left mt-1">
                    <h3 className="text-[18px] md:text-[20px] font-medium text-foreground tracking-tight mb-1.5">Unlock Your Hiring Blueprint</h3>
                    <p className="text-[13px] md:text-[14px] text-muted-foreground leading-relaxed">Enter your work email to reveal your calculated timeline, budget, and funnel targets.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 shrink-0">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="work@company.com" 
                    className="w-full sm:w-[240px] bg-secondary/50 border border-border rounded-full px-5 py-3.5 text-[14px] focus:outline-none focus:border-foreground focus:bg-background transition-colors" 
                  />
                  <button 
                    onClick={handleUnlock}
                    disabled={!email}
                    className="shrink-0 bg-foreground text-background px-6 py-3.5 rounded-full text-[14px] font-medium hover:bg-foreground/90 hover:-translate-y-0.5 transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Unlock Report
                  </button>
                </div>
             </div>
          </DrawerContent>
        </Drawer>

      </div>
    </section>
  );
}
