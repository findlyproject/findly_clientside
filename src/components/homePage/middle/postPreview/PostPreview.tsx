"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faThumbsUp,
  faComment,
  faShare,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IPost } from "@/lib/store/features/postSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

interface PostPreviewProps {
  post: IPost;
}

// ✅ PostPreview Component (Fully Responsive)
export const PostPreview = ({ post }: PostPreviewProps) => {
  const router = useRouter();
  const [isShowLikes, setIsShowLikes] = useState(false);
  const toggleLikes = () => setIsShowLikes((prev) => !prev);

  return (
    <section className="flex flex-col border border-gray-300 bg-white rounded-lg w-full max-w-3xl mx-auto p-4 shadow-md relative">
      {/* Menu Icon */}
      <div className="absolute top-2 right-2 cursor-pointer">
        <FontAwesomeIcon icon={faEllipsisH} className="text-gray-500 hover:text-gray-700" />
      </div>

      {/* User & Post Details */}
      <section className="flex items-center p-4">
        <div
          className="cursor-pointer"
          onClick={() => router.push(`/main/profile/${post.owner?._id}`)}
        >
          <Image
            src={
              post.owner?.profileImage ||
              "https://res.cloudinary.com/dq1auwpkm/image/upload/v1738735360/profile_jtwxaj.png"
            }
            className="rounded-full object-cover"
            alt={post.owner?.firstName || "User"}
            width={50}
            height={50}
          />
        </div>

        <div className="ml-3">
          <Link href={`/main/profile/${post.owner?._id}`} className="hover:underline">
            <h3 className="text-lg font-semibold text-gray-900">
              {post.owner?.firstName || "Unknown User"}
            </h3>
          </Link>
          <p className="text-sm text-gray-600">{post.owner?.email || "Unknown Profession"}</p>
          <div className="text-xs text-gray-500">{new Date(post.createdAt).toDateString()}</div>
        </div>
      </section>

      {/* Post Content */}
      <div className="space-y-3 px-2">
        <h1 className="text-sm sm:text-base">{post.description}</h1>

        {/* Image Slider (if images exist) */}
        {post.images && post.images.length > 0 && (
          <Swiper
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation]}
            className="rounded-md"
          >
            {post.images.map((image, index) => (
              <SwiperSlide key={index} className="bg-black flex justify-center">
                <img src={image} alt={`Post image ${index + 1}`} className="w-full h-auto rounded-md" />
              </SwiperSlide>
            ))}
            {/* Custom Swiper Buttons */}
            <div className="swiper-button-prev !text-gray-700 !text-2xl !left-2"></div>
            <div className="swiper-button-next !text-gray-700 !text-2xl !right-2"></div>
          </Swiper>
        )}

        {post.video && (
          <div className="flex justify-center">
            <video width="100%" height="300" controls className="rounded-md">
              <source src={post.video} type="video/mp4" />
            </video>
          </div>
        )}
      </div>

      {/* Social Stats */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-gray-600 cursor-pointer" onClick={toggleLikes}>
          {post.likedBy?.length ?? 0} Likes
        </div>
        <div className="flex items-center space-x-4 text-gray-600">
          <span>{post.comments?.length ?? 0} Comments</span>
        </div>
      </div>

      {/* Likes Modal */}
      {isShowLikes && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={toggleLikes}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            onClick={(ev) => ev.stopPropagation()}
          >
            <h2 className="text-lg font-semibold">Liked by</h2>
            <p className="text-gray-500">Feature coming soon...</p>
          </div>
        </div>
      )}

      {/* Post Actions */}
      <hr className="my-2 border-gray-200" />
      <section className="flex items-center justify-around mb-2">
        <button className="flex items-center text-gray-500 px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">
          <FontAwesomeIcon icon={faThumbsUp} className="w-5 h-5 mr-2 text-primary" />
          <span className="hidden sm:inline">Like</span>
        </button>
        <button className="flex items-center text-gray-500 px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">
          <FontAwesomeIcon icon={faComment} className="w-5 h-5 mr-2 text-primary" />
          <span className="hidden sm:inline">Comment</span>
        </button>
        <button className="flex items-center text-gray-500 px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">
          <FontAwesomeIcon icon={faShare} className="w-5 h-5 mr-2 text-primary" />
          <span className="hidden sm:inline">Share</span>
        </button>
        <button
          className="flex items-center text-gray-500 px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black"
          onClick={() => router.push(`/main/message/${post.owner?._id}`)}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5 mr-2 text-primary" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </section>
    </section>
  );
};
