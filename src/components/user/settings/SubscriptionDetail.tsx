"use client";
import React, { useEffect, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { FaCheckCircle } from "react-icons/fa";
import { Subscription } from "@/types/Types";

export default function SubscriptionDetail(){
  const router = useRouter();
  const [details, setDetails] = useState<Subscription[]>([]);
  useEffect(() => {
    const details = async () => {
      const response = await api.get(`/payment/subscriptiondetails`);
      console.log("response of details of payment", response);
      setDetails(response.data.subscription);
    };
    details();
  }, []);
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
            onClick={() => router.push(`/user/premium`)}
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-md flex items-center space-x-2 transition duration-300 ease-in-out"
          >
            <span>Upgrade now</span>
            <BsStars className="text-white text-lg" />
          </button>
        </div>
      </div>

      <div>
      <h2 className="text-xl md:text-xl  mt-20 font-semibold mb-4">
                Subscription History
              </h2>
        {details.length > 0 ? 
        (
          
          details.map((item, index) => (
            <div key={index}>
             
              <ul className="space-y-4">
               
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No subscription details available</p>
        )}
      </div>

      <div>
        {details.length > 0 ? (
          details.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-lg border flex justify-between items-center"
            >
              <div className="flex justify-between space-x-6">
                <div>
                  <h3 className="text-lg font-semibold">{item.plan}</h3>
                  <p className="text-sm">Price: ₹{item.price}</p>
                  <p className="text-sm">
                    Start Date:{" "}
                    {new Date(item.startDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  <p className="text-sm">
                    End Date:{" "}
                    {new Date(item.endDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div>
                <span
  className={`inline-block text-xs px-2 py-1 rounded mt-1 font-medium
    ${item?.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
  `}
>
  {item?.active ? "Active" : "Inactive"}
</span>



                </div>
                
              </div>
              <hr></hr>
              {item.features.map((feature, i) => (
                
                  <li key={i} className="flex items-start space-x-3">
                    <FaCheckCircle className="text-primary mt-1 text-xl" />
                    <p className="text-gray-700">{feature}</p>
                  </li>
                ))}
            </div>
          ))
        ) : (
          <p className="text-gray-500"></p>
        )}
      </div>
    </div>
  );
}
