"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";

const testimonials = [
  {
    quote: "Redstring cut our time-to-hire by 60%. The AI screening is incredibly accurate.",
    name: "Sarah Chen",
    role: "VP of People, TechCorp",
  },
  {
    quote: "We went from 200 applicants to a shortlist of 10 perfect matches in under an hour.",
    name: "Marcus Rivera",
    role: "Head of Talent, ScaleUp",
  },
  {
    quote: "Our hiring pipeline has never been healthier. Redstring gave us superpowers.",
    name: "David Kim",
    role: "COO, Nextera",
  },
  {
    quote: "Redstring's AI found us candidates we never would have discovered on our own.",
    name: "Alex Turner",
    role: "CEO, GrowthHQ",
  },
  {
    quote: "The collaborative features changed how our team hires. Everyone is aligned now.",
    name: "Aisha Patel",
    role: "HR Director, Innovate Labs",
  },
  {
    quote: "The analytics alone are worth it. We can see exactly where to optimize.",
    name: "Rachel Moore",
    role: "Talent Lead, CloudBase",
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

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="flex-shrink-0">
      <div className="rounded-xl bg-card border border-border p-4 hover:border-primary transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary flex items-center justify-center text-foreground font-bold text-sm">
            {testimonial.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-xs font-bold text-foreground truncate"
              style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
            >
              {testimonial.name}
            </p>
            <p
              className="text-[10px] text-muted-foreground truncate"
              style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
            >
              {testimonial.role}
            </p>
          </div>
          <svg className="h-5 w-5 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        <p
          className="text-xs text-muted-foreground leading-relaxed line-clamp-4"
          style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
        >
          &quot;{testimonial.quote}&quot;
        </p>
      </div>
    </div>
  );
}

const REPEAT = 6;
const CARD_HEIGHT = 200;
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
      className="overflow-hidden h-[400px] w-full max-w-[280px] sm:max-w-[380px] relative"
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
    <section ref={sectionRef} className="relative py-[120px] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mx-auto max-w-2xl text-center mb-12"
        >
          <h2
            className="text-[36px] md:text-[44px] lg:text-[48px] font-[540] font-denton text-foreground leading-[1.1]"
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

            <div className="hidden md:block w-full max-w-[280px] sm:max-w-[380px]">
              <ScrollColumn items={col2} direction="up" duration={30000} />
            </div>

            <div className="hidden md:block w-full max-w-[280px] sm:max-w-[380px]">
              <ScrollColumn items={col3} direction="down" duration={30000} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
