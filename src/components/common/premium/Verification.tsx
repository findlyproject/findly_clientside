
"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { features, verification } from "@/lib/store/features/actions/subscriptionActions";
import { useRouter } from "next/navigation";

const SubscribedPlanDetails: React.FC = () => {
    const router=useRouter()
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const dispatch = useAppDispatch();
  const allFeatures = useAppSelector((state) => state.payment.subscription);

  console.log("Subscription Details:", allFeatures);

  useEffect(() => {
    if (sessionId) {
      dispatch(features(sessionId));
    }  
  }, [dispatch, sessionId]);

  const handleContinue = async() => {
    if(sessionId){
       const result= await dispatch(verification(sessionId))
       console.log("a",result);
       if(result.type==="verification/fulfilled"){
        console.log("resultproiiii",result);
        if(allFeatures?.userId){
          router.push("/ownprofile")
        }else if(allFeatures?.companyId){
          router.push("/profile")
        }
       
       }
       
    } 
    
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Your Subscription Plan Details
      </h2>

      {allFeatures ? (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">{allFeatures.plan}</h3>
          <p className="text-2xl text-indigo-600 font-semibold mb-4">
            ${allFeatures.price}
          </p>
          <h4 className="font-medium text-lg mb-2">Features Included:</h4>
          <ul className="list-disc pl-6 text-gray-600">
            {Array.isArray(allFeatures.features) && allFeatures.features.length > 0 ? (
              allFeatures.features[0]
                .split(",") 
                .map((feature: string, index: number) => (
                  <li key={index} className="mb-1">{feature.trim()}</li> 
                ))
            ) : (
              <li>No features available</li>
            )}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500">No subscription found.</p>
      )}

      <div className="text-center">
        <button
          onClick={handleContinue}
          className="py-2 px-6 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SubscribedPlanDetails;
