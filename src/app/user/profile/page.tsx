import Navbar from "@/components/navBar/Navbar";
import {ViewProfile} from "@/components/navBar/ViewProfile";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <ViewProfile />
    </div>
  );
};
