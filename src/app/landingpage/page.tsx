import LandingPage from "@/components/common/landingPage/LandingPage";
import Navbar from "@/components/navBar/Navbar";
import React from "react";

// ✅ Default export required by Next.js App Router
export default function LandingHomePage() {
  return (
    <div>
      <Navbar />
      <LandingPage />
    </div>
  );
}
