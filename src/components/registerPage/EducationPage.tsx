"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { setCollage, setendYear, setLocation, setstartYear } from "@/lib/store/features/registerSlice";

export default function EducationPage() {
  const dispatch=useAppDispatch()
  const[Location,setLocallocation]=useState("")
  const[College,setLocalcollege]=useState("")
  const[StartYear,setStartYear]=useState("")
  const[EndYear,setEndYear]=useState("")
  const router = useRouter();
  const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setLocation(Location))
    dispatch(setCollage(College))
    dispatch(setstartYear(StartYear))
    dispatch(setendYear(EndYear))
    router.push(`/register/namepage/educationpage/questionpage`);
  };
  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <div className="w-full max-w-3xl  p-6 ">
        <h1 className="text-gray-800 font-semibold text-2xl text-center">
          Your profile enables you to connect with new people and uncover
          opportunities
        </h1>

        <form className="mt-6 space-y-4 flex flex-col items-center ">
          <div className="flex flex-col w-1/2">
            <label className="text-gray-700 font-medium mb-1">Location</label>
            <input
              type="text"
              placeholder="Location"
              value={Location}
              onChange={(e)=>setLocallocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label className="text-gray-700 font-medium mb-1">
              School or College/University
            </label>
            <input
              type="text"
              placeholder="School or College/University"
              value={College}
              onChange={(e)=>setLocalcollege(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex w-1/2 gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-gray-700 font-medium mb-1">
                Start Year
              </label>
              <input
                type="text"
                placeholder=" Start year"
                value={StartYear}
                onChange={(e)=>setStartYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-gray-700 font-medium mb-1">End Year</label>
              <input
                type="text"
                placeholder="End year"
                value={EndYear}
                onChange={(e)=>setEndYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button
              className="w-1/2 py-2 bg-primary text-white font-semibold rounded-full  focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
