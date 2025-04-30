/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { FaCheckCircle } from "react-icons/fa";
import { Subscription } from "@/types/Types";
import { useAppSelector } from "@/lib/store/hooks";
import { format, addMonths } from 'date-fns';
import { Tooltip, Button } from '@mui/material';

export default function SubscriptionDetail(){
  const router = useRouter();
  const [details, setDetails] = useState<Subscription[]>([]);
  const activeCompany=useAppSelector((state)=>state.companyLogin.activeCompany)
  const activeUser=useAppSelector((state)=>state.user.activeuser)
  const route=activeCompany?"company":"user"
  useEffect(() => {
   
    if (activeCompany != null || activeUser != null) {
      detailsPlan();
    }
  }, [activeCompany, activeUser]);
  const detailsPlan = async () => {
    // Don't run if neither is logged in
    if (activeCompany == null && activeUser == null) return;
  
    const route = activeCompany ? "company" : "user";
    console.log(`Calling: /${route}/payment/subscriptiondetails`);
  
    try {
      const response = await api.get(`/${route}/payment/subscriptiondetails`);
      console.log("API response:", response);
      setDetails(response.data.subscription);
    } catch (error) {
      console.log("Error fetching subscription:", error);
    }
  };
const activePlan=details.find((data)=>data.isDeleted===false&&data.paymentStatus==="completed")




const getEndDate = (startDate: string | undefined, plan: string | undefined) => {
  if (!startDate || !plan) return "N/A";

  const parsedDate = new Date(startDate);
  if (isNaN(parsedDate.getTime())) return "Invalid date";

  let monthsToAdd = 0;

  switch (plan.toLowerCase()) {
    case "one month":
      monthsToAdd = 1;
      break;
    case "six month":
      monthsToAdd = 6;
      break;
    case "one year":
      monthsToAdd = 12;
      break;
    default:
      return "Unknown plan";
  }

  const endDate = addMonths(parsedDate, monthsToAdd);
  return format(endDate, 'MMMM d, yyyy');
};

const handleCancelPlan=async(sessionId:string)=>{
try {
  const response=await api.post(`/${route}/plancancellation/${sessionId}`)
  console.log("res",response);
  
    if(response.status===200){
      detailsPlan()
      router.push(`/${route}/premium`)
    }
  
} catch (error) {
  console.log("er",error);
  
}
    
}
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-start py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        Subscription Details
      </h1>
     {
      activePlan?.paymentStatus!=="completed"?(
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
            onClick={() => router.push(`/${route}/premium`)}
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-md flex items-center space-x-2 transition duration-300 ease-in-out"
          >
            <span>Upgrade now</span>
            <BsStars className="text-white text-lg" />
          </button>
        </div>
      </div>
      ):(
        <div className="bg-white flex justify-between items-start rounded-2xl shadow-lg p-6 md:p-8 max-w-lg w-full">
     
       <div>
       <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Active Plan</h2>
        <p className="text-gray-700 mb-2"><strong>Plan Name:</strong> {activePlan?.plan}</p>
        <p className="text-gray-700 mb-2"><strong>Price:</strong> {activePlan?.price}</p>
      
<p><strong>Validity:</strong> {getEndDate(activePlan?.startDate, activePlan?.plan)}</p>
        <p className="text-gray-700"><strong>Activated On:</strong> {activePlan?.startDate&&format(activePlan?.startDate, 'MMMM d, yyyy')}</p>
       </div>

 <Tooltip title="Upgrading to a new plan will cancel your existing plan. Continue with upgrade?" arrow 

 >
      <Button
      onClick={()=>handleCancelPlan(activePlan?.sessionId)}
      variant="contained" color="primary" className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg">
        Upgrade
      </Button>
    </Tooltip>
      </div>
      )
     }

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
    ${item?.active&&item.paymentStatus==="completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
  `}
>
  {item?.active&&item.paymentStatus==="completed" ? "Active" : "Inactive"}
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
