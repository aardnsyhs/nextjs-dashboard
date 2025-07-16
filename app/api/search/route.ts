import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "";

  return new Response(
    JSON.stringify({ result: `You searched for: ${query}` }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
