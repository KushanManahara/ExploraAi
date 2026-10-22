// apps/web/app/api/health/route.ts
// LIVENESS CHECK FOR THE WEB APP. ALWAYS DYNAMIC SO IT REFLECTS THE RUNNING INSTANCE, NOT A BUILD-TIME SNAPSHOT.
export const dynamic = "force-dynamic";

export function GET(): Response {
  return Response.json(
    { status: "ok", service: "web" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
