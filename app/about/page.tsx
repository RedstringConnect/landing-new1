import { Navbar } from "@/components/Navbar";
import { AboutHero } from "@/components/about/AboutHero";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { Team } from "@/components/about/Team";
import { Footer } from "@/components/Footer";

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
