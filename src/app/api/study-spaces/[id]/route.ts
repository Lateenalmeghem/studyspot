import { NextResponse } from "next/server";
import { getSpaceById, toLive } from "@/lib/study-spaces";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const space = getSpaceById(id);
  if (!space) {
    return NextResponse.json(
      { error: "Study space not found" },
      { status: 404 }
    );
  }
  const lastUpdated = new Date().toISOString();
  const live = toLive(space, lastUpdated);
  return NextResponse.json({ space: live, lastUpdated, sample: true });
}
