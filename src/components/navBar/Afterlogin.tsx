"use client"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { logoutUser } from "@/lib/store/features/actions/userActions";
import { dropDownAfterlogin, dropDownAfterloginSmallerScreen } from "./Navbar";
import { logOutCompany } from "@/lib/store/features/actions/companyActions";

function AfterLogin() {
  const router = useRouter()
  const { activeuser } = useAppSelector((state) => state.login);
  const activeCompany=useAppSelector((state)=>state.companyLogin.activeCompany)

  const dispatch = useAppDispatch()
const route=activeuser?"user":"company"
    const handilLogut = () => {
        // Clear user and company tokens from cookies
  document.cookie = "token=; path=/; max-age=0"; // Clear user token
  document.cookie = "ctoken=; path=/; max-age=0"; // Clear company token

      if(activeuser){
        
        dispatch(logoutUser())
      }else if(activeCompany){
        dispatch(logOutCompany())
      }
    
      // signOut()
      router.replace("/");
      
    }


  return (
    <div className="flex">
      
      <Link href={`/${route}/notification`}>
        <button className="relative text-gray-500 hover:text-gray-700 p-2">
          <BellIcon className="h-6 w-6" />
        </button></Link>
      <Menu as="div" className="relative ml-3 z-40 w-20 hidden md:block">
        <Menu.Button className="flex text-sm rounded-full focus:outline-none w-auto">
          <Image 
            src={activeuser?.profileImage||activeCompany?.logo|| "/default-avatar.png"}
            alt="User profile"
            width={200}
            height={200}
            className="h-10 w-10 rounded-full"
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
                  href={`/${route}/profile`}
                  className={`block px-4 py-2 text-sm hover:bg-gray-300 ${active ? "bg-gray-300" : ""
                    }`}
                >
                  Your Profile
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  href='/mynetwork'
                  className={`block px-4 py-2 text-sm hover:bg-gray-300 ${active ? "bg-gray-300" : ""
                    }`}
                >
                  My Network
                </Link>
              )}
            </Menu.Item>
            {dropDownAfterlogin(route).map((item) => (
              <Menu.Item key={item.name}>

                {({ active }) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-2 text-sm hover:bg-gray-300 ${active ? "bg-gray-300" : ""
                      }`}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
            
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`block w-full text-left px-4 py-2 text-md hover:bg-gray-300 text-red-600 ${active ? "bg-gray-100" : ""
                    }`}
                  onClick={handilLogut}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* ///////////////// smallScreen//////////// */}
      <div className="md:hidden">
      <Menu as="div" className="relative mx-3 z-40 w-10 mr-5">
        <Menu.Button className="flex text-sm rounded-full focus:outline-none w-auto">
          <Image 
            src={activeuser?.profileImage|| "/default-avatar.png"}
            alt="User profile"
            width={200}
            height={200}
            className="h-10 w-10 rounded-full"
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
          <Menu.Items className="absolute right-0 mt-2 bg-white rounded-md shadow-lg py-1 ring-1 ring-black/5">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/${route}/profile`}
                  className={`block px-4 py-2 text-sm hover:bg-gray-300 ${active ? "bg-gray-300" : ""
                    }`}
                >
                  Your Profile
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  href='/mynetwork'
                  className={`block px-4 py-2 text-sm hover:bg-gray-300 ${active ? "bg-gray-300" : ""
                    }`}
                >
                  My Network
                </Link>
              )}
            </Menu.Item>
            {dropDownAfterloginSmallerScreen(route).map((item) => (
              <Menu.Item key={item.name}>

                {({ active }) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-2 text-sm hover:bg-gray-300 ${active ? "bg-gray-300" : ""
                      }`}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
            
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`block w-full text-left px-4 py-2 text-md hover:bg-gray-300 text-red-600 ${active ? "bg-gray-100" : ""
                    }`}
                  onClick={handilLogut}
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

export default AfterLogin;