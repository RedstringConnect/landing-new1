"use client";
import React, { useState, useEffect, Suspense, lazy, useRef } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Lock, X, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";
import { playbookService } from "@/lib/services/playbookService";
import { setPlaybookData } from "@/lib/store/playbookStore";
import type { HiringPlaybookInput } from "@/types/hiring-playbook";
import { hiringPlannerService } from "@/lib/services/hiringPlannerService";
import { setHiringPlannerData } from "@/lib/store/hiringPlannerStore";
import type { HiringPlannerInput, HiringPlannerCurrentStatus } from "@/types/hiring-planner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";

const Dithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

// --- Reusable UI Elements ---

function CustomDropdown({ 
  label, value, options, onChange, placeholder, disabled = false, className, forceLabel
}: { 
  label: string; value: string; options: string[]; onChange: (val: string) => void;
  placeholder: string; disabled?: boolean; className?: string; forceLabel?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && listRef.current) setCanScroll(listRef.current.scrollHeight > listRef.current.clientHeight);
  }, [isOpen, options]);

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      setCanScroll(scrollTop + clientHeight < scrollHeight - 2);
    }
  };

  return (
    <div ref={dropdownRef} className={`flex items-center w-full relative h-[64px] lg:h-[72px] ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className || "px-6"}`}>
      <AnimatePresence>
        {(value || forceLabel || disabled) && (
          <motion.label 
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.2 }}
            className="absolute top-2.5 left-6 text-[9px] font-bold text-muted-foreground tracking-widest pointer-events-none z-10"
          >
            {label}
          </motion.label>
        )}
      </AnimatePresence>
      <div className="w-full relative h-full flex items-center cursor-pointer" onClick={() => !disabled && setIsOpen(!isOpen)}>
        <div className={`w-full bg-transparent focus:outline-none text-[15px] md:text-[16px] text-foreground font-medium transition-all ${value || forceLabel || disabled ? 'pt-6 pb-2' : 'py-4'}`}>
          {value || <span className="text-muted-foreground/40">{disabled ? "Select category first" : placeholder}</span>}
        </div>
        <div className="absolute right-0 pointer-events-none flex items-center justify-center h-full">
          <ChevronDown className="w-4 h-4 text-muted-foreground/60" />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="absolute top-full left-0 right-0 mt-2 z-50">
            <div className="relative w-full rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden bg-background/80 backdrop-blur-xl border border-border">
              <div ref={listRef} onScroll={handleScroll} className="w-full max-h-[250px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none p-2 flex flex-col gap-0.5">
                {options.map((opt) => (
                  <button key={opt} onClick={(e) => { e.stopPropagation(); onChange(opt); setIsOpen(false); }} className={`w-full text-left px-4 py-3 text-sm rounded-xl transition-all duration-200 shrink-0 ${value === opt ? "bg-foreground/10 text-foreground font-semibold" : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground font-medium"}`}>
                    {opt}
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {canScroll && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none flex items-center justify-center w-6 h-6 rounded-full bg-background/90 shadow-sm border border-border/50">
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

function UnitDropdown({ value, onChange, units }: { value: string, onChange: (v: string) => void, units: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
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
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="absolute top-full right-0 mt-2 z-50 min-w-[120px]">
            <div className="w-full rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden bg-background/80 backdrop-blur-xl border border-border p-1.5 flex flex-col gap-0.5">
              {units.map((opt) => (
                <button key={opt} onClick={(e) => { e.stopPropagation(); onChange(opt); setIsOpen(false); }} className={`w-full text-left px-3 py-2 text-sm rounded-xl transition-all duration-200 shrink-0 ${value === opt ? "bg-foreground/10 text-foreground font-semibold" : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground font-medium"}`}>
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

// --- Main Component ---

interface ToolField {
  name: string;
  type: "text" | "dropdown" | "dropdownDependent" | "numberWithUnit";
  label: string;
  placeholder: string;
  options?: string[];
  units?: string[];
  dependsOn?: string;
  optionsMap?: Record<string, string[]>;
  fullWidth?: boolean;
}

interface ToolHeroProps {
  slug: string;
  meta: { title: string; description: string; };
  form: {
    buttonText: string;
    systemPrompt: string;
    rows: ToolField[][];
    drawer: { title: string; description: string; buttonText: string; }
  }
}

export function ToolHero({ slug, meta, form }: ToolHeroProps) {
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [unitState, setUnitState] = useState<Record<string, string>>(() => {
    const initialUnits: Record<string, string> = {};
    form.rows.flat().forEach(f => { if (f.type === "numberWithUnit" && f.units) initialUnits[f.name] = f.units[0]; });
    return initialUnits;
  });
  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [email, setEmail] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const ditherColor = mounted && resolvedTheme === "dark" ? "#ffffff" : "#000000";

  const handleFieldChange = (name: string, val: string) => {
    setFormState(prev => {
      const next = { ...prev, [name]: val };
      // Reset dependents
      form.rows.flat().filter(f => f.dependsOn === name).forEach(f => next[f.name] = "");
      return next;
    });
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleGenerate = async () => {
    const newErrors: Record<string, string> = {};
    form.rows.flat().forEach(f => {
      if (!formState[f.name]) {
        newErrors[f.name] = `${f.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (slug === "runway-to-roi") {
      setIsGenerating(true);
      try {
        const payload: HiringPlannerInput = {
          currentStatus: formState.currentStatus as HiringPlannerCurrentStatus,
          primaryGoal: formState.goal,
          totalBudgetAllocation: `${formState.budget} ${unitState.budget}`
        };
        
        const res = await hiringPlannerService.generatePlaybook(payload);
        
        if (res.roadmap) {
          setHiringPlannerData({
            input: res.input,
            roadmap: res.roadmap
          });
          
          const params = new URLSearchParams();
          params.append("tool", slug);
          router.push(`/tools/thankyou?${params.toString()}`);
        }
      } catch (error) {
        console.error("Failed to generate planner", error);
        setIsGenerating(false);
      }
    } else if (slug === "hiring-playbook-generator") {
      setIsGenerating(true);
      try {
        const payload: HiringPlaybookInput = {
          companyName: formState.companyName || "",
          industry: formState.industry || "",
          businessType: formState.businessType || "",
          roleCategory: formState.roleCategory || "",
          specificRole: formState.specificRole || "",
          seniorityLevel: formState.seniorityLevel || ""
        };
        
        const res = await playbookService.generatePlaybook(payload);
        
        if (res.playbook) {
          setPlaybookData({
            input: res.input,
            playbook: res.playbook
          });
          
          const params = new URLSearchParams();
          params.append("tool", slug);
          router.push(`/tools/thankyou?${params.toString()}`);
        }
      } catch (error) {
        console.error("Failed to generate playbook", error);
        setIsGenerating(false);
      }
    } else {
      setHasGenerated(true);
    }
  };

  const emailSchema = z.object({ email: z.string().email("Please enter a valid work email") });

  const handleUnlock = () => {
    const result = emailSchema.safeParse({ email });
    if (result.success) {
      setErrors(prev => ({ ...prev, email: "" }));
      
      // Build query params
      const params = new URLSearchParams();
      params.append("tool", slug);
      Object.entries(formState).forEach(([key, val]) => {
        const field = form.rows.flat().find(f => f.name === key);
        if (field?.type === "numberWithUnit") {
          params.append(key, `${val} ${unitState[key]}`);
        } else {
          params.append(key, val);
        }
      });

      router.push(`/tools/thankyou?${params.toString()}`);
    } else {
      setErrors(prev => ({ ...prev, email: result.error.issues[0].message }));
    }
  };

  const renderField = (field: ToolField, index: number, rowLength: number) => {
    const value = formState[field.name] || "";
    const error = errors[field.name];
    const widthClass = rowLength === 1 ? "w-full" : rowLength === 2 ? "w-full lg:w-1/2" : "w-full lg:w-1/3";
    const borderClass = index > 0 ? "border-t lg:border-t-0 lg:border-l border-border" : "border-border";

    if (field.type === "dropdown") {
      return (
        <div key={field.name} className={`${widthClass} relative ${borderClass}`}>
          <CustomDropdown
            label={error || field.label}
            value={value}
            options={field.options || []}
            onChange={(val) => handleFieldChange(field.name, val)}
            placeholder={field.placeholder}
            className={`px-6 transition-colors ${error ? "text-destructive" : ""}`}
            forceLabel={!!error}
          />
        </div>
      );
    }

    if (field.type === "dropdownDependent") {
      const parentVal = field.dependsOn ? formState[field.dependsOn] : "";
      const options = parentVal && field.optionsMap ? field.optionsMap[parentVal] || [] : [];
      return (
        <div key={field.name} className={`${widthClass} relative ${borderClass}`}>
          <CustomDropdown
            label={error || field.label}
            value={value}
            options={options}
            onChange={(val) => handleFieldChange(field.name, val)}
            placeholder={field.placeholder}
            disabled={!parentVal}
            className={`px-6 transition-colors ${error ? "text-destructive" : ""}`}
            forceLabel={!!error}
          />
        </div>
      );
    }

    if (field.type === "text") {
      const isFocused = focusedFields[field.name];
      return (
        <div key={field.name} className={`flex items-center px-6 ${widthClass} relative h-[64px] lg:h-[72px] ${borderClass}`}>
          <AnimatePresence>
            {(value || isFocused || error) && (
              <motion.label 
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.2 }}
                className={`absolute top-2.5 left-6 text-[9px] font-bold tracking-widest pointer-events-none z-10 ${error ? "text-destructive" : "text-muted-foreground"}`}
              >
                {error || field.label}
              </motion.label>
            )}
          </AnimatePresence>
          <input 
            type="text" 
            value={value}
            onFocus={() => setFocusedFields(prev => ({ ...prev, [field.name]: true }))}
            onBlur={() => setFocusedFields(prev => ({ ...prev, [field.name]: false }))}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className={`w-full bg-transparent focus:outline-none text-[15px] md:text-[16px] text-foreground font-medium placeholder-muted-foreground/40 transition-all ${value || isFocused || error ? 'pt-6 pb-2' : 'py-4'}`}
            placeholder={field.placeholder}
          />
        </div>
      );
    }

    if (field.type === "numberWithUnit") {
      const isFocused = focusedFields[field.name];
      return (
        <div key={field.name} className={`flex items-center ${widthClass} relative h-[64px] lg:h-[72px] px-6 cursor-text ${borderClass}`}>
          <AnimatePresence>
            {(value || isFocused || error) && (
              <motion.label 
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.2 }}
                className={`absolute top-2.5 left-6 text-[9px] font-bold tracking-widest pointer-events-none z-10 ${error ? "text-destructive" : "text-muted-foreground"}`}
              >
                {error || field.label}
              </motion.label>
            )}
          </AnimatePresence>
          <div className={`flex w-full items-center transition-all ${value || isFocused || error ? 'pt-6 pb-2' : 'py-4'}`}>
            <div className="grid items-center max-w-full">
              <span className="col-start-1 row-start-1 invisible whitespace-pre min-w-[10px] text-[15px] md:text-[16px] font-medium pointer-events-none" aria-hidden="true">
                {value || field.placeholder}
              </span>
              <input 
                type="number" 
                value={value}
                onFocus={() => setFocusedFields(prev => ({ ...prev, [field.name]: true }))}
                onBlur={() => setFocusedFields(prev => ({ ...prev, [field.name]: false }))}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                className="col-start-1 row-start-1 w-full min-w-0 bg-transparent focus:outline-none text-[15px] md:text-[16px] text-foreground font-medium placeholder-muted-foreground/40 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                placeholder={field.placeholder}
              />
            </div>
            <UnitDropdown 
              value={unitState[field.name]} 
              onChange={(v) => setUnitState(prev => ({ ...prev, [field.name]: v }))}
              units={field.units || []} 
            />
          </div>
        </div>
      );
    }

    return null;
  };

  const maxColumns = Math.max(...form.rows.map(row => row.length));
  const formMaxWidth = maxColumns >= 3 ? "max-w-[900px]" : maxColumns === 2 ? "max-w-[720px]" : "max-w-[560px]";

  return (
    <section className="relative min-h-[900px] md:min-h-[950px] pt-[100px] md:pt-[120px] pb-[80px] flex flex-col items-center justify-center overflow-x-clip">
      <Suspense fallback={<div className="absolute inset-x-4 top-16 bottom-0 md:inset-x-16 md:inset-be-40 bg-muted/20 rounded-xl" />}>
        <div className="absolute inset-x-4 top-16 bottom-0 md:inset-bs-16 md:inset-x-16 md:inset-be-0 z-0 pointer-events-none opacity-[0.08] dark:opacity-[0.15] overflow-hidden">
          {mounted && <Dithering colorBack="#00000000" colorFront={ditherColor} shape="simplex" type="4x4" speed={0.15} className="size-full" minPixelRatio={1} />}
        </div>
      </Suspense>

      <div className="pointer-events-none absolute inset-x-0 top-16 h-px w-full bg-border z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full bg-border z-10" />

      <div className="relative z-10 w-full max-w-[1200px] px-6 lg:px-12 flex flex-col items-center justify-between h-full">
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[1000px] mt-4 md:mt-8">
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="font-denton text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] text-foreground font-[540] tracking-tight text-center mb-6">
            {meta.title}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="text-[16px] md:text-[18px] text-muted-foreground text-center max-w-[640px] text-balance leading-relaxed">
            {meta.description}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className={`w-full ${formMaxWidth} mt-10`}>
            <div className="flex flex-col w-full bg-background border border-border rounded-[24px] lg:rounded-[32px] shadow-md transition-all duration-300 hover:shadow-lg divide-y divide-border">
              
              {form.rows.map((rowFields, rIdx) => {
                return (
                  <div key={rIdx} className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 divide-border">
                    {rowFields.map((f, fIdx) => renderField(f, fIdx, rowFields.length))}
                  </div>
                );
              })}

              <div className="bg-secondary/10 rounded-b-3xl lg:rounded-b-3xl">
                <motion.button onClick={handleGenerate} disabled={isGenerating} whileTap={{ scale: 0.99, translateY: 2 }} className="w-full h-[56px] rounded-b-3xl lg:rounded-b-3xl bg-foreground text-background text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed group">
                  {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : form.buttonText}
                </motion.button>
              </div>

            </div>
          </motion.div>
        </div>

        <Drawer open={hasGenerated} onOpenChange={setHasGenerated}>
          <DrawerContent className=" mx-auto w-[calc(100%-2rem)] max-w-[800px] rounded-t-[24px]! md:rounded-t-[32px]! bg-background/95 backdrop-blur-xl border border-border shadow-2xl p-0 outline-none">
             <DrawerTitle title="Your Hiring Blueprint" className="sr-only"/>
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
                    <h3 className="text-[18px] md:text-[20px] font-medium text-foreground tracking-tight mb-1.5">{form.drawer.title}</h3>
                    <p className="text-[13px] md:text-[14px] text-muted-foreground leading-relaxed">
                      {/* Very basic variable interpolation for drawer description */}
                      {form.drawer.description.replace(/{(\w+)}/g, (_, key) => formState[key] || "")}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 shrink-0">
                  <div className="flex flex-col w-full sm:w-[240px] relative">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((prev) => ({ ...prev, email: "" })); }}
                      placeholder="work@company.com" 
                      className={`w-full bg-secondary/50 border rounded-full px-5 py-3.5 text-[14px] focus:outline-none focus:bg-background transition-colors ${errors.email ? "border-destructive text-destructive" : "border-border focus:border-foreground"}`} 
                    />
                    {errors.email && <span className="text-[11px] text-destructive mt-1.5 ml-4 absolute -bottom-5 left-0">{errors.email}</span>}
                  </div>
                  <button onClick={handleUnlock} className="shrink-0 bg-foreground text-background px-6 py-3.5 rounded-full text-[14px] font-medium hover:bg-foreground/90 hover:-translate-y-0.5 transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    {form.drawer.buttonText}
                  </button>
                </div>
             </div>
          </DrawerContent>
        </Drawer>
      </div>
    </section>
  );
}
