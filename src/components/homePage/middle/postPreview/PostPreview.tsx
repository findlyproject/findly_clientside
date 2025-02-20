"use client";

import { useEffect, useState } from "react";
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
import { IPost, setLikes } from "@/lib/store/features/postSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Comments } from "./Comment";
import { PostMenu } from "./PostMenu";
import api from "@/utils/api";
import { fetchAllPosts } from "@/lib/store/features/actions/postActions";
interface PostPreviewProps {
  post: IPost;
  
}
// type Post = {
//   _id: string;
//   likedBy: { _id: string }[]; // Ensure it's an array of objects, not strings
// };


interface LikedUser {
  _id: string;
  profileImage: string;
  firstName: string;
  lastName: string;
}

interface Post {
  likedBy: LikedUser[];
}

export const PostPreview = ({ post }: PostPreviewProps) => {
  console.log("post post...", post);
  const [localPost, setLocalPost] = useState(post);


 
  
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowLikes, setIsShowLikes] = useState(false);
  const toggleLikes = () => setIsShowLikes((prev) => !prev);
  const [isShowComments, setIsShowComments] = useState(false);

  const currentUser = useAppSelector((state) => state.user.activeuser);
  console.log("currentUsercurrentUser", currentUser);
  const like = useAppSelector((state) => state.post.likes);
  console.log("like.....", like);
  console.log("localPost.likedBy", localPost.likedBy);
  console.log("currentUser._id", currentUser?._id);



 

  
  
  
  const handleLike = async (postId: string) => {
    console.log("Liking postId:", postId);

    const response = await api.post(`/post/user/likepost/${postId}`);
    console.log("Like response.........:", response);
    
     
    dispatch(setLikes(response.data.post));
    setLocalPost(response.data.post);
    dispatch(fetchAllPosts())
  };

  return (
    <section className="flex flex-col border border-gray-300 bg-white rounded-lg w-full max-w-3xl mx-auto p-4 shadow-md relative">
  <div className="bg-right-top top-2">
    <div
      className="cursor-pointer"
      onClick={() => setIsShowMenu(!isShowMenu)}
    >
      <FontAwesomeIcon
        icon={faEllipsisH}
        className="text-gray-500 hover:text-gray-700"
      />
    </div>
    {isShowMenu && <PostMenu post={post} />}
  </div>

  {/* Post Owner Details */}
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
        className="rounded-full object-cover w-12 h-12 sm:w-14 sm:h-14"
        alt={post.owner?.firstName || "User"}
        width={50}
        height={50}
      />
    </div>

    <div className="ml-3">
      <Link href={`/main/profile/${post.owner?._id}`} className="hover:underline">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          {post.owner?.firstName || "Unknown User"}
        </h3>
      </Link>
      <p className="text-sm sm:text-base text-gray-600">
        {post.owner?.email || "Unknown Profession"}
      </p>
      <div className="text-xs text-gray-500">
        {post.createdAt
          ? new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "No date available"}
      </div>
    </div>
  </section>

  {/* Post Content */}
  <div className="space-y-3 px-2">
    <h1 className="text-sm sm:text-base">{post.description}</h1>

    {/* Image Carousel */}
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
            <img
              src={image}
              alt={`Post image ${index + 1}`}
              className="w-full h-auto sm:max-h-96 rounded-md object-cover"
            />
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev !text-gray-700 !text-2xl !left-2"></div>
        <div className="swiper-button-next !text-gray-700 !text-2xl !right-2"></div>
      </Swiper>
    )}

    {/* Video */}
    {post.video && (
      <div className="flex justify-center">
        <video width="100%" className="rounded-md sm:max-h-96" controls>
          <source src={post.video} type="video/mp4" />
        </video>
      </div>
    )}
  </div>

  {/* Like & Comment Count */}
  <div className="flex items-center justify-between px-4 py-2 text-sm sm:text-base">
    <div className="text-gray-600 cursor-pointer" onClick={toggleLikes}>
      {localPost.likedBy ? localPost.likedBy.length : 0} Likes
    </div>
    <div className="text-gray-600">
      {post.comments?.length ?? 0} Comments
    </div>
  </div>

  {/* Like Button with Responsive Padding & Icon Size */}
  <section className="flex items-center justify-around border-t border-gray-200 pt-2">
    <button
      onClick={() => handleLike(localPost._id)}
      className="flex items-center text-gray-500 px-2 sm:px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black"
    >
      <FontAwesomeIcon icon={faThumbsUp} className="text-primary text-lg sm:text-xl" />
      <span className="ml-2">Like</span>
    </button>
  </section>
</section>

  );
};
