"use client";

import Image from "next/image";

const logos = [
  { name: "18startup", src: "/logos/18startup.png" },
  { name: "swipe", src: "/logos/swipe.png" },
  { name: "Elitceler", src: "/logos/Elitceler.png" },
  { name: "vasudha", src: "/logos/vasudha.png" },
  { name: "incubez", src: "/logos/incubez.png" },
  { name: "madscientist", src: "/logos/madscientist.png" },
  { name: "mome", src: "/logos/mome.png" },
  { name: "scale.jobs", src: "/logos/scale.jobs.png" },
  { name: "glarenergy", src: "/logos/glarenergy.png" },
  { name: "spinacle", src: "/logos/spinacle.png" },
  { name: "akshayapatra", src: "/logos/akshayapatra.png" },
  { name: "epik", src: "/logos/epik.png" },
  { name: "kriya", src: "/logos/kriya.png" },
  { name: "neogreens", src: "/logos/neogreens.png" },
  { name: "octobotics", src: "/logos/octobotics.png" },
  { name: "reelOnGo", src: "/logos/reelOnGo.png" },
];

export function CompanyMarquee() {
  const doubled = [...logos, ...logos];

  return (
    <section className="pt-0 md:pt-[40px] flex flex-col items-center gap-[10px]">
      <p
        className="text-[15px] md:text-[20px] text-muted-foreground text-center"
        style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
      >
        Autopiloted Hiring for these companies
      </p>

      <div className="relative w-full overflow-hidden border-t border-b border-border">
        <div className="flex animate-marquee-rtl">
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center justify-center py-4 px-4 md:py-8 md:px-12 border-r border-border shrink-0"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={120}
                className="w-[56px] h-[56px] md:w-[100px] md:h-[100px] object-contain brightness-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
