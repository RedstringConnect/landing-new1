import React from "react";
import { FileText, Download } from "lucide-react";
import { motion } from "motion/react";

interface GenericDownloadResultProps {
  title: string;
}

export function GenericDownloadResult({ title }: GenericDownloadResultProps) {
  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/30 border border-foreground/5 mb-6 shadow-sm">
          <FileText className="w-8 h-8 text-foreground" />
        </div>
        <h1 className="font-denton text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] text-foreground font-[540] tracking-tight mb-4">
          Your Report is Ready
        </h1>
        <p className="text-[16px] md:text-[18px] text-muted-foreground max-w-[500px] mx-auto leading-relaxed">
          We've unlocked access to <strong className="text-foreground">{title}</strong>. Click below to download your copy immediately.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center"
      >
        <button className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3.5 md:py-4 rounded-full text-[14px] md:text-[15px] font-medium hover:bg-foreground/90 transition-all shadow-sm cursor-pointer">
          <Download className="w-4 h-4" /> Download Report
        </button>
        <p className="mt-4 text-[13px] text-muted-foreground">
          A backup copy has also been sent to your email.
        </p>
      </motion.div>
    </div>
  );
}
