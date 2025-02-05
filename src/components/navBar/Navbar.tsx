"use client";

import Link from "next/link";
import AfterLogin from "./Afterlogin";
import Beforlogin from "./Navbiforlogin";
import Image from "next/image";
import { useAppSelector } from "@/lib/store/hooks";
import logo from '../../../public/assets/findlylogo.png'
export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "RateUs", href: "/rateus" },      
  { name: "Contact", href: "/contactus" },
];
export default function Navbar() {
  const {activeuser} = useAppSelector((state) => state.login)
  console.log("activeuser",activeuser);
  

  return (
    <nav className="bg-white border border-b-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/">
<Image 
  src={logo} 
  alt="Logo" 
  width={150} 
  height={50} 
/>
            </Link>
            
            <div className="w-52 h-10 bg-slate-200 rounded-3xl outline-none">
               <input type="text" 
               placeholder="Search"
               className="w-full h-full bg-transparent outline-none p-2 "
               />
            </div>
          </div>

         
          <div className="hidden md:flex space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-500 hover:text-gray-700 hover:font-bold px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          
          <div className="flex items-center">

            {activeuser ? (
                <AfterLogin/>
            ) : (
              <Beforlogin/>
            )}
          </div>

         
          
        </div>

      </div>

    </nav>
  );
}
