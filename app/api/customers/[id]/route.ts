import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const customer = await prisma.customer.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(customer);
}

export async function PUT(req: NextRequest, { params }: any) {
  const data = await req.json();

  const updated = await prisma.customer.update({
    where: { id: params.id },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: any) {
  await prisma.customer.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Customer deleted" });
}
