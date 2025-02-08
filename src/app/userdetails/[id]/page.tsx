// import React from 'react'
// import DetailsUser from '@/components/navBar/DetailsUser'
// export default function page() {
//   return (
//     <div>
//       <DetailsUser />
//     </div>
//   )
// }
import React from "react";
import DetailsUser from "@/components/navBar/DetailsUser";

export default function Page({ params }: { params: { id: string } }) {
  console.log("Params:", params); // Debugging

  return (
    <div>
      <DetailsUser id={params.id} />
    </div>
  );
}
