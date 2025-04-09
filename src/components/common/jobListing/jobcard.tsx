"use client";

import React, { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuBookmark, LuBookmarkCheck } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { saveJobs } from "@/lib/store/features/actions/userActions";
import {  Salary } from "@/types/Types";
interface JobCardProps {
  date: string;
  company: string;
  role: string;
  tags: string;
  salary: Salary
  location: string;
  logo: string;
  bgColor: string;
  _id: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  date,
  company,
  role,
  tags,
  salary,
  location,
  logo,
  bgColor,
  _id,
}) => {
  const [mounted, setMounted] = useState(false);
  const route = useRouter();
const savedjobs = useAppSelector((state)=>state.user.savedJobs)
console.log("ss",savedjobs);

const dispatch = useAppDispatch()
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
    
  return (
    <div
      className="p-4 rounded-2xl shadow-xl w-72"
      style={{ backgroundColor: bgColor }}
      suppressHydrationWarning 
    >
      <div className="flex justify-between items-center text-gray-600 text-sm">
        <span className="flex items-center gap-1">
          <Calendar size={16} /> {new Date(date).toLocaleDateString("en-US")}
        </span>
        
        <button className="text-lg"
        onClick={()=>dispatch(saveJobs(_id))}
        >{savedjobs.find((item)=>item.jobId?._id.includes(_id)) ? <LuBookmarkCheck />:<LuBookmark />
}</button>
      </div>

      <div className="flex items-center mt-2 gap-2">
        <Image
          width={24}
          height={24}
          src={logo}
          alt={company}
          className="w-6 h-6 rounded-full"
          priority 
        />
        <h3 className="font-semibold">{company}</h3>
      </div>

      <h2 className="text-lg font-bold mt-1">{role}</h2>

      <div className="flex flex-wrap gap-1 mt-2">
        
          <span
            
            className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
          >
            {tags}
          </span>
      </div>


      <div className="mt-3 text-lg font-semibold">{salary.min}/{salary.rate}</div>

      

      <div className="flex items-center gap-1 text-gray-600 text-sm">
        <MapPin size={16} /> {location}
      </div>

      <button className="mt-3 w-full py-2 bg-primary text-white rounded-lg font-semibold hover:bg-gray-800 transition"
      onClick={()=>route.push(`jobs/details/${_id}`)}
      >
        Details
      </button>
    </div>
  );
};


export const JobSkeleton = () => (
  <div className="p-4 rounded-2xl shadow-xl w-72 animate-pulse bg-gray-200">
    {/* Header */}
    <div className="flex justify-between items-center text-gray-600 text-sm">
      <div className="flex items-center gap-1">
        <div className="w-12 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="w-6 h-6 bg-gray-300 rounded"></div>
    </div>

    {/* Company */}
    <div className="flex items-center mt-2 gap-2">
      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
      <div className="w-24 h-4 bg-gray-300 rounded"></div>
    </div>

    {/* Job Title */}
    <div className="w-32 h-6 bg-gray-300 rounded mt-1"></div>

    {/* Tags */}
    <div className="flex flex-wrap gap-1 mt-2">
      <div className="w-12 h-4 bg-gray-300 rounded"></div>
    </div>

    {/* Salary */}
    <div className="w-20 h-6 bg-gray-300 rounded mt-3"></div>

    {/* Location */}
    <div className="flex items-center gap-1 text-gray-600 text-sm mt-2">
      <div className="w-16 h-4 bg-gray-300 rounded"></div>
    </div>

    {/* Button */}
    <div className="mt-3 w-full py-2 bg-gray-300 rounded-lg"></div>
  </div>
);

// applya job skeleton//
export const ApplyJobSkeleton = () => {
  return (
    <div className="h-auto flex items-center justify-center p-4 w-full">
      <div className="flex-1 p-6 bg-white rounded-xl shadow-lg w-full">
        <div className="space-y-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border-b pb-6 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="w-full">
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/4 mb-2"></div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                    <div className="h-3 bg-gray-300 rounded w-1/5"></div>
                    <span className="h-3 w-3 bg-gray-300 rounded-full"></span>
                    <div className="h-3 bg-gray-300 rounded w-1/6"></div>
                  </div>
                  <div className="h-3 bg-gray-300 rounded w-3/4 mt-2"></div>
                </div>
                <div className="text-right w-1/4">
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// jobdetailcard  skeleton//

export const JobDetailSkeleton = () => {
  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="relative flex-1 min-w-[280px]">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-7"></div>
            <div className="flex items-center gap-4 mb-5 mt-4">
              <div className="flex-shrink-0 bg-gray-200 rounded-lg p-6 shadow-sm"></div>
              <div>
                <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <div className="h-6 bg-gray-300 rounded w-20"></div>
              <div className="h-6 bg-gray-300 rounded w-24"></div>
              <div className="h-6 bg-gray-300 rounded w-28"></div>
            </div>
          </div>
          <div className="relative min-w-[200px]">
            <div className="flex gap-3 mb-8">
              <div className="h-10 bg-gray-300 rounded w-28"></div>
              <div className="h-10 bg-gray-300 rounded w-10"></div>
              <div className="h-10 bg-gray-300 rounded w-10"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-8">
          <section>
            <div className="h-5 bg-gray-300 rounded w-48 mb-4"></div>
            <div className="bg-gray-200 p-4 rounded-lg border border-gray-100 h-16"></div>
          </section>
          <section>
            <div className="h-5 bg-gray-300 rounded w-48 mb-4"></div>
            <div className="bg-gray-200 p-4 rounded-lg border border-gray-100 h-16"></div>
          </section>
        </div>
      </div>
    </div>
  );
};

// jobdetailcard  skeleton//
export const Jobdetailcard = () => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-lg animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-gray-300 rounded" />
          <div>
            <div className="h-5 bg-gray-300 rounded w-32 mb-2" />
            <div className="h-4 bg-gray-300 rounded w-24" />
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="px-3 py-1 bg-gray-300 rounded-full w-16 h-6" />
              <div className="px-3 py-1 bg-gray-300 rounded-full w-20 h-6" />
              <div className="px-3 py-1 bg-gray-300 rounded-full w-24 h-6" />
            </div>
            <div className="h-4 bg-gray-300 rounded w-28 mt-2" />
          </div>
        </div>
        <div className="w-6 h-6 bg-gray-300 rounded" />
      </div>
    </div>
  );
};
