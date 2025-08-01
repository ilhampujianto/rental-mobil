// app/api/cars/[id]/route.ts
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()

  const updatedCar = await prisma.car.update({
    where: { id: params.id },
    data: {
      name: body.name,
      brand: body.brand,
      price: Number(body.price),
      imageUrl: body.imageUrl,
      description: body.description,
    },
  })

  return NextResponse.json(updatedCar)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.car.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ message: "Car deleted" })
}
