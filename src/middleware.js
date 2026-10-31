import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("session");

  if (!session?.value) {
    const loginUrl = new URL("/login", request.url);

    const nextUrl = request.nextUrl.pathname ;
    loginUrl.searchParams.set("next", nextUrl);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*", "/checkout/:path*"],
};
