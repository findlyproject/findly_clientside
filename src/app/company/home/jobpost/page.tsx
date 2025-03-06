import { JobPost } from "@/components/company/JobPost";
import Navbar from "@/components/navBar/Navbar";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <JobPost />
    </div>
  );
}
