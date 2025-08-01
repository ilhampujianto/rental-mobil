import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const customer = await prisma.customer.findUnique({
    where: { id: context.params.id },
  })
  return NextResponse.json(customer)
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const body = await req.json()
  const updated = await prisma.customer.update({
    where: { id: context.params.id },
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
    },
  })
  return NextResponse.json(updated)
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await prisma.customer.delete({
    where: { id: context.params.id },
  })
  return NextResponse.json({ message: "Customer deleted" })
}
