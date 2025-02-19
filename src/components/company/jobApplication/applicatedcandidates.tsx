"use client"
import { applicationList } from "@/lib/store/features/actions/companyActions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const AppliedUsers = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(applicationList());
  }, []);

  const applications = useAppSelector((state) => state.companyLogin.application);
  console.log("applications", applications);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Calculate the total number of pages
  const totalPages = Math.ceil(applications.length / itemsPerPage);

  // Get the current page's applications
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentApplications = applications.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Applied Users</h1>
        <div className="flex gap-2">
          <input type="text" placeholder="Find specific Profile" className="border px-3 py-2 rounded-md" />
          <input type="text" placeholder="Enter location" className="border px-3 py-2 rounded-md" />
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md">Search</button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <aside className="w-1/4 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Filter Profiles</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium">Job Type</h3>
              <ul className="text-sm text-gray-600">
                <li><input type="checkbox" className="mr-2" /> All (597)</li>
                <li><input type="checkbox" className="mr-2" /> Full-time (480)</li>
                <li><input type="checkbox" className="mr-2" /> Part-time (48)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Work Mode</h3>
              <ul className="text-sm text-gray-600">
                <li><input type="checkbox" className="mr-2" /> On-site (350)</li>
                <li><input type="checkbox" className="mr-2" /> Remote (240)</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Candidate Grid */}
        <main className="w-3/4">
          <div className="grid grid-cols-3 gap-4">
            {currentApplications.map((user, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-md text-center">
                 <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3">
                  
                  <Image src={user.userId?.profileImage||""} width={64} height={64} className="rounded-full" alt="Profile" />
                </div>
                <h3 className="text-lg font-semibold">{user.userId?.firstName}</h3>
                <p className="text-sm text-gray-500">{user.userId?.education?.[0]?.college}</p>
                <p className="text-sm text-gray-500">{user.userId?.phoneNumber}</p>
                <p className="text-sm text-gray-500">{user.userId?.email}</p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button 
              className={`px-3 py-1 border mx-1 ${currentPage === 1 ? "bg-gray-300" : ""}`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button 
                key={i} 
                className={`px-3 py-1 border mx-1 ${currentPage === i + 1 ? "bg-purple-600 text-white" : ""}`} 
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button 
              className={`px-3 py-1 border mx-1 ${currentPage === totalPages ? "bg-gray-300" : ""}`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppliedUsers;
