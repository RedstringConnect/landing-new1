import { NextResponse } from 'next/server';
import { generateHiringPlaybook } from '@/lib/services/hiringPlannerServerService';

export const maxDuration = 30; // Max execution time

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await generateHiringPlaybook(body);
    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('API /hiring-planner/generate Error:', error);
    return NextResponse.json({ message: (error as Error).message || 'Failed to generate roadmap' }, { status: 400 });
  }
}
