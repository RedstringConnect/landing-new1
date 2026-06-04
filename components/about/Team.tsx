"use client";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "motion/react";
import { Linkedin, Twitter, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

import Image from "next/image";
import { LinkedInIcon, TwitterIcon } from "../ui/icons";

const teamMembers = [
  {
    name: "Srijan Gangavarapu",
    role: "Founder and CEO",
    bio: "The kind of builder who was burned down before. Currently building 2nd venture after facing a lot of bad co-founder experiences.",
    image: "/team/Srijan.png",
    linkedin: "https://www.linkedin.com/in/srijan-gangavarapu/",
  },
  {
    name: "Kaushik Reddyshetty",
    role: "Co-Founder",
    bio: "Scaled a brand’s social presence and got welcomed to Redstring for scaling its marketing and operations.",
    image: "/team/Kaushik.png",
    linkedin: "https://www.linkedin.com/in/kaushik-reddyshetty-2b4b80229/",
  },
  {
    name: "Kotnur Abhiram",
    role: "Founding Growth",
    bio: "Once a generalist, now humbled at Redstring focusing on Growth and Operations by still wishing for that earlier version.",
    image: "/team/Abhiram.png",
    linkedin: "https://www.linkedin.com/in/abhiram-kotnur-0678b1199/",
  },
  {
    name: "Keval Sudra",
    role: "Head of Technology",
    bio: "A pragmatic visionary blending engineering depth with strategic clarity to power scalable digital experiences.",
    image: "/team/Keval.png",
    linkedin: "https://linkedin.com/in/keval-sudra",
  },
  {
    name: "Chinmay Ram",
    role: "Content Strategist",
    bio: "A flamboyant mind showcasing its creativity and strategic flair in developing content for Redstring.",
    image: "/team/Chinmay.png",
    linkedin: "https://www.linkedin.com/in/chinmay-ram-4893ba382/",
  },
  {
    name: "Devashish",
    role: "Full Stack Developer",
    bio: "Engineer, builder, and lifelong learner. I turn ideas into products by combining first-principles thinking with relentless execution.",
    image: "/team/devashish.png",
    linkedin: "https://www.linkedin.com/in/devzshrc/",
  },
];

function TeamCard({ name, role, bio, image, linkedin }: (typeof teamMembers)[0]) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);


  return (
    <motion.div 
      className="group bg-card border border-border rounded-[32px] p-1 transition-all duration-500 flex flex-col gap-[16px] shadow-sm hover:shadow-lg h-full"
    >
      <div className="w-full aspect-[4/5] sm:h-[320px] rounded-t-[28px] rounded-b-[24px] bg-secondary flex items-center justify-center overflow-hidden relative shrink-0">
        <div className="w-full h-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-700" />
        
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:translate-y-0">
          <div className="flex gap-2">
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors shadow-lg">
                <LinkedInIcon className="w-full h-full text-white" />
              </a>
            )}
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors shadow-lg">
              <TwitterIcon className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[12px] px-2 pb-3 grow">
        <div className="flex flex-col items-start">
          <h3 className="text-xl text-foreground font-semibold tracking-tight">
            {name}
          </h3>
          <span className="text-md text-primary font-medium">
            {role}
          </span>
        </div>
        <p className="text-[15px] text-muted-foreground leading-normal font-light mt-auto">
          {bio}
        </p>
      </div>
    </motion.div>
  );
}

export function Team() {
  return (
    <section className="py-[120px] flex flex-col items-center max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-[80px]"
      >
        <h2
          className="font-[540] font-denton text-foreground text-[36px] md:text-[44px] lg:text-[48px] text-center mb-4 w-full"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Meet the Minds Behind Redstring
        </h2>
        <p className="text-muted-foreground text-[18px] max-w-[600px] text-center font-light">
          We are builders, designers, and operators united by a single goal: to fundamentally change how companies hire.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] w-full">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            className="h-full"
          >
            <TeamCard {...member} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
