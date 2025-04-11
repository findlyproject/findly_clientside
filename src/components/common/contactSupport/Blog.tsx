import React from "react";
import { User, Tag, Heart } from "lucide-react";
import Image from "next/image";

export default function Blog() {
  return (
    <div className="w-full min-h-screen pt-20 flex flex-col items-center justify-center py-10 bg-gray-100">
      {/* Header */}
      <span className="text-md md:text-lg font-bold text-primary flex items-center gap-1">
        <Heart size={20} /> Career Insights
      </span>
      <h2 className="text-4xl sm:text-5xl md:text-7xl text-center chelsea-market-regular font-bold text-primary md:mb-16 mb-10">
        Job Search Tips
      </h2>

      <div className="px-4 md:px-[2rem] xl:px-[6rem] flex flex-col lg:flex-row gap-10">
        {/* Column 1 */}
        <div className="lg:w-[80%] xl:w-[60%]">
          {/* Blog Image */}
          <Image
            className="w-full object-cover h-[12rem] md:h-[18rem] aspect-square rounded-lg"
            src="/assets/aboutimage1.jpg"
            alt="career blog image"
            width={30}
            height={30}
          />

          <div className="flex flex-col px-6 py-8 border-l border-r border-b bg-white rounded-lg">
            {/* Author & Category */}
            <div className="flex gap-4 text-sm text-gray-700 font-semibold">
              <span className="flex gap-1 items-center">
                <User size={18} /> By CareerCoach
              </span>
              <span className="flex gap-1 items-center">
                <Tag size={18} /> Job Search
              </span>
            </div>
            {/* Blog Title */}
            <h3 className="text-2xl md:text-3xl font-semibold text-teal-900 chelsea-market-regular">
              How to Build a Winning Resume
            </h3>
            {/* Blog Description */}
            <p className="text-md text-gray-500">
              Discover the secrets to crafting a resume that stands out.
              Learn expert tips on formatting, keywords, and structuring your
              experience for maximum impact.
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="w-full flex flex-col items-stretch justify-center">
          {/* Blog List Items */}
          {[
            {
              date: "13",
              month: "March",
              title: "Mastering Job Interviews: Tips & Tricks",
              description:
                "Ace your next job interview with these expert tips. Learn how to answer tough questions with confidence.",
              bgColor: "bg-yellow-500",
            },
            {
              date: "22",
              month: "March",
              title: "LinkedIn Optimization for Job Seekers",
              description:
                "Unlock LinkedIn’s full potential to attract recruiters and build your professional network.",
              bgColor: "bg-teal-500",
            },
            {
              date: "05",
              month: "April",
              title: "The Future of Remote Work: How to Prepare",
              description:
                "Explore trends in remote work and discover strategies to thrive in a digital-first workplace.",
              bgColor: "bg-red-500",
            },
          ].map((post, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-6 pb-6 border-b-2 border-gray-100 bg-white p-4 rounded-lg"
            >
              {/* Blog Date */}
              <div className={`px-6 py-2 ${post.bgColor} text-white flex flex-col items-center justify-center rounded-lg`}>
                <span className="text-7xl font-semibold">{post.date}</span>
                <span className="font-semibold">{post.month}</span>
              </div>
              {/* Blog Content */}
              <div className="flex flex-col justify-between">
                {/* Author & Category */}
                <div className="flex md:gap-4 gap-2 text-sm text-gray-700 font-semibold">
                  <span className="flex gap-1 items-center">
                    <User size={18} /> By CareerCoach
                  </span>
                  <span className="flex gap-1 items-center">
                    <Tag size={18} /> Career Growth
                  </span>
                </div>
                {/* Blog Title */}
                <h3 className="text-2xl md:text-3xl font-semibold text-teal-900 capitalize chelsea-market-regular">
                  {post.title}
                </h3>
                {/* Blog Description */}
                <p className="text-md text-gray-500">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
