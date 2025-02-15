import React from "react";
import DetailsUser from "@/components/navBar/DetailsUser";
import Navbar from "@/components/navBar/Navbar";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params; 

  console.log("Params:", id);

  return (
    <div>
      <Navbar />
      <DetailsUser id={id} />
    </div>
  );
}
