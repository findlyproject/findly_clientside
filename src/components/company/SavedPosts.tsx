"use client";
import { setSaved } from "@/lib/store/features/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useState, useEffect } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import api from "@/utils/api";
import { handleUnsavePosts } from "@/lib/store/features/actions/companyActions";

export default function SavedPosts() {
  const [activeTab, setActiveTab] = useState("saved");
  const [posts, setPosts] = useState([]);
  const [savedPosts, setsavedPosts] = useState([]);
  const save = useAppSelector((state) => state.post.saved);
  const dispatch = useAppDispatch();
  const [expandedPosts, setExpandedPosts] = useState<{ [key: string]: boolean }>({});
  const MAX_LENGTH = 50;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const saveResponse = await api.get(`/company/saveds`);
        setsavedPosts(saveResponse.data.saved || []);

        const res = await api.get("/company/all");
        dispatch(setSaved(res.data.saved || []));
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (activeTab === "saved") {
      setPosts(savedPosts);
    }
  }, [activeTab, savedPosts]);

  const handleUnsave = async (postid: string) => {
    try {

      const result=await dispatch(handleUnsavePosts(postid))
            if(result.type==="unsave/posts/fulfilled"){
              await api.post(`/company/save/${postid}`);
              setsavedPosts((prev) => prev.filter((item) => item.postId?._id !== postid));
        
              const response = await api.get("/post/user/all");
              dispatch(setSaved(response.data.saved || []));
            }

    } catch (error) {
      console.error("Error unsaving post:", error);
    }
  };

  const toggleExpand = (postId: string) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto mt-6 px-4">
        {/* Tabs */}
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 text-lg font-semibold transition-all ${
              activeTab === "saved"
                ? "border-b-2 border-primary text-primary"
                : "border-b border-gray-700 text-gray-700"
            }`}
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </button>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mt-6">
          {activeTab === "saved" ? "Your Saved Posts" : "Your Created Posts"}
        </h1>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeTab === "saved" ? (
            posts && posts.length > 0 ? (
              posts.map((item) =>
                item.postId ? (
                  <div key={item.postId._id} className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
                    {/* Profile Header */}
                    <div className="relative flex items-center gap-3">
                      <button
                        className="absolute top-0 right-4 text-md"
                        onClick={() => handleUnsave(item.postId._id)}
                      >
                        ✕
                      </button>
                      <img
                        src={
                          item.postId?.owner.type === "Company"
                            ? item.postId?.owner.logo
                            : item.postId?.owner.profileImage || "/profile.jpg"
                        }
                        alt="Profile"
                        className="w-12 h-12 rounded-full border"
                      />
                      <div>
                        <h2 className="text-sm font-semibold">
                          {item.postId.owner.name
                            ? item.postId.owner.name
                            : `${item.postId.owner.firstName} ${item.postId.owner.lastName}`}
                        </h2>
                        <p className="text-xs text-gray-500">
                          {item.postId.owner.IndustryType ||
                            item.postId.owner.jobTitle?.[0]}{" "}
                          •{" "}
                          {formatDistanceToNowStrict(
                            new Date(item.postId.createdAt),
                            { addSuffix: true }
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="mt-2 text-gray-800 text-sm">
                      {expandedPosts[item.postId._id]
                        ? item.postId.description
                        : `${item.postId.description.slice(0, MAX_LENGTH)} `}
                      {item.postId.description.length > MAX_LENGTH && (
                        <span
                          className="text-blue-600 font-semibold cursor-pointer"
                          onClick={() => toggleExpand(item.postId._id)}
                        >
                          {expandedPosts[item.postId._id] ? " Show less" : " ...Read more"}
                        </span>
                      )}
                    </p>

                    <div className="mt-3">
                      {item.postId.images?.length > 0 ? (
                        <img
                          src={item.postId.images[0]}
                          className="w-full h-40 object-cover rounded-md"
                          alt="Post"
                        />
                      ) : item.postId.video ? (
                        <video
                          src={item.postId.video}
                          className="w-full h-[150px] rounded-lg"
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
                        <span>{item.postId?.likedBy?.length || 0}</span>
                      </div>
                      <span>{item.postId?.comments?.length || 0} comment</span>
                    </div>
                  </div>
                ) : null
              )
            ) : (
              <p className="text-gray-500 text-center col-span-2">
                No saved posts available
              </p>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
