import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PlannerHero } from "@/components/hiring-planner/PlannerHero";
import { WhyPlanner } from "@/components/hiring-planner/WhyPlanner";
import { HowItWorks } from "@/components/hiring-planner/HowItWorks";
import { PlannerFAQ } from "@/components/hiring-planner/PlannerFAQ";

export default function HiringPlannerPage() {
  return (
    <div className="bg-background min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main>
        <PlannerHero />
        <WhyPlanner />
        <HowItWorks />
        <PlannerFAQ />
      </main>
      <Footer />
    </div>
  );
}
