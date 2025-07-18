import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { rows } = await sql`SELECT * FROM invoices WHERE id = ${id} LIMIT 1;`;
  const invoice = rows[0];

  if (!invoice) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(invoice);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { customer_id, amount, status, date } = await req.json();

  await sql`
    UPDATE invoices
    SET customer_id = ${customer_id}, amount = ${amount}, status = ${status}, date = ${date}
    WHERE id = ${id}
  `;

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  await sql`
    DELETE FROM invoices
    WHERE id = ${id}
  `;

  return NextResponse.json({ success: true });
}
