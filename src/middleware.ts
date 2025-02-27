
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isAdminRoute = (route: string) => route.startsWith("/admin") && route !== "/login";
const isUserProtectedRoute = (route: string) => route.startsWith("/user") && route !== "/user/register";
const isCompanyProtectedRoute = (route: string) => route.startsWith("/company") && route !== "/company/register";

export function middleware(req: NextRequest) {
  const userType = req.cookies.get("type")?.value;
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();
  const pathName = url.pathname;


  if (pathName === "/user/register" ||pathName==="/company/register/form" ||pathName==="/user/register/namepage"||pathName==="/user/register/namepage/educationpage/questionpage"|| pathName==="/user/register/namepage/educationpage"||pathName==="/user/register/namepage/educationpage/questionpage/jobpage"|| pathName === "/company/register") {
    return NextResponse.next();
  }


  if (token && pathName === "/") {
    if (userType === "Admin") url.pathname = "/admin";
    else if (userType === "User") url.pathname = "/user/home";
    else if (userType === "Company") url.pathname = "/company/home";
    return NextResponse.redirect(url);
  }


  if (!token && (isUserProtectedRoute(pathName) || isCompanyProtectedRoute(pathName))) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  
  if (userType === "Admin" && (isUserProtectedRoute(pathName) || isCompanyProtectedRoute(pathName))) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }


  if (userType === "User" && (isAdminRoute(pathName) || isCompanyProtectedRoute(pathName))) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

 
  if (userType === "Company" && (isAdminRoute(pathName) || isUserProtectedRoute(pathName))) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  
  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store, must-revalidate");
  return res;
}

export const config = {
  matcher: "/:path*",
};