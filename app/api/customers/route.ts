import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  const customers = await prisma.customer.findMany({
    where: { name: { contains: q, mode: "insensitive" } },
    orderBy: { name: "asc" },
    take: limit,
    skip: offset,
  });

  return NextResponse.json(customers);
}

export async function POST(req: NextRequest) {
  const { name, email, image_url } = await req.json();
  const customer = await prisma.customer.create({
    data: { name, email, image_url },
  });
  return NextResponse.json({ success: true, customer });
}
