import React from "react";

const ViewProfile: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Overview */}
      <h2 className="text-xl font-bold mb-4">Overview</h2>

      {/* About & Profile */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold">ABOUT</h3>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut urna et elit...
          </p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">56</p>
              <p className="text-gray-500">Applications</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">10</p>
              <p className="text-gray-500">Interview Schedule</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">150</p>
              <p className="text-gray-500">Profile Visited</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center">
          <img
            src="https://via.placeholder.com/80"
            alt="User"
            className="rounded-full"
          />
          <h3 className="text-lg font-semibold mt-2">Natalya Herington</h3>
          <p className="text-gray-500">UX/UI DESIGNER</p>
          <div className="flex mt-4 space-x-2">
            <span className="text-xs px-3 py-1 bg-purple-200 rounded-full">50% Sent</span>
            <span className="text-xs px-3 py-1 bg-green-200 rounded-full">50% Accepted</span>
            <span className="text-xs px-3 py-1 bg-red-200 rounded-full">50% Rejected</span>
          </div>
          <div className="mt-4 text-sm text-gray-600">Last Activities</div>
        </div>
      </div>

      {/* Vacancy Stats */}
      <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
        <h3 className="text-lg font-semibold">Vacancy Stats</h3>
        <p className="text-gray-500">Graph Placeholder</p>
      </div>

      {/* Actions */}
      <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
        <h3 className="text-lg font-semibold">Actions</h3>
        <p className="text-gray-500">Lorem ipsum dolor sit amet...</p>
      </div>

      {/* Work Experience */}
      <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <div className="mt-4">
          <div className="flex space-x-2">
            <span className="w-4 h-4 bg-orange-400 rounded-full mt-1"></span>
            <div>
              <p className="font-semibold">Freelance UX/UI Designer</p>
              <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
