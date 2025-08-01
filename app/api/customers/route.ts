import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const customers = await prisma.customer.findMany()
  return NextResponse.json(customers)
}

export async function POST(req: Request) {
  const body = await req.json()
  const newCustomer = await prisma.customer.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
    },
  })
  return NextResponse.json(newCustomer)
}
