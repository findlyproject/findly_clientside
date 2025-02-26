"use client";
import { AxiosError, AxiosResponse } from 'axios';
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAppSelector } from '@/lib/store/hooks';
export default function CommunityDetails({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState("images");
  const activeuser=useAppSelector((state)=>state.user.activeuser)
  const router=useRouter()
  const[details,setDetails]=useState({})
const[dropdown,setDropdown]=useState(false)
  useEffect(()=>{
    const fetchCommunity=async()=>{
const response=await api.get(`/message/details/${id}`)
console.log("response of details",response);
setDetails(response.data.community)
    }
    fetchCommunity()
  },[])
  const isMember = details?.members?.some((item) => item === activeuser._id);
console.log("isMember",isMember);

  const handleDropdown=()=>{
    setDropdown(!dropdown)
  }

  const handleLeaveCommunity = async (communityid: string): Promise<void> => {
    try {
      const response: AxiosResponse = await api.patch(`/message/leave/${communityid}`);
      console.log("Response of leave:", response);
  
      if (response.status === 200) {
        toast.success('Successfully left the community');
        router.push('/community');
      }
    } catch (error) {
      // Improved error handling with TypeScript type checking
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
          toast.warn(error.response.data.message);
        } else {
          console.error('Unexpected error:', error);
          toast.error('Something went wrong. Please try again.');
        }
      } else {
        console.error('Unexpected error:', error);
        toast.error('Something went wrong. Please try again.');
      }
    }
  };
  const images = [
    "https://i.pinimg.com/474x/1a/d7/9b/1ad79bd7a043fa44e497c11d09443704.jpg",
    "https://i.pinimg.com/474x/11/30/cd/1130cdadc60fae91e1781bac0ee0aa8d.jpg",
    "https://i.pinimg.com/736x/31/71/00/317100cdc901c0f87d4baa2d2188ba44.jpg",
    "https://i.pinimg.com/474x/1a/d7/9b/1ad79bd7a043fa44e497c11d09443704.jpg",
    "https://i.pinimg.com/474x/11/30/cd/1130cdadc60fae91e1781bac0ee0aa8d.jpg",
    "https://i.pinimg.com/736x/31/71/00/317100cdc901c0f87d4baa2d2188ba44.jpg",
  ];

  const videos = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
  ];

  const members = [
    {
      name: "Sophia Madison",
      img: "https://i.pravatar.cc/40?img=6",
      admin: true,
    },
    { name: "Lucas West", img: "https://i.pravatar.cc/40?img=7", admin: false },
    { name: "Ancy", img: "https://i.pravatar.cc/40?img=5", admin: false },
    { name: "Joe", img: "https://i.pravatar.cc/40?img=4", admin: false },
    { name: "Maria", img: "https://i.pravatar.cc/40?img=2", admin: false },
  ];
useEffect(()=>{
  console.log("ffff",details);
  
  const leav=details.members
  console.log("leav",leav);
},[])
 
  // .some((item)=>item==activeuser._id)
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative">
        <img
          src="https://i.pinimg.com/736x/94/28/4b/94284b5a8c22976bf6984c40ee132e39.jpg"
          alt="Community Banner"
          className="w-full h-[250px] object-cover rounded-lg"
        />

        <div className="absolute left-4 bottom-[-40px]">
          <img
            src={details.profile}
            alt="Community Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />
        </div>
        
      </div>

      <div className="mt-12 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
  <div className="flex flex-col">
    <h2 className="text-2xl font-bold">{details.name}</h2>
    <p className="text-gray-600 mt-2">{details.description}</p>
  </div>
  <div className="relative">
  <button 
    onClick={handleDropdown} 
    className="text-gray-600 hover:text-gray-800 focus:outline-none"
  >
    <FaEllipsisV />
  </button>

  {dropdown && (
    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      {isMember ? (
        <button 
          onClick={() => handleLeaveCommunity(details._id)}
          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg transition duration-150"
        >
          Leave Community
        </button>
      ) : (
        <button 
          // onClick={() => handleJoinCommunity(details._id)}
          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg transition duration-150"
        >
          Join Community
        </button>
      )}
    </div>
  )}
</div>

</div>


      <div className="mt-6">
        <div className="flex gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "images" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("images")}
          >
            Images
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "videos" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("videos")}
          >
            Videos
          </button>

          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "members" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("members")}
          >
            Members
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {activeTab === "images" ? (
    images.map((src, index) => (
      <img
        key={index}
        src={src}
        className="w-full h-[150px] object-cover rounded-lg"
        alt="Post"
      />
    ))
  ) : activeTab === "videos" ? (
    videos.map((src, index) => (
      <video key={index} src={src} className="w-full h-[150px] rounded-lg" controls />
    ))
  ) : (
    <ul className="space-y-2">
        <h1 className="text-xl font-semibold">6 Members</h1>
    {members.map((member, index) => (
      <li key={index} className="py-2 flex items-center border-b pb-2">
        <img src={member.img} className="w-8 h-8 rounded-full" alt={member.name} />
        <span className="ml-3">{member.name}</span>
        {member.admin && (
          <span className="text-primary ml-auto bg-gray-100 border border-primary rounded-full text-sm px-2 py-1">
            Admin
          </span>
        )}
      </li>
    ))}
  </ul>
  
  )}
</div>

      </div>
    </div>
  );
}
