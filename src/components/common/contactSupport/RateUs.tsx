"use client";
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

import { RateFindly } from "@/lib/store/features/actions/userActions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { toast } from "react-toastify";

const RateUs: React.FC = () => {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [rating, setRating] = useState<number | null>(0);
  const [message, setMessage] = useState("");
  
const activeuser=useAppSelector((state)=>state.user.activeuser)
   const route=activeuser?"user":"company"
const activeCompany = useAppSelector((state) => state.companyLogin.activeCompany)

useEffect(() => {
  if (!activeCompany && !activeuser) {
    toast.error("Login first to get access");
    setTimeout(() => {
      router.push("/");
    }, 8000); // Delay navigation by 2 seconds
  }
}, [activeCompany, activeuser,router]);


// If not authorized, return `null` (or a loader)
if (!activeCompany && !activeuser) return null;


  const handleSubmit = async () => {
    if (rating === null || message.trim() === "") {
      toast.warn("Fill in all fields before submitting.");
      return;
    }

    const resultAction = await dispatch(
      RateFindly({ review: message, starsRating: rating as number })
    );

    if (RateFindly.fulfilled.match(resultAction)) {
      setMessage("");
      setRating(null);
      setSelectedStars([]);
      toast.success("Review submitted successfully!");
    } else {
      toast.warn("Failed to submit review.");
    }
  };
  const [selectedStars, setSelectedStars] = useState<number[]>([]); 

  const handleStarClick = (star: number) => {
    setRating(star === rating ? null : star);
    if (selectedStars.includes(star)) {
      
      setSelectedStars(selectedStars.filter((s) => s !== star));
    } else {
     
      setSelectedStars([...selectedStars, star]);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-black">
          Give us your{" "}
          <span className="bg-primary text-white px-2 py-1 rounded-lg">
            feedback
          </span>
        </h1>
        <p className="text-gray-600 text-center mt-3">
          We value your opinion! Share your feedback to help us improve.
        </p>

       
        <div className="mt-6 text-center">
          <label className="text-gray-700 font-medium text-lg">
            Rate our website
          </label>
          <div className="flex justify-center gap-2 mt-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-7 h-7 cursor-pointer transition-all duration-200 ${
                  selectedStars.includes(star)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => handleStarClick(star)}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              />
            ))}
          </div>
        </div>

       
        <div className="mt-6">
          <label className="text-gray-700 font-medium text-lg">Message</label>
          <textarea
            className="w-full mt-2 p-3 border rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-primary outline-none resize-none"
            rows={5}
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

      
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <button
            className="w-full sm:w-auto border border-primary text-primary px-6 py-2 rounded-full hover:bg-purple-100 transition-all"
            onClick={() => router.push(`/${route}/home`)}
          >
            Back
          </button>
          <button
            className="w-full sm:w-auto bg-primary text-white px-6 py-2 rounded-full hover:bg-primary transition-all"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateUs;
