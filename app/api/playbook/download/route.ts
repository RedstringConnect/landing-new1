import { NextResponse } from 'next/server';
import { generatePlaybookPdf } from '@/lib/services/playbookServerService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = generatePlaybookPdf(body);
    
    return new NextResponse(result.pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${result.fileName}"`,
      },
    });
  } catch (error: unknown) {
    console.error('API /playbook/download Error:', error);
    return NextResponse.json({ message: (error as Error).message || 'Failed to generate PDF' }, { status: 400 });
  }
}
