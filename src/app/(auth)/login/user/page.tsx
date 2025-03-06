import Navbar from "@/components/navBar/Navbar";
import Loginpage from "@/components/user/Loginpage";
import React from "react";

export const page = () => {
  return (
    <div>
      <Navbar />
      <Loginpage />
    </div>
  );
};
