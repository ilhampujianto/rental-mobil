import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/customers/:id
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const customer = await prisma.customer.findUnique({
    where: { id },
  });

  return NextResponse.json(customer);
}

// PUT /api/customers/:id
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const body = await req.json();

  const updated = await prisma.customer.update({
    where: { id },
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
    },
  });

  return NextResponse.json(updated);
}

// DELETE /api/customers/:id
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  await prisma.customer.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Customer deleted" });
}
