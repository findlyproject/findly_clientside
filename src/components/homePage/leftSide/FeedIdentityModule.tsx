"use client";

import { useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

export  function FeedIdentityModule  (){ 
  const { activeuser } = useAppSelector((state) => state.user);
  const { activeCompany } = useAppSelector((state) => state.companyLogin);

  const router = useRouter()
  return (
    <section className="rounded-lg border  border-gray-300 min-h-[240px] bg-white" onClick={()=>router.push(`/user/profile`)}>
      {activeuser ? (
        <>
      <div className="relative">
        <Image
          src={activeuser.banner || "https://res.cloudinary.com/dq1auwpkm/image/upload/v1740220803/linkedinheaders-desktop_fw5iio.jpg"}
          alt="Cover"
          className="w-full h-24 rounded-t-lg object-cover"
          width={500}
          height={200}
        />
        {/* Profile Image */}
        <div className="absolute left-1/2 top-12 transform -translate-x-1/2">
          <Image
            src={activeuser.profileImage ||"https://res.cloudinary.com/dq1auwpkm/image/upload/v1738735360/profile_jtwxaj.png"}
            alt="User"
            className="w-20 h-20 rounded-full border-4 border-white "
            width={100}
            height={100}
          />
        </div>
      </div>

      {/* User Info */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold">{activeuser?.firstName} {activeuser?.lastName}</h3>
        <p className="text-gray-500 text-sm">{activeuser?.email}</p>
      </div>

      {/* Stats Section */}
      <div className="mt-4 flex justify-around border-t pb-10 border-gray-200 pt-4">
        <div className="text-center">
          <p className="font-bold text-lg">do</p>
          <p className="text-gray-500 text-sm">Post</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-lg">{activeuser.connecting?.length}</p>
          <p className="text-gray-500 text-sm">Connections</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-lg">{activeuser?.following?.length}</p>
          <p className="text-gray-500 text-sm">Following</p>
        </div>
      </div>

      
      </>
      ):(
        <>
        <div className="relative">
          <Image
            src={activeCompany?.banner || "https://res.cloudinary.com/dq1auwpkm/image/upload/v1740220803/linkedinheaders-desktop_fw5iio.jpg"}
            alt="Cover"
            className="w-full h-24 rounded-t-lg object-cover"
            width={500}
            height={200}
          />
          {/* Profile Image */}
          <div className="absolute left-1/2 top-12 transform -translate-x-1/2">
            <Image
              src={activeCompany?.logo||"https://res.cloudinary.com/dq1auwpkm/image/upload/v1738735360/profile_jtwxaj.png"}
              alt="User"
              className="w-20 h-20 rounded-full border-4 border-white "
               width={100}
            height={100}
            />
          </div>
        </div>
  
        {/* User Info */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold">{activeCompany?.name} </h3>
          <p className="text-gray-500 text-sm">{activeCompany?.email}</p>
        </div>
  
        {/* Stats Section */}
        <div className="mt-4 flex justify-around border-t pb-10 border-gray-200 pt-4">
          <div className="text-center">
            <p className="font-bold text-lg">do</p>
            <p className="text-gray-500 text-sm">Post</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg">0</p>
            <p className="text-gray-500 text-sm">Connections</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg">0</p>
            <p className="text-gray-500 text-sm">Following</p>
          </div>
        </div>
  
        
        </>
      )}
    </section>
  );
};
