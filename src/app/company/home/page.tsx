import HomePage from "@/components/homePage/HomePage";
import React from "react";
import Navbar from "@/components/navBar/Navbar";

export function page() {
  return (
    <div>
      <Navbar />
      <HomePage />
    </div>
  );
}

