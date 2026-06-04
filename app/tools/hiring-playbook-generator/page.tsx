import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PlaybookHero } from "@/components/hiring-playbook/PlaybookHero";
import { WhyPlanner } from "@/components/hiring-planner/WhyPlanner";
import { HowItWorks } from "@/components/hiring-planner/HowItWorks";
import { PlannerFAQ } from "@/components/hiring-planner/PlannerFAQ";

export default function HiringPlaybookGeneratorPage() {
  return (
    <div className="bg-background min-h-screen w-full overflow-x-clip">
      <Navbar />
      <main>
        <PlaybookHero />
        <WhyPlanner />
        <HowItWorks />
        <PlannerFAQ />
      </main>
      <Footer />
    </div>
  );
}
