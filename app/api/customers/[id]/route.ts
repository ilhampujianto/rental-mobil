import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_: NextRequest, { params }: any) {
  const customer = await prisma.customer.findUnique({
    where: { id: params.id },
  });
  return NextResponse.json(customer);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(req: NextRequest, { params }: any) {
  const body = await req.json();
  const updated = await prisma.customer.update({
    where: { id: params.id },
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
    },
  });
  return NextResponse.json(updated);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(_: NextRequest, { params }: any) {
  await prisma.customer.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ message: "Customer deleted" });
}
