import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionFromRequestEdge } from "./lib/auth-edge";

const PUBLIC_PATHS = ["/genius/admin/login", "/api/admin/login"];

function isPublicAssetPath(pathname: string): boolean {
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/favicon")) return true;
  if (pathname === "/robots.txt") return true;
  if (pathname === "/sitemap.xml") return true;
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublicAssetPath(pathname)) {
    return NextResponse.next();
  }

  // Only handle admin routes
  if (!pathname.startsWith("/genius/admin") && !pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  // Protect admin API routes
  if (pathname.startsWith("/api/admin")) {
    const session = await getSessionFromRequestEdge(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Protect admin pages
  const session = await getSessionFromRequestEdge(req);
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/genius/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect /genius/admin to /genius/admin/activities
  if (pathname === "/genius/admin" || pathname === "/genius/admin/") {
    const url = req.nextUrl.clone();
    url.pathname = "/genius/admin/activities";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/genius/admin/:path*", "/api/admin/:path*"],
};
