"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { setLikes, setSaved } from "@/lib/store/features/postSlice";
import { IPost, User } from "@/types/Types";
import "swiper/css";
import "swiper/css/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Comments } from "./Comment";
import { PostMenu } from "./PostMenu";
import api from "@/utils/api";
import OutsideClickHandler from "react-outside-click-handler";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ShareMenu from "@/components/common/ShareMenu";
import PostView from "./PostView";

interface PostPreviewProps {
  post: IPost;
}

export const PostPreview = ({ post }: PostPreviewProps) => {
  console.log(post)
  const [localPost, setLocalPost] = useState(post);
  const [isShareMenuVisible, setShareMenuVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowLikes, setIsShowLikes] = useState(false);
  const toggleLikes = () => setIsShowLikes((prev) => !prev);
  const [isShowComments, setIsShowComments] = useState(false);
  const saved = useAppSelector((state) => state.post.saved);
const[singlePost,setSinglePost]=useState(false)
  const currentUser = useAppSelector((state) => state.user.activeuser);
  const route = currentUser ? "user" : "company";
  const activeCompany = useAppSelector(
    (state) => state.companyLogin.activeCompany
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 50;
  const [slideIndex, setSlideIndex] = useState(0);
  const handleLike = async (postId: string) => {
    const response = await api.post(`/${route}/likepost/${postId}`);

    dispatch(setLikes(response.data.post));
    setLocalPost(response.data.post);
  };
  const routes = currentUser ? "user" : "company";

  const handleNextSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === post?.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handleSave = async (postId: string) => {
    const response = await api.post(`/${route}/save/${postId}`);
    console.log("response of saving a post", response);
    const res = await api.get(`/${route}/saveds`);
    dispatch(setSaved(res.data.saved));
  };

  useEffect(() => {
    const savedStatus =
      Array.isArray(saved) && saved.some((item) => item.postId?._id === post?._id);
    setIsSaved(savedStatus);
  }, [saved, post]);
  return (
    <>
    <section className="flex flex-col border border-gray-300 bg-white rounded-lg mx-auto p-4 shadow-md relative" > 
      {/* Post Owner Details */}
      <section className="flex justify-between ">
      <div className="flex items-center mb-3">
  {/* Profile Image Clickable */}
  <div
    className="cursor-pointer"
    onClick={() => router.push(`/main/profile/${post.owner?._id}`)}
  >
    <Image
      src={
        post.owner && typeof post.owner === "object" && post.owner.type === "Company"
          ? post.owner.logo || "https://via.placeholder.com/35" // Default if no logo
          : (post.owner as User)?.profileImage ||
            "https://res.cloudinary.com/dq1auwpkm/image/upload/v1738735360/profile_jtwxaj.png"
      }
      className="rounded-full size-8 object-cover"
      alt={
        post.owner && typeof post.owner === "object"
          ? post.owner.type === "Company"
            ? post.owner.name || "Company"
            : (post.owner as User)?.firstName || "User"
          : "Unknown"
      }
      width={35}
      height={35}
    />
  </div>

  {/* Owner Info */}
  <div className="ml-3">
    <Link
      href={
        post.owner && typeof post.owner === "object" && post.owner._id === currentUser?._id
          ? `/${route}/profile`
          : `/${route}/${post.owner?._id}/${post.owner?.type}`
      }
      className="hover:underline"
    >
      <h3 className="text-lg font-semibold text-gray-900">
        {post.owner && typeof post.owner === "object"
          ? post.owner.type === "Company"
            ? post.owner.name || "Unknown Company" // Show Company Name
            : `${(post.owner as User)?.firstName || ""} ${(post.owner as User)?.lastName || ""}`.trim() || "Unknown User" // Show User Name
          : "Unknown Owner"}
      </h3>
    </Link>

    {/* Additional Info */}
    <div className="text-[10px] text-gray-500">
      <p className="text-xs text-gray-500">
        {post.owner && typeof post.owner === "object"
          ? post.owner._id === currentUser?._id
            ? "You"
            : post.owner.type === "Company"
            ? post.owner.IndustryType || "Company" // Show Industry for Company
            : (post.owner as User)?.jobTitle?.[0] || "Professional"
          : "Unknown"}{" "}
        • {dayjs(post.createdAt).fromNow()}
      </p>
    </div>
  </div>
</div>


        <div className="cursor-pointer" onClick={() => setIsShowMenu(true)}>
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
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
          <OutsideClickHandler onOutsideClick={() => setIsShowMenu(false)}>
            {isShowMenu && <PostMenu post={post} />}
          </OutsideClickHandler>
        </div>
      </section>

      {/* Post Content */}
      <div className="space-y-3 px-2">
        <p className="mt-2 text-gray-800 text-sm">
          {isExpanded
            ? post.description
            : `${post.description && post.description.slice(0, MAX_LENGTH)} `}
          {post.description && post.description.length > MAX_LENGTH && (
            <span
              className="text-blue-600 font-semibold cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? " Show less" : " ...Read more"}
            </span>
          )}
        </p>

        {post && post.images && post.images.length > 0 && (
          <div className="w-full relative">
            <div className="overflow-hidden relative">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${slideIndex * 100}%)` }}
              >
                {post.images.map((image, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0"
                    style={{ width: "100%" }}
                  >
                    <div
                      className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center"
                      onClick={handleNextSlide}
                    >
                      <Image
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              {post.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-1 rounded-full mx-1 ${
                    slideIndex === index ? "bg-primary" : "bg-gray-300"
                  }`}
                  onClick={() => setSlideIndex(index)}
                />
              ))}
            </div>
          </div>
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
      <div className="flex items-center justify-between px-4 py-2 text-sm">
        <div className="text-gray-600 cursor-pointer" onClick={toggleLikes}>
          {localPost.likedBy ? localPost.likedBy.length : 0} Likes
        </div>
        <div className="text-gray-600">
          {post.comments?.length ?? 0} Comments
        </div>
      </div>

      <section className="space-y-2">
        <section className="flex items-center text-sm justify-around border-t border-gray-200 pt-2">
          {Array.isArray(localPost.likedBy) &&
          localPost.likedBy.find((item) => {
            // return item === currentUser?._id;
            return (
              (typeof item === "string" && item == currentUser?._id) ||
              activeCompany?._id
            );
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
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>

                <span className="hidden sm:inline"></span>
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
                className="size-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>

              <span className="hidden sm:inline"></span>
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
          <button
            className="flex items-center text-gray-500 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black"
            onClick={() => handleSave(post._id)}
          >
            {isSaved ? (
              <>
                <FontAwesomeIcon
                  icon={solidBookmark}
                  className="w-5 h-5 mr-2 text-primary"
                />
                <span className="hidden sm:inline">Unsave</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={regularBookmark}
                  className="w-5 h-5 mr-2 text-primary"
                />
                <span className="hidden sm:inline">Save</span>
              </>
            )}
          </button>
          <button
            className="flex items-center text-gray-500 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black"
            onClick={() =>setShareMenuVisible((prev)=>!prev)}
          >
            <FontAwesomeIcon
              icon={faShare}
              className="w-5 h-5 mr-2 text-primary"
            />
            <span className="hidden sm:inline">Share</span>
          </button>
          
        </section>
        {isShareMenuVisible && (
      <OutsideClickHandler onOutsideClick={() => setShareMenuVisible(false)}>
        <div className="absolute right-0 bg-white shadow-lg rounded-lg pt-4 pl-4 w-[400px] h-[150px] z-50">
        <ShareMenu url={`http://localhost:3000/${routes}/post/${post._id}`} isShareMenuVisible={isShareMenuVisible} />
        </div>
      </OutsideClickHandler>
    )}
      </section>
     
      {isShowComments && post && post.comments && (
        <Comments postId={post._id} comments={post.comments} />
      )}
      
    </section>
    
    {isShowLikes && (
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4"
        onClick={toggleLikes}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg max-w-sm md:max-w-md w-full overflow-hidden"
          onClick={(ev) => ev.stopPropagation()}
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center">
            Liked by
          </h2>

          <div className="max-h-60 overflow-y-autospace-y-4">
          {Array.isArray(post.likedBy) && post.likedBy.length > 0 ? (
  post.likedBy.map((item, index) => {
    const isUser = item.type === "user"  // Check if it's a User
    const isCompany = item.type === "company"; // Check if it's a Company

    return (
      <div
        key={`${item._id}-${index}`}
        className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg"
      >
        <Image
          src={
            item.profileImage || item.logo || // Use profileImage for users, logo for companies
            "https://res.cloudinary.com/dq1auwpkm/image/upload/v1738735360/profile_jtwxaj.png"
          }
          alt={isUser ? item.firstName : item.name} // Use firstName for users, name for companies
          className="w-12 h-12 rounded-full border border-gray-300 object-cover"
          width={20}
          height={20}
        />
        <p className="text-gray-700 font-medium">
          {isUser
            ? `${item.firstName} ${item.lastName}` // Show full name for users
            : item.name} {/* Show company name for companies */}
        </p>
      </div>
    );
  })
) : (
  <div className="text-center text-gray-500">
    <h1>No likes yet</h1>
  </div>
)}

          </div>
        </div>
      </div>
     
    )}
    {singlePost&&
     <div
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <OutsideClickHandler onOutsideClick={()=>setSinglePost(false)}>
    <PostView postId={post._id}/>
    </OutsideClickHandler>
    </div>}
     </>
  );
};
