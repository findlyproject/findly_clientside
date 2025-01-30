"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/login" },
  { name: "Services", href: "/" },
  { name: "Contact", href: "/" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeuser, setactivuser] = useState(true);

  return (
    <nav className="bg-white border border-b-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <Link href="/">
              <img
                src="/ascites/findlylogo.png"
                alt="Logo"
                className="h-10 w-auto cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
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

          {/* Right Side - Notifications & Profile */}
          <div className="flex items-center">
            {/* Notifications Icon */}
            {/*  */}

            {activeuser ? (
                <>
                <button className="relative text-gray-500 hover:text-gray-700 p-2">
                <BellIcon className="h-6 w-6" />
              </button>
              <Menu as="div" className="relative ml-3">
                <Menu.Button className="flex text-sm rounded-full focus:outline-none">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt="User"
                    className="h-8 w-8 rounded-full"
                  />
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
                          href="/profile"
                          className={`block px-4 py-2 text-sm hover:bg-gray-300 ${
                            active ? "bg-gray-300" : ""
                          }`}
                        >
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/profile"
                          className={`block px-4 py-2 text-sm hover:bg-gray-300 ${
                            active ? "bg-gray-300" : ""
                          }`}
                        >
                          Home
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/profile"
                          className={`block px-4 py-2 text-sm hover:bg-gray-300 ${
                            active ? "bg-gray-300" : ""
                          }`}
                        >
                          About
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/profile"
                          className={`block px-4 py-2 text-sm hover:bg-gray-300 ${
                            active ? "bg-gray-300" : ""
                          }`}
                        >
                          Contact
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/settings"
                          className={`block px-4 py-2 text-sm hover:bg-gray-300 ${
                            active ? "bg-gray-100" : ""
                          }`}
                        >
                          Settings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`block w-full text-left px-4 py-2 text-md hover:bg-gray-300 text-red-600 ${
                            active ? "bg-gray-100" : ""
                          }`}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
                </>
            ) : (
              <>
              <Link href="/login" className="flex justify-end">
                <button className="bg-blue-800 p-2 px-7 rounded-full text-white hidden md:block">
                  Join
                </button>
              </Link>
              <div className="md:hidden flex gap-3">
              <Link href="/login" className="flex justify-end">
                <button className="bg-blue-800 p-1 px-5 rounded-full text-white">
                  Join
                </button>
              </Link>
              <button
                className="md:hidden text-gray-500 hover:text-gray-700"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
            {menuOpen && (
                <div className="md:hidden bg-white">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          
        </div>
      </div>

      {/* Mobile Menu */}
      
    </nav>
  );
}
