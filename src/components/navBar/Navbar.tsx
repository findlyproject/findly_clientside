"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AfterLogin from "./Afterlogin";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import logo from "../../../public/assets/findlylogo.png";
import api from "@/utils/api";
import Beforlogin from "./BeforLogin";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";


export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contactus" },
<<<<<<< HEAD
  {name:"Community",href:"/community"},
=======

];

export const dropDownAfterlogin = [
  { name: "Subscription", href: "/premium" },
];

export const dropDownAfterloginSmallerScreen = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contactus" },
>>>>>>> 5595591ae871dbdb6ac9cb704189243e98ad0092
  { name: "Subscription", href: "/premium" },
];

export const dropDownBeforLogin = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contactus" },
  { name: "Subscription", href: "/premium" },
];

export default function Navbar() {

 const activeCompany= useAppSelector((state)=>state.companyLogin.activeCompany)
  const router = useRouter()
  const [issearch,setIssearch]=useState(false)
  const { activeuser } = useAppSelector((state) => state.login);
  interface User {
    _id: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    jobTitle: string;
  }
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIssearch(false);
      }
    };

    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log("searchResults",searchQuery && searchResults.length > 0 );
  
  useEffect(() => {
    if (searchQuery.length > 0) {
      const fetchUsers = async () => {
        try {
          const response = await api.get(
            `/user/usersearch?firstName=${searchQuery}`
          );
          console.log("response of search", response.data.users);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };


  return (
    <nav className="border-b-2 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex  h-16 items-center">
          <div className="flex justify-between w-full">

            <div className="flex items-center">
              <Link href="/">
                <Image src={logo} alt="Logo" width={100} height={50} className="min-w-20" />
              </Link>
              <div>
         
        </div>
            </div>
            <div className="hidden md:flex space-x-4 relative">
              <div className="w-96 h-10 bg-slate-200 rounded-3xl outline-none ">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full h-full bg-transparent outline-none p-2 pl-4 "
                />
              </div>


              {searchQuery && searchResults.length > 0 && (
                <div className="absolute top-12 left-0 mt-2 w-full max-h-60 overflow-y-auto border border-gray-300 bg-white p-4 rounded-lg shadow-md z-50 ">
                  <ul className="mt-2 space-y-2 ">
                    {searchResults.map((user) => (
                      <li key={user._id} className="flex items-center gap-2 hover:bg-slate-200 "

                        onClick={() => router.push(`/userdetails/${user._id}`)}
                      >
                        <Image
                          width={100}
                          height={100}

                          src={user.profileImage}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-7 h-7 rounded-full"
                        />
                        <div>
                          <p className="tex-sm font-semibold">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {user.jobTitle[0]}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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

            <div className="sm:hidden ">
              {
                issearch ? (
                  <div className="flex space-x-4 w-full">
              <div className="w-full h-10 bg-slate-200 rounded-3xl outline-none flex pr-3">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full h-full bg-transparent outline-none p-2 pl-4 "
                />
                <button onClick={()=>setIssearch(!issearch)}>
                <RxCross2 />
                </button>
              </div>


              {searchQuery && searchResults.length > 0 && (
                <div className="absolute top-12 left-0 mt-2 w-full max-h-60 overflow-y-auto border border-gray-300 bg-white p-4 rounded-lg shadow-md z-50 ">
                  <ul className="mt-2 space-y-2 ">
                    {searchResults.map((user) => (
                      <li key={user._id} className="flex items-center gap-2 hover:bg-slate-200 "

                        onClick={() => router.push(`/userdetails/${user._id}`)}
                      >
                        <Image
                          width={100}
                          height={100}

                          src={user.profileImage}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-7 h-7 rounded-full"
                        />
                        <div>
                          <p className="tex-sm font-semibold">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {user.jobTitle[0]}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
                ):(
                  ""
                )
              }
            </div>

          </div>

        </div>
        {
          !issearch ? (
            <div className="flex items-center">
        <button
            className="sm:hidden focus:outline-none text-slate-500 hover:text-gray-700 font-extralight text-2xl p-2"
            onClick={() => setIssearch(!issearch)}
          >
          <IoSearch  />
          </button>
        {activeuser||activeCompany ? <AfterLogin /> : <Beforlogin />}

        </div>
          ):(
            ""
          )
        }
      </div>

    </nav>
    
  );
}