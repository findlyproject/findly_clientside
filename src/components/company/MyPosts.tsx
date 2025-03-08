"use client";
import { formatDistanceToNowStrict  } from "date-fns";
import api from "@/utils/api";
import React, { useState, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { DeletePost, fetchAllPosts } from "@/lib/store/features/actions/postActions";
import { useAppDispatch } from "@/lib/store/hooks";
// import { UpdatePost } from "../UpdatePost";
import OutsideClickHandler from "react-outside-click-handler";
import { UpdatePost } from "../homePage/middle/UpdatePost";
export default function MyPosts() {
  const [activeTab, setActiveTab] = useState("My posts");
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
 const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 50;
  const toggleDropdown = (postId: string) => {
    setOpenDropdownId(openDropdownId === postId ? null : postId);
  };
const [UpdateOpen, setIsUpdateOpen] = useState(false); 
  // Fetch user posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await api.get(`/company/owner`);
        console.log("Response of user posts:", response);
        setUserPosts(response.data.posts || []);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };
    fetchUserPosts();
  }, []);

  // Update posts when tab changes
  useEffect(() => {
    if (activeTab === "My posts") {
      setPosts(userPosts);
    }
  }, [activeTab, userPosts]);

  console.log("my posts",posts);
  const dispatch = useAppDispatch();
   
    //delete post
    const deletePost = async (id: string) => {
      dispatch(DeletePost({ postId: id }));
      dispatch(fetchAllPosts());
    };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto mt-6 px-4">
        {/* Tabs */}
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 text-lg font-semibold transition-all ${
              activeTab === "My posts"
                ? "border-b-2 border-primary text-primary"
                : "border-b border-gray-700 text-gray-700"
            }`}
            onClick={() => setActiveTab("My posts")}
          >
            Your Posts
          </button>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mt-6">
          {activeTab === "My posts" ? "Your Created Posts" : ""}
        </h1>

        {/* Posts Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
  {activeTab === "My posts" ? (
    posts.length > 0 ? (
      posts.map((item) => {
        const [isExpanded, setIsExpanded] = useState(false);

        return (
          <div key={item._id} className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
            {/* Profile Header */}
            <div className="relative flex items-center gap-3">
              <img
                src={item.owner?.logo || "/profile.jpg"}
                alt="Profile"
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <h2 className="text-sm font-semibold">
                  {item.owner?.name} • <span className="text-xs text-gray-500">You</span>
                </h2>
                <p className="text-xs text-gray-500">
                  {item.owner?.IndustryType} •{" "}
                  {formatDistanceToNowStrict(new Date(item.createdAt), { addSuffix: true })}
                </p>
              </div>

              <BiDotsVerticalRounded
                onClick={() => toggleDropdown(item._id)}
                className="absolute top-0 right-0 cursor-pointer"
              />
              {openDropdownId === item._id && (
                <div className="bg-white text-sm rounded-lg shadow-lg p-2 absolute right-0 top-8 z-10">
                  <button
                    className="flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded-md transition"
                    onClick={() => setIsUpdateOpen(true)}
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

            {/* Post Content */}
            <p className="mt-2 text-gray-800 text-sm">
              {isExpanded ? item.description : `${item.description.slice(0, 150)} `}
              {item.description.length > 150 && (
                <span
                  className="text-blue-600 font-semibold cursor-pointer"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? " Show less" : " ...Read more"}
                </span>
              )}
            </p>

            <div className="mt-3">
              {item.images?.length > 0 ? (
                <img
                  src={item.images[0]}
                  className="w-full h-40 object-cover rounded-md"
                  alt="company post"
                />
              ) : item.video ? (
                <video src={item.video} className="w-full rounded-lg" controls />
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
        );
      })
    ) : (
      <p className="text-gray-500 text-center col-span-2">No created posts available</p>
    )
  ) : null}

  {/* Update Modal (Rendered outside map for better performance) */}
  {UpdateOpen && selectedPost && (
    <section className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <OutsideClickHandler onOutsideClick={() => setIsUpdateOpen(false)}>
        <UpdatePost post={selectedPost} setIsUpdateOpen={setIsUpdateOpen} />
      </OutsideClickHandler>
    </section>
  )}
</div>

      </div>
    </div>
  );
}
