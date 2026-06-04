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
  DrawerTitle,
} from "@/components/ui/drawer";

const Dithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

const INDUSTRY_OPTIONS = [
  "SaaS", "E-commerce", "Fintech", "Healthtech", 
  "Edtech", "AI/ML", "Consumer", "Services"
];
const BUSINESS_TYPE_OPTIONS = ["B2B", "B2C"];
const ROLE_CATEGORY_OPTIONS = [
  "Engineering", "Sales", "Marketing", "Product", 
  "Design", "Operations", "Customer Success"
];
const SENIORITY_OPTIONS = ["Junior", "Mid-Level", "Senior"];

const SPECIFIC_ROLE_OPTIONS: Record<string, string[]> = {
  Engineering: ["Frontend Engineer", "Backend Engineer", "Full-Stack Developer", "Founding Engineer", "DevOps Engineer"],
  Sales: ["SDR", "Account Executive", "Sales Manager", "Partnerships Manager"],
  Marketing: ["Growth Marketer", "Performance Marketer", "Content Marketer", "Demand Generation Manager"],
  Product: ["Product Manager", "Technical Product Manager", "Product Analyst"],
  Design: ["Product Designer", "Brand Designer", "UX Researcher"],
  Operations: ["Business Operations Manager", "Recruiting Coordinator", "Chief of Staff"],
  "Customer Success": ["Customer Success Manager", "Implementation Manager", "Support Lead"],
};

function Dropdown({ 
  label, 
  value, 
  options, 
  onChange, 
  placeholder,
  disabled = false,
  className,
  forceLabel
}: { 
  label: string; 
  value: string; 
  options: string[]; 
  onChange: (val: string) => void;
  placeholder: string;
  disabled?: boolean;
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
    <div ref={dropdownRef} className={`flex items-center w-full relative h-[64px] lg:h-[72px] ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className || "px-6"}`}>
      <AnimatePresence>
        {(value || forceLabel || disabled) && (
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
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className={`w-full bg-transparent focus:outline-none text-[15px] md:text-[16px] text-foreground font-medium transition-all ${value || forceLabel || disabled ? 'pt-6 pb-2' : 'py-4'}`}>
          {value || <span className="text-muted-foreground/40">{disabled ? "Select category first" : placeholder}</span>}
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

const formSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  industry: z.string().min(1, "Please select an industry"),
  businessType: z.string().min(1, "Please select a business type"),
  roleCategory: z.string().min(1, "Please select a role category"),
  specificRole: z.string().min(1, "Please select a specific role"),
  seniorityLevel: z.string().min(1, "Please select a seniority level"),
});

const emailSchema = z.object({
  email: z.string().email("Please enter a valid work email"),
});

export function PlaybookHero() {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [roleCategory, setRoleCategory] = useState("");
  const [specificRole, setSpecificRole] = useState("");
  const [seniorityLevel, setSeniorityLevel] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [email, setEmail] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);

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

  const handleRoleCategoryChange = (val: string) => {
    setRoleCategory(val);
    setSpecificRole(""); // reset specific role when category changes
  };

  const isFormComplete = Boolean(
    companyName && industry && businessType && roleCategory && specificRole && seniorityLevel
  );

  const handleGenerate = () => {
    const result = formSchema.safeParse({ companyName, industry, businessType, roleCategory, specificRole, seniorityLevel });
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
      router.push(`/tools/thankyou?tool=hiring-playbook&company=${encodeURIComponent(companyName)}&role=${encodeURIComponent(specificRole)}&seniority=${encodeURIComponent(seniorityLevel)}`);
    } else {
      setErrors((prev) => ({ ...prev, email: result.error.issues[0].message }));
    }
  };

  const specificRoles = roleCategory ? SPECIFIC_ROLE_OPTIONS[roleCategory] || [] : [];

  return (
    <section 
      className="relative min-h-[900px] md:min-h-[950px] pt-[100px] md:pt-[120px] pb-[80px] flex flex-col items-center justify-center overflow-x-clip"
    >
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

      <div className="relative z-10 w-full max-w-[1200px] px-6 lg:px-12 flex flex-col items-center justify-between h-full">
        
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[1000px] mt-4 md:mt-8">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-denton text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] text-foreground font-[540] tracking-tight text-center mb-6"
          >
            Hiring Playbook Generator
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-[16px] md:text-[18px] text-muted-foreground text-center max-w-[640px] text-balance leading-relaxed"
          >
            Stop guessing. Generate a highly customized, AI-driven hiring strategy tailored specifically for your target role and industry.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[900px] mt-10"
          >
            <div className="flex flex-col w-full bg-background border border-border rounded-[24px] lg:rounded-[32px] shadow-md transition-all duration-300 hover:shadow-lg divide-y divide-border">
              
              {/* Row 1 */}
              <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-border">
                
                {/* Company Name */}
                <div className="flex items-center px-6 w-full lg:w-1/3 relative h-[64px] lg:h-[72px]">
                  <AnimatePresence>
                    {(companyName || errors.companyName) && (
                      <motion.label 
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-2.5 left-6 text-[9px] font-bold tracking-widest pointer-events-none z-10 ${errors.companyName ? "text-destructive" : "text-muted-foreground"}`}
                      >
                        {errors.companyName || "Company Name"}
                      </motion.label>
                    )}
                  </AnimatePresence>
                  <input 
                    type="text" 
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: "" }));
                    }}
                    className={`w-full bg-transparent focus:outline-none text-[15px] md:text-[16px] text-foreground font-medium placeholder-muted-foreground/40 transition-all ${companyName || errors.companyName ? 'pt-6 pb-2' : 'py-4'}`}
                    placeholder="Company (e.g. Acme Corp)"
                  />
                </div>

                <div className="w-full lg:w-1/3">
                  <Dropdown 
                    label={errors.industry || "Industry"} 
                    value={industry} 
                    options={INDUSTRY_OPTIONS} 
                    onChange={(val) => {
                      setIndustry(val);
                      if (errors.industry) setErrors((prev) => ({ ...prev, industry: "" }));
                    }} 
                    placeholder="Select industry..." 
                    className={`px-6 transition-colors ${errors.industry ? "text-destructive" : ""}`}
                    forceLabel={!!errors.industry}
                  />
                </div>
                
                <div className="w-full lg:w-1/3">
                  <Dropdown 
                    label={errors.businessType || "Business Type"} 
                    value={businessType} 
                    options={BUSINESS_TYPE_OPTIONS} 
                    onChange={(val) => {
                      setBusinessType(val);
                      if (errors.businessType) setErrors((prev) => ({ ...prev, businessType: "" }));
                    }} 
                    placeholder="B2B or B2C?" 
                    className={`px-6 transition-colors ${errors.businessType ? "text-destructive" : ""}`}
                    forceLabel={!!errors.businessType}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-border">
                <div className="w-full lg:w-1/3">
                  <Dropdown 
                    label={errors.roleCategory || "Role Category"} 
                    value={roleCategory} 
                    options={ROLE_CATEGORY_OPTIONS} 
                    onChange={(val) => {
                      handleRoleCategoryChange(val);
                      if (errors.roleCategory) setErrors((prev) => ({ ...prev, roleCategory: "" }));
                    }} 
                    placeholder="Role Category..." 
                    className={`px-6 transition-colors ${errors.roleCategory ? "text-destructive" : ""}`}
                    forceLabel={!!errors.roleCategory}
                  />
                </div>

                <div className="w-full lg:w-1/3">
                  <Dropdown 
                    label={errors.specificRole || "Specific Role"} 
                    value={specificRole} 
                    options={specificRoles} 
                    onChange={(val) => {
                      setSpecificRole(val);
                      if (errors.specificRole) setErrors((prev) => ({ ...prev, specificRole: "" }));
                    }} 
                    placeholder="Specific Role..." 
                    disabled={!roleCategory}
                    className={`px-6 transition-colors ${errors.specificRole ? "text-destructive" : ""}`}
                    forceLabel={!!errors.specificRole}
                  />
                </div>
                
                <div className="w-full lg:w-1/3">
                  <Dropdown 
                    label={errors.seniorityLevel || "Seniority Level"} 
                    value={seniorityLevel} 
                    options={SENIORITY_OPTIONS} 
                    onChange={(val) => {
                      setSeniorityLevel(val);
                      if (errors.seniorityLevel) setErrors((prev) => ({ ...prev, seniorityLevel: "" }));
                    }} 
                    placeholder="Seniority..." 
                    className={`px-6 transition-colors ${errors.seniorityLevel ? "text-destructive" : ""}`}
                    forceLabel={!!errors.seniorityLevel}
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
                  Generate My Playbook
                </button>
              </div>

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
                    <h3 className="text-[18px] md:text-[20px] font-medium text-foreground tracking-tight mb-1.5">Your Playbook is Ready</h3>
                    <p className="text-[13px] md:text-[14px] text-muted-foreground leading-relaxed">Enter your work email so we can send your custom {seniorityLevel} {specificRole} hiring framework.</p>
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
                    Unlock Playbook
                  </button>
                </div>
             </div>
          </DrawerContent>
        </Drawer>

      </div>
    </section>
  );
}
