import { HiringPlaybookInput, HiringPlaybookData, HiringPlaybookGenerateResponse } from '@/types/hiring-playbook';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const trimText = (t: unknown) => String(t || '').trim();

type JsPDFWithAutoTable = jsPDF & { lastAutoTable: { finalY: number } };

export const normalizePlaybookInput = (payload: Partial<HiringPlaybookInput>): HiringPlaybookInput => {
  const companyName = trimText(payload?.companyName);
  const industry = trimText(payload?.industry);
  const businessType = trimText(payload?.businessType);
  const roleCategory = trimText(payload?.roleCategory);
  const specificRole = trimText(payload?.specificRole);
  const seniorityLevel = trimText(payload?.seniorityLevel);

  if (!companyName || !industry || !businessType || !roleCategory || !specificRole || !seniorityLevel) {
    throw new Error("Missing required fields");
  }

  return { companyName, industry, businessType, roleCategory, specificRole, seniorityLevel };
};

const buildFallbackPlaybook = (input: HiringPlaybookInput): HiringPlaybookData => {
  return {
    roleOverview: {
      mission: `Drive success in the ${input.specificRole} role at ${input.companyName}.`,
      keyResponsibilities: [
        "Take ownership of core projects and deliverables.",
        "Collaborate cross-functionally with other teams.",
        "Ensure high quality and best practices are met."
      ]
    },
    scorecard: {
      technicalSkills: ["Relevant industry experience", "Domain-specific tooling"],
      softSkills: ["Communication", "Problem-solving", "Adaptability"],
      outcomes: [
        "Onboard and understand the product within 30 days.",
        "Deliver first major project within 90 days."
      ]
    },
    interviewStages: [
      { name: "Recruiter Screen", owner: "Recruiter", duration: "30 min", focus: "Culture fit and basic qualifications." },
      { name: "Hiring Manager Interview", owner: "Hiring Manager", duration: "45 min", focus: "Past experience and technical alignment." },
      { name: "Team Panel", owner: "Panel", duration: "60 min", focus: "Deep dive and case study." }
    ],
    keyQuestions: [
      { question: "Tell me about a time you overcame a major challenge.", targetAnswer: "Looking for structure (STAR method) and accountability." },
      { question: "Why are you interested in this role?", targetAnswer: "Looking for genuine interest in the company's mission." }
    ],
    flags: {
      redFlags: ["Blames others for past failures", "Cannot articulate past impact"],
      greenFlags: ["Asks insightful questions", "Shows enthusiasm for the product"]
    }
  };
};

const parseAI = (content: string) => {
  try { return JSON.parse(content.replace(/.*?```json\s*|\s*```.*/g, '')); } 
  catch { return null; }
};

export const generateHiringPlaybook = async (payload: Partial<HiringPlaybookInput>): Promise<HiringPlaybookGenerateResponse> => {
  const input = normalizePlaybookInput(payload);
  if (!process.env.GROQ_API_KEY) return { input, source: 'fallback', playbook: buildFallbackPlaybook(input) };

  try {
    const res = await fetch(GROQ_API_URL, {
      method: 'POST', headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are an expert executive recruiter and HR strategist. Generate an extremely detailed and comprehensive hiring playbook.
            
            Guidelines:
            - "mission": Provide a 3-4 sentence detailed mission statement.
            - "keyResponsibilities": List 6-8 specific, actionable responsibilities.
            - "scorecard": Provide 6-8 "technicalSkills", 6-8 "softSkills", and 4-6 specific "outcomes" (with timelines).
            - "interviewStages": Provide 4-5 stages. For each, give a detailed "focus" (2-3 sentences).
            - "keyQuestions": Provide 5-7 behavioral and technical questions, with highly detailed "targetAnswer" rubrics.
            - "flags": Provide 4-6 "redFlags" and 4-6 "greenFlags".
            
            Output strictly in JSON matching this schema:
            {
              "roleOverview": { "mission": "string", "keyResponsibilities": ["string"] },
              "scorecard": { "technicalSkills": ["string"], "softSkills": ["string"], "outcomes": ["string"] },
              "interviewStages": [ { "name": "string", "owner": "string", "duration": "string", "focus": "string" } ],
              "keyQuestions": [ { "question": "string", "targetAnswer": "string" } ],
              "flags": { "redFlags": ["string"], "greenFlags": ["string"] }
            }
            Do not include any markdown formatting outside the JSON.`
          },
          {
            role: 'user',
            content: `Generate a hiring playbook for the following role:
            Company: ${input.companyName}
            Industry: ${input.industry}
            Business Type: ${input.businessType}
            Role Category: ${input.roleCategory}
            Specific Role: ${input.specificRole}
            Seniority: ${input.seniorityLevel}`
          }
        ],
      }),
    });
    if (!res.ok) throw new Error(`Groq Error: ${res.status}`);
    const parsed = parseAI((await res.json()).choices?.[0]?.message?.content || '');
    return { input, source: parsed ? 'ai' : 'fallback', playbook: parsed || buildFallbackPlaybook(input) };
  } catch (e) {
    console.error('PlaybookService:', e);
    return { input, source: 'fallback', playbook: buildFallbackPlaybook(input) };
  }
};

export const createPlaybookPdfBuffer = ({ input, playbook }: { input: HiringPlaybookInput; playbook: HiringPlaybookData }): Buffer => {
  const doc = new jsPDF();
  // Header background
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 45, 'F');
  
  // Title
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text(`Hiring Playbook`, 14, 20);
  
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.text(`${input.seniorityLevel} ${input.specificRole}`, 14, 29);
  
  doc.setFontSize(11);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(`${input.companyName} | ${input.industry} | ${input.businessType}`, 14, 38);
  
  // Mission
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text("Role Mission & Responsibilities", 14, 60);
  
  doc.setFontSize(11);
  doc.setTextColor(51, 65, 87);
  doc.setFont("helvetica", "normal");
  const splitMission = doc.splitTextToSize(playbook.roleOverview.mission, 180);
  doc.text(splitMission, 14, 68);
  
  let currentY = 68 + (splitMission.length * 5) + 6;
  
  const respText = playbook.roleOverview.keyResponsibilities.map(r => `• ${r}`).join('\n');
  const splitResp = doc.splitTextToSize(respText, 180);
  doc.text(splitResp, 14, currentY);
  
  currentY += (splitResp.length * 5) + 15;
  
  // Scorecard
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text("Evaluation Scorecard", 14, currentY);
  currentY += 6;
  
  autoTable(doc, {
    startY: currentY,
    head: [['Technical Skills', 'Soft Skills', '90-Day Outcomes']],
    body: [
      [
        playbook.scorecard.technicalSkills.map(s => `• ${s}`).join('\n\n'),
        playbook.scorecard.softSkills.map(s => `• ${s}`).join('\n\n'),
        playbook.scorecard.outcomes.map(s => `• ${s}`).join('\n\n')
      ]
    ],
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246], textColor: 255, fontStyle: 'bold' },
    styles: { cellPadding: 6, fontSize: 10, valign: 'top', cellWidth: 'wrap' }
  });
  
  currentY = (doc as unknown as JsPDFWithAutoTable).lastAutoTable.finalY + 15;
  
  // Interview Stages
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text("Interview Stages", 14, currentY);
  currentY += 6;
  
  const stageData = playbook.interviewStages.map(s => [s.name, s.owner, s.duration, s.focus]);
  autoTable(doc, {
    startY: currentY,
    head: [['Stage', 'Owner', 'Duration', 'Focus']],
    body: stageData,
    theme: 'grid',
    headStyles: { fillColor: [16, 185, 129], textColor: 255, fontStyle: 'bold' },
    styles: { cellPadding: 6, fontSize: 10, cellWidth: 'wrap' },
    columnStyles: {
      0: { fontStyle: 'bold' },
      3: { cellWidth: 80 }
    }
  });
  
  currentY = (doc as unknown as JsPDFWithAutoTable).lastAutoTable.finalY + 15;
  
  // Key Questions
  if (currentY > 240) {
    doc.addPage();
    currentY = 20;
  }
  
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text("Key Questions & Rubric", 14, currentY);
  currentY += 6;
  
  const qData = playbook.keyQuestions.map(q => [q.question, q.targetAnswer]);
  autoTable(doc, {
    startY: currentY,
    head: [['Question', 'What to look for (Target Answer)']],
    body: qData,
    theme: 'grid',
    headStyles: { fillColor: [139, 92, 246], textColor: 255, fontStyle: 'bold' },
    styles: { cellPadding: 6, fontSize: 10, cellWidth: 'wrap' }
  });
  
  currentY = (doc as unknown as JsPDFWithAutoTable).lastAutoTable.finalY + 15;
  
  // Flags
  if (currentY > 230) {
    doc.addPage();
    currentY = 20;
  }
  
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text("Evaluation Flags", 14, currentY);
  currentY += 6;
  
  autoTable(doc, {
    startY: currentY,
    head: [['Green Flags (Hire Indicators)', 'Red Flags (Pass Indicators)']],
    body: [
      [
        playbook.flags.greenFlags.map(s => `• ${s}`).join('\n\n'),
        playbook.flags.redFlags.map(s => `• ${s}`).join('\n\n')
      ]
    ],
    theme: 'grid',
    headStyles: { fillColor: [71, 85, 105], textColor: 255, fontStyle: 'bold' },
    styles: { cellPadding: 6, fontSize: 10, valign: 'top', cellWidth: 'wrap' }
  });
  
  return Buffer.from(doc.output('arraybuffer'));
};

export const generatePlaybookPdf = (payload: { input?: Partial<HiringPlaybookInput>; playbook?: Partial<HiringPlaybookData> }) => {
  const input = normalizePlaybookInput(payload.input || {});
  const playbook = payload.playbook as HiringPlaybookData; // Assume it's passed completely from client
  
  return { pdfBuffer: createPlaybookPdfBuffer({ input, playbook }), fileName: `${input.companyName.replace(/\s+/g, '-').toLowerCase()}-hiring-playbook.pdf` };
};
