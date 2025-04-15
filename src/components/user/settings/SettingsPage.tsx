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
import { useRouter } from "next/navigation";

const menuItems = [
  { id: "edit-profile", name: "Manage Account", icon: <FaUser /> },
  { id: "notifications", name: "Notifications", icon: <FaBell /> },
  { id: "subscription", name: "My Subscription", icon: <TbPremiumRights /> },
  { id: "support", name: "Help & Support", icon: <FaQuestionCircle /> },
  { id: "terms", name: "Terms & Policies", icon: <FaInfoCircle /> },
];

export default function SettingsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("edit-profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (selected === "back") {
    router.push(`/user/home`);
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-20 bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 w-64 h-screen bg-gradient-to-br pt-28  text-primary  p-5 transform backdrop-blur-lg
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:translate-x-0 rounded-r-2xl`}
      >
        <h2 className="text-xl font-bold  text-primary mb-6">Settings</h2>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 text-lg font-semibold
                ${selected === item.id ? "bg-white text-primary shadow-md scale-105" : "hover:bg-primary hover:text-white"}`}
              onClick={() => {
                setSelected(item.id);
                setIsSidebarOpen(false);
              }}
            >
              <span className="text-primary">{item.icon}</span>
              <span className="text-primary">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 fixed top-4 right-4 z-40 bg-white text-primary rounded-full shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
      </button>

      {/* Main Content */}
      <div className="md:ml-64 flex-1 p-6 transition-all duration-300">
        {selected === "edit-profile" && <ManageAccount />}
        {selected === "notifications" && <Notifications />}
        {selected === "subscription" && <SubscriptionDetail />}
        {selected === "support" && <HelpandSupport />}
        {selected === "terms" && <TermsAndPolicy />}
      </div>
    </div>
  );
}