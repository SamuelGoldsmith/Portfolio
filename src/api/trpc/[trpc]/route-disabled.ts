export const dynamic = "force-static";

export async function GET() {
  return new Response("TRPC API is disabled in static export.", { status: 200 });
}

export async function POST() {
  return new Response("TRPC API is disabled in static export.", { status: 200 });
}
