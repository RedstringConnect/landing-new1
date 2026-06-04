"use client";
import React, { useState, useEffect, Suspense, lazy, useRef } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Sparkles, X, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
} from "@/components/ui/drawer";

const Dithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

const CURRENT_STATUS_OPTIONS = [
  "Pre-product",
  "MVP Ready",
  "Post-Revenue",
  "Scaling",
];

function CustomDropdown({ 
  label, 
  value, 
  options, 
  onChange, 
  placeholder,
  className,
  forceLabel
}: { 
  label: string; 
  value: string; 
  options: string[]; 
  onChange: (val: string) => void;
  placeholder: string;
  className?: string;
  forceLabel?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && listRef.current) {
      setCanScroll(listRef.current.scrollHeight > listRef.current.clientHeight);
    }
  }, [isOpen, options]);

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      setCanScroll(scrollTop + clientHeight < scrollHeight - 2);
    }
  };

  return (
    <div ref={dropdownRef} className={`flex items-center w-full relative h-[64px] lg:h-[72px] ${className || "px-6"}`}>
      <AnimatePresence>
        {(value || forceLabel) && (
          <motion.label 
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute top-2.5 left-6 text-[9px] font-bold text-muted-foreground tracking-widest pointer-events-none z-10"
          >
            {label}
          </motion.label>
        )}
      </AnimatePresence>
      
      <div 
        className="w-full relative h-full flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`w-full bg-transparent focus:outline-none text-[15px] md:text-[16px] text-foreground font-medium transition-all ${value || forceLabel ? 'pt-6 pb-2' : 'py-4'}`}>
          {value || <span className="text-muted-foreground/40">{placeholder}</span>}
        </div>
        <div className="absolute right-0 pointer-events-none flex items-center justify-center h-full">
          <ChevronDown className="w-4 h-4 text-muted-foreground/60" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <div className="relative w-full rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden bg-background/80 backdrop-blur-xl border border-border">
              <div 
                ref={listRef}
                onScroll={handleScroll}
                className="w-full max-h-[250px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-2 flex flex-col gap-0.5"
              >
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(opt);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm rounded-xl transition-all duration-200 shrink-0 ${
                      value === opt 
                        ? "bg-foreground/10 text-foreground font-semibold" 
                        : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground font-medium"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              
              {/* Scroll Indicator Arrow */}
              <AnimatePresence>
                {canScroll && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none flex items-center justify-center w-6 h-6 rounded-full bg-background/90 shadow-sm border border-border/50"
                  >
                    <ChevronDown className="w-3.5 h-3.5 text-foreground/60" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function UnitDropdown({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative flex items-center cursor-pointer text-foreground font-medium text-[15px] md:text-[16px] pl-2" onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}>
      <span>{value}</span>
      <ChevronDown className="w-4 h-4 text-muted-foreground/60 ml-1 shrink-0" />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 z-50 min-w-[120px]"
          >
            <div className="w-full rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden bg-background/80 backdrop-blur-xl border border-border p-1.5 flex flex-col gap-0.5">
              {["Lakhs", "Crores"].map((opt) => (
                <button
                  key={opt}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-xl transition-all duration-200 shrink-0 ${
                    value === opt 
                      ? "bg-foreground/10 text-foreground font-semibold" 
                      : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground font-medium"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const formSchema = z.object({
  currentStatus: z.string().min(1, "Please select a status"),
  budgetNumber: z.coerce.number().positive("Budget must be greater than 0"),
  primaryGoal: z.string().min(5, "Goal is too short"),
});

const emailSchema = z.object({
  email: z.string().email("Please enter a valid work email"),
});

export function RunwayHero() {
  const budgetInputRef = useRef<HTMLInputElement>(null);
  const [currentStatus, setCurrentStatus] = useState("");
  const [budgetNumber, setBudgetNumber] = useState("");
  const [budgetDenomination, setBudgetDenomination] = useState("Lakhs");
  const [isBudgetFocused, setIsBudgetFocused] = useState(false);
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [email, setEmail] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const ditherColor = mounted && resolvedTheme === "dark" ? "#ffffff" : "#000000";

  const handleGenerate = () => {
    const result = formSchema.safeParse({ currentStatus, budgetNumber, primaryGoal });
    if (result.success) {
      setErrors({});
      setHasGenerated(true);
    } else {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(e => {
        if (e.path[0]) fieldErrors[e.path[0].toString()] = e.message;
      });
      setErrors(fieldErrors);
    }
  };

  const handleUnlock = () => {
    const result = emailSchema.safeParse({ email });
    if (result.success) {
      setErrors((prev) => ({ ...prev, email: "" }));
      const parsedBudget = `${budgetNumber} ${budgetDenomination}`;
      router.push(`/tools/thankyou?tool=runway-to-roi&status=${encodeURIComponent(currentStatus)}&budget=${encodeURIComponent(parsedBudget)}&goal=${encodeURIComponent(primaryGoal)}`);
    } else {
      setErrors((prev) => ({ ...prev, email: result.error.issues[0].message }));
    }
  };

  return (
    <section 
      className="relative min-h-[750px] md:min-h-[850px] pt-[100px] md:pt-[120px] pb-[80px] flex flex-col items-center justify-center overflow-x-clip"
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
            Runway to ROI
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-[16px] md:text-[18px] text-muted-foreground text-center max-w-[640px] text-balance leading-relaxed"
          >
            Tell us your stage, the outcome you need next, and the budget allocated for this phase. We&apos;ll calculate the leanest team, compensation bands, and capital split to move that goal forward.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[1000px] mt-8"
          >
            <div className="flex flex-col w-full bg-background border border-border rounded-[24px] lg:rounded-[32px] shadow-md transition-all duration-300 hover:shadow-lg divide-y divide-border">
              
              {/* Row 1 */}
              <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-border">
                
                <div className="w-full lg:w-1/2 relative">
                  <CustomDropdown
                    label={errors.currentStatus || "Current Status"}
                    value={currentStatus}
                    options={CURRENT_STATUS_OPTIONS}
                    onChange={(val) => {
                      setCurrentStatus(val);
                      if (errors.currentStatus) setErrors((prev) => ({ ...prev, currentStatus: "" }));
                    }}
                    placeholder="Select Status"
                    className={`px-6 transition-colors ${errors.currentStatus ? "text-destructive" : ""}`}
                    forceLabel={!!errors.currentStatus}
                  />
                </div>

                {/* Total Budget Allocation Input */}
                <div 
                  className="flex items-center w-full lg:w-1/2 relative h-[64px] lg:h-[72px] px-6 cursor-text"
                  onClick={() => budgetInputRef.current?.focus()}
                >
                  <AnimatePresence>
                    {(budgetNumber || isBudgetFocused || errors.budgetNumber) && (
                      <motion.label 
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-2.5 left-6 text-[9px] font-bold tracking-widest pointer-events-none z-10 ${errors.budgetNumber ? "text-destructive" : "text-muted-foreground"}`}
                      >
                        {errors.budgetNumber || "Budget Allocation"}
                      </motion.label>
                    )}
                  </AnimatePresence>
                  
                  <div className={`flex w-full items-center transition-all ${budgetNumber || isBudgetFocused || errors.budgetNumber ? 'pt-6 pb-2' : 'py-4'}`}>
                    <div className="grid items-center max-w-full">
                      {/* Invisible span purely for measuring text width */}
                      <span 
                        className="col-start-1 row-start-1 invisible whitespace-pre min-w-[10px] text-[15px] md:text-[16px] font-medium pointer-events-none"
                        aria-hidden="true"
                      >
                        {budgetNumber || "30"}
                      </span>
                      <input 
                        ref={budgetInputRef}
                        type="number" 
                        value={budgetNumber}
                        onFocus={() => setIsBudgetFocused(true)}
                        onBlur={() => setIsBudgetFocused(false)}
                        onChange={(e) => {
                          setBudgetNumber(e.target.value);
                          if (errors.budgetNumber) setErrors((prev) => ({ ...prev, budgetNumber: "" }));
                        }}
                        className="col-start-1 row-start-1 w-full min-w-0 bg-transparent focus:outline-none text-[15px] md:text-[16px] text-foreground font-medium placeholder-muted-foreground/40 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                        placeholder="30"
                      />
                    </div>
                    
                    <UnitDropdown 
                      value={budgetDenomination} 
                      onChange={setBudgetDenomination} 
                    />
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-border">
                {/* Primary Goal Input */}
                <div className="flex items-center px-6 w-full relative h-[64px] lg:h-[72px]">
                  <AnimatePresence>
                    {(primaryGoal || errors.primaryGoal) && (
                      <motion.label 
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-2.5 left-6 text-[9px] font-bold tracking-widest pointer-events-none ${errors.primaryGoal ? "text-destructive" : "text-muted-foreground"}`}
                      >
                        {errors.primaryGoal || "Primary Goal"}
                      </motion.label>
                    )}
                  </AnimatePresence>
                  <input 
                    type="text" 
                    value={primaryGoal}
                    onChange={(e) => {
                      setPrimaryGoal(e.target.value);
                      if (errors.primaryGoal) setErrors((prev) => ({ ...prev, primaryGoal: "" }));
                    }}
                    className={`w-full bg-transparent focus:outline-none text-[15px] md:text-[16px] text-foreground font-medium placeholder-muted-foreground/40 transition-all ${primaryGoal || errors.primaryGoal ? 'pt-6 pb-2' : 'py-4'}`}
                    placeholder="Goal (e.g. Expand to a new market)"
                  />
                </div>
              </div>

              {/* Calculate Button Row */}
              <div className="p-2 bg-secondary/10 rounded-b-[24px] lg:rounded-b-[32px]">
                <button 
                  onClick={handleGenerate}
                  className="w-full h-[56px] rounded-[20px] lg:rounded-[24px] bg-foreground text-background text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Sparkles className="w-4 h-4" />
                  Calculate ROI
                </button>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Lead Magnet Drawer */}
        <Drawer open={hasGenerated} onOpenChange={setHasGenerated}>
          <DrawerContent className=" mx-auto w-[calc(100%-2rem)] max-w-[800px] rounded-t-[24px]! md:rounded-t-[32px]! bg-background/95 backdrop-blur-xl border border-border shadow-2xl p-0 outline-none">
             
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
                    <h3 className="text-[18px] md:text-[20px] font-medium text-foreground tracking-tight mb-1.5">Unlock Your Hiring Roadmap</h3>
                    <p className="text-[13px] md:text-[14px] text-muted-foreground leading-relaxed">Enter your work email to reveal your leanest team setup and capital split.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 shrink-0">
                  <div className="flex flex-col w-full sm:w-[240px] relative">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      placeholder="work@company.com" 
                      className={`w-full bg-secondary/50 border rounded-full px-5 py-3.5 text-[14px] focus:outline-none focus:bg-background transition-colors ${errors.email ? "border-destructive text-destructive" : "border-border focus:border-foreground"}`} 
                    />
                    {errors.email && (
                      <span className="text-[11px] text-destructive mt-1.5 ml-4 absolute -bottom-5 left-0">{errors.email}</span>
                    )}
                  </div>
                  <button 
                    onClick={handleUnlock}
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
