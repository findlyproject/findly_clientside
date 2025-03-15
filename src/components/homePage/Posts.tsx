"use client";
import { setLikes, setSaved } from "@/lib/store/features/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import api from "@/utils/api";
import React, { useState, useEffect } from "react";
import { SavePost } from "@/types/Types";
import { useSearchParams } from "next/navigation";
export const  Posts=()=> {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  console.log(name)
  const [activeTab, setActiveTab] = useState(name);
  const [posts, setPosts] = useState<SavePost[]>([]);
  const [userPosts, setUserposts] = useState<SavePost[]>([]);
  const [userLiked, setUserLiked] = useState<SavePost[]>([]);

  const [savedPosts, setsavedPosts] = useState<SavePost[]>([]);
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
  }, [dispatch]);



  useEffect(() => {
    if (activeTab === "saved") {
      setPosts(save);
    } else {
      setPosts(userPosts);
    }
  }, [activeTab,savedPosts,userPosts]);

const handleUnsave=async(postid:string)=>{
const res=await api.post(`/${route}/save/${postid}`)
setsavedPosts((pre)=>pre.filter((item)=>item.postId._id!==postid))
const response=await api.get(`/${route}/saveds`)
dispatch(setSaved(response.data.saved))
}

const handleLike = async (postId: string) => {
  const response = await api.post(`/${route}/likepost/${postId}`);
  dispatch(setLikes(response.data.post));
  const responses=await api.get(`/${route}/likes`)
  setUserLiked(responses.data.likedPosts)
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

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeTab === "saved" ? (
            posts.length > 0 ? (
              posts.map((item) => (
                <div
                  key={item.postId?._id}
                  className="relative bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
                >
                      <button  className =" absolute top-0 right-4 text-md" onClick={()=>handleUnsave(item.postId._id)}>✕
                      </button>
                      <br></br>
                      {item.postId?.images?.length ? (
  <img
    src={item.postId.images[0]}
    alt="Post Image"
    className="w-full h-40 object-cover rounded-md"  // ✅ Use className
    width={30}
    height={30}
  />
) : item.postId?.video ? (
  <video
    src={item.postId.video}
    className="w-full h-[150px] rounded-lg"  // ✅ Use className
    controls
  />
) : null}


                  <p className="text-gray-600 mt-2">
                    {item.postId?.description}
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
           {posts.length > 0 ? (
            posts.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                  {item.images?.length > 0 ? (
                    <img
                      src={item.images?.[0]}
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
              No created posts available
            </p>
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
                    <img
                      src={item.images?.[0]}
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
