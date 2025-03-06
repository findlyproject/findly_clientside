import CommunityDetails from "@/components/common/community/CommunityDetails";
import Navbar from "@/components/navBar/Navbar";
import React from "react";

export const page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <Navbar />
      <CommunityDetails id={id} />
    </div>
  );
}
