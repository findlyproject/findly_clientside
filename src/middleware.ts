<<<<<<< HEAD
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

      console.log("ctoken",ctoken);
      

  if (!ctoken && isUserProtectedRoute(pathname)) {
   
=======

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

  console.log("userType:", userType);
  console.log("token:", token);
  console.log("pathName:", pathName);

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
>>>>>>> 0e7888464bd06148eee8a0fd7563175062a8f8d6
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

<<<<<<< HEAD
  if (ctoken && (pathname === "/"||pathname==="/c-login")) {

    url.pathname = "/home";
=======
  
  if (userType === "Admin" && (isUserProtectedRoute(pathName) || isCompanyProtectedRoute(pathName))) {
    url.pathname = "/login";
>>>>>>> 0e7888464bd06148eee8a0fd7563175062a8f8d6
    return NextResponse.redirect(url);
  }


<<<<<<< HEAD
  // re validate the cache of token
  const res= NextResponse.next();
  res.headers.set("Cache-Control", "no-store, must-revalidate");
  return res;  
}

export const config = {
  matcher: [
    "/((?!_next|_next/static|_next/image|images|favicon.ico).*)",
  ],
=======
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
>>>>>>> 0e7888464bd06148eee8a0fd7563175062a8f8d6
};
