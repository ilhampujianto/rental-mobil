// app/api/register/route.ts

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    // Validasi input
    if (!name || !email || !password) {
      console.error("❌ Missing fields:", { name, email, password })
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    // Cek apakah email sudah digunakan
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.error("❌ Email already in use:", email)
      return NextResponse.json({ error: "Email already registered." }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Simpan user baru
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    console.log("✅ User registered:", user.email)

    return NextResponse.json({
      message: "User registered successfully.",
      user: { id: user.id, name: user.name, email: user.email },
    })
  } catch (error) {
    console.error("🔥 REGISTER ERROR:", error)
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    )
  }
}
