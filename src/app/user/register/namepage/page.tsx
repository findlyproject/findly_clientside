import Navbar from "@/components/navBar/Navbar";
import {NamePage} from "@/components/user/registerPage/NamePage";
import React from "react";
export default function page() {
  return (
    <div>
      <Navbar />
      <NamePage />
    </div>
  );
}
