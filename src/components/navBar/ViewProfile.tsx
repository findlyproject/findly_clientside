import React from "react";
import { Eye, BarChart, Search } from "lucide-react";

const ViewProfile: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Overview</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-md ">
          <h3 className="text-lg font-semibold">ABOUT</h3>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt arcu vel arcu fermentum, eget tincidunt ipsum posuere.
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
          <img src="https://via.placeholder.com/80" alt="User" className="rounded-full" />
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

      <div className="max-w-xl mx-auto p-4">
        <div className="p-4 shadow-lg rounded-2xl border">
          <h2 className="text-lg font-semibold">Analytics</h2>
          <p className="text-sm text-gray-500">🔒 Private to you</p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-lg font-bold">48</p>
                <p className="text-sm text-gray-500">Profile views</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-lg font-bold">0</p>
                <p className="text-sm text-gray-500">Post impressions</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-lg font-bold">2</p>
                <p className="text-sm text-gray-500">Search appearances</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 text-blue-600 text-sm font-semibold hover:underline">
            Show all analytics →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
