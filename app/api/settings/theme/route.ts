import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
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
    console.error("GET /api/settings/theme error:", error);
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
          domain: body.domain,
          primaryColor: body.primaryColor,
          darkBg: body.darkBg,
          darkPanel: body.darkPanel,
          lightBg: body.lightBg,
          lightPanel: body.lightPanel,
        }
      });
    }
    
    return NextResponse.json(workspace);
  } catch (error) {
    console.error("POST /api/settings/theme error:", error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
