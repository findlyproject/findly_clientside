"use client"
import { useRouter } from "next/navigation";
import { useAppSelector } from '@/lib/store/hooks';
import { useEffect, useState } from "react";
import api from "@/utils/api";
export const FeedIdentityModule = () => {
  const[connections,setConnections]=useState([])
  const router = useRouter();
  const { activeuser } = useAppSelector((state) => state.login);
  console.log("activeuser",{activeuser});
  

  if (!activeuser) {
    return <section className="rounded-lg border border-gray-300 min-h-[240px] bg-white flex items-center justify-center">Loading...</section>
  }
  useEffect(()=>{
    const fetchConnections=async()=>{
      const response=await api.get(`/connecting/getconnection`)
      console.log("all connections of user response",response);
     
      setConnections(response.data.connections)
    }
    fetchConnections()
  },[])
  return (
    <section className="rounded-lg border border-gray-300 min-h-[240px] bg-white">
      <div>
        {/* Profile Background */}
        <div className="bg-gray-400 h-[70px] rounded-t-lg relative">
          <div
            className="flex justify-center cursor-pointer absolute left-1/2 transform -translate-x-1/2 translate-y-1/2"
            onClick={() => router.push(`profile/${activeuser._id}`)}
          >
            <img src={activeuser?.profileImage} alt="" className="w-[70px] h-[70px] rounded-full bg-yellow-200 object-cover" />
          </div>
        </div>

        {/* Profile Name & Email */}
        <div className="mt-12 px-4 pb-6 flex flex-col items-center border-b border-gray-300">
          <h1 className="text-xl font-semibold text-center">{activeuser?.firstName} {activeuser?.lastName}</h1>
          <p className="text-sm text-gray-500">{activeuser?.email}</p>
        </div>

        {/* Connections */}
        <div className="px-4 py-2 border-b border-gray-300">
          <p className="text-sm text-gray-600">{connections?connections.length:0} connections</p>
        </div>
      </div>
    </section>
  )
}
