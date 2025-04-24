import {CommunityDetails} from "@/components/common/community/CommunityDetails";
import Navbar from "@/components/navBar/Navbar";
import React from "react";

type Props = {
  params: {
    id: string;
  };
  onClose: () => never;
};
export default function Page({ params, onClose }: Props) {
  const { id } = params;

  return (
    <div>
      <Navbar />
      <CommunityDetails params={{ id }} onClose={onClose} />
    </div>
  );
}


