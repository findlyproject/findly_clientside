"use client";

import { useState } from "react";
import Link from "next/link";
import Afterlogin from "./Afterlogin";
import Beforlogin from "./Navbiforlogin";

export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/" },
  { name: "Contact", href: "/contact" },
  
];

export default function Navbar() {
  const [activeuser, setactivuser] = useState(true);

  return (
    <nav className="bg-white border border-b-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/">
              <img
                src="/ascites/findlylogo.png"
                alt="Logo"
                className="h-10 w-auto cursor-pointer"
              />
            </Link>
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
                <Afterlogin/>
            ) : (
              <Beforlogin/>
            )}
          </div>

         
          
        </div>

      </div>

    </nav>
  );
}
