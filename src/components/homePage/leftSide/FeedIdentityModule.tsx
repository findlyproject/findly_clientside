"use client";

import { useAppSelector } from "@/lib/store/hooks";
import api from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export  function FeedIdentityModule  (){ 
  const { activeuser } = useAppSelector((state) => state.user);
  const { activeCompany } = useAppSelector((state) => state.companyLogin);
  const [postlength,setPostLength]=useState(0)
  const route =activeuser? "user":"company"
 
  
  useEffect(() => {
    const fetchPostLength = async () => {
      try {
        const response = await api.get(`${route}/posts`);
        if(response?.status==200){

          console.log("response",response);
          
        setPostLength(response.data.posts.length);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPostLength();
  }, [route]); 


  console.log("postlength",postlength);
  const router = useRouter()
  return (
    <section className="rounded-lg border hover:cursor-pointer border-gray-300 min-h-[240px] bg-white" onClick={()=>router.push(`/user/profile`)}>
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
        {activeuser?.jobTitle && (
  <span className="font-medium text-xs leading-7 text-gray-700 transition-all duration-500 group-hover:text-indigo-600">
    {activeuser.jobTitle.join(" | ")}
  </span>
 
)}
<br/>
<span className="font-medium text-xs leading-7 text-gray-700 transition-all duration-500 group-hover:text-indigo-600">
  {[activeuser?.jobLocation?.[0]?.countryName, activeuser?.jobLocation?.[0]?.stateName, activeuser?.jobLocation?.[0]?.city]
    .filter(Boolean) // Remove any `undefined` or `null` values
    .join(" , ")}
</span>


      </div>

      {/* Stats Section */}
      <div className="mt-4 flex justify-around border-t pb-10 border-gray-200 pt-4">
        <div className="text-center">
          <p className="font-bold text-lg">{postlength}</p>
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
            <p className="font-bold text-lg">{postlength}</p>
            <p className="text-gray-500 text-sm">Post</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg">{activeCompany?.followers?.length}</p>
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
