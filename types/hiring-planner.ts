export type HiringPlannerCurrentStatus =
  | "Pre-product"
  | "MVP Ready"
  | "Post-Revenue"
  | "Scaling";

export type HiringPlannerInput = {
  currentStatus: HiringPlannerCurrentStatus;
  primaryGoal: string;
  totalBudgetAllocation: string;
};

export type HiringPlannerNormalizedInput = HiringPlannerInput & {
  normalizedBudget: number;
  formattedBudget: string;
};

export type HiringPlannerBudgetAllocation = {
  label: "Talent" | "Marketing/Ads" | "Ops/Tools";
  percentage: number;
  amount: number;
  formattedAmount: string;
  description: string;
};

export type HiringPlannerRosterItem = {
  role: string;
  count: number;
  annualCompensation: number;
  formattedAnnualCompensation: string;
  why: string;
};

export type HiringPlannerRoadmap = {
  overview: {
    headline: string;
    summary: string;
  };
  budgetBreakdown: {
    totalBudget: string;
    recommendedRunway: string;
    allocations: HiringPlannerBudgetAllocation[];
  };
  hiringRoster: {
    totalHeadcount: number;
    hires: HiringPlannerRosterItem[];
  };
  justification: {
    headline: string;
    body: string;
  };
  loopxPitch: {
    title: string;
    body: string;
    ctaLabel: string;
  };
};

export type HiringPlannerGenerateResponse = {
  input: HiringPlannerNormalizedInput;
  source: "ai" | "fallback";
  roadmap: HiringPlannerRoadmap;
};

export type HiringPlannerUnlockRequest = {
  email: string;
  input: HiringPlannerNormalizedInput;
  roadmap: HiringPlannerRoadmap;
};

export type HiringPlannerUnlockResponse = {
  success: boolean;
  message: string;
  data: {
    recipientEmail: string;
    messageId?: string;
  };
};
