const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const PAGE_MARGIN_X = 48;
const PAGE_TOP = 790;
const PAGE_BOTTOM = 52;

const sanitizeAsciiText = (value: unknown) =>
  String(value ?? '')
    .replace(/₹/g, 'INR ')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/[^\x20-\x7E\n]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const escapePdfText = (value: unknown) =>
  sanitizeAsciiText(value).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

const wrapText = (value: unknown, maxChars: number) => {
  const text = sanitizeAsciiText(value);
  if (!text) return [];

  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (nextLine.length <= maxChars) {
      currentLine = nextLine;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
      currentLine = word;
      continue;
    }

    let remaining = word;
    while (remaining.length > maxChars) {
      lines.push(remaining.slice(0, maxChars - 1));
      remaining = remaining.slice(maxChars - 1);
    }
    currentLine = remaining;
  }

  if (currentLine) lines.push(currentLine);

  return lines;
};

const buildPdf = (pageStreams: string[]) => {
  const objects: (string | null)[] = [null];
  const fontRegularId = 3;
  const fontBoldId = 4;

  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objects[2] = null;
  objects[fontRegularId] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
  objects[fontBoldId] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>';

  const pageIds: number[] = [];

  for (const stream of pageStreams) {
    const contentId = objects.length;
    objects[contentId] = `<< /Length ${Buffer.byteLength(stream, 'utf8')} >>\nstream\n${stream}\nendstream`;

    const pageId = objects.length;
    pageIds.push(pageId);
    objects[pageId] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`;
  }

  objects[2] = `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] >>`;

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];

  for (let id = 1; id < objects.length; id += 1) {
    offsets[id] = Buffer.byteLength(pdf, 'utf8');
    pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length}\n`;
  pdf += '0000000000 65535 f \n';

  for (let id = 1; id < objects.length; id += 1) {
    pdf += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return Buffer.from(pdf, 'utf8');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createHiringPlannerPdfBuffer = ({ input, roadmap, generatedAt = new Date() }: any) => {
  const pageCommands: string[] = [];
  const pages: string[][] = [pageCommands];
  let currentPage: string[] = pageCommands;
  let y = PAGE_TOP;

  const newPage = () => {
    currentPage = [];
    pages.push(currentPage);
    y = PAGE_TOP;
  };

  const ensureSpace = (lines = 1) => {
    if (y - lines * 16 < PAGE_BOTTOM) {
      newPage();
    }
  };

  const writeLine = (text: unknown, options: { x?: number; size?: number; font?: string; leading?: number } = {}) => {
    const { x = PAGE_MARGIN_X, size = 11, font = 'F1' } = options;
    currentPage.push(`BT /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfText(text)}) Tj ET`);
    y -= options.leading || Math.max(size + 4, 14);
  };

  const writeWrapped = (text: unknown, options: { x?: number; size?: number; font?: string; leading?: number; maxChars?: number } = {}) => {
    const maxChars = options.maxChars || 82;
    const lines = wrapText(text, maxChars);
    if (!lines.length) return;
    ensureSpace(lines.length);
    for (const line of lines) {
      writeLine(line, options);
    }
  };

  const writeSpacer = (height = 8) => {
    y -= height;
  };

  writeLine('LoopX Hiring Roadmap', { size: 24, font: 'F2', leading: 30 });
  writeWrapped(`Generated ${generatedAt.toISOString().slice(0, 10)} for ${input.currentStatus}`, {
    size: 10,
    maxChars: 92,
    leading: 14,
  });
  writeWrapped(`Primary goal: ${input.primaryGoal}`, { size: 11, maxChars: 88 });
  writeWrapped(`Budget: ${input.formattedBudget}`, { size: 11, maxChars: 88 });
  writeSpacer(10);

  writeLine('Overview', { size: 16, font: 'F2', leading: 22 });
  writeWrapped(roadmap.overview.headline, { size: 12, font: 'F2', maxChars: 78 });
  writeWrapped(roadmap.overview.summary, { size: 11, maxChars: 86 });
  writeSpacer(8);

  writeLine('Budget Breakdown', { size: 16, font: 'F2', leading: 22 });
  writeWrapped(`Recommended runway: ${roadmap.budgetBreakdown.recommendedRunway}`, {
    size: 11,
    maxChars: 86,
  });

  for (const allocation of roadmap.budgetBreakdown.allocations) {
    ensureSpace(3);
    writeWrapped(`${allocation.label}: ${allocation.percentage}% | ${allocation.formattedAmount}`, {
      size: 12,
      font: 'F2',
      maxChars: 78,
    });
    writeWrapped(allocation.description, { size: 11, maxChars: 86 });
  }

  writeSpacer(8);
  writeLine('Hiring Roster', { size: 16, font: 'F2', leading: 22 });
  writeWrapped(`Recommended hires: ${roadmap.hiringRoster.totalHeadcount}`, {
    size: 11,
    maxChars: 86,
  });

  for (const hire of roadmap.hiringRoster.hires) {
    ensureSpace(4);
    writeWrapped(`${hire.role} x${hire.count} | ${hire.formattedAnnualCompensation} annual`, {
      size: 12,
      font: 'F2',
      maxChars: 78,
    });
    writeWrapped(hire.why, { size: 11, maxChars: 86 });
  }

  writeSpacer(8);
  writeLine('Justification', { size: 16, font: 'F2', leading: 22 });
  writeWrapped(roadmap.justification.headline, { size: 12, font: 'F2', maxChars: 78 });
  writeWrapped(roadmap.justification.body, { size: 11, maxChars: 86 });

  const streams = pages.map((commands) => commands.join('\n'));
  return buildPdf(streams);
};

export { createHiringPlannerPdfBuffer };
