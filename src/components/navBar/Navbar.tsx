

"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/utils/api";
import { UserProfile } from "@/lib/store/features/userSlice";
import { logOutCompany } from "@/lib/store/features/actions/companyActions";
import { logoutUser } from "@/lib/store/features/actions/userActions";
import Image from "next/image";
import Notification from "../notification/Notification";


export const dropDownAfterlogin = (route: string) => [
  { name: "Subscription", href: `/${route}/premium` },
];

export const dropDownAfterloginSmallerScreen = (route: string) => [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contactus" },

  { name: "Subscription", href: `/${route}/premium` },
];

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
const dispatch = useAppDispatch()

  const { activeuser } = useAppSelector((state) => state.login);
  const { activeCompany } = useAppSelector((state) => state.companyLogin);
console.log(activeuser,activeCompany)
  const [activeTab, setActiveTab] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [isopen,setIsopen]=useState(false)

    
      useEffect(() => {
        if (searchQuery.length > 0) {
          const fetchUsers = async () => {
            try {
              const response = await api.get(
                `/user/usersearch?firstName=${searchQuery}`
              );
    
              setSearchResults(response.data.users);
            } catch (error) {
              console.error("Error fetching users:", error);
            }
          };
    
          fetchUsers();
        } else {
          setSearchResults([]);
        }
      }, [searchQuery]);
  console.log("setIsopen",isopen);
    
      const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
      };
     const handleLogout = () => {
          if(activeuser){  
            dispatch(logoutUser())
          }else if(activeCompany){
            dispatch(logOutCompany())
          }
           // signOut()
          router.replace("/");
          
        }
  return (
    <header className="w-full">
      {activeuser || activeCompany ? (
        <>
          <div className=" flex items-center justify-between bg-gray-100 px-4 py-3 lg:px-8 lg:py-4">
          
            {/* Left Section */}
            <div className="left flex items-center md:space-x-4">
            <Link
                href="/"
                className="text-xl md:text-2xl font-bold text-primary"
              >
                Findly.
              </Link>
              <div className="hidden xl:flex md:space-x-2 space-x-4">
                
                <Link
                  href="/"
                  className={`home  text-primary flex items-center hover:bg-primary hover:bg-opacity-20 justify-center px-3 py-2 rounded-lg ${
                    activeTab === "Home" ? " " : ""
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/explore"
                  className={`home  text-primary flex items-center hover:bg-primary hover:bg-opacity-20 justify-center px-3 py-2 rounded-lg ${
                    activeTab === "Explore" ? "bg-primary bg-opacity-20 " : ""
                  }`}
                >
                  About
                </Link>
                <Link
                  href="/create"
                  className={`home  text-primary flex items-center hover:bg-primary hover:bg-opacity-20 justify-center px-3 py-2 rounded-lg ${
                    activeTab === "Create" ? "bg-primary bg-opacity-20 " : ""
                  }`}
                >
                  Contact
                </Link>
              </div>
             
            </div>

            {/* Search Section */}

            <div className="mx-auto w-full relative">
              <form className="relative hidden md:block md:ml-[10px]">
                <input
                  type="search"
                  className="relative z-10 h-12 w-full rounded-full border border-primary bg-transparent pl-16 pr-4 outline-none"
                  placeholder="Search..."
                  onChange={handleSearchChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-y-0 left-4 my-auto size-5  stroke-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </form>

              <div className="md:hidden">
                <form action="" className="relative w-full mx-auto">
                  <input
                    type="search"
                    className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none transition-all duration-300 focus:w-full focus:cursor-text focus:border-primary focus:pl-16 focus:pr-4 "
                    onChange={handleSearchChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-y-0 my-auto h-8 w-12 border-r border-none  px-3.5 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </form>
              </div>
              {searchQuery && searchResults.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full max-h-60 overflow-y-auto border  border-gray-300 bg-white p-4 rounded-lg shadow-md z-50 ">
                  <ul className="mt-2 space-y-2 ">
                    {searchResults.map((user) => (
                      <li key={user._id} className="cursor-pointer flex items-center gap-2 pl-4 hover:bg-primary hover:bg-opacity-20 rounded-full"

                        onClick={() => router.push(`/userdetails/${user._id}`)}
                      >
                        <Image
                          width={100}
                          height={100}
                          src={user.profileImage || "/default-profile.png"}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-7 h-7 rounded-full"
                        />
                        <div>
                          <p className="tex-sm font-semibold">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Right Section */}
            <div className="right flex items-center lg:space-x-4 justify-end">
            <div className="xl:hidden md:ml-10 flex items-center "  onMouseEnter={() => setIsMenuOpen(true)}
                  onMouseLeave={() => setIsMenuOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
              </div>
              <Link
                href=""
                className="items w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-gray-00"
                onClick={()=>setIsopen(!isopen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                  />
                </svg>
              </Link>
              <Link
                href=""
                className="hidden  items w-10 h-10 sm:w-12 sm:h-12 rounded-full md:flex items-center justify-center hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
              </Link>
             
                <div
                  className="relative inline-block text-left"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <button className="avatar w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-purple-700 hover:bg-opacity-40">
                    <div className="img w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden relative">
                      {activeuser?.profileImage ? (
                        <Image
                        width={100}
                        height={100}
                          src={activeuser?.profileImage}
                          alt="User Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="bg-gray-200 flex items-center justify-center w-full h-full text-lg text-black">
                          {activeuser?.firstName
                            ? activeuser?.firstName[0].toUpperCase()
                            : ""}
                        </div>
                      )}
                    </div>
                  </button>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute top-full right-0  w-64 bg-white shadow-lg rounded-lg p-2 z-50"
                    >
                      <div className="py-2">
                        <p className="px-4 text-xs">Your accounts</p>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Profile
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => router.push("")}
                        >
                          Change Passoword
                        </button>
                      </div>

                      <div className="py-3">
                        <p className="px-4 text-xs">More options</p>
                        <button className="block w-full text-left px-4 py-4 text-sm hover:bg-gray-100">
                          Settings
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Delete Account
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Install the Windows app
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Reports and Violations Centre
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Your privacy rights
                        </button>
                        <button className="flex justify-between w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Help Centre
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                          </svg>
                        </button>
                        <button className=" flex justify-between  w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Terms of Service
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                          </svg>
                        </button>
                        <button className="flex justify-between  w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Privacy Policy
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                          </svg>
                        </button>
                        <button className="flex justify-between  w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Be a beta tester
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                          </svg>
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={handleLogout}
                        >
                          Log out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md z-50">
              <Link
                href="/"
                className={`block font-montserrat px-4 py-2 rounded-full ${
                  activeTab === "Home" ? "bg-black text-white" : ""
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveTab("Home");
                }}
              >
                Home
              </Link>
              <Link
                href="/explore"
                className={`block font-montserrat px-4 py-2 rounded-full ${
                  activeTab === "Explore" ? "bg-black text-white" : ""
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveTab("Explore");
                }}
              >
                Explore
              </Link>
              <Link
                href="/create"
                className={`block font-montserrat px-4 py-2 rounded-full ${
                  activeTab === "Create" ? "bg-black text-white" : ""
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveTab("Create");
                }}
              >
                Create
              </Link>
             
              <Link
                href="/create"
                className={`md:hidden font-montserrat px-4 py-2 rounded-full ${
                  activeTab === "Create" ? "bg-black text-white" : ""
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveTab("Create");
                }}
              >
                Community
              </Link>
              
            </div>
          )}
        </>
      ) : (
        <>
          <nav
            className={`border-gray-200 ${
              pathname === "/" ? "bg-primary" : "bg-gray-100"
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

              <div className="flex items-center md:order-2">
                <Link
                  className={`rounded-lg border-2  ${
                    pathname === "/"
                      ? "text-white hover:bg-white hover:text-primary border-white"
                      : "text-primary hover:bg-primary hover:text-gray-100 border-primary"
                  }  px-4 py-2 text-sm leading-[24px] font-medium focus:ring-4 focus:ring-gray-300 focus:outline-none sm:mr-2 lg:px-5 lg:py-2.5 
        `}
                  href="/login/company"
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
                  href="/login/user"
                >
                  Employee Desk
                </Link>
              </div>
              <div
                className="hidden  w-full items-center justify-between md:order-1 md:flex md:w-auto"
                id="mobile-menu-2"
              >
                <ul className="mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:space-x-8">
                  <li>
                    <Link
                      className={`block border-b py-2 pr-4 pl-3  hover:text-white md:border-0  ${
                        pathname === "/" ? "text-white" : "text-primary"
                      }   md:p-0 md:hover:bg-transparent md:hover:text-purple-700`}
                      href="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`block border-b border-gray-700 py-2 pr-4 pl-3 hover:bg-gray-700 ${
                        pathname === "/" ? "text-white" : "text-primary"
                      }  hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white`}
                      href="/about"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`block border-b border-gray-700 py-2 pr-4 pl-3 hover:bg-gray-700 ${
                        pathname === "/" ? "text-white" : "text-primary"
                      }  hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white`}
                      href="/contactus"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      )}
      {isMenuOpen && (
            <div className="lg:hidden order-3 absolute top-16 left-0 w-full bg-white shadow-md z-50">
              <Link
                href="/"
                className={`block font-montserrat px-4 py-2 rounded-full ${
                  activeTab === "Home" ? "bg-black text-white" : ""
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveTab("Home");
                }}
              >
                Home
              </Link>
              <Link
                href="/explore"
                className={`block font-montserrat px-4 py-2 rounded-full ${
                  activeTab === "Explore" ? "bg-black text-white" : ""
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveTab("Explore");
                }}
              >
                Explore
              </Link>
              <Link
                href="/create"
                className={`block font-montserrat px-4 py-2 rounded-full ${
                  activeTab === "Create" ? "bg-black text-white" : ""
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveTab("Create");
                }}
              >
                Create
              </Link>
             
              <Link
                href="/create"
                className={`md:hidden font-montserrat px-4 py-2 rounded-full ${
                  activeTab === "Create" ? "bg-black text-white" : ""
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveTab("Create");
                }}
              >
                Community
              </Link>
              
            </div>
          )}

          {isopen?(
            <div>
              <Notification/>
            </div>
          ):(null)}
    </header>
  );
}

export default Navbar;
