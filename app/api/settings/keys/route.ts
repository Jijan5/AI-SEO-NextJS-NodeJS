import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role, provider, apiKey } = body;
    
    let workspace = await prisma.workspace.findFirst();
    if (!workspace) {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    const integration = await prisma.integration.upsert({
      where: {
        workspaceId_role: { workspaceId: workspace.id, role }
      },
      update: {
        provider,
        apiKey
      },
      create: {
        workspaceId: workspace.id,
        role,
        provider,
        apiKey
      }
    });

    return NextResponse.json({ success: true, integration });
  } catch (error) {
    console.error("POST /api/settings/keys error:", error);
    return NextResponse.json({ error: 'Failed to save key' }, { status: 500 });
  }
}
