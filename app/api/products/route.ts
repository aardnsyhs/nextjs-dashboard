import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 10,
    offset = (page - 1) * limit;

  const result = await sql`
    SELECT * FROM products
    WHERE name ILIKE ${`%${q}%`}
    ORDER BY name
    LIMIT ${limit} OFFSET ${offset}
  `;

  return NextResponse.json(result.rows);
}

export async function POST(req: NextRequest) {
  const { name, description, price, image_url } = await req.json();
  await sql`
    INSERT INTO products (name, description, price, image_url)
    VALUES (${name}, ${description}, ${price}, ${image_url ?? null})
  `;
  return NextResponse.json({ success: true });
}
