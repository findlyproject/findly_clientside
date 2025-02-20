import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import { dropDownBeforLogin } from "./Navbar";
<<<<<<< HEAD
=======
import { Ultra } from "next/font/google";
import Image from "next/image";
>>>>>>> 0e7888464bd06148eee8a0fd7563175062a8f8d6

function Beforlogin() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-end space-x-3">
      <Link href="/login/user" className="">
        <button className="bg-primary p-2 px-7 rounded-full text-white hidden md:block">
        Employees desk
        </button>
      </Link>
      <Link href="/login/company" className="">
        <button className="bg-primary p-2 px-7 rounded-full text-white hidden md:block">
        Employer desk
        </button>
      </Link>
      </div>
      <div className="md:hidden flex gap-3">




      <Menu as="div" className="relative mx-3 z-40 w-10 mr-5">
        <Menu.Button className="flex text-sm rounded-full  focus:outline-none w-auto">
         Login
        </Menu.Button>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute w-36 right-0 mt-2 bg-white rounded-md shadow-lg py-1 ring-1 ring-black/5">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href='/c-login'
                  className={`block px-4 py-2 text-sm hover:bg-gray-300 ${active ? "bg-gray-300" : ""
                    }`}
                >
                  Employer desk
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href='/login'
                  className={`block px-4 py-2 text-sm hover:bg-gray-300 ${active ? "bg-gray-300" : ""
                    }`}
                >
                  Employees desk
                </Link>
              )}
            </Menu.Item>
            </Menu.Items>

        </Transition>
      </Menu>



















       
        
        <Menu as="div" className="relative ml-3">
          <Menu.Button
            className="flex text-sm rounded-full focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </Menu.Button>

          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black/5">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/ownprofile"
                    className={`block px-4 py-2 text-sm hover:bg-gray-300 ${
                      active ? "bg-gray-300" : ""
                    }`}
                  >
                    Your Profile
                  </Link>
                )}
              </Menu.Item>
              
              {dropDownBeforLogin.map((item)=>(
                <Menu.Item key={item.name}>
                  
                {({ active }) => (
                  <Link
                  key={item.name}
                  href={item.href}
                    className={`block px-4 py-2 text-sm hover:bg-gray-300 ${
                      active ? "bg-gray-300" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
              ))}
              
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

export default Beforlogin;
