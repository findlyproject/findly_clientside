// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const isCompanyProtectedRoute = (route: string) =>
//   route.startsWith("/home") || 
//   route.startsWith("/premium") ||
//   route.startsWith("/profile")||
//   route.startsWith("/candidatelist");
// export function middleware(req: NextRequest) {
//   const ctoken = req.cookies.get("ctoken")?.value;

//   const url = req.nextUrl.clone();
//   const pathname = url.pathname;

//       console.log("ctoken",ctoken);
      

//   if (!ctoken && isCompanyProtectedRoute(pathname)) {
   
//     url.pathname = "/";
//     return NextResponse.redirect(url);
//   }

//   if (ctoken && (pathname === "/"||pathname==="/c-login")) {

//     url.pathname = "/home";
//     return NextResponse.redirect(url);
//   }


//   // re validate the cache of token
//   const res= NextResponse.next();
//   res.headers.set("Cache-Control", "no-store, must-revalidate");
//   return res;  
// }

// export const config = {
//   matcher: [
//     "/((?!_next|_next/static|_next/image|images|favicon.ico).*)",
//   ],
// };



// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const publicRoutes = ["/c-login","/signin", "/signup", "/login", "/"];
// const adminRoutes = [
//   "/home",
//   "/candidatelist",
// ];

// export function middleware(req: NextRequest) {
//   const utoken = req.cookies.get("token")?.value;
//   const ctoken = req.cookies.get("ctoken")?.value;
//   const url = req.nextUrl.clone();
//   const pathname = url.pathname;
// console.log("pathname",pathname);




//   if (!ctoken && adminRoutes.some((route) => pathname.startsWith(route))) {
//     url.pathname = "/c-login";
//     return NextResponse.redirect(url);
//   }
//   if(!utoken){
//     console.log("dddllll");
//     if(adminRoutes.includes(req.nextUrl.pathname)){
//       console.log("ddd");
      
//       return NextResponse.redirect(new URL("/",req.url))
//     }
//   }


//   if (ctoken) {
//     // If admin is logged in
//     if (pathname === "/c-login") {
//       url.pathname = "/home";
//       return NextResponse.redirect(url);
//     }
//     if (!utoken && ![...publicRoutes, ...adminRoutes].includes(pathname)) {
//       //if admin is logged in but not logged in as user
//       url.pathname = "/login";
//       return NextResponse.redirect(url);
//     }
//   } else {
//     if(!utoken&&publicRoutes.includes(pathname)&&pathname==="/home"){
//       url.pathname="/login";
//       console.log("two");
//       return NextResponse.redirect(url);
//     }
//     // If both user and admin is not logged in
//     if (
//       !utoken &&
//       !publicRoutes.includes(pathname) &&
//       pathname !== "/c-login"
//     ) {

//       console.log("aaa",pathname);
      
//       url.pathname = "/login";
//       return NextResponse.redirect(url);
//     }


//     if (utoken && publicRoutes.includes(pathname)) {
//       url.pathname = "/home";
//       console.log("one");
      

//       return NextResponse.redirect(url);
//     }
//   }
//    // re validate the cache of token
//   const res= NextResponse.next();
//   res.headers.set("Cache-Control", "no-store, must-revalidate");
//   return res;  
// }

// export const config = {
//   matcher: [
//     // Apply middleware to all routes except public ones like /signin, /signup, /home
//     "/((?!home|_next|_next/static|_next/image|images|favicon.ico|reset-password|forgot-password|verify-otp).*)",
//   ],
// };




import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isAdminRoute = (route: string) => route.startsWith("/admin") && route !== "/login";
const isUserProtectedRoute = (route: string) => route.startsWith("/user") && route !== "/login";
const isCompanyProtectedRoute = (route: string) => route.startsWith("/company") && route !== "/c-login";

export function middleware(req: NextRequest) {
  
  const userType = req.cookies.get("type")?.value;
  console.log("userType",userType);
  const token =req.cookies.get("token")?.value;
  console.log("token ",token);
  const url = req.nextUrl.clone();
  const pathName = url.pathname;
  
  if (userType !== "Admin" && isAdminRoute(pathName)) {
    url.pathname = pathName;
    return NextResponse.redirect(url);
  }

  if (userType === "Admin" && pathName === "/login") {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }


  if (userType === "Admin") {
    if (isUserProtectedRoute(pathName) || isCompanyProtectedRoute(pathName)) {
      url.pathname = "/login"; 
      return NextResponse.redirect(url);
    }
  }

  if (!token && isUserProtectedRoute(pathName)) {
    if (req.headers.get("referer")?.includes("/user")) {
      return NextResponse.next(); 
    }
    url.pathname = "/"; 
    return NextResponse.redirect(url);
  }

  if (token && userType === "User" && (pathName === "/login" || pathName === "/register")) {
    url.pathname = "/user";
    return NextResponse.redirect(url);
  }

  if (userType === "User") {
    if (isAdminRoute(pathName) || isCompanyProtectedRoute(pathName)) {
      url.pathname = "/login"; 
      return NextResponse.redirect(url);
    }
  }


  if (!token && isCompanyProtectedRoute(pathName)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token && userType === "Company" && (pathName === "/c-login" || pathName === "/c.register")) {
    url.pathname = "/company/home";
    return NextResponse.redirect(url);
  }


  if (userType === "company") {
    if (isAdminRoute(pathName) || isUserProtectedRoute(pathName)) {
      url.pathname = "/login"; 
      return NextResponse.redirect(url);
    }
  }


  return NextResponse.next(); 
}

export const config = {
  matcher: "/:path*", 
};