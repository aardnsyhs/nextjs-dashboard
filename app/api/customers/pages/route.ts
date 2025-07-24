import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";

  const totalItems = await prisma.customer.count({
    where: {
      name: {
        contains: q,
        mode: "insensitive",
      },
    },
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return NextResponse.json({ totalPages });
}
