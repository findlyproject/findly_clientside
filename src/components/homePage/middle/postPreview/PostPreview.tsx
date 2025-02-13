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
      <div className=" bg-right-top top-2">
        <div
          className=" cursor-pointer"
          onClick={() => setIsShowMenu(!isShowMenu)}
        >
          <FontAwesomeIcon
            icon={faEllipsisH}
            className=" text-gray-500 hover:text-gray-700"
          />
        </div>{" "}
        {isShowMenu === true ? <PostMenu post={post} /> : null}
      </div>

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
          <Link
            href={`/main/profile/${post.owner?._id}`}
            className="hover:underline"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {post.owner?.firstName || "Unknown User"}
            </h3>
          </Link>
          <p className="text-sm text-gray-600">
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

      <div className="space-y-3 px-2">
        <h1 className="text-sm sm:text-base">{post.description}</h1>

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
                  className="w-full h-auto rounded-md"
                />
              </SwiperSlide>
            ))}

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

      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-gray-600 cursor-pointer" onClick={toggleLikes}>
          {localPost.likedBy ? localPost.likedBy.length : 0} Likes
        </div>
        <div className="flex items-center space-x-4 text-gray-600">
          <span>{post.comments?.length ?? 0} Comments</span>
        </div>
      </div>

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

          </div>
        </div>
      )}

      <section className="space-y-2">
        <section className="flex items-center justify-around border-t border-gray-200 pt-2">
          {Array.isArray(localPost.likedBy) &&
          localPost.likedBy.find((item) => {
            console.log("item...", item);

            // return item === currentUser?._id;
            return typeof item === "string" && item == currentUser?._id;

          }) ? (
            <div>
              <button
                onClick={() => handleLike(localPost._id)}
                className="flex items-center text-gray-500 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-primary"
                >
                  <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                </svg>
                <span className="hidden sm:inline">Dislike</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleLike(localPost._id)}
              className="flex items-center text-gray-500 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>
              <span className="hidden sm:inline">Like</span>
            </button>
          )}

         











         <button
            className="flex items-center text-gray-500 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black"
            onClick={() => setIsShowComments((prev) => !prev)}
          >
            <FontAwesomeIcon
              icon={faComment}
              className="w-5 h-5 mr-2 text-primary"
            />
            <span className="hidden sm:inline">Comment</span>
          </button>
          <button className="flex items-center text-gray-500 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black">
            <FontAwesomeIcon
              icon={faShare}
              className="w-5 h-5 mr-2 text-primary"
            />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            className="flex items-center text-gray-500 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black"
            onClick={() => router.push(`/main/message/${post.owner?._id}`)}
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="w-5 h-5 mr-2 text-primary"
            />
            <span className="hidden sm:inline">Send</span>
          </button>
        </section>

        {isShowComments && post && post.comments && (
          <Comments postId={post._id} comments={post.comments} />
        )}

        {/* Likes Modal */}
        {isShowLikes && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50"
            onClick={toggleLikes}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm md:max-w-md w-full overflow-hidden"
              onClick={(ev) => ev.stopPropagation()}
            >
              <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center">
                Liked by
              </h2>

              <div className="max-h-60 overflow-y-auto space-y-4 z-50 ">
                {Array.isArray(post.likedBy) && post.likedBy.length > 0 ? (
                  post.likedBy.map((item) => (
                    
                    <div
                      key={item._id}
                      className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg"
                    >
                      <img
                        src={item.profileImage}
                        alt={item.firstName}
                        className="w-12 h-12 rounded-full border border-gray-300 object-cover"
                      />
                      <p className="text-gray-700 font-medium">
                        {item.firstName} {item.lastName}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    <h1>No likes yet</h1>
                  </div>
                )}
              </div>

              <button
                className="w-full mt-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300"
                onClick={toggleLikes}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </section>
  );
};
