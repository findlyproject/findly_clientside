"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AfterLogin from "./Afterlogin";
import Beforlogin from "./NavBeforeLogin";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import logo from "../../../public/assets/findlylogo.png";
import api from "@/utils/api";

export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contactus" },

];

export const dropDownAfterlogin = [
  { name: "Subscription", href: "/premium" },
];

export const dropDownAfterloginSmallerScreen = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contactus" },
  { name: "Subscription", href: "/premium" },
];

export const dropDownBeforLogin = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contactus" },
];

export default function Navbar() {
 
  const router=useRouter()
  
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

  console.log("searchQuery",  searchQuery,searchResults)
  useEffect(() => {
    if (searchQuery.length > 0) {
      const fetchUsers = async () => {
        try {
          const response = await api.get(
            `/user/usersearch?firstName=${searchQuery}`
          );
          console.log("response of search",response);
          
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
    <nav className="bg-white border border-b-2">
      <div className=" sm:px-6">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/">
              <Image src={logo} alt="Logo" width={150} height={50}  className="min-w-20"/>
            </Link>

            <div className="relative w-96">

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
                <div className="absolute top-full left-0 mt-2 w-full max-h-60 overflow-y-auto border border-gray-300 bg-white p-4 rounded-lg shadow-md z-10 ">
                  <ul className="mt-2 space-y-2 ">
                    {searchResults.map((user) => (
                      <li key={user._id} className="flex items-center gap-2 hover:bg-slate-200 "
                      
                      onClick={()=>router.push(`/userdetails/${user._id}`)}
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
            {activeuser ? <AfterLogin /> : <Beforlogin />}
          </div>
        </div>
      </div>
    </nav>
  );
}

