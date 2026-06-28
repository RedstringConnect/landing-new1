import type { HiringPlaybookData, HiringPlaybookInput } from "@/types/hiring-playbook";

export const SESSION_KEY = "hiring_playbook_data";

export interface PlaybookSessionData {
  input: HiringPlaybookInput;
  playbook: HiringPlaybookData;
}

export const setPlaybookData = (data: PlaybookSessionData) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
};

export const getPlaybookData = (): PlaybookSessionData | null => {
  if (typeof window === "undefined") return null;
  const data = sessionStorage.getItem(SESSION_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const clearPlaybookData = () => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
};
