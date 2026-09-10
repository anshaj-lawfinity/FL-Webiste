import { NextResponse } from "next/server";
import { getCmsRedirectDestination } from "@/lib/cms";

const CMS_REDIRECT_WEBSITE = "factorylicence.in";

function nextWithPathname(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname || "");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export async function proxy(request) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host");
  const path = url.pathname;
  const isLocalDev =
    host &&
    (host.includes("localhost") ||
     host.includes("127.0.0.1") ||
     host.includes(":3000"));

  // 1. WWW to Non-WWW Redirect (production only)
  if (!isLocalDev && host && host.startsWith("www.")) {
    url.hostname = host.replace("www.", "");
    url.port = ""; // Explicitly remove dev ports (like :3000) if they leaked in
    url.protocol = "https:"; // Enforce production HTTPS
    return NextResponse.redirect(url, 301);
  }

  // 2. HTTP to HTTPS enforcement (production only)
  const proto = request.headers.get("x-forwarded-proto");
  if (!isLocalDev && proto === "http") {
    url.protocol = "https:";
    url.port = ""; // Ensure standard HTTPS port
    return NextResponse.redirect(url, 301);
  }

  // 3. CMS-managed 301 redirect (SEO "Redirect URLs" field, e.g. after a
  // slug rename). Content-level like the check should be, so it also runs
  // locally, unlike the host/protocol normalization above. Fails open on
  // any CMS error/timeout. Skipped for asset-looking paths (a literal file
  // extension) — page slugs never look like this.
  //
  // The site root ("/") is a valid source too, so a CMS redirect entered as
  // "https://factorylicence.in/" moves the home page as well. Note this means
  // a root row makes the home page itself 301 away, so it is only ever set
  // deliberately from the CMS.
  if (!/\.[a-zA-Z0-9]+$/.test(path)) {
    const cmsDestination = await getCmsRedirectDestination(CMS_REDIRECT_WEBSITE, path);
    const destination = cmsDestination ? new URL(cmsDestination, request.url) : null;
    // Ignore a destination that resolves back to the path being requested —
    // honouring it would be an infinite redirect loop.
    if (destination && destination.pathname !== path) {
      return NextResponse.redirect(destination, { status: 301 });
    }
  }

  return nextWithPathname(request);
}

// Ensure middleware only runs on relevant routes, excluding assets, static files, and API
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml
     * - robots.txt
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
