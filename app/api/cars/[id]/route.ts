// app/api/cars/[id]/route.ts
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()

    const url = new URL(req.url)
    const id = url.pathname.split("/").pop()

    if (!id) {
      return NextResponse.json({ message: "ID tidak ditemukan di URL" }, { status: 400 })
    }

    const updatedCar = await prisma.car.update({
      where: { id },
      data: {
        name: body.name,
        brand: body.brand,
        price: Number(body.price),
        imageUrl: body.imageUrl,
        description: body.description,
      },
    })

    return NextResponse.json(updatedCar)
  } catch (error) {
    return NextResponse.json({ message: "Gagal update", error }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.pathname.split("/").pop()

    if (!id) {
      return NextResponse.json({ message: "ID tidak ditemukan di URL" }, { status: 400 })
    }

    await prisma.car.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Car deleted" })
  } catch (error) {
    return NextResponse.json({ message: "Gagal hapus", error }, { status: 500 })
  }
}
