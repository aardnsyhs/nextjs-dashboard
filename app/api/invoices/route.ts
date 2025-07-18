import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("search") ?? "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 10;
    const offset = (page - 1) * limit;

    const result = await sql`
      SELECT
        invoices.*,
        customers.name AS customer_name,
        customers.email AS customer_email,
        customers.image_url AS customer_image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE customers.name ILIKE ${`%${q}%`}
      ORDER BY invoices.date DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    return NextResponse.json(
      result.rows.map((row) => ({
        id: row.id,
        amount: row.amount,
        date: row.date,
        status: row.status,
        customer_id: row.customer_id,
        customer: {
          name: row.customer_name,
          email: row.customer_email,
          image_url: row.customer_image_url,
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
  const { customer_id, amount, status, date } = await req.json();
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customer_id}, ${amount}, ${status}, ${date})
  `;
  return NextResponse.json({ success: true });
}
