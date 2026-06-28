import { createHiringPlannerPdfBuffer } from '../utils/hiringPlannerPdf';

import { HiringPlannerInput, HiringPlannerNormalizedInput, HiringPlannerRoadmap, HiringPlannerBudgetAllocation, HiringPlannerRosterItem } from '@/types/hiring-planner';

// --- Constants ---
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const HIRING_PLANNER_MODEL = 'openai/gpt-oss-120b';

const VALID_STATUSES = ['Pre-product', 'MVP Ready', 'Post-Revenue', 'Scaling'];

const STATUS_DEFAULTS: Record<string, any> = {
  'Pre-product': { alloc: { talent: 75, marketing: 10, ops: 15 }, runway: '12-15 months', roles: ['Founding Engineer', 'Product Designer', 'Growth Marketer'] },
  'MVP Ready': { alloc: { talent: 70, marketing: 15, ops: 15 }, runway: '9-12 months', roles: ['Full-Stack Developer', 'Growth Marketer', 'SDR'] },
  'Post-Revenue': { alloc: { talent: 65, marketing: 20, ops: 15 }, runway: '9-12 months', roles: ['Account Executive', 'Customer Success Manager', 'Revenue Operations Lead'] },
  'Scaling': { alloc: { talent: 60, marketing: 25, ops: 15 }, runway: '6-9 months', roles: ['Sales Manager', 'Performance Marketer', 'Business Operations Manager'] },
};

const ROLE_LIBRARY: Record<string, { comp: number; why: string }> = {
  'Founding Engineer': { comp: 1800000, why: 'Own core product build, unblock technical tradeoffs, and keep iteration speed high.' },
  'Full-Stack Developer': { comp: 1200000, why: 'Ships product work across the stack without creating a fragmented early team.' },
  'Product Designer': { comp: 900000, why: 'Improves product clarity and helps convert founder direction into usable workflows.' },
  'Growth Marketer': { comp: 800000, why: 'Turns early demand experiments into repeatable acquisition signals.' },
  'Performance Marketer': { comp: 1000000, why: 'Scales paid demand and channel efficiency once the motion is already working.' },
  'SDR': { comp: 450000, why: 'Creates top-of-funnel conversations so founders are not prospecting manually.' },
  'Account Executive': { comp: 1100000, why: 'Moves qualified demand through a cleaner revenue process and closes faster.' },
  'Sales Manager': { comp: 1500000, why: 'Adds structure to pipeline execution without forcing founder-led deal reviews on every opportunity.' },
  'Customer Success Manager': { comp: 800000, why: 'Protects retention and expansion so new revenue does not leak after the sale.' },
  'Revenue Operations Lead': { comp: 900000, why: 'Keeps CRM, reporting, and funnel operations tight as the go-to-market team expands.' },
  'Business Operations Manager': { comp: 1000000, why: 'Absorbs recurring operational drag so the founder can focus on leverage points.' },
};

const GOAL_RULES = [
  { keys: ['build', 'v1', 'mvp', 'launch', 'product'], roles: ['Founding Engineer', 'Full-Stack Developer', 'Product Designer', 'Growth Marketer'], shift: { talent: 5, marketing: -5 } },
  { keys: ['revenue', 'sales', 'customer', 'pipeline', 'close'], roles: ['SDR', 'Account Executive', 'Growth Marketer', 'Customer Success Manager'], shift: { talent: 0, marketing: 5, ops: -5 } },
  { keys: ['market', 'expand', 'region', 'geography', 'new market'], roles: ['Growth Marketer', 'Account Executive', 'Business Operations Manager'], shift: { marketing: 5, talent: -5 } },
  { keys: ['ops', 'process', 'automation', 'efficiency'], roles: ['Business Operations Manager', 'Revenue Operations Lead', 'Full-Stack Developer'], shift: { ops: 5, talent: -5 } },
];

// --- Utilities ---
const trimText = (val: string | null | undefined, fallback = '') => typeof val === 'string' ? (val.trim() || fallback) : fallback;
const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
const formatInr = (amt: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amt);

const normalizeBudget = (raw: string | number | undefined): number => {
  if (typeof raw === 'number' && raw > 0) return Math.round(raw);
  const text = String(raw || '').toLowerCase().trim();
  const num = parseFloat(text.replace(/[^\d.]/g, ''));
  if (!num || num <= 0) return NaN;
  if (/crore|cr\b/.test(text)) return Math.round(num * 10000000);
  if (/lakhs?|lacs?\b/.test(text)) return Math.round(num * 100000);
  return Math.round(num);
};

const normalizeHiringPlannerInput = (payload: Partial<HiringPlannerInput>): HiringPlannerNormalizedInput => {
  console.log("normalizeHiringPlannerInput received payload:", payload);
  const currentStatus = trimText(payload?.currentStatus);
  const primaryGoal = trimText(payload?.primaryGoal);
  const budgetStr = trimText(String(payload?.totalBudgetAllocation || ''));

  if (!currentStatus || !primaryGoal || !budgetStr) throw new Error(`Missing required fields. Status: ${!!currentStatus}, Goal: ${!!primaryGoal}, Budget: ${!!budgetStr}`);
  if (!VALID_STATUSES.includes(currentStatus)) throw new Error("Invalid status");
  
  const normalizedBudget = normalizeBudget(budgetStr);
  if (isNaN(normalizedBudget)) throw new Error("Invalid budget");

  return { currentStatus: currentStatus as any, primaryGoal, totalBudgetAllocation: budgetStr, normalizedBudget, formattedBudget: formatInr(normalizedBudget) };
};

// --- Fallback Generators ---
const buildFallbackRoadmap = (input: HiringPlannerNormalizedInput): HiringPlannerRoadmap => {
  const defaults = STATUS_DEFAULTS[input.currentStatus];
  const goalRule = GOAL_RULES.find(r => r.keys.some(k => input.primaryGoal.toLowerCase().includes(k)));
  
  let { talent, marketing, ops } = defaults.alloc;
  if (goalRule?.shift) {
    talent = clamp(talent + (goalRule.shift.talent || 0), 50, 80);
    marketing = clamp(marketing + (goalRule.shift.marketing || 0), 10, 30);
  }
  ops = 100 - talent - marketing;

  const allocations = [
    { label: 'Talent' as const, percentage: talent, amount: Math.round(input.normalizedBudget * talent / 100), formattedAmount: formatInr(Math.round(input.normalizedBudget * talent / 100)), description: 'Reserved for direct team capacity.' },
    { label: 'Marketing/Ads' as const, percentage: marketing, amount: Math.round(input.normalizedBudget * marketing / 100), formattedAmount: formatInr(Math.round(input.normalizedBudget * marketing / 100)), description: 'Used to scale demand.' },
    { label: 'Ops/Tools' as const, percentage: ops, amount: Math.round(input.normalizedBudget * ops / 100), formattedAmount: formatInr(Math.round(input.normalizedBudget * ops / 100)), description: 'Covers systems and overhead.' },
  ];

  const talentBudget = allocations[0].amount;
  const rolesToHire = [...new Set([...(goalRule?.roles || []), ...defaults.roles])];
  const hires: HiringPlannerRosterItem[] = [];
  let used = 0;

  for (const roleName of rolesToHire) {
    const role = ROLE_LIBRARY[roleName];
    if (!role || used + role.comp > talentBudget) continue;
    hires.push({ role: roleName, count: 1, annualCompensation: role.comp, formattedAnnualCompensation: formatInr(role.comp), why: role.why });
    used += role.comp;
    if (hires.length >= 4) break;
  }
  if (!hires.length) hires.push({ role: 'Growth Marketer', count: 1, annualCompensation: ROLE_LIBRARY['Growth Marketer'].comp, formattedAnnualCompensation: formatInr(ROLE_LIBRARY['Growth Marketer'].comp), why: ROLE_LIBRARY['Growth Marketer'].why });

  return {
    overview: { headline: `Runway-to-ROI plan for ${input.currentStatus} founders`, summary: `A capital allocation roadmap for ${input.formattedBudget} focused on: ${input.primaryGoal}.` },
    budgetBreakdown: { totalBudget: input.formattedBudget, recommendedRunway: defaults.runway, allocations },
    hiringRoster: { totalHeadcount: hires.reduce((acc, h) => acc + h.count, 0), hires },
    justification: { headline: 'Why this team works', body: `At the ${input.currentStatus} stage, the fastest path to ${input.primaryGoal} is a lean team prioritizing execution.` },
    loopxPitch: { title: 'Launch this roadmap in LoopX', body: 'Turn these recommended roles into live hiring workflows.', ctaLabel: 'Build This Team in LoopX' },
  };
};

const parseAI = (content: string) => {
  try { return JSON.parse(content.replace(/.*?```json\s*|\s*```.*/g, '')); } 
  catch { return null; }
};

const mergeRoadmap = (aiData: Partial<HiringPlannerRoadmap> | null, input: HiringPlannerNormalizedInput): HiringPlannerRoadmap => {
  const fb = buildFallbackRoadmap(input);
  if (!aiData) return fb;

  const mergeAlloc = (fbAlloc: HiringPlannerBudgetAllocation) => {
    const aiAlloc = aiData?.budgetBreakdown?.allocations?.find((a) => a.label === fbAlloc.label);
    return aiAlloc ? { ...fbAlloc, description: trimText(aiAlloc.description, fbAlloc.description) } : fbAlloc;
  };

  const hires = (aiData?.hiringRoster?.hires || fb.hiringRoster.hires).map((h) => ({
    role: trimText(h.role), count: Number(h.count) || 1, annualCompensation: Number(h.annualCompensation) || 0,
    formattedAnnualCompensation: h.formattedAnnualCompensation || formatInr(Number(h.annualCompensation) || 0), why: trimText(h.why)
  }));

  return {
    overview: { headline: trimText(aiData?.overview?.headline, fb.overview.headline), summary: trimText(aiData?.overview?.summary, fb.overview.summary) },
    budgetBreakdown: { totalBudget: fb.budgetBreakdown.totalBudget, recommendedRunway: trimText(aiData?.budgetBreakdown?.recommendedRunway, fb.budgetBreakdown.recommendedRunway), allocations: fb.budgetBreakdown.allocations.map(mergeAlloc) },
    hiringRoster: { totalHeadcount: hires.reduce((a, h) => a + h.count, 0), hires },
    justification: { headline: trimText(aiData?.justification?.headline, fb.justification.headline), body: trimText(aiData?.justification?.body, fb.justification.body) },
    loopxPitch: fb.loopxPitch,
  };
};

// --- Exports ---
export const generateHiringPlaybook = async (payload: Partial<HiringPlannerInput>) => {
  const input = normalizeHiringPlannerInput(payload);
  if (!process.env.GROQ_API_KEY) return { input, source: 'fallback', roadmap: buildFallbackRoadmap(input) };

  try {
    const res = await fetch(GROQ_API_URL, {
      method: 'POST', headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: HIRING_PLANNER_MODEL, temperature: 0.3, max_tokens: 1500,
        messages: [
          { role: 'system', content: 'You create sharp founder-facing budget hiring roadmaps for startups and return JSON only.' },
          { role: 'user', content: `Create a "Runway-to-ROI" hiring roadmap for LoopX.\nStatus: ${input.currentStatus}\nGoal: ${input.primaryGoal}\nBudget: ${input.formattedBudget}\nReturn valid JSON matching this schema: { "overview": { "headline": "string", "summary": "string" }, "budgetBreakdown": { "recommendedRunway": "string", "allocations": [ { "label": "Talent"|"Marketing/Ads"|"Ops/Tools", "description": "string" } ] }, "hiringRoster": { "hires": [ { "role": "string", "count": 1, "annualCompensation": 1200000, "why": "string" } ] }, "justification": { "headline": "string", "body": "string" } }` }
        ],
      }),
    });
    if (!res.ok) throw new Error(`Groq Error: ${res.status}`);
    const parsed = parseAI((await res.json()).choices?.[0]?.message?.content || '');
    return { input, source: parsed ? 'ai' : 'fallback', roadmap: mergeRoadmap(parsed, input) };
  } catch (e) {
    console.error('HiringPlannerService:', e);
    return { input, source: 'fallback', roadmap: buildFallbackRoadmap(input) };
  }
};

export const prepareHiringPlannerDelivery = (payload: { email?: string; input?: Partial<HiringPlannerInput>; roadmap?: Partial<HiringPlannerRoadmap> }) => {
  const email = (payload?.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Enter a valid email.');
  
  const input = normalizeHiringPlannerInput(payload.input || {});
  const roadmap = mergeRoadmap(payload.roadmap || null, input);
  
  return { email, input, roadmap, pdfBuffer: createHiringPlannerPdfBuffer({ input, roadmap }), fileName: 'loopx-hiring-roadmap.pdf' };
};

export const generateHiringPlannerPdf = (payload: { input?: Partial<HiringPlannerInput>; roadmap?: Partial<HiringPlannerRoadmap> }) => {
  const input = normalizeHiringPlannerInput(payload.input || {});
  const roadmap = mergeRoadmap(payload.roadmap || null, input);
  
  return { pdfBuffer: createHiringPlannerPdfBuffer({ input, roadmap }), fileName: 'loopx-hiring-roadmap.pdf' };
};
