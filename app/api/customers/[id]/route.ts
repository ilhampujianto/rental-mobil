import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// ✅ GET Customer by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const customer = await prisma.customer.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(customer);
}

// ✅ UPDATE Customer by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

// ✅ DELETE Customer by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.customer.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Customer deleted" });
}
