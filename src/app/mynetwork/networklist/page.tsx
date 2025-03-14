import React from "react";
import ConnectionsList from "@/components/common/network/ConnectionsList";
import Navbar from "@/components/navBar/Navbar";
import { LeftSideBar } from "@/components/homePage/leftSide/LeftSide";
export default function page() {
  return (
    <div>
      <Navbar />
      <div
  className="grid bg-gray-100 pt-16 -z-10 transition-all duration-300 grid-cols-1 lg:grid-cols-[15%_20%_60%_5%] lg:gap-10 lg:justify-center "
>
  {/* Left Sidebar - Takes up 25% of the width */}
  <div></div>
    <LeftSideBar />
  



    <ConnectionsList />
    <div></div>

</div>

    </div>
  );
}
