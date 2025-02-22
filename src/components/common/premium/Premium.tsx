"use client"
import React, { useState } from "react";
import { subscription } from "@/lib/store/features/actions/subscriptionActions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
interface Plan {
  id: number;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
  bgColor: string;
}

const plans: Plan[] = [
  {
    id: 1,
    name: "one month",
    price: 299,
    features: [
      "Verified Account",
      "You can create community",
      "You can Message to company",
      "Better job recommendations ",
      "Profile Insights"
    ],
    bgColor: "bg-gray-50 hover:bg-gray-100",
  },
  {
    id: 2,
    name: "six month",
    price: 1699,
    features: [
      "Verified Account",
      "You can create community",
      "You can Message to company",
      "Better job recommendations ",
      "Profile Insights"
    ],
    popular: true,
    bgColor: "bg-indigo-50 hover:bg-indigo-100",
  },
  {
    id: 3,
    name: "one year",
    price: 3499,
    features: [
      "Verified Account",
      "You can create community",
      "You can Message to company",
      "Better job recommendations ",
      "Profile Insights"
    ],
    bgColor: "bg-gray-50 hover:bg-gray-100",
  },
];






const PricingPlans: React.FC = () => {
  const router=useRouter()
  const [isYearly, setIsYearly] = useState(false);
  const dispatch=useAppDispatch()
const activeCompany=useAppSelector((state)=>state.companyLogin.activeCompany)
const route=activeCompany?"company":"user"
  const purchasePlan = async (plan: Plan) => {


   console.log("activeCompany",activeCompany);
   console.log("routepreee",route);
   
     const resultAction = await dispatch(subscription({plan,route}));
     console.log("resultAction",resultAction)
     if(resultAction.type==="subscription/fulfilled"){
      router.push(`/${route}/premium/payment`)
     }
  };
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Choose your plan</h2>
          
        </div>

             <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-8 lg:space-y-0 lg:items-center">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col mx-auto max-w-sm text-gray-900 rounded-2xl p-6 xl:py-9 xl:px-12 transition duration-500 ${plan.bgColor}`}>
                
        
              {plan.popular && (
                <div className="uppercase bg-gradient-to-r from-indigo-600 to-violet-600 rounded-t-2xl p-3 text-center text-white">
                  MOST POPULAR
                </div>
              )}

        
              <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
              <div className="flex items-center mb-6">
                <span className="mr-2 text-6xl font-semibold text-primary">
                  ${isYearly ? plan.price * 10 : plan.price}
                </span>
                <span className="text-xl text-gray-500">/ {isYearly ? "year" : "month"}</span>
              </div>

             
              <ul className="mb-12 space-y-6 text-left text-lg text-gray-500">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-4">
                   
                    <svg
                      className="w-6 h-6 text-primary"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

       
              <a
              onClick={()=>purchasePlan(plan)}
                href="#"
                className="py-2.5 px-5 bg-primary shadow-sm rounded-full transition duration-500 text-base text-white font-semibold text-center w-fit mx-auto hover:bg-indigo-700"
              >
                Purchase Plan
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
