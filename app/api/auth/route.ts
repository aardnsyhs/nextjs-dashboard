import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const headersList = await headers();
  const referer = headersList.get("referer");

  const userAgent = request.headers.get("user-agent");

  return new Response(JSON.stringify({ token, referer, userAgent }), {
    headers: { "Content-Type": "application/json" },
  });
}
