import Navbar from "@/components/navBar/Navbar";
import RegisterPage from "@/components/user/registerPage/RegisterPage";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <RegisterPage />
    </div>
  );
}
