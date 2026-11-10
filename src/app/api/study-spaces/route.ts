import { NextResponse } from "next/server";
import { getAllSpaces, toLive } from "@/lib/study-spaces";

export const dynamic = "force-dynamic";

export async function GET() {
  const lastUpdated = new Date().toISOString();
  const spaces = getAllSpaces().map((s) => toLive(s, lastUpdated));
  return NextResponse.json({ spaces, lastUpdated, sample: true });
}
