import React from "react";
import { MdVerifiedUser } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function SubscriptionDetail() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-start py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        Subscription Details
      </h1>
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-lg w-full">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-4 md:space-y-0">
          <div>
            <MdVerifiedUser className="text-green-700 w-12 h-12 md:w-14 md:h-14" />
          </div>
          <div className="flex flex-col space-y-2 text-center md:text-left">
            <p className="text-gray-700 text-sm md:text-base">
              Unlock More Opportunities: gain exclusive access to premium job
              listings and advanced networking features!
            </p>
          </div>
        </div>
        <div className="flex justify-center md:justify-end mt-6">
          <button
            onClick={() => router.push(`/premium`)}
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-md flex items-center space-x-2 transition duration-300 ease-in-out"
          >
            <span>Upgrade now</span>
            <BsStars className="text-white text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}
