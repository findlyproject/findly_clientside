
"use client"
import React from "react";

const AppliedUsers = () => {



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
            {[...Array(10)].map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-md text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3"></div>
                <h3 className="text-lg font-semibold">Name</h3>
                <p className="text-sm text-gray-500">Highlighted Studies</p>
                <p className="text-sm text-gray-500">+123 456 7890</p>
                <p className="text-sm text-gray-500">email@example.com</p>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <button className="px-3 py-1 border mx-1">1</button>
            <button className="px-3 py-1 border mx-1">2</button>
            <button className="px-3 py-1 border mx-1">3</button>
            <button className="px-3 py-1 border mx-1">4</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppliedUsers;
