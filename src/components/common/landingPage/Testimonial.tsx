/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { setAllRatings } from "@/lib/store/features/ratingSlice";
import { useAppSelector } from "@/lib/store/hooks";
import api from "@/utils/api";
// import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
// import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const AnimatedTestimonials = () => {
  // const [active, setActive] = useState(0);
  const testimonials = useAppSelector((state) => state.rating.ratings);
  console.log(testimonials);
  const [expandedId, setExpandedId] = useState("");
  const MAX_LENGTH = 100;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRatings = async () => {
      const response = await api.get(`/rating/findallreviews`);
      if (response.status === 200) {
        dispatch(setAllRatings(response.data.allratings));
      }
    };
    fetchRatings();
  }, []);

  return (
    <section id="testimonies" className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
        <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
          <div className="mb-12 space-y-5 md:mb-16 md:text-center">
            <div className="inline-block px-3 py-1 text-sm font-semibold text-purple-800 rounded-lg md:text-center text-cn bg-purple-100 hover:cursor-pointer hover:bg-purple-200">
              Words from Others
            </div>
            <h1 className="mb-5 text-3xl font-semibold text-gray-800 md:text-center md:text-5xl">
              It&apos;s not just us.
            </h1>
            <p className="text-xl text-gray-600 md:text-center md:text-2xl">
              Here&apos;s what others have to say about us.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.slice(0, 9).map((testimonial, index) => (
            <div key={index} className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-rduration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                {/* from-purple-500 to-indigo-500 blur  */}
                {/* <a href="https://twitter.com/kanyewest" className="cursor-pointer"> */}
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white shadow-md ring-1 ring-gray-200">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={
                        testimonial.userId?.profileImage ||
                        "https://res.cloudinary.com/dq1auwpkm/image/upload/v1738735360/profile_jtwxaj.png"
                      }
                      width={200}
                      height={200}
                      className="w-12 h-12 bg-center bg-cover border rounded-full shadow-sm"
                      alt="Profile"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {testimonial.userId?.firstName}{" "}
                        {testimonial.userId?.lastName}
                      </h3>
                      <p className="text-gray-500 text-md">
                        {testimonial?.email}
                      </p>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center mt-2 w-full justify-between">
                    <div className="flex">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const rating = testimonial.starsRating || 0;

                          return (
                            <svg
                              key={star}
                              className={`w-5 h-5 ${
                                star <= rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          );
                        })}
                      </div>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      {testimonial.starsRating || 5}.0
                    </span>
                  </div>

                  <p className="leading-normal text-gray-600 text-md">
                    {expandedId === testimonial._id
                      ? testimonial.review
                      : `${testimonial.review?.slice(0, MAX_LENGTH)} `}

                    {testimonial.review &&
                      testimonial.review.length > MAX_LENGTH && (
                        <span
                          className="text-blue-600 font-semibold cursor-pointer"
                          onClick={() =>
                            setExpandedId(
                              expandedId === testimonial._id
                                ? ""
                                : testimonial._id
                            )
                          }
                        >
                          {expandedId === testimonial._id
                            ? " Show less"
                            : " ...Read more"}
                        </span>
                      )}
                  </p>
                </div>
                {/* </a> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
