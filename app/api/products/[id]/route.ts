import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { rows } = await sql`SELECT * FROM products WHERE id = ${id} LIMIT 1;`;
  const product = rows[0];

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { name, description, price, image_url } = await req.json();

  await sql`
    UPDATE products
    SET name = ${name}, description = ${description}, price = ${price}, image_url = ${
    image_url ?? null
  }
    WHERE id = ${id}
  `;

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  await sql`DELETE FROM products WHERE id = ${id}`;
  return NextResponse.json({ success: true });
}
