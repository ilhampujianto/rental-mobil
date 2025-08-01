// app/api/register/route.ts
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ user: null, message: "Email sudah terdaftar" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    console.log("Hashed password:", hashedPassword)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    })

    const { password: _, ...userWithoutPass } = newUser

    return NextResponse.json({ user: userWithoutPass, message: "User created successfully" }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 })
  }
}
