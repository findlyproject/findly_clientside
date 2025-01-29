'use client'

import React from "react";
import { useRouter } from "next/navigation";
export default function JobPage() {
    const router = useRouter();
      const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push(`/`);
      };
  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <div className="w-full max-w-3xl  p-6 ">
        <h1 className="text-gray-800 font-semibold text-2xl text-center">
        What kind  of job are looking for?
        </h1>
        <p className="text-gray-800   text-center">you can select 5 titles and locations.</p>

        <form className="mt-6 space-y-4 flex flex-col items-center">
          <div className="flex flex-col w-1/2">
            <label className="text-gray-700 font-medium mb-1">Job Title</label>
            <input
              type="text"
              placeholder="Ex.Sales Manager"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label className="text-gray-700 font-medium mb-1">
              Job Locations
            </label>
            <input
              type="text"
              placeholder="Location"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="w-full flex justify-center">
            <button
              className="w-1/2 py-2 bg-purple-700 text-white font-semibold rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              onClick={handleContinue}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
