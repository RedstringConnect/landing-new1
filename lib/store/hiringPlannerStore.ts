import type { HiringPlannerRoadmap, HiringPlannerNormalizedInput } from "@/types/hiring-planner";

export const SESSION_KEY = "hiring_planner_data";

export interface HiringPlannerSessionData {
  input: HiringPlannerNormalizedInput;
  roadmap: HiringPlannerRoadmap;
}

export const setHiringPlannerData = (data: HiringPlannerSessionData) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
};

export const getHiringPlannerData = (): HiringPlannerSessionData | null => {
  if (typeof window === "undefined") return null;
  const data = sessionStorage.getItem(SESSION_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const clearHiringPlannerData = () => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
};
