// "use client";
// import { setLikes, setSaved } from "@/lib/store/features/postSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import api from "@/utils/api";
// import React, { useState, useEffect } from "react";
// import { IPost, SavePost } from "@/types/Types";
// import { useSearchParams } from "next/navigation";
// import Image from "next/image";
// export const  Posts=()=> {
//   const searchParams = useSearchParams();
//   const name = searchParams.get("name");
//   console.log(name)
//   const [activeTab, setActiveTab] = useState(name);
//   const [posts, setPosts] = useState<SavePost[]>([]);
//   console.log("postscc",posts);

//   const [userPosts, setUserposts] = useState<SavePost[]>([]);
//   console.log("userPosts",userPosts);
//   const [userLiked, setUserLiked] = useState<SavePost[]>([]);

//   const [savedPosts, setsavedPosts] = useState<IPost[]>([]);
//   const save=useAppSelector(state=>state.post.saved)
//   const {activeuser}=useAppSelector(state=>state.user)
// const route =activeuser?"user":"company"
// const dispatch=useAppDispatch()

//   useEffect(() => {
//     const fetchuserPosts = async () => {
//       const response = await api.get(`${route}/posts`);
//       setUserposts(response.data.posts||[]);
//       const responsed=await api.get(`/${route}/saveds`)
// dispatch(setSaved(responsed.data.saved))
// const responses=await api.get(`/${route}/likes`)
// setUserLiked(responses.data.likedPosts)
//     };
//     fetchuserPosts();
//   }, [dispatch, route]);

// console.log("save,",save)

//   useEffect(() => {
//     if (activeTab === "saved") {
//       setPosts(save);
//     } else {
//       setPosts(userPosts);
//     }
//   }, [activeTab, save, savedPosts, userPosts]);

// const handleUnsave=async(postid:string)=>{
//         await api.post(`/${route}/save/${postid}`)
// setsavedPosts((pre)=>pre.filter((item)=>item._id!==postid))
// const response=await api.get(`/${route}/saveds`)
// dispatch(setSaved(response.data.saved))
// }

// const handleLike = async (postId: string) => {
//   const response = await api.post(`/${route}/likepost/${postId}`);
//   dispatch(setLikes(response.data.post));
//   const responses=await api.get(`/${route}/likes`)
//   setUserLiked(responses.data.likedPosts)
// };
// console.log(posts)
//   return (
//     <div className="min-h-screen bg-gray-100 pt-20">
//       <div className="max-w-3xl mx-auto mt-6 px-4">
//         {/* Tabs */}
//         <div className="flex justify-center space-x-4">
//           <button
//             className={`px-4 py-2 text-lg font-semibold  transition-all ${
//               activeTab === "saved"
//                 ? "border-b border-primary text-primary"
//                 : "border-b border-gray-700 text-gray-700 "
//             }`}
//             onClick={() => setActiveTab("saved")}
//           >
//             Saved
//           </button>
//           <button
//             className={`px-4 py-2 text-lg font-semibold  transition-all ${
//               activeTab === "posts"
//                 ? " border-b border-primary text-primary"
//                 : "border-b border-gray-700 text-gray-700 "
//             }`}
//             onClick={() => setActiveTab("posts")}
//           >
//             Your Posts
//           </button>
//           <button
//             className={`px-4 py-2 text-lg font-semibold  transition-all ${
//               activeTab === "liked"
//                 ? " border-b border-primary text-primary"
//                 : "border-b border-gray-700 text-gray-700 "
//             }`}
//             onClick={() => setActiveTab("liked")}
//           >
//             Liked
//           </button>
//         </div>

//         {/* Heading */}
//         <h1 className="text-2xl font-bold text-center mt-6">
//         {activeTab === "saved"
//   ? "Your Saved Posts"
//   : activeTab === "posts"
//     ? "Your Created Posts"
//     : "Your liked posts"}

//         </h1>

//         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//           {activeTab === "saved" ? (
//             save.length > 0 ? (
//               save.map((item) => (
// <div
//                   key={item?.postId._id}
//                   className="relative bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
//                 >
//                       <button  className =" absolute top-0 right-4 text-md" onClick={()=>handleUnsave(item.postId?._id)}>✕
//                       </button>
//                       <br></br>
//                       {item?.postId.images?.length ? (
//   <Image
//     src={item?.postId.images[0]}
//     alt="Post Image"
//     className="w-full h-40 object-cover rounded-md"  // ✅ Use className
//     width={30}
//     height={30}
//   />
// ) : item?.video ? (
//   <video
//     src={item.postId.video}
//     className="w-full h-[150px] rounded-lg"  // ✅ Use className
//     controls
//   />
// ) : null}

//                   <p className="text-gray-600 mt-2">
//                     {item?.postId.description}
//                   </p>

//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center col-span-2">
//                 No saved posts available
//               </p>
//             )
//           ) :activeTab === "posts" ? (
//             <>
//            {posts&&posts.filter((item) => !item.postId?.isDeleted).length > 0 ? (
//   <div>
//     <h2 className="text-lg font-semibold text-gray-800 mb-4">Active Posts</h2>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {posts
//         .filter((item) => !item.postId?.isDeleted)
//         .map((item) => (
//           <div
//             key={item._id}
//             className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
//           >
//             {item.images?.length > 0 ? (
//            <Image
//            src={item.images[0] || '/fallback-image.png'}
//            alt="Product Image"
//            width={500}
//            height={160}
//            className="w-full h-40 object-cover rounded-md"
//          />
//             ) : (
//               <video
//                 src={item?.video}
//                 className="w-full h-[150px] rounded-lg"
//                 controls
//               />
//             )}
//             <p className="text-gray-600 mt-2">{item.description}</p>
//           </div>
//         ))}
//     </div>
//   </div>
// ) : (
//   <p className="text-gray-500 text-center">No active posts available</p>
// )}
//           </>
//         ):(
//           <>
//           {posts.length > 0 ? (
//             userLiked.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
//               >
//                 <button  className =" flex justify-end right-0 top-0 text-black text-md" onClick={()=>handleLike(item._id)}>
//                   X
//                 </button>
//                   {item.images?.length > 0 ? (
//                     <Image
//                     src={item.images?.[0] || '/fallback-image.png'}
//                     alt="Product Image"
//                     width={500}
//                     height={160}
//                     className="w-full h-40 object-cover rounded-md"
//                   />
//                   ) : (
//                     <video
//                       src={item?.video}
//                       className="w-full h-[150px] rounded-lg"
//                       controls
//                     />
//                   )}
//                 <p className="text-gray-600 mt-2">{item.description}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center col-span-2">
//               No Liked posts available
//             </p>
//           )}
//           </>

//         )}
//         </div>
//       </div>

//     </div>
//   );
// }

"use client";
import { setLikes, setSaved } from "@/lib/store/features/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import api from "@/utils/api";
import React, { useState, useEffect } from "react";
import { Company, IPost, SavePost, User } from "@/types/Types"; //SavePost
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  DeletePost,
  fetchAllPosts,
} from "@/lib/store/features/actions/postActions";
import OutsideClickHandler from "react-outside-click-handler";
import { UpdatePost } from "./middle/UpdatePost";
export const Posts = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  console.log(name);
  const [activeTab, setActiveTab] = useState(name);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [saved, setSaveds] = useState<SavePost[]>([]);
  console.log("postscc", posts);

  const [expandedId, setExpandedId] = useState("");
  const MAX_LENGTH = 50;

  const [userPosts, setUserposts] = useState<IPost[]>([]);
  console.log("userPosts", userPosts);
  const [userLiked, setUserLiked] = useState<IPost[]>([]);

  const [savedPosts, setsavedPosts] = useState<SavePost[]>([]);
  const save = useAppSelector((state) => state.post.saved);
  const { activeuser } = useAppSelector((state) => state.user);
  const route = activeuser ? "user" : "company";
  const dispatch = useAppDispatch();

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleDropdown = (postId: string) => {
    setOpenDropdownId(openDropdownId === postId ? null : postId);
  };
  const [UpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  useEffect(() => {
    const fetchuserPosts = async () => {
      const response = await api.get(`${route}/posts`);
      setUserposts(response.data.posts || []);
      const responsed = await api.get(`/${route}/saveds`);
      dispatch(setSaved(responsed.data.saved));
      const responses = await api.get(`/${route}/likes`);
      setUserLiked(responses.data.likedPosts);
    };
    fetchuserPosts();
  }, [dispatch, route]);

  console.log("save,", save);

  useEffect(() => {
    if (activeTab === "saved") {
      setSaveds(save);
    } else {
      setPosts(userPosts);
    }
  }, [activeTab, save, savedPosts, userPosts]);

  const handleUnsave = async (postid: string) => {
    await api.post(`/${route}/save/${postid}`);
    setsavedPosts((pre) => pre.filter((item) => item._id !== postid));
    const response = await api.get(`/${route}/saveds`);
    dispatch(setSaved(response.data.saved));
  };

  const handleLike = async (postId: string) => {
    const response = await api.post(`/${route}/likepost/${postId}`);
    dispatch(setLikes(response.data.post));
    const responses = await api.get(`/${route}/likes`);
    setUserLiked(responses.data.likedPosts);
  };
  console.log("posts", posts);

  const isUser = (owner: unknown): owner is User => {
    return typeof owner === "object" && owner !== null && "firstName" in owner;
  };

  const isCompany = (owner: unknown): owner is Company => {
    return typeof owner === "object" && owner !== null && "name" in owner;
  };

  const deletePost = async (id: string) => {
    dispatch(DeletePost({ postId: id }));
    dispatch(fetchAllPosts(1));
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-3xl mx-auto mt-6 px-4">
        {/* Tabs */}
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 text-lg font-semibold  transition-all ${
              activeTab === "saved"
                ? "border-b border-primary text-primary"
                : "border-b border-gray-700 text-gray-700 "
            }`}
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </button>
          <button
            className={`px-4 py-2 text-lg font-semibold  transition-all ${
              activeTab === "posts"
                ? " border-b border-primary text-primary"
                : "border-b border-gray-700 text-gray-700 "
            }`}
            onClick={() => setActiveTab("posts")}
          >
            Your Posts
          </button>
          <button
            className={`px-4 py-2 text-lg font-semibold  transition-all ${
              activeTab === "liked"
                ? " border-b border-primary text-primary"
                : "border-b border-gray-700 text-gray-700 "
            }`}
            onClick={() => setActiveTab("liked")}
          >
            Liked
          </button>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mt-6">
          {activeTab === "saved"
            ? "Your Saved Posts"
            : activeTab === "posts"
            ? "Your Created Posts"
            : "Your liked posts"}
        </h1>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-24">
          {activeTab === "saved" ? (
            saved.length > 0 ? (
              saved.map((item) => (
                <div
                  key={item?.postId._id}
                  className="w-[400px] mx-auto bg-white rounded-lg shadow-md p-4 relative"
                >
                  <button
                    className="absolute top-2 right-4 text-lg text-gray-600 hover:text-red-500 z-10"
                    onClick={() => handleUnsave(item.postId?._id)}
                  >
                    ✕
                  </button>

                  {/* Header */}
                  <div className="flex items-center gap-3 p-4">
                    <Image
                      src={
                        isCompany(item.postId.owner)
                          ? item.postId.owner.logo || "/profile.jpg"
                          : isUser(item.postId.owner)
                          ? item.postId.owner.profileImage || "/profile.jpg"
                          : "/profile.jpg"
                      }
                      alt="profile"
                      className="w-12 h-12 rounded-full object-cover"
                      width={30}
                      height={30}
                    />
                    <div>
                      <h2 className="text-sm font-semibold">
                        {isCompany(item.postId.owner)
                          ? item.postId.owner.name
                          : isUser(item.postId.owner)
                          ? `${item.postId.owner.firstName} ${item.postId.owner.lastName}`
                          : "Unknown Owner"}{" "}
                        • <span className="text-xs text-gray-500">You</span>
                      </h2>
                      <p className="text-xs text-gray-500">
                        {isCompany(item.postId.owner)
                          ? item.postId.owner.IndustryType
                          : isUser(item.postId.owner)
                          ? item.postId.owner.jobTitle?.[0]
                          : "Unknown"}{" "}
                        •{" "}
                        {formatDistanceToNowStrict(
                          new Date(item.postId.createdAt),
                          {
                            addSuffix: true,
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <p className="leading-normal text-gray-600 text-md">
                    {expandedId === item.postId._id
                      ? item.postId.description
                      : `${item.postId.description.slice(0, MAX_LENGTH)} `}

                    {item.postId.description &&
                      item.postId.description.length > MAX_LENGTH && (
                        <span
                          className="text-blue-600 font-semibold cursor-pointer"
                          onClick={() =>
                            setExpandedId(
                              expandedId === item.postId._id
                                ? ""
                                : item.postId._id
                            )
                          }
                        >
                          {expandedId === item.postId._id
                            ? " Show less"
                            : " ...Read more"}
                        </span>
                      )}
                  </p>

                  {/* Media Container */}
                  <div className="mt-3 w-full h-[220px] rounded-md overflow-hidden">
                    {item?.postId.images?.length ? (
                      <Image
                        src={item?.postId.images[0]}
                        alt="post media"
                        className="w-full h-full object-cover"
                        width={220}
                        height={220}
                      />
                    ) : item?.postId.video ? (
                      <video
                        src={item.postId.video}
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-sm text-gray-400">
                        No media available
                      </div>
                    )}
                  </div>

                  {/* Likes & Comments */}
                  <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">
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
                      </span>
                      <span>{item.postId.likedBy?.length || 0}</span>
                    </div>
                    <span>{item.postId.comments?.length || 0} comment</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-2">
                No saved posts available
              </p>
            )
          ) : activeTab === "posts" ? (
            <>
              {posts && posts.filter((item) => !item.isDeleted).length > 0 ? (
                <>
                  {posts
                    .filter((item) => !item.isDeleted)
                    .map((item) => (
                      <div
                        key={item._id}
                        className=" w-[400px] mx-auto bg-white rounded-lg shadow-md p-4 relative"
                      >
                        <div className="flex items-center gap-3 p-4">
                          {item.owner && (
                            <Image
                              src={
                                isCompany(item.owner)
                                  ? item.owner.logo || "/profile.jpg"
                                  : isUser(item.owner)
                                  ? item.owner.profileImage || "/profile.jpg"
                                  : "/profile.jpg"
                              }
                              alt="Profile"
                              className="w-12 h-12 rounded-full border"
                              width={48}
                              height={48}
                            />
                          )}

                          <div>
                            <h2 className="text-sm font-semibold">
                              {isCompany(item.owner)
                                ? item.owner.name
                                : isUser(item.owner)
                                ? `${item.owner.firstName} ${item.owner.lastName}`
                                : "Unknown Owner"}{" "}
                              •{" "}
                              <span className="text-xs text-gray-500">You</span>
                            </h2>
                            <p className="text-xs text-gray-500">
                              {isCompany(item.owner)
                                ? item.owner.IndustryType
                                : isUser(item.owner)
                                ? item.owner.jobTitle?.[0]
                                : "Unknown"}{" "}
                              •{" "}
                              {formatDistanceToNowStrict(
                                new Date(item.createdAt),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </p>
                          </div>

                          <BiDotsVerticalRounded
                            onClick={() => toggleDropdown(item._id)}
                            className="absolute top-4 right-4 cursor-pointer"
                          />
                          {openDropdownId === item._id && (
                            <div className="bg-white text-sm rounded-lg shadow-lg p-2 absolute right-0 top-8 z-10">
                              <button
                                className="flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded-md transition"
                                onClick={() => {
                                  setSelectedPost(item);
                                  setIsUpdateOpen(true);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                  />
                                </svg>
                                <span>Update</span>
                              </button>

                              <button
                                className="flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded-md transition mt-2"
                                onClick={() => deletePost(item._id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>

                        <p className="leading-normal text-gray-600 text-md">
                          {expandedId === item._id
                            ? item.description
                            : `${item.description.slice(0, MAX_LENGTH)} `}

                          {item.description &&
                            item.description.length > MAX_LENGTH && (
                              <span
                                className="text-blue-600 font-semibold cursor-pointer"
                                onClick={() =>
                                  setExpandedId(
                                    expandedId === item._id ? "" : item._id
                                  )
                                }
                              >
                                {expandedId === item._id
                                  ? " Show less"
                                  : " ...Read more"}
                              </span>
                            )}
                        </p>

                        <div className="mt-3 ">
                          {item.images && item.images?.length > 0 ? (
                            <Image
                              src={item.images[0] || "/fallback-image.png"}
                              alt="company post"
                              className="w-full h-[220px] object-cover rounded-md "
                              width={220}
                              height={220}
                            />
                          ) : item.video ? (
                            <video
                              src={item.video}
                              className="w-full rounded-lg"
                              controls
                            />
                          ) : null}
                        </div>

                        <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-blue-500">
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
                            </span>
                            <span>{item.likedBy?.length || 0}</span>
                          </div>
                          <span>{item.comments?.length || 0} comment</span>
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <p className="text-gray-500 text-center">
                  No active posts available
                </p>
              )}
            </>
          ) : (
            <>
              {posts.length > 0 ? (
                userLiked.map((item) => (
                  <div
                    key={item._id}
                    className=" w-[400px] mx-auto bg-white rounded-lg shadow-md p-4 relative"
                  >
                    <button
                      className=" flex justify-end absolute right-4 top-2 text-black text-md"
                      onClick={() => handleLike(item._id)}
                    >
                      ✕
                    </button>

                    <div className="flex items-center gap-3 p-4">
                      <Image
                        src={
                          isCompany(item.owner)
                            ? item.owner.logo || "/profile.jpg"
                            : isUser(item.owner)
                            ? item.owner.profileImage || "/profile.jpg"
                            : "/profile.jpg"
                        }
                        alt="profile"
                        className="w-12 h-12 rounded-full object-cover"
                        width={30}
                        height={30}
                      />
                      <div>
                        <h2 className="text-sm font-semibold">
                          {isCompany(item.owner)
                            ? item.owner.name
                            : isUser(item.owner)
                            ? `${item.owner.firstName} ${item.owner.lastName}`
                            : "Unknown Owner"}{" "}
                        </h2>

                        <p className="text-xs text-gray-500">
                          {isCompany(item.owner)
                            ? item.owner.IndustryType
                            : isUser(item.owner)
                            ? item.owner.jobTitle?.[0]
                            : "Unknown"}{" "}
                          •{" "}
                          {formatDistanceToNowStrict(new Date(item.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>

                    <p className="leading-normal text-gray-600 text-md">
                      {expandedId === item._id
                        ? item.description
                        : `${item.description.slice(0, MAX_LENGTH)} `}

                      {item.description &&
                        item.description.length > MAX_LENGTH && (
                          <span
                            className="text-blue-600 font-semibold cursor-pointer"
                            onClick={() =>
                              setExpandedId(
                                expandedId === item._id ? "" : item._id
                              )
                            }
                          >
                            {expandedId === item._id
                              ? " Show less"
                              : " ...Read more"}
                          </span>
                        )}
                    </p>
                    {item.images?.length > 0 ? (
                      <Image
                        src={item.images?.[0] || "/fallback-image.png"}
                        alt="Product Image"
                        width={220}
                        height={220}
                        className="w-full object-cover h-[220px] rounded-md"
                      />
                    ) : (
                      <video
                        src={item?.video}
                        className="w-full h-[150px] rounded-lg"
                        controls
                      />
                    )}
                    <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500">
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
                        </span>
                        <span>{item.likedBy?.length || 0}</span>
                      </div>
                      <span>{item.comments?.length || 0} comment</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-2">
                  No Liked posts available
                </p>
              )}
            </>
          )}
        </div>

        {UpdateOpen && selectedPost && (
          <OutsideClickHandler onOutsideClick={() => setIsUpdateOpen(false)}>
            <UpdatePost post={selectedPost} UpdateOpen={UpdateOpen} />
          </OutsideClickHandler>
        )}
      </div>
    </div>
  );
};
