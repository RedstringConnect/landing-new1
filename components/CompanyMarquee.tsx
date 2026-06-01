"use client";

import Image from "next/image";
import React from "react";

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

export function CompanyMarquee() {
  return (
    <section className="py-[80px] flex flex-col items-center gap-[40px]">
      <p
        className="text-[20px] md:text-[24px] text-muted-foreground text-center"
        style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
      >
        Autopiloted Hiring for these companies
      </p>

      <div className="relative w-full overflow-hidden">

        <div className="flex animate-marquee">
          {[...companies, ...companies].map((company, i) => (
            <div
              key={`${company}-${i}`}
              className="flex-shrink-0 flex items-center justify-center mx-[32px] md:mx-[32px]"
            >
              <Image
                src={`/logos/${company}`}
                alt={company.replace(".png", "")}
                width={120}
                height={120}
                className="w-auto h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
