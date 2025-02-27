import React from "react";

import Navbar from "@/components/navBar/Navbar";
import CompanyProfile from "@/components/company/CompanyDeatailsPage";


export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params; 



  console.log("Params:", id);

  return (
    <div>

      <Navbar />
      <CompanyProfile id={id} />

      

    </div>
  );
}
