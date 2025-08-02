// app/api/apitest/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      take: 1,
    });

    return NextResponse.json({
      success: true,
      message: "Database connected ✅",
      users,
    });
  } catch (error) {
    console.error("DB Test Error:", error);
    return NextResponse.json(
      { success: false, message: "Database connection failed ❌", error },
      { status: 500 }
    );
  }
}
