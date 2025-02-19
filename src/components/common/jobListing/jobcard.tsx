"use client";

import React, { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

interface JobCardProps {
  date: string;
  company: string;
  role: string;
  tags: string;
  salary: string;
  location: string;
  logo: string;
  bgColor: string;
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
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  return (
    <div
      className="p-4 rounded-2xl shadow-lg w-72"
      style={{ backgroundColor: bgColor }}
      suppressHydrationWarning 
    >
      <div className="flex justify-between items-center text-gray-600 text-sm">
        <span className="flex items-center gap-1">
          <Calendar size={16} /> {date}
        </span>
        <button className="text-lg">🔖</button>
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

      <div className="mt-3 text-lg font-semibold">{salary}/hr</div>

      <div className="flex items-center gap-1 text-gray-600 text-sm">
        <MapPin size={16} /> {location}
      </div>

      <button className="mt-3 w-full py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition">
        Details
      </button>
    </div>
  );
};
