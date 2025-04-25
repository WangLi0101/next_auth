import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasAuthSecret: !!process.env.AUTH_SECRET,
    // 注意：不要返回实际的 secret 值，这可能会造成安全风险
  });
}
