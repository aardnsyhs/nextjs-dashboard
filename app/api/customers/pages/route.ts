import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";

  const result = await sql`
    SELECT COUNT(*) FROM customers
    WHERE name ILIKE ${"%" + q + "%"}
  `;

  const totalItems = Number(result.rows[0].count);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return NextResponse.json({ totalPages });
}
