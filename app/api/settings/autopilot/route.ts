import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    let workspace = await prisma.workspace.findFirst();
    
    // Auto-seed for development purposes if none exists
    if (!workspace) {
      let user = await prisma.user.findUnique({ where: { email: 'admin@opticrew.io' } });
      if (!user) {
        user = await prisma.user.create({
          data: { email: 'admin@opticrew.io', name: 'Opticrew Admin' }
        });
      }
      workspace = await prisma.workspace.create({
        data: { userId: user.id }
      });
    }
    
    return NextResponse.json(workspace);
  } catch (error) {
    console.error("GET /api/settings/autopilot error:", error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let workspace = await prisma.workspace.findFirst();
    
    if (workspace) {
      workspace = await prisma.workspace.update({
        where: { id: workspace.id },
        data: {
          name: body.name,
          cmsType: body.cmsType,
          cmsEndpoint: body.cmsEndpoint,
          cmsApiKey: body.cmsApiKey,
          publishSchedule: body.publishSchedule,
          autoIndex: body.autoIndex,
          autoInternalLinking: body.autoInternalLinking,
          maxLinksPerArticle: body.maxLinksPerArticle,
        }
      });
    }
    
    return NextResponse.json(workspace);
  } catch (error) {
    console.error("POST /api/settings/autopilot error:", error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
