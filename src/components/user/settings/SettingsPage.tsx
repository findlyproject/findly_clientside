'use client'

import React, { useState } from "react";
import { FaUser, FaLock, FaBell, FaQuestionCircle, FaInfoCircle, FaBars } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { TbPremiumRights } from "react-icons/tb";
import { TbMessageReportFilled } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
const menuItems = [
  { id: "edit-profile", name: "Edit Profile", icon: <FaUser /> },
 
  { id: "notifications", name: "Notifications", icon: <FaBell /> },
  { id: "privacy", name: "Privacy", icon: <FaLock /> },
  { id: "subscription", name: "My Subscription", icon: <TbPremiumRights /> },
  { id: "support", name: "Help & Support", icon: <FaQuestionCircle /> },
  { id: "terms", name: "Terms & Policies", icon: <FaInfoCircle /> },
  { id: "report", name: "Report a Problem", icon: <TbMessageReportFilled /> },
  
  { id: "changepassword", name: "Change Password", icon: <RiLockPasswordFill /> },
   {id: "darkmode", name: "Dark mode", icon: <MdDarkMode  />},
   { id: "logout", name: "Logout", icon: <IoIosLogOut /> }
];

export default function SettingsPage() {
    
  const [selected, setSelected] = useState("edit-profile");
  const router=useRouter()
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="  w-64 bg-white shadow-lg p-4 hidden md:block">
      <div className="flex items-center space-x-2">
  <button onClick={() => router.push(`/home`)}>
    <IoIosArrowBack className="text-2xl"/>
  </button>
  <h2 className="text-xl font-semibold">Settings</h2>
</div>

        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${
                selected === item.id ? "bg-primary text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelected(item.id)}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      
      <button className="md:hidden p-4 absolute top-0 right-4 ">
        <FaBars className="text-gray-600 text-xl" />
      </button>

      
      <div className="flex-1 p-6">
        {selected === "edit-profile" && <EditProfile />}
       
        {selected === "notifications" && <Notifications />}
        {selected === "privacy" && <Privacy />}
        {selected === "subscription" && <Subscription />}
        {selected === "support" && <Support />}
        {selected === "terms" && <Terms />}
        {selected ===  "changepassword"&&<ChangePassword/>}    
        {selected === "report" && <Report />}
        {selected === "logout" && <Logout />}
        {selected==="darkmode"&&<Darkmode/>}
      </div>
    </div>
  );
}

// Dummy Components for Pages
const EditProfile = () =><h1 className="text-2xl font-semibold">edit profile</h1>;
const Notifications = () => <h1 className="text-2xl font-semibold">Notification Preferences</h1>;
const Privacy = () => <h1 className="text-2xl font-semibold">Privacy Settings</h1>;
const Subscription = () => <h1 className="text-2xl font-semibold">Subscription Details</h1>;
const Support = () => <h1 className="text-2xl font-semibold">Help & Support</h1>;
const Terms = () => <h1 className="text-2xl font-semibold">Terms and Policies</h1>;
const ChangePassword = () => <h1 className="text-2xl font-semibold">ChangePassword</h1>;

const Report = () => <h1 className="text-2xl font-semibold">Report a Problem</h1>;
const Logout = () => <h1 className="text-2xl font-semibold">Logout</h1>;
const Darkmode=()=><h1 className="text-2xl font-semibold"> dark mode</h1>