import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

type Params = {
  params: { id: string }
}

export async function GET(_: Request, { params }: Params) {
  const customer = await prisma.customer.findUnique({
    where: { id: params.id },
  })
  return NextResponse.json(customer)
}

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json()
  const updated = await prisma.customer.update({
    where: { id: params.id },
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
    },
  })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: Params) {
  await prisma.customer.delete({
    where: { id: params.id },
  })
  return NextResponse.json({ message: "Customer deleted" })
}
