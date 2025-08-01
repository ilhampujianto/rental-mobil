// app/api/cars/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const cars = await prisma.car.findMany()
  return NextResponse.json(cars)
}

export async function POST(req: Request) {
  const body = await req.json()

  const newCar = await prisma.car.create({
    data: {
      name: body.name,
      brand: body.brand,
      price: Number(body.price),
      imageUrl: body.imageUrl,
      description: body.description,
    },
  })

  return NextResponse.json(newCar)
}

