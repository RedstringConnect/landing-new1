import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { AboutHero } from "@/components/about/AboutHero";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { Team } from "@/components/about/Team";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | Redstring",
  description: "Learn about Redstring — the team building AI-powered hiring tools for modern teams.",
  openGraph: {
    title: "About Redstring",
    description: "Learn about Redstring — the team building AI-powered hiring tools for modern teams.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main className="w-full flex flex-col">
        <AboutHero />
        <div className="w-full h-px bg-border" />
        <WhoWeAre />
        <div className="w-full h-px bg-border" />
        <Team />
        <div className="w-full h-px bg-border" />
      </main>
      <Footer />
    </div>
  );
}
