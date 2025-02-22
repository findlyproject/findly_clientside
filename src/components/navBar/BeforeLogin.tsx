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

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function BeforeLogin() {
const pathname = usePathname();
return (
  <>
    <header className="w-full">
      <nav
        className={`border-gray-200 ${
          pathname === "/" ? "bg-primary" : "bg-white"
        }  py-2.5`}
      >
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4">
          <Link
            href="/"
            className={`ext:sm lg:text-2xl font-bold ${
              pathname === "/" ? "text-white" : "text-primary"
            }  `}
          >
            Findly.
          </Link>

          <div className="flex items-center lg:order-2">
            <Link
              className={`rounded-lg border-2  ${
                pathname === "/"
                  ? "text-white hover:bg-white hover:text-primary border-white"
                  : "text-primary hover:bg-primary hover:text-white border-primary"
              }  px-4 py-2 text-sm leading-[24px] font-medium focus:ring-4 focus:ring-gray-300 focus:outline-none sm:mr-2 lg:px-5 lg:py-2.5 
      `}
              href="/guest"
            >
              Employer Desk
            </Link>
            <Link
              className={`rounded-lg border-2 ${
                pathname === "/"
                  ? "text-white hover:bg-white hover:text-primary border-white"
                  : "text-primary hover:bg-primary hover:text-white border-primary"
              }   px-4 py-2 text-sm leading-[24px] font-medium focus:ring-4 focus:ring-gray-300 focus:outline-none sm:mr-2 lg:px-5 lg:py-2.5 
        `}
              href="/guest"
            >
              Employee Desk
            </Link>
          </div>
          <div
            className="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto"
            id="mobile-menu-2"
          >
            <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
              <li>
                <Link
                  className={`block border-b py-2 pr-4 pl-3  hover:text-white lg:border-0  ${
                    pathname === "/" ? "text-white" : "text-primary"
                  }   lg:p-0 lg:hover:bg-transparent lg:hover:text-purple-700`}
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`block border-b border-gray-700 py-2 pr-4 pl-3 hover:bg-gray-700 ${
                    pathname === "/" ? "text-white" : "text-primary"
                  }  hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-white`}
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className={`block border-b border-gray-700 py-2 pr-4 pl-3 hover:bg-gray-700 ${
                    pathname === "/" ? "text-white" : "text-primary"
                  }  hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-white`}
                  href="/contactus"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </>
);
}
