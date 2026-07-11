"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";

import { EmojiIcon } from "@/components/ui/icons/emoji";

const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 612 612" width="20" height="20" fill="currentColor" {...props}>
    <path d="M535.5,114.75h-57.375L459,76.5c-11.265-22.262-17.117-38.25-38.25-38.25h-229.5c-21.133,0-28.114,18.245-38.25,38.25l-19.125,38.25H76.5c-42.247,0-76.5,34.253-76.5,76.5v306c0,42.247,34.253,76.5,76.5,76.5h459c42.247,0,76.5-34.253,76.5-76.5v-306C612,149.003,577.747,114.75,535.5,114.75z M573.75,497.25c0,21.133-17.117,38.25-38.25,38.25h-459c-21.133,0-38.25-17.117-38.25-38.25v-306c0-21.114,17.117-38.25,38.25-38.25H153l19.125-38.25c13.521-22.242,17.117-38.25,38.25-38.25h191.25c21.133,0,24.729,15.988,38.25,38.25L459,153h76.5c21.133,0,38.25,17.117,38.25,38.25V497.25z M306,191.25c-84.494,0-153,68.506-153,153s68.506,153,153,153s153-68.506,153-153S390.494,191.25,306,191.25z M306,459c-63.38,0-114.75-51.37-114.75-114.75c0-63.38,51.37-114.75,114.75-114.75c63.38,0,114.75,51.37,114.75,114.75C420.75,407.63,369.38,459,306,459z"/>
  </svg>
);

export const testimonials = [
  {
    quote: "Finding the right design interns used to take our time. With Redstring , we had talented candidates in a week.",
    name: "Prakash Balasubramanian Iyer",
    role: "CEO at 18startup",
  },
  {
    quote: "We sourced our founding researcher through redstring, and the match was spot-on. The process was seamless, fast, and founder-friendly.",
    name: "Dinesh C",
    role: "Founder & CEO of Neogreens",
  },
  {
    quote: "This hire changed everything. Our founding engineer came onboard through them, and product velocity instantly doubled.",
    name: "Prerit Mital",
    role: "Co-Founder of TokenDisc",
  },
  {
    quote: "Within a week, we had our tech lead in place. It felt like hiring is easy",
    name: "Jai Nayak",
    role: "Co founder of TalentId",
  },
  {
    quote: "Finding the right design interns used to take our time. With Redstring , we had talented candidates in a week.",
    name: "Prakash Balasubramanian Iyer",
    role: "CEO at 18startup",
  },
  {
    quote: "We sourced our founding researcher through redstring, and the match was spot-on. The process was seamless, fast, and founder-friendly.",
    name: "Dinesh C",
    role: "Founder & CEO of Neogreens",
  },
];

const col1 = testimonials.slice(0, 2);
const col2 = testimonials.slice(2, 4);
const col3 = testimonials.slice(4, 6);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="flex-shrink-0 w-full px-2">
      {/* Phone Frame */}
      <div className="rounded-[16px] sm:rounded-[24px] border-[4px] sm:border-[6px] md:border-[8px] border-slate-900 overflow-hidden shadow-2xl transition-all flex flex-col h-[380px] sm:h-[480px] bg-[#efeae2] relative">
        
        {/* Top Status Bar (fake notch/status) */}
        <div className="h-6 w-full bg-[#075e54] flex justify-between items-center px-4 z-20">
          <span className="text-[10px] font-medium text-white tracking-wide">9:41</span>
          <div className="flex items-center gap-1.5 opacity-90">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M2 22h20V2z"/></svg>
            <svg width="13" height="11" viewBox="0 0 24 24" fill="white"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
          </div>
        </div>

        {/* WhatsApp Header */}
        <div className="bg-[#075e54] px-2 py-2.5 flex items-center gap-2 z-10 shadow-sm border-b border-black/5 relative">
          <div className="flex items-center gap-0.5">
            <svg viewBox="0 0 24 24" width="22" height="22" className="text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-[#075e54] font-bold text-sm shrink-0 overflow-hidden relative">
              <span className="uppercase">{testimonial.name.charAt(0)}</span>
            </div>
          </div>
          <div className="flex flex-col min-w-0 flex-1 ml-1.5">
            <span className="text-white text-[14.5px] font-medium truncate leading-tight tracking-tight">{testimonial.name}</span>
            <span className="text-white/80 text-[11px] truncate leading-tight tracking-tight">{testimonial.role}</span>
          </div>
          <div className="flex items-center gap-4 text-white shrink-0 px-2 opacity-90">
             <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
             <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.9l5.1 5.1 1.5-1.5-5.1-5.1zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2.1 4.6-4.6 4.6z"/></svg>
             <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"/></svg>
          </div>
        </div>

        {/* WhatsApp Background Pattern Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none" 
          style={{ 
            backgroundImage: `url('/whatsapp-bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} 
        ></div>

        {/* WhatsApp Body */}
        <div className="p-3 relative flex-1 flex flex-col justify-end z-10 overflow-hidden pb-4">
          
          {/* Encryption Badge */}
          <div className="flex justify-center mb-4 mt-auto">
            <div className="bg-[#ffeecd] px-3 py-1.5 rounded-[8px] flex items-center justify-center gap-1.5 w-[90%] shadow-sm">
              <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" className="text-[#54656f] shrink-0"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
              <p className="text-[#54656f] text-[9.5px] leading-tight text-center">
                Messages and calls are end-to-end encrypted. No one outside of this chat can read or listen to them.
              </p>
            </div>
          </div>

          {/* Date Badge */}
          <div className="flex justify-center mb-4">
            <div className="bg-white/80 px-2.5 flex items-center justify-center rounded-[8px] h-5 shadow-sm">
              <span className="text-[#54656f] text-[10.5px] tracking-tighter font-medium leading-none">Today</span>
            </div>
          </div>

          {/* Chat Bubble (Received) */}
          <div className="relative rounded-[12px] rounded-tl-none bg-white text-[#111b21] p-[6px_8px_8px_10px] shadow-sm mr-auto w-fit max-w-[92%] ml-1.5">
            {/* Authentic WhatsApp Tail */}
            <svg viewBox="0 0 8 13" width="8" height="13" className="absolute top-0 -left-[7.5px] text-white">
              <path fill="currentColor" d="M7.8 0H0C3 0 5 1.5 6.5 4L7.8 13V0z"/>
            </svg>
            <p className="text-[14px] leading-[1.38] text-[#111b21] pb-1">
              {testimonial.quote}
            </p>
            <div className="flex justify-end items-center float-right ml-4 mt-1">
              <span className="text-[10px] opacity-60 text-black/60 translate-y-[2px]">10:42 AM</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Footer (Input Bar) */}
        <div className="bg-[#f0f2f5] p-2 flex items-center z-10 shrink-0">
          <button className="text-[#54656f] transition-colors shrink-0">
            <EmojiIcon className="size-8"/>
          </button>
          
          <div className="flex-1 bg-white rounded-3xl h-[30px] flex items-center px-3 mr-2 py-1 shadow-sm">
             <span className="text-[#8696a0] text-[15px] flex-1">Message</span>
             <CameraIcon className="text-[#54656f] shrink-0 ml-2" />
          </div>
          
          <button className="h-[30px] w-[30px] bg-[#00a884] rounded-full flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.349 8.469 4.35v7.061c0 2.001 1.53 3.53-3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"/></svg>
          </button>
        </div>

      </div>
    </div>
  );
}

const REPEAT = 6;
const CARD_HEIGHT = 580;
const GAP = 24;

function useColumnScroll(itemsPerColumn: number, direction: "down" | "up", duration: number, isPaused: boolean) {
  const [scrollY, setScrollY] = useState(0);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const singleSetHeight = (CARD_HEIGHT + GAP) * itemsPerColumn;
    let animationFrameId: number;
    let lastTimestamp: number | null = null;
    let accumulatedTime = 0;

    const animate = (timestamp: number) => {
      if (lastTimestamp !== null) {
        if (!isPausedRef.current) {
          accumulatedTime += (timestamp - lastTimestamp);
        }
      }
      lastTimestamp = timestamp;

      const progress = (accumulatedTime % duration) / duration;

      if (direction === "down") {
        setTestimonialScrollY3(-(progress * singleSetHeight));
        setScrollY(-(progress * singleSetHeight));
      } else {
        setScrollY(progress * singleSetHeight - singleSetHeight);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [itemsPerColumn, direction, duration]);

  return scrollY;
}

function setTestimonialScrollY3(value: number) {}

function ScrollColumn({
  items,
  direction,
  duration,
}: {
  items: typeof testimonials;
  direction: "down" | "up";
  duration: number;
}) {
  const [isPaused, setIsPaused] = useState(false);
  const scrollY = useColumnScroll(items.length, direction, duration, isPaused);

  return (
    <div 
      className="overflow-hidden h-[500px] sm:h-[700px] w-full max-w-[280px] sm:max-w-[380px] relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex flex-col gap-4"
        style={{
          transform: `translateY(${scrollY}px)`,
          willChange: "transform",
        }}
      >
        {Array.from({ length: REPEAT }).map((_, repeatIdx) =>
          items.map((testimonial, itemIdx) => (
            <TestimonialCard
              key={`${direction}-${repeatIdx}-${itemIdx}`}
              testimonial={testimonial}
            />
          ))
        )}
      </div>
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-[60px] md:py-[120px] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mx-auto max-w-2xl text-center mb-6 md:mb-12"
        >
          <h2
            className="text-[28px] md:text-[44px] lg:text-[48px] font-[540] font-denton text-foreground leading-[1.1]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Why people love Redstring
          </h2>
          <p className="mt-4 text-muted-foreground" style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}>
            Real feedback from teams who transformed their hiring
          </p>
        </motion.div>

        <div className="relative py-8">
          <div className="flex justify-center items-start gap-3 sm:gap-4 max-w-5xl mx-auto">
              <ScrollColumn items={col1} direction="down" duration={30000} />

              <div className="hidden sm:block">
                <ScrollColumn items={col2} direction="up" duration={30000} />
              </div>

              <div className="hidden sm:block">
                <ScrollColumn items={col3} direction="down" duration={30000} />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
