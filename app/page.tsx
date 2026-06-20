import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redstring - Home',
  description: 'Welcome to Redstring.',
};

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";

import { MeetLoopX } from "@/components/MeetLoopX";
import { WhyRedstring } from "@/components/WhyRedstring";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-background min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main className="w-full flex flex-col">
        <HeroSection />
        <div className="w-full h-px bg-border" />
        <MeetLoopX />
        <div className="w-full h-px bg-border" />
        <WhyRedstring />
        <div className="w-full h-px bg-border" />
        <Testimonials />
        <div className="w-full h-px bg-border" />
        <FAQ />
        <div className="w-full h-px bg-border" />
<FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
