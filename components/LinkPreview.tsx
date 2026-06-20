"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

// Predefined link previews mapping. Add known domains or URLs and their preview images here.
const PREDEFINED_PREVIEWS: Record<string, string> = {
  "github.com": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
  "loopx.redstring.co.in": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  "redstring.co.in": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
};

function getPreviewImage(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace(/^www\./, '');
    
    // Exact hostname match
    if (PREDEFINED_PREVIEWS[hostname]) {
      return PREDEFINED_PREVIEWS[hostname];
    }
    
    // Substring match for predefined URLs
    const match = Object.keys(PREDEFINED_PREVIEWS).find(k => url.includes(k));
    if (match) {
      return PREDEFINED_PREVIEWS[match];
    }
  } catch (e) {
    // Invalid URL or relative link
  }
  return null;
}

export function LinkPreview({ children, href, className, ...props }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const previewImage = getPreviewImage(href);

  // If there's no preview image, just render a normal link
  if (!previewImage) {
    return <a href={href} className={className} {...props}>{children}</a>;
  }

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={href} className={className} {...props}>
        {children}
      </a>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 h-40 bg-card border border-border rounded-xl shadow-xl overflow-hidden pointer-events-none"
            style={{ transformOrigin: "bottom center" }}
          >
            {/* Small arrow pointing down */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-border rotate-45 transform origin-center z-[-1]" />
            <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-4 h-4 bg-card rotate-45 transform origin-center z-[-1]" />
            
            <div className="relative w-full h-full">
              <Image 
                src={previewImage} 
                alt="Link Preview" 
                fill 
                className="object-cover"
                sizes="(max-width: 256px) 100vw, 256px"
              />
            </div>
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
