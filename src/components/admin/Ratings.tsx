"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

import { TiTickOutline } from "react-icons/ti";
import { adminApproveReviews, adminRemoveRating, findlyReviews } from '@/lib/store/features/actions/adminActions';
export const Ratings=()=> {
    const dispatch=useAppDispatch()
    const reviews=useAppSelector((state)=>state.admin.reviews)


const findReviews=async()=>{
  const result=await dispatch(findlyReviews())
console.log("result",result);

}
    useEffect(()=>{
         findReviews()
    },[])
    const handleRemove=async(ratingID:string)=>{

      const result=await dispatch(adminRemoveRating(ratingID))
      console.log("result",result);
      if(result.type==="remove/reviews/fulfilled"){
        findReviews()
      }


    }

    const handleAccept=async(id:string)=>{
     
      const result=await dispatch(adminApproveReviews(id))
      if(result.type==="approve/reviews/fulfilled"){
        findReviews()
      }

    }
  return (
    <div>
      {reviews.map((item) => {
        const rating = item.starsRating;
        const fullStars = Math.floor(rating);
        const halfStars = rating % 1 !== 0 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;

        return (
          <article
            key={item._id}
            className="mb-6 border-b border-gray-200 p-8 width-full max-w-4xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <img
                  className="w-10 h-10 me-4 rounded-full"
                  src={item.userId?.profileImage}
                  alt="profile image of user"
                />

                <div className="font-medium">
                  <p>
                    username
                    <time
                      dateTime="2014-08-16 19:00"
                      className="block text-sm text-gray-500 dark:text-gray-400"
                    >
                      Joined on{" "}
                      {new Date(item.userId?.createdAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </time>
                  </p>
                </div>
              </div>

              <div className="flex">
                <button
                  className="ps-4 text-sm font-semibold text-primary"
                  onClick={() => handleRemove(item._id)}
                >
                  ✕
                </button>

                <button
                  className="ps-4 text-xl  text-primary"
                  onClick={() => handleAccept(item._id)}
                >
                  {item.status == true ? <TiTick /> : <TiTickOutline />}
                </button>
              </div>
            </div>
            <p> {item.review}</p>

            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
              {[...Array(fullStars)].map((_, index) => (
                <IoMdStar
                  key={`full-${index}`}
                  className="text-yellow-500 text-xl"
                />
              ))}

              {halfStars === 1 && (
                <IoMdStarHalf key="half" className="text-yellow-500 text-xl" />
              )}

              {[...Array(emptyStars)].map((_, index) => (
                <IoMdStarOutline
                  key={`empty-${index}`}
                  className="text-yellow-500 text-xl"
                />
              ))}
            </div>
            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              <p>
                Reviewed in{" "}
                {new Date(item.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </footer>
          </article>
        );
      })}
    </div>
  );
};
