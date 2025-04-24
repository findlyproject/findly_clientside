import React from "react";
import DetailsUser from "@/components/navBar/DetailsUser";
import Navbar from "@/components/navBar/Navbar";
import CompanyProfile from "@/components/company/CompanyDeatailsPage";

export default  function Page({
  params,
}: {
  params: { id: string; type: string };
}) {
  const { id, type } =  params;

  return (
    <div>
      <Navbar />
      {type === "User" ? <DetailsUser id={id} /> : <CompanyProfile id={id} />}
    </div>
  );
}
