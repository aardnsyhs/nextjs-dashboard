import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  const result = await sql`
    SELECT * FROM customers
    WHERE name ILIKE ${"%" + q + "%"}
    ORDER BY name
    LIMIT ${limit} OFFSET ${offset}
  `;

  return NextResponse.json(result.rows);
}

export async function POST(req: NextRequest) {
  const { name, email, image_url } = await req.json();

  await sql`
    INSERT INTO customers (name, email, image_url)
    VALUES (${name}, ${email}, ${image_url})
  `;

  return NextResponse.json({ success: true });
}
