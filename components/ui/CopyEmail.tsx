"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CopyEmailProps {
  email: string;
  children?: React.ReactNode;
}

export function CopyEmail({ email, children }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => {
        setShowTooltip(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), 200);
      }}
    >
      <a
        href={`mailto:${email}`}
        onClick={(e) => {
          e.preventDefault();
          handleCopy();
        }}
        className="text-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-primary"
      >
        {children || email}
      </a>

      <AnimatePresence>
        {showTooltip && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1 rounded-lg bg-foreground text-background text-[11px] font-medium whitespace-nowrap pointer-events-none z-50 shadow-lg"
          >
            {copied ? "Copied!" : "Click to copy"}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
