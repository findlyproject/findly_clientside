"use client";
import React, { useState } from "react";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

const RateUs: React.FC = () => {
  const router=useRouter()
  const [rating, setRating] = useState<number | null>(0);
  console.log("rating",rating);
  

  const [message, setMessage] = useState("");
  console.log("message",message);
  const handleSubmit = async () => {
    console.log("Submitting review:", { rating, message }); 
    if(!rating||!message){
      alert('fill the blanks')
    }
  
    try {
      const response = await api.post(`/api/rating/createreview`, {review:message, starsRating:rating });
      console.log("Response rating:", response.data);
      
      setMessage("");  
      setRating(null);
    } catch (error) {
      console.error("Error submitting review");
    }
  };
  

  return (
    <div className="shadow-md border my-10 mx-96 w-2/4 h-1/2 rounded-lg">
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-black">
        Give us your{" "}
        <span className="bg-purple-600 text-white px-2 py-1 rounded-lg">
          feedback
        </span>
      </h1>
      <p className="text-gray-600 text-center mt-4 max-w-lg">
        We value your opinion! Share your feedback to help us improve and serve you better.
      </p>

      {/* Star Rating Section */}
      <div className="mt-6">
        <label className="text-gray-700 font-medium">Rate our website</label>
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-7 h-7 cursor-pointer transition-all duration-200 ${
                star <= (rating ?? 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star === rating ? null : star)}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="mt-6 w-full max-w-md">
        <label className="text-gray-700 font-medium">Message</label>
        <textarea
          className="w-full mt-2 p-3 border rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
          rows={5}
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          className="border border-purple-600 text-purple-600 px-6 py-2 rounded-full hover:bg-purple-100 transition-all"
          onClick={() =>router.push(`/home`) }
        >
          Back
        </button>
        <button
          className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-all"
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
