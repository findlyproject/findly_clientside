// import { Menu, Transition } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import React, { useState } from "react";
// import { dropDownBeforLogin } from "./Navbar";

// function Beforlogin() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div>
//       <div className="flex justify-end space-x-1  lg:space-x-3">
//         <Link href="/login/user" className="">
//           <button className="bg-primary p-2 px-1 lg:px-7 rounded-full text-white hidden xl:block">
//             Employee desk
//           </button>
//         </Link>
//         <Link href="/login/company" className="">
//           <button className="bg-primary p-2 px-1 md:px-0 lg:px-7 rounded-full text-white hidden xl:block">
//           Employer desk
//           </button>
//         </Link>
//       </div>
//       <div className="flex gap-3">
//         <Menu as="div" className="xl:hidden relative mx-3 z-40 w-10 mr-5">
//           <Menu.Button className="flex  text-sm rounded-full  focus:outline-none w-auto">
//             Login
//           </Menu.Button>
//           <Transition
//             enter="transition ease-out duration-100"
//             enterFrom="transform opacity-0 scale-95"
//             enterTo="transform opacity-100 scale-100"
//             leave="transition ease-in duration-75"
//             leaveFrom="transform opacity-100 scale-100"
//             leaveTo="transform opacity-0 scale-95"
//           >
//             <Menu.Items className="absolute w-36 right-0 mt-2 bg-white rounded-md shadow-lg py-1 ring-1 ring-black/5">
//               <Menu.Item>
//                 {({ active }) => (
//                   <Link
//                     href="/login/company"
//                     className={`block px-4 py-2 text-sm hover:bg-gray-300 ${
//                       active ? "bg-gray-300" : ""
//                     }`}
//                   >
//                     Employer desk
//                   </Link>
//                 )}
//               </Menu.Item>
//               <Menu.Item>
//                 {({ active }) => (
//                   <Link
//                     href="/login/user"
//                     className={`block px-4 py-2 text-sm hover:bg-gray-300 ${
//                       active ? "bg-gray-300" : ""
//                     }`}
//                   >
//                     Employee desk
//                   </Link>
//                 )}
//               </Menu.Item>
//             </Menu.Items>
//           </Transition>
//         </Menu>

//         <Menu as="div" className="md:hidden relative ml-3">
//           <Menu.Button
//             className="flex text-sm rounded-full focus:outline-none"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? (
//               <XMarkIcon className="h-6 w-6" />
//             ) : (
//               <Bars3Icon className="h-6 w-6" />
//             )}
//           </Menu.Button>

//           <Transition
//             enter="transition ease-out duration-100"
//             enterFrom="transform opacity-0 scale-95"
//             enterTo="transform opacity-100 scale-100"
//             leave="transition ease-in duration-75"
//             leaveFrom="transform opacity-100 scale-100"
//             leaveTo="transform opacity-0 scale-95"
//           >
//             <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black/5">
//               <Menu.Item>
//                 {({ active }) => (
//                   <Link
//                     href="/ownprofile"
//                     className={`block px-4 py-2 text-sm hover:bg-gray-300 ${
//                       active ? "bg-gray-300" : ""
//                     }`}
//                   >
//                     Your Profile
//                   </Link>
//                 )}
//               </Menu.Item>

//               {dropDownBeforLogin.map((item) => (
//                 <Menu.Item key={item.name}>
//                   {({ active }) => (
//                     <Link
//                       key={item.name}
//                       href={item.href}
//                       className={`block px-4 py-2 text-sm hover:bg-gray-300 ${
//                         active ? "bg-gray-300" : ""
//                       }`}
//                     >
//                       {item.name}
//                     </Link>
//                   )}
//                 </Menu.Item>
//               ))}
//             </Menu.Items>
//           </Transition>
//         </Menu>
//       </div>
//     </div>
//   );
// }

// export default Beforlogin;

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