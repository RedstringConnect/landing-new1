"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const companies = [
  "18startup.png",
  "Elitceler.png",
  "akshayapatra.png",
  "alt.png",
  "epik.png",
  "glarenergy.png",
  "incubez.png",
  "kriya.png",
  "madscientist.png",
  "mome.png",
  "neogreens.png",
  "octobotics.png",
  "reelOnGo.png",
  "scale.jobs.png",
  "spaces-realty.png",
  "spinacle.png",
  "swipe.png",
  "vasudha.png"
];

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Keep it in memory once loaded
        }
      },
      { rootMargin: "300px" } // Load well before it enters screen to prevent pop-in
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-[120px] h-[120px] flex items-center justify-center">
      {inView && (
        <Image
          src={src}
          alt={alt}
          width={120}
          height={120}
          className="w-auto h-auto object-contain"
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}

export function CompanyMarquee() {
  return (
    <section className="pt-[40px] flex flex-col items-center gap-[10px]">
      <p
        className="text-[20px] md:text-[24px] text-muted-foreground text-center"
        style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
      >
        Autopiloted Hiring for these companies
      </p>

      <div className="relative w-full overflow-hidden border-t-2">
        <div className="flex animate-marquee ">
          {[...companies, ...companies].map((company, i) => (
            <div
              key={`${company}-${i}`}
              className="flex-shrink-0 flex py-8 px-12 border-r-2 items-center justify-center"
            >
              <LazyImage 
                src={`/logos/${company}`}
                alt={company.replace(".png", "")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
