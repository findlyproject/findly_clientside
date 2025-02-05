


import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";


function AfterLogin() {
  const router=useRouter()

  return (
    <div className="flex">
      <Link href="/notification">
      <button className="relative text-gray-500 hover:text-gray-700 p-2">
        <BellIcon className="h-6 w-6" />
      </button></Link>
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
                <button
                  
                  className={`block px-4 py-2 text-sm hover:bg-gray-300 ${
                    active ? "bg-gray-300" : ""
                  }`}
                >
                  Your Profile
                </button>
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
    </div>
  );
}

export default AfterLogin;
