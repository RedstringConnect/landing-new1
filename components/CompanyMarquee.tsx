"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const logos = [
  { name: "18startup", src: "/logos/18startup.png", bg: '#fff' },
  { name: "swipe", src: "/logos/swipe.png", bg: '#fff' },
  { name: "Elitceler", src: "/logos/Elitceler.png", bg: '#fff' },
  { name: "alt", src: "/logos/alt.png", bg: '#fff' },
  { name: "vasudha", src: "/logos/vasudha.png", bg: '#fff' },
  { name: "incubez", src: "/logos/incubez.png", bg: '#fff' },
  { name: "madscientist", src: "/logos/madscientist.png", bg: '#010101' },
  { name: "mome", src: "/logos/mome.png", bg: '#0E0E10' },
  { name: "scale.jobs", src: "/logos/scale.jobs.png", bg: '#fff' },
  { name: "spaces-realty", src: "/logos/spaces-realty.png", bg: '#fff' },
  { name: "glarenergy", src: "/logos/glarenergy.png", bg: '#000' },
  { name: "spinacle", src: "/logos/spinacle.png", bg: '#fff' },
  { name: "akshayapatra", src: "/logos/akshayapatra.png", bg: '#fff' },
  { name: "epik", src: "/logos/epik.png", bg: '#012A6B' },
  { name: "kriya", src: "/logos/kriya.png", bg: '#fff' },
  { name: "neogreens", src: "/logos/neogreens.png", bg: '#fff' },
  { name: "octobotics", src: "/logos/octobotics.png", bg: '#fff' },
  { name: "reelOnGo", src: "/logos/reelOnGo.png", bg: '#fff' },
];

const LOGOS_PER_PAGE = 6;
const HOLD_MS = 5800;

const itemVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.92,
    transition: {
      duration: 0.2,
      delay: i * 0.04,
    },
  }),
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.3,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function CompanyMarquee() {
  const totalPages = Math.ceil(logos.length / LOGOS_PER_PAGE);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPage((p) => (p + 1) % totalPages);
    }, HOLD_MS);
    return () => clearInterval(timer);
  }, [totalPages]);

  const currentLogos = logos.slice(
    page * LOGOS_PER_PAGE,
    page * LOGOS_PER_PAGE + LOGOS_PER_PAGE
  );

  return (
    <section className="pt-[40px] flex flex-col items-center gap-[10px]">
      <p
        className="text-[20px] md:text-[24px] text-muted-foreground text-center"
        style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
      >
        Autopiloted Hiring for these companies
      </p>

      <div className="w-full border-t border-border">
        <div className="grid grid-cols-6">
          <AnimatePresence mode="popLayout">
            {currentLogos.map((logo, i) => (
              <motion.div
                key={`${logo.name}-${page}`}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex items-center justify-center py-8 px-12 border-r border-border [&:nth-child(6n)]:border-r-0"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={120}
                  className="w-[120px] h-[120px] object-contain brightness-105"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
