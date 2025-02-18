import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isUserProtectedRoute = (route: string) =>
  route.startsWith("/home") || 
  route.startsWith("/premium") ||
  route.startsWith("/profile")||
  route.startsWith("/rates");


export function middleware(req: NextRequest) {
  const ctoken = req.cookies.get("ctoken")?.value;

  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  

  if (!ctoken && isUserProtectedRoute(pathname)) {
   
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (ctoken && (pathname === "/"||pathname==="/c-login")) {

    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
