"use client";

import React, { useState } from "react";
import {
  FaUser,
  FaBell,
  FaQuestionCircle,
  FaInfoCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { TbPremiumRights } from "react-icons/tb";
import ManageAccount from "./ManageAccount";
import Notifications from "./Notifications";
import HelpandSupport from "./HelpandSupport";
import TermsAndPolicy from "./TermsAndPolicy";
import SubscriptionDetail from "./SubscriptionDetail";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
const menuItems = [
  { id: "edit-profile", name: "Manage Account", icon: <FaUser /> },
  { id: "notifications", name: "Notifications", icon: <FaBell /> },
  { id: "subscription", name: "My Subscription", icon: <TbPremiumRights /> },
  { id: "support", name: "Help & Support", icon: <FaQuestionCircle /> },
  { id: "terms", name: "Terms & Policies", icon: <FaInfoCircle /> },
  {id:"back",name:"Back to home",icon:<FaHome/>}
];

export default function SettingsPage() {
  const router=useRouter()
  const [selected, setSelected] = useState("edit-profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
if(selected==="back"){
router.push(`/user/home`)
}
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-20 w-64 h-screen overflow-y-auto bg-white shadow-lg p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <h2 className="text-3xl font-semibold text-start">Settings</h2>
        <br />
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer font-semibold ${
                selected === item.id
                  ? "text-primary"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
              onClick={() => {
                setSelected(item.id);
                setIsSidebarOpen(false); // Close sidebar on mobile
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
            
          ))}
        </ul>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden p-4 fixed top-4 right-4 z-30"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <FaTimes className="text-gray-600 text-2xl" />
        ) : (
          <FaBars className="text-gray-600 text-2xl" />
        )}
      </button>

      {/* Content */}
      <div className="md:ml-64 flex-1 p-6">
        {selected === "edit-profile" && <ManageAccount />}
        {selected === "notifications" && <Notifications />}
        {selected === "subscription" && <SubscriptionDetail />}
        {selected === "support" && <HelpandSupport />}
        {selected === "terms" && <TermsAndPolicy />}
        
      </div>

    </div>
  );
}
