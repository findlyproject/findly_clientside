import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import { navigation } from "./Navbar";

function Beforlogin() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
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
              
              {navigation.map((item)=>(
                <Menu.Item>
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
      </div>
    </div>
  );
}

export default Beforlogin;
