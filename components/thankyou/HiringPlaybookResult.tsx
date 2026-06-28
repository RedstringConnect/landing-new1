"use client";

import React, { useState } from "react";
import { Briefcase, ListChecks, MessageCircle, AlertTriangle, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { HiringPlaybookData, HiringPlaybookInput } from "@/types/hiring-playbook";

interface HiringPlaybookResultProps {
  playbook: HiringPlaybookData;
  input: HiringPlaybookInput;
}

export function HiringPlaybookResult({ playbook, input }: HiringPlaybookResultProps) {
  const { roleOverview, scorecard, interviewStages, keyQuestions, flags } = playbook;
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('/api/playbook/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, playbook })
      });
      
      if (!response.ok) throw new Error("Failed to download PDF");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${input.companyName.replace(/\s+/g, '-').toLowerCase()}-hiring-playbook.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col items-center gap-10 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/30 border border-foreground/5 mb-6 shadow-sm">
          <Briefcase className="w-8 h-8 text-foreground" />
        </div>
        <h1 className="font-denton text-[42px] md:text-[56px] leading-[1.1] text-foreground font-[540] tracking-tight mb-4">
          {input.seniorityLevel} {input.specificRole} Playbook
        </h1>
        <p className="text-[16px] md:text-[18px] text-muted-foreground max-w-[700px] mx-auto leading-relaxed">
          {input.companyName} | {input.industry} | {input.businessType}
        </p>
      </motion.div>

      {/* Role Mission */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="w-full p-6 rounded-2xl bg-card border border-foreground/5 shadow-sm">
        <h3 className="text-[20px] font-semibold text-foreground mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" /> Role Mission
        </h3>
        <p className="text-[15px] text-muted-foreground leading-relaxed">{roleOverview.mission}</p>
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-[14px] font-semibold text-foreground mb-2">Key Responsibilities</h4>
          <ul className="list-disc pl-5 space-y-1">
            {roleOverview.keyResponsibilities.map((resp, i) => (
              <li key={i} className="text-[14px] text-muted-foreground">{resp}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Scorecard */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full">
        <h3 className="text-[20px] font-semibold text-foreground mb-4 flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-primary" /> Evaluation Scorecard
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-secondary/20 border border-foreground/5">
            <h4 className="text-[16px] font-semibold text-foreground mb-3">Technical Skills</h4>
            <ul className="list-disc pl-5 space-y-2">
              {scorecard.technicalSkills.map((s, i) => (
                <li key={i} className="text-[14px] text-muted-foreground">{s}</li>
              ))}
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-secondary/20 border border-foreground/5">
            <h4 className="text-[16px] font-semibold text-foreground mb-3">Soft Skills</h4>
            <ul className="list-disc pl-5 space-y-2">
              {scorecard.softSkills.map((s, i) => (
                <li key={i} className="text-[14px] text-muted-foreground">{s}</li>
              ))}
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
            <h4 className="text-[16px] font-semibold text-foreground mb-3">90-Day Outcomes</h4>
            <ul className="list-disc pl-5 space-y-2">
              {scorecard.outcomes.map((s, i) => (
                <li key={i} className="text-[14px] text-muted-foreground">{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Interview Stages */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="w-full">
        <h3 className="text-[20px] font-semibold text-foreground mb-4">Interview Pipeline</h3>
        <div className="flex flex-col gap-3">
          {interviewStages.map((stage, i) => (
            <div key={i} className="p-5 rounded-2xl bg-card border border-foreground/5 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-[14px] font-bold shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <h4 className="text-[16px] font-bold text-foreground">{stage.name}</h4>
                <p className="text-[14px] text-muted-foreground">{stage.focus}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="px-3 py-1 rounded-full bg-secondary/50 text-[12px] font-medium text-foreground">{stage.owner}</span>
                <span className="px-3 py-1 rounded-full bg-secondary/50 text-[12px] font-medium text-foreground">{stage.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Key Questions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="w-full">
        <h3 className="text-[20px] font-semibold text-foreground mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" /> Key Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyQuestions.map((q, i) => (
            <div key={i} className="p-6 rounded-2xl bg-card border border-foreground/5 shadow-sm flex flex-col h-full">
              <p className="text-[15px] font-semibold text-foreground mb-3 leading-relaxed">"{q.question}"</p>
              <div className="mt-auto pt-3 border-t border-border/50">
                <span className="text-[12px] font-medium text-primary mb-1 block">Look for:</span>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{q.targetAnswer}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Flags */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
          <h4 className="text-[16px] font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Green Flags
          </h4>
          <ul className="list-disc pl-5 space-y-2">
            {flags.greenFlags.map((f, i) => (
              <li key={i} className="text-[14px] text-green-800/80 dark:text-green-200/80">{f}</li>
            ))}
          </ul>
        </div>
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
          <h4 className="text-[16px] font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Red Flags
          </h4>
          <ul className="list-disc pl-5 space-y-2">
            {flags.redFlags.map((f, i) => (
              <li key={i} className="text-[14px] text-red-800/80 dark:text-red-200/80">{f}</li>
            ))}
          </ul>
        </div>
      </motion.div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="mt-4 text-center">
        <button onClick={handleDownload} disabled={isDownloading} className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-foreground/90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
          {isDownloading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...</> : <>Download Detailed PDF <ArrowRight className="w-4 h-4" /></>}
        </button>
      </motion.div>
    </div>
  );
}
