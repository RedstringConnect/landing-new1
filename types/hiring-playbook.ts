export type HiringPlaybookInput = {
  companyName: string;
  industry: string;
  businessType: string;
  roleCategory: string;
  specificRole: string;
  seniorityLevel: string;
};

export type HiringPlaybookInterviewStage = {
  name: string;
  owner: string; // e.g., "Recruiter", "Hiring Manager", "Panel"
  duration: string; // e.g., "30 min", "1 hour"
  focus: string; // What the stage evaluates
};

export type HiringPlaybookQuestion = {
  question: string;
  targetAnswer: string; // What a good answer looks like
};

export type HiringPlaybookData = {
  roleOverview: {
    mission: string;
    keyResponsibilities: string[];
  };
  scorecard: {
    technicalSkills: string[];
    softSkills: string[];
    outcomes: string[]; // What they must achieve in first 90 days
  };
  interviewStages: HiringPlaybookInterviewStage[];
  keyQuestions: HiringPlaybookQuestion[];
  flags: {
    redFlags: string[];
    greenFlags: string[];
  };
};

export type HiringPlaybookGenerateResponse = {
  input: HiringPlaybookInput;
  source: "ai" | "fallback";
  playbook: HiringPlaybookData;
};
