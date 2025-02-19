import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isCompanyProtectedRoute = (route: string) =>
  route.startsWith("/home") || 
  route.startsWith("/premium") ||
  route.startsWith("/profile")||
  route.startsWith("/candidatelist");
export function middleware(req: NextRequest) {
  const ctoken = req.cookies.get("ctoken")?.value;

  const url = req.nextUrl.clone();
  const pathname = url.pathname;

      console.log("ctoken",ctoken);
      

  if (!ctoken && isCompanyProtectedRoute(pathname)) {
   
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (ctoken && (pathname === "/"||pathname==="/c-login")) {

    url.pathname = "/home";
    return NextResponse.redirect(url);
  }


  // re validate the cache of token
  const res= NextResponse.next();
  res.headers.set("Cache-Control", "no-store, must-revalidate");
  return res;  
}

export const config = {
  matcher: [
    "/((?!_next|_next/static|_next/image|images|favicon.ico).*)",
  ],
};



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