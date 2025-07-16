import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const response = await fetch("https://example.com/api/data", {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
  });

  const data = await response.json();
  const transformed = { ...data, source: "proxied-through-nextjs" };

  return new Response(JSON.stringify(transformed), {
    headers: { "Content-Type": "application/json" },
  });
}
