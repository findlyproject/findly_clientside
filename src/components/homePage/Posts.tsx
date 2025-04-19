"use client";
import { setLikes, setSaved } from "@/lib/store/features/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import api from "@/utils/api";
import React, { useState, useEffect } from "react";
import { IPost, SavePost } from "@/types/Types";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
export const  Posts=()=> {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  console.log(name)
  const [activeTab, setActiveTab] = useState(name);
  const [posts, setPosts] = useState<SavePost[]>([]);
  console.log("postscc",posts);

  const [userPosts, setUserposts] = useState<SavePost[]>([]);
  console.log("userPosts",userPosts);
  const [userLiked, setUserLiked] = useState<SavePost[]>([]);

  const [savedPosts, setsavedPosts] = useState<IPost[]>([]);
  const save=useAppSelector(state=>state.post.saved)
  const {activeuser}=useAppSelector(state=>state.user)
const route =activeuser?"user":"company"
const dispatch=useAppDispatch()

  useEffect(() => {
    const fetchuserPosts = async () => {
      const response = await api.get(`${route}/posts`);
      setUserposts(response.data.posts||[]);
      const responsed=await api.get(`/${route}/saveds`)
dispatch(setSaved(responsed.data.saved))
const responses=await api.get(`/${route}/likes`)
setUserLiked(responses.data.likedPosts)
    };
    fetchuserPosts();
  }, [dispatch, route]);

console.log("save,",save)

  useEffect(() => {
    if (activeTab === "saved") {
      setPosts(save);
    } else {
      setPosts(userPosts);
    }
  }, [activeTab, save, savedPosts, userPosts]);

const handleUnsave=async(postid:string)=>{
        await api.post(`/${route}/save/${postid}`)
setsavedPosts((pre)=>pre.filter((item)=>item._id!==postid))
const response=await api.get(`/${route}/saveds`)
dispatch(setSaved(response.data.saved))
}

const handleLike = async (postId: string) => {
  const response = await api.post(`/${route}/likepost/${postId}`);
  dispatch(setLikes(response.data.post));
  const responses=await api.get(`/${route}/likes`)
  setUserLiked(responses.data.likedPosts)
};
console.log(posts)
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

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeTab === "saved" ? (
            save.length > 0 ? (
              save.map((item) => (
<div
                  key={item?.postId._id}
                  className="relative bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
                >
                      <button  className =" absolute top-0 right-4 text-md" onClick={()=>handleUnsave(item.postId?._id)}>✕
                      </button>
                      <br></br>
                      {item?.postId.images?.length ? (
  <Image
    src={item?.postId.images[0]}
    alt="Post Image"
    className="w-full h-40 object-cover rounded-md"  // ✅ Use className
    width={30}
    height={30}
  />
) : item?.video ? (
  <video
    src={item.postId.video}
    className="w-full h-[150px] rounded-lg"  // ✅ Use className
    controls
  />
) : null}

                  <p className="text-gray-600 mt-2">
                    {item?.postId.description}
                  </p>

                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-2">
                No saved posts available
              </p>
            )
          ) :activeTab === "posts" ? (
            <>
           {posts&&posts.filter((item) => !item.postId?.isDeleted).length > 0 ? (
  <div>
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Active Posts</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts
        .filter((item) => !item.postId?.isDeleted)
        .map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          >
            {item.images?.length > 0 ? (
           <Image
           src={item.images[0] || '/fallback-image.png'}
           alt="Product Image"
           width={500}
           height={160}
           className="w-full h-40 object-cover rounded-md"
         />
            ) : (
              <video
                src={item?.video}
                className="w-full h-[150px] rounded-lg"
                controls
              />
            )}
            <p className="text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
    </div>
  </div>
) : (
  <p className="text-gray-500 text-center">No active posts available</p>
)}
          </>
        ):(
          <>
          {posts.length > 0 ? (
            userLiked.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                <button  className =" flex justify-end right-0 top-0 text-black text-md" onClick={()=>handleLike(item._id)}>
                  X
                </button>
                  {item.images?.length > 0 ? (
                    <Image
                    src={item.images?.[0] || '/fallback-image.png'}
                    alt="Product Image"
                    width={500}
                    height={160}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  ) : (
                    <video
                      src={item?.video}
                      className="w-full h-[150px] rounded-lg"
                      controls
                    />
                  )}
                <p className="text-gray-600 mt-2">{item.description}</p>
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
      </div>

    </div>
  );
}

// "use client";
// import { setLikes, setSaved } from "@/lib/store/features/postSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import api from "@/utils/api";
// import React, { useState, useEffect } from "react";
// import { Company, IPost, SavedType, SavePost, User } from "@/types/Types";
// import { useSearchParams } from "next/navigation";
// import Image from "next/image";
// import { formatDistanceToNowStrict } from "date-fns";
// export const Posts = () => {
//   const searchParams = useSearchParams();
//   const name = searchParams.get("name");
//   console.log(name);
//   const [activeTab, setActiveTab] = useState(name);
//   const [posts, setPosts] = useState<IPost[]>([]);
//   console.log("postscc", posts);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [userPosts, setUserposts] = useState<SavePost[]>([]);
//   console.log("userPosts", userPosts);
//   const [userLiked, setUserLiked] = useState<SavePost[]>([]);

//   const [savedPosts, setsavedPosts] = useState<IPost[]>([]);
//   const save= useAppSelector((state) => state.post.saved);
//   const { activeuser } = useAppSelector((state) => state.user);
//   const route = activeuser ? "user" : "company";
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     const fetchuserPosts = async () => {
//       const response = await api.get(`${route}/posts`);
//       setUserposts(response.data.posts || []);
//       const responsed = await api.get(`/${route}/saveds`);
//       dispatch(setSaved(responsed.data.saved));
//       const responses = await api.get(`/${route}/likes`);
//       setUserLiked(responses.data.likedPosts);
//     };
//     fetchuserPosts();
//   }, [dispatch, route]);

//   console.log("save,", save);

//   useEffect(() => {
//     if (activeTab === "saved") {
//       setPosts(save);
//     } else {
//       setPosts(userPosts);
//     }
//   }, [activeTab, save, savedPosts, userPosts]);

//   const handleUnsave = async (postid: string) => {
//     await api.post(`/${route}/save/${postid}`);
//     setsavedPosts((pre) => pre.filter((item) => item._id !== postid));
//     const response = await api.get(`/${route}/saveds`);
//     dispatch(setSaved(response.data.saved));
//   };

//   const handleLike = async (postId: string) => {
//     const response = await api.post(`/${route}/likepost/${postId}`);
//     dispatch(setLikes(response.data.post));
//     const responses = await api.get(`/${route}/likes`);
//     setUserLiked(responses.data.likedPosts);
//   };
//   console.log("posts", posts);

//   const isUser = (owner: unknown): owner is User => {
//     return typeof owner === "object" && owner !== null && "firstName" in owner;
//   };

//   const isCompany = (owner: unknown): owner is Company => {
//     return typeof owner === "object" && owner !== null && "name" in owner;
//   };
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
//           {activeTab === "saved"
//             ? "Your Saved Posts"
//             : activeTab === "posts"
//             ? "Your Created Posts"
//             : "Your liked posts"}
//         </h1>

//         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//           {activeTab === "saved" ? (
//             save.length > 0 ? (
//               save.map((item) => (
//                 <div
//                   key={item?.postId._id}
//                   className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 relative mb-6"
//                 >
//                   <button
//                     className="absolute top-2 right-2 text-lg text-gray-600 hover:text-red-500 z-10"
//                     onClick={() => handleUnsave(item.postId?._id)}
//                   >
//                     ✕
//                   </button>

//                   <div className="flex items-center gap-3 p-4">
//                     <Image
//                       src={
//                         item?.postId.owner.profileImage ||
//                         item.postId.owner.logo
//                       }
//                       alt="profile"
//                       className="w-12 h-12 rounded-full object-cover"
//                       width={30}
//                       height={30}
//                     />
//                     <div>
//                       <h2 className="text-sm font-semibold">
//                         {item?.postId?.owner.firstName ||
//                           item.postId.owner.name}
//                       </h2>
//                       <p className="text-xs text-gray-500">
//                         {item?.postId.owner?.jobTitle?.[0] ||
//                           item.postId.owner.IndustryType}
//                         ·{" "}
//                         {formatDistanceToNowStrict(
//                           new Date(item.postId.createdAt),
//                           { addSuffix: true }
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <p className="mt-2 text-gray-800 text-sm">
//                     {isExpanded
//                       ? item.postId.description
//                       : `${item.postId.description?.slice(0, 150)} `}
//                     {item.postId.description.length > 150 && (
//                       <span
//                         className="text-blue-600 font-semibold cursor-pointer"
//                         onClick={() => setIsExpanded(!isExpanded)}
//                       >
//                         {isExpanded ? " Show less" : " ...Read more"}
//                       </span>
//                     )}
//                   </p>

//                   {item?.postId.images?.length ? (
//                     <Image
//                       src={item?.postId.images[0]}
//                       alt="celebration"
//                       className="w-full object-cover h-52"
//                       width={208}
//                       height={208}
//                     />
//                   ) : item?.video ? (
//                     <video
//                       src={item.postId.video}
//                       className="w-full h-[150px] rounded-lg" // ✅ Use className
//                       controls
//                     />
//                   ) : null}
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center col-span-2">
//                 No saved posts available
//               </p>
//             )
//           ) : activeTab === "posts" ? (
//             <>
//               {posts &&
//               posts.filter((item) => !item.postId?.isDeleted).length > 0 ? (
//                 <div>
                 
                  
//                     {posts
//                       .filter((item) => !item.postId?.isDeleted)
//                       .map((item) => (
//                         <div
//                           key={item._id}
//                            className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 relative mb-6"
//                         >

//              <div className="flex items-center gap-3 p-4">
//                     <Image
//                       // src={
//                       //   item?.owner?.profileImage ||
//                       //   item.owner?.logo
//                       // }
//                       src={
//                         isCompany(item.owner)
//                           ? item.owner.logo || "/profile.jpg"
//                           : isUser(item.owner)
//                           ? item.owner.profileImage || "/profile.jpg"
//                           : "/profile.jpg"
//                       }
//                       alt="profile"
//                       className="w-12 h-12 rounded-full object-cover"
//                       width={30}
//                       height={30}
//                     />
//                     {/* <div>
//                       <h2 className="text-sm font-semibold">
//                         {item?.owner?.firstName ||
//                           item.owner?.name}
//                       </h2>
//                       <p className="text-xs text-gray-500">
//                         {item?.owner?.jobTitle?.[0] ||
//                           item.owner?.IndustryType}
//                         ·{" "}
//                         {formatDistanceToNowStrict(
//                           new Date(item.createdAt),
//                           { addSuffix: true }
//                         )}
//                       </p>
//                     </div> */}
//                     <div>
//   <h2 className="text-sm font-semibold">
//     {item?.owner?.firstName || item.owner?.name}
//   </h2>
//   <p className="text-xs text-gray-500">
//     {item?.owner?.jobTitle?.[0] || item.owner?.IndustryType}
//     ·{" "}
//     {item.createdAt && !isNaN(new Date(item.createdAt).getTime())
//       ? formatDistanceToNowStrict(new Date(item.createdAt), { addSuffix: true })
//       : "Unknown time"}
//   </p>
// </div>

//                   </div>


//                   <p className="mt-2 text-gray-800 text-sm">
//               {isExpanded ? item.description : `${item.description?.slice(0, 150)} `}
//               {item.description?.length > 150 && (
//                 <span
//                   className="text-blue-600 font-semibold cursor-pointer"
//                   onClick={() => setIsExpanded(!isExpanded)}
//                 >
//                   {isExpanded ? " Show less" : " ...Read more"}
//                 </span>
//               )}
//             </p>

//             <div className="mt-3">
//               {item.images&&item.images?.length > 0 ? (
//                 <Image
//                   src={item.images[0]  || "/fallback-image.png"}
//                      alt="company post"
//                   className="w-full object-cover h-52"
//                       width={208}
//                       height={208}
               
//                 />
//               ) : item.video ? (
//                 <video src={item.video} className="w-full rounded-lg" controls />
//               ) : null}
//             </div>
                          
//                         </div>
//                       ))}
                  
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-center">
//                   No active posts available
//                 </p>
//               )}
//             </>
//           ) : (
//             <>
//               {posts.length > 0 ? (
//                 userLiked.map((item) => (
//                   <div
//                     key={item._id}
//                    className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 relative mb-6"
//                   >
//                     <button
//                       className=" flex justify-end absolute right-4 top-0 text-black text-md"
//                       onClick={() => handleLike(item._id)}
//                     >
//                      ✕
//                     </button>


//                     <div className="flex items-center gap-3 p-4">
//                     <Image
//                       src={
//                         item?.owner?.profileImage ||
//                         item.owner?.logo
//                       }
//                       alt="profile"
//                       className="w-12 h-12 rounded-full object-cover"
//                       width={30}
//                       height={30}
//                     />
//                     <div>
//                       <h2 className="text-sm font-semibold">
//                         {item?.owner?.firstName ||
//                           item.owner?.name}
//                       </h2>
//                       <p className="text-xs text-gray-500">
//                         {item?.owner?.jobTitle?.[0] ||
//                           item.owner?.IndustryType}
//                         ·{" "}
//                         {formatDistanceToNowStrict(
//                           new Date(item.createdAt),
//                           { addSuffix: true }
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                     <p className="mt-2 text-gray-800 text-sm">
//               {isExpanded ? item.description : `${item.description?.slice(0, 150)} `}
//               {item.description.length > 150 && (
//                 <span
//                   className="text-blue-600 font-semibold cursor-pointer"
//                   onClick={() => setIsExpanded(!isExpanded)}
//                 >
//                   {isExpanded ? " Show less" : " ...Read more"}
//                 </span>
//               )}
//             </p>
//                     {item.images?.length > 0 ? (
//                       <Image
//                         src={item.images?.[0] || "/fallback-image.png"}
//                         alt="Product Image"
//                         width={208}
//                         height={208}
//                         className="w-full object-cover h-52"
//                       />
//                     ) : (
//                       <video
//                         src={item?.video}
//                         className="w-full h-[150px] rounded-lg"
//                         controls
//                       />
//                     )}
                   
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 text-center col-span-2">
//                   No Liked posts available
//                 </p>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
