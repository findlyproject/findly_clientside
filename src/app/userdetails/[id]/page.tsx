
import React from "react";
import DetailsUser from "@/components/navBar/DetailsUser";
import Navbar from "@/components/navBar/Navbar";

export default function Page({ params }: { params: { id: string } }) {
  console.log("Params:", params); 

  return (
    <div>
      <Navbar/>
      <DetailsUser id={params.id} />
    </div>
  );
}
