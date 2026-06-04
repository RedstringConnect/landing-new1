import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RunwayHero } from "@/components/runway-to-roi/RunwayHero";
import { WhyPlanner } from "@/components/hiring-planner/WhyPlanner";
import { HowItWorks } from "@/components/hiring-planner/HowItWorks";
import { PlannerFAQ } from "@/components/hiring-planner/PlannerFAQ";

export default function RunwayToROIPage() {
  return (
    <div className="bg-background min-h-screen w-full overflow-x-clip">
      <Navbar />
      <main>
        <RunwayHero />
        <WhyPlanner />
        <HowItWorks />
        <PlannerFAQ />
      </main>
      <Footer />
    </div>
  );
}
