"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { useEffect, useState } from "react";
import api from "@/utils/api";



export const FeedIdentityModule = () => {
  const [connections, setConnections] = useState([]);
  
  const { activeuser } = useAppSelector((state) => state.login);

 
  useEffect(() => {
    const fetchConnections = async () => {
      const response = await api.get(`/connecting/getconnection`);
      console.log("all connections of user response", response);

      setConnections(response.data.connections);
    };
    fetchConnections();
  }, []);

  return (
    <section className="rounded-lg border  border-gray-300 min-h-[240px] bg-white">
      {activeuser ? (
        <>
      <div className="relative">
        <img
          src={activeuser.banner}
          alt="Cover"
          className="w-full h-24 rounded-t-2xl object-cover"
        />
        {/* Profile Image */}
        <div className="absolute left-1/2 top-12 transform -translate-x-1/2">
          <img
            src={activeuser.profileImage}
            alt="User"
            className="w-20 h-20 rounded-full border-4 border-white shadow-md"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold">{activeuser?.firstName} {activeuser?.lastName}</h3>
        <p className="text-gray-500 text-sm">{activeuser?.email}</p>
      </div>

      {/* Stats Section */}
      <div className="mt-4 flex justify-around border-t border-gray-200 pt-4">
        <div className="text-center">
          <p className="font-bold text-lg">250</p>
          <p className="text-gray-500 text-sm">Post</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-lg">{connections?.length}</p>
          <p className="text-gray-500 text-sm">Connections</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-lg">590</p>
          <p className="text-gray-500 text-sm">Following</p>
        </div>
      </div>

      {/* Profile Button */}
      <div className="mt-4 flex items-center justify-center mb-2">
        <button className="w-1/2  bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition">
          My Profile
        </button>
      </div>
      </>
      ):("")}
    </section>
  );
};
