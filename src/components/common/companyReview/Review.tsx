
"use client"
import { useState } from "react";
import { Star } from "lucide-react";

export default function ReviewSection() {
  const [rating, setRating] = useState(0);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      {/* Rating Summary */}
      <div className="flex gap-6">
        <div className="p-6 bg-gray-100 rounded-lg w-1/2">
          <h3 className="text-lg font-semibold">Average Rating</h3>
          <p className="text-3xl font-bold flex items-center gap-2">
            4.5 <span className="flex text-yellow-500">⭐⭐⭐⭐⭐</span>
          </p>
          <div className="mt-2 space-y-1">
            {[5, 4, 3, 2, 1].map((star, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>{star}</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-2 bg-green-700" style={{ width: `${90 - star * 10}%` }}></div>
                </div>
                <span>{90 - star * 10}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Review Form */}
        <div className="p-6 bg-gray-100 rounded-lg w-1/2">
          <h3 className="text-lg font-semibold">Submit Your Review</h3>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`cursor-pointer ${rating >= star ? "text-yellow-500" : "text-gray-400"}`}
                onClick={() => setRating(star)}
                size={24}
              />
            ))}
          </div>
          <input type="text" placeholder="Name" className="mt-3 w-full p-2 border rounded" />
          <input type="email" placeholder="Email" className="mt-3 w-full p-2 border rounded" />
          <textarea placeholder="Write your review..." className="mt-3 w-full p-2 border rounded"></textarea>
          <button className="mt-3 w-full bg-green-700 text-white py-2 rounded">Submit Review</button>
        </div>
      </div>

      {/* Customer Feedback */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Customer Feedbacks</h3>
        <div className="mt-3 p-4 bg-gray-100 rounded-lg">
          <p className="font-semibold">Robert Karmazov</p>
          <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
          <p className="text-sm text-gray-600">20 days ago</p>
          <p className="mt-2 text-gray-800">
            I recently had the opportunity to explore Pagedone's UI design system, and it left a lasting impression on my workflow.
          </p>
        </div>
      </div>
    </div>
  );
}
