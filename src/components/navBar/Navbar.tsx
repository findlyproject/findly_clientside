// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import AfterLogin from "./Afterlogin";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useAppSelector } from "@/lib/store/hooks";
// import logo from "../../../public/assets/findlylogo.png";
// import api from "@/utils/api";
// import Beforlogin from "./BeforLogin";
// import { IoSearch } from "react-icons/io5";
// import { RxCross2 } from "react-icons/rx";



// export const navigationBefore = [
//   { name: "Home", href: "/" },
//   { name: "About", href: "/about" },
//   { name: "Contact", href: "/contactus" },

// ];

// export const navigationAfter = [
//   { name: "Home", href: "/" },    
//   { name: "About", href: "/about" },
//   { name: "Contact", href: "/contactus" },
//   {name:"Community",href:"/community"},

// ];







// export const dropDownBeforLogin = [
//   { name: "Home", href: "/" },
//   { name: "About", href: "/about" },
//   { name: "Contact", href: "/contactus" },

//   { name: "Subscription", href: "/premium" },

// ];

// export default function Navbar() {

//  const activeCompany= useAppSelector((state)=>state.companyLogin.activeCompany)
//   const router = useRouter()
//   const [issearch,setIssearch]=useState(false)
//   const { activeuser } = useAppSelector((state) => state.login);
// const route=activeuser?"user":"company"
// dropDownAfterloginSmallerScreen(route)
// dropDownAfterlogin(route)
//   interface User {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     profileImage: string;
//     jobTitle: string;
//   }
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<User[]>([]);
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 640) {
//         setIssearch(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
    
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   console.log("searchResults",searchQuery && searchResults.length > 0 );
  
//   useEffect(() => {
//     if (searchQuery.length > 0) {
//       const fetchUsers = async () => {
//         try {
//           const response = await api.get(
//             `/user/usersearch?firstName=${searchQuery}`
//           );
//           console.log("response of search", response.data.users);

//           setSearchResults(response.data.users);
//         } catch (error) {
//           console.error("Error fetching users:", error);
//         }
//       };

//       fetchUsers();
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchQuery]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };


//   return (
//     <nav className="border-b-2 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//         <div className="flex  h-16 items-center">
//           <div className="flex justify-between w-full">

//             <div className="flex items-center">
       
//           <Link href="/" className="text:sm lg:text-2xl font-bold text-primary">
//             Findly. 
//           </Link>
        

//               <div>
         
//         </div>
//             </div>
//             <div className="hidden md:flex space-x-4 relative">
//               <div className="w-96 h-10 bg-slate-200 rounded-3xl outline-none ">
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   className="w-full h-full bg-transparent outline-none p-2 pl-4 "
//                 />
//               </div>


//               {searchQuery && searchResults.length > 0 && (
//                 <div className="absolute top-12 left-0 mt-2 w-full max-h-60 overflow-y-auto border border-gray-300 bg-white p-4 rounded-lg shadow-md z-50 ">
//                   <ul className="mt-2 space-y-2 ">
//                     {searchResults.map((user) => (
//                       <li key={user._id} className="flex items-center gap-2 hover:bg-slate-200 "

//                         onClick={() => router.push(`/userdetails/${user._id}`)}
//                       >
//                         <Image
//                           width={100}
//                           height={100}

//                           src={user.profileImage}
//                           alt={`${user.firstName} ${user.lastName}`}
//                           className="w-7 h-7 rounded-full"
//                         />
//                         <div>
//                           <p className="tex-sm font-semibold">
//                             {user.firstName} {user.lastName}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             {user.jobTitle[0]}
//                           </p>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               {activeuser||activeCompany ?(

//               navigationAfter.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className="text-gray-500 hover:text-gray-700 hover:font-bold px-3 py-2 rounded-md text-sm font-medium"
//                 >
//                   {item.name}
//                 </Link>
//               ))
//             ):(
//               navigationBefore.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className="text-gray-500 hover:text-gray-700 hover:font-bold px-3 py-2 rounded-md text-sm font-medium"
//                 >
//                   {item.name}
//                 </Link>
//               ))
//             )}
//             </div>

//             <div className="sm:hidden ">
//               {
//                 issearch ? (
//                   <div className="flex space-x-4 w-full">
//               <div className="w-full h-10 bg-slate-200 rounded-3xl outline-none flex pr-3">
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   className="w-full h-full bg-transparent outline-none p-2 pl-4 "
//                 />
//                 <button onClick={()=>setIssearch(!issearch)}>
//                 <RxCross2 />
//                 </button>
//               </div>


//               {searchQuery && searchResults.length > 0 && (
//                 <div className="absolute top-12 left-0 mt-2 w-full max-h-60 overflow-y-auto border border-gray-300 bg-white p-4 rounded-lg shadow-md z-50 ">
//                   <ul className="mt-2 space-y-2 ">
//                     {searchResults.map((user) => (
//                       <li key={user._id} className="flex items-center gap-2 hover:bg-slate-200 "

//                         onClick={() => router.push(`/userdetails/${user._id}`)}
//                       >
//                         <Image
//                           width={100}
//                           height={100}

//                           src={user.profileImage}
//                           alt={`${user.firstName} ${user.lastName}`}
//                           className="w-7 h-7 rounded-full"
//                         />
//                         <div>
//                           <p className="tex-sm font-semibold">
//                             {user.firstName} {user.lastName}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             {user.jobTitle[0]}
//                           </p>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//                 ):(
//                   ""
//                 )
//               }
//             </div>

//           </div>

//         </div>
//         {
//           !issearch ? (
//             <div className="flex items-center">
//         <button
//             className="sm:hidden focus:outline-none text-slate-500 hover:text-gray-700 font-extralight text-2xl p-2"
//             onClick={() => setIssearch(!issearch)}
//           >
//           <IoSearch  />
//           </button>
//         {activeuser||activeCompany ? <LinkfterLogin /> : <Beforlogin />}

//         </div>
//           ):(
//             ""
//           )
//         }
//       </div>

//     </nav>
    
//   );
// }

"use client"
import { useAppSelector } from '@/lib/store/hooks';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import AfterLogin from './Afterlogin';

export const dropDownAfterlogin = (route:string)=>[
  { name: "Subscription", href: `/${route}/premium` },
];

export const dropDownAfterloginSmallerScreen =(route:string)=> [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contactus" },
  { name: "Subscription", href: `/${route}/premium`},
];

function Navbar() {
  const pathname = usePathname();
const {activeuser}=useAppSelector((state)=>state.login)
const {activeCompany}=useAppSelector((state)=>state.companyLogin)


  return (
    <>
    {activeuser || activeCompany ? (
      <AfterLogin/>
    ):(
    <>
    <header className="w-full">
    <nav className={`border-gray-200 ${pathname==="/"? "bg-primary":"bg-white"}  py-2.5`}>
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4">
      <Link href="/" className={`ext:sm lg:text-2xl font-bold ${pathname==="/"? "text-white":"text-primary"}  `}>
             Findly. 
           </Link>
        
        <div className="flex items-center lg:order-2">
        <Link className={`rounded-lg border-2  ${pathname==="/"? "text-white hover:bg-white hover:text-primary border-white":"text-primary hover:bg-primary hover:text-white border-primary"}  px-4 py-2 text-sm leading-[24px] font-medium focus:ring-4 focus:ring-gray-300 focus:outline-none sm:mr-2 lg:px-5 lg:py-2.5 
        `} href="/login/company">Employer Desk</Link>
          <Link className={`rounded-lg border-2 ${pathname==="/"? "text-white hover:bg-white hover:text-primary border-white":"text-primary hover:bg-primary hover:text-white border-primary"}   px-4 py-2 text-sm leading-[24px] font-medium focus:ring-4 focus:ring-gray-300 focus:outline-none sm:mr-2 lg:px-5 lg:py-2.5 
          `} href="/login/user">Employee Desk</Link>
        </div>
        <div className="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto" id="mobile-menu-2">
          <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
            <li><Link className={`block border-b py-2 pr-4 pl-3  hover:text-white lg:border-0  ${pathname==="/"? "text-white":"text-primary"}   lg:p-0 lg:hover:bg-transparent lg:hover:text-purple-700`} href="/">Home</Link></li>
            <li><Link className={`block border-b border-gray-700 py-2 pr-4 pl-3 hover:bg-gray-700 ${pathname==="/"? "text-white":"text-primary"}  hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-white`} href="/about">About</Link></li>
            <li><Link className={`block border-b border-gray-700 py-2 pr-4 pl-3 hover:bg-gray-700 ${pathname==="/"? "text-white":"text-primary"}  hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-white`} href="/contactus">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  
 
  </>
    )}
    </>
  )
}

export default Navbar