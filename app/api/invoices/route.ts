import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("search") ?? "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 10;
    const skip = (page - 1) * limit;

    const invoices = await prisma.invoice.findMany({
      where: {
        customer: {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
      },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
            image_url: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
      take: limit,
      skip,
    });

    return NextResponse.json(
      invoices.map((inv) => ({
        id: inv.id,
        amount: inv.amount,
        date: inv.date,
        status: inv.status,
        customer_id: inv.customerId,
        customer: {
          name: inv.customer.name,
          email: inv.customer.email,
          image_url: inv.customer.image_url,
        },
      }))
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error", details: err },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { customer_id, amount, status, date } = await req.json();

    await prisma.invoice.create({
      data: {
        customerId: customer_id,
        amount,
        status,
        date: date,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create invoice", details: err },
      { status: 500 }
    );
  }
}
