import { NextResponse } from 'next/server';
import { prepareHiringPlannerDelivery } from '@/lib/services/hiringPlannerServerService';
// In a real implementation you would use a mailer (Resend, SendGrid) to send the PDF here.
// For now we will just return success like the original did.

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = prepareHiringPlannerDelivery(body);
    
    // Simulate sending email
    console.log(`Sending PDF to ${result.email} (Size: ${result.pdfBuffer.length} bytes)`);

    return NextResponse.json({ success: true, message: 'PDF unlocked and sent.' });
  } catch (error: unknown) {
    console.error('API /hiring-planner/unlock Error:', error);
    return NextResponse.json({ message: (error as Error).message || 'Failed to unlock roadmap' }, { status: 400 });
  }
}
