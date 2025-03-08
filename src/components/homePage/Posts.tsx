"use client";
import { IPost, ISavePost, setSaved } from "@/lib/store/features/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import api from "@/utils/api";
import React, { useState, useEffect } from "react";

export const Posts() {
  const [activeTab, setActiveTab] = useState("saved");
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserposts] = useState([]);
  const [savedPosts, setsavedPosts] = useState([]);
  const save=useAppSelector(state=>state.post.saved)
const dispatch=useAppDispatch()

useEffect(()=>{
  const fetch=async()=>{
    const saveResponse = await api.get(`/post/user/saveds`);
    console.log(
      "saveResponse",
      saveResponse
    );
    setsavedPosts(saveResponse.data.saved);
  }
  fetch()
},[])
  useEffect(() => {
    const fetchuserPosts = async () => {
      const response = await api.get(`/post/owner`);
      console.log("response of user posts", response);
      setUserposts(response.data.posts||[]);

      
    const res=await api.get("/post/user/all")
      dispatch(setSaved(res.data.saved))
    };
    fetchuserPosts();
  }, [dispatch]);



  useEffect(() => {
    if (activeTab === "saved") {
      setPosts(savedPosts);
    } else {
      setPosts(userPosts);
    }
  }, [activeTab,savedPosts,userPosts]);
console.log("ppoooo",save);

const handleUnsave=async(postid:string)=>{
const res=await api.post(`/post/user/save/${postid}`)
console.log("res",res);
setsavedPosts((pre)=>pre.filter((item)=>item.postId._id!==postid))
const response=await api.get("/post/user/all")
dispatch(setSaved(response.data.saved))
}

console.log("savedPosts",savedPosts);


  return (
    <div className="min-h-screen bg-gray-100">
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
              activeTab === "yourPosts"
                ? " border-b border-primary text-primary"
                : "border-b border-gray-700 text-gray-700 "
            }`}
            onClick={() => setActiveTab("yourPosts")}
          >
            Your Posts
          </button>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mt-6">
          {activeTab === "saved" ? "Your Saved Posts" : "Your Created Posts"}
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
                  {item.postId?.images?.length > 0 ? (
                    <img
                      src={item.postId?.images?.[0]}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  ) : (
                    <video
                      src={item?.postId?.video}
                      className="w-full h-[150px] rounded-lg"
                      controls
                    />
                  )}

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
          ) : posts.length > 0 ? (
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
        </div>
      </div>
    </div>
  );
}
