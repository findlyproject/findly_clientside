"use client";

import React, { useEffect, useState } from "react";

import api from "@/utils/api";
import {
  adminDeletePost,
  blockUser,
  fetchUsers,
  removeReports,
} from "@/lib/store/features/actions/adminActions";
import { fetchAllPosts } from "@/lib/store/features/actions/postActions";
import { useAppDispatch } from "@/lib/store/hooks";
import { IReport } from "@/types/Types";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";

function ReportedPosts() {
  const [post, setPost] = useState<IReport[]>([]);
  const [user, setUser] = useState<IReport[]>([]);
  const [all, setAll] = useState<IReport[]>([]);
  const [activeTab, setActiveTab] = useState("post");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const fetchPosts = async () => {
    const response = await api.get(`/admin/post`);
    setPost(response.data.postReports || []);
    const res = await api.get(`/admin/user`);
    setUser(res.data.userReports || []);
  };
  useEffect(() => {
    fetchPosts();
  }, [dispatch]);

  useEffect(() => {
    if (activeTab === "post") {
      setAll(post);
    } else {
      setAll(user);
    }
  }, [activeTab, user, post]);

  console.log("allllllll", all);

  const handleDismissReport = async (reportId: string) => {
    try {
      const result = await dispatch(removeReports(reportId));
      console.log("result of dismiss", result);

      if (result.type === "remove/reports/fulfilled") {
        dispatch(fetchAllPosts(1));
        fetchPosts();
      }
    } catch (error) {
      console.error("Error dismissing report:", error);
    }
  };
  const deletePost = async (postId: string) => {
    console.log("postIdv", postId);

    try {
      const result = await dispatch(adminDeletePost(postId));
      console.log("result of posts", result);

      if (result.type === "delete/post/fulfilled") {
        fetchPosts();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    findUsers();
  }, []);

  const findUsers = async () => {
    await dispatch(fetchUsers());
  };

  const handleBlock = async (id: string) => {
    const result = await dispatch(blockUser(id));
    console.log("resultresult", result);

    if (result.type === "block/uses/fulfilled") {
      findUsers();
      fetchPosts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 text-lg font-semibold  transition-all ${
              activeTab === "post"
                ? "border-b border-primary text-primary"
                : "border-b border-gray-700 text-gray-700 "
            }`}
            onClick={() => setActiveTab("post")}
          >
            Post reports
          </button>
          <button
            className={`px-4 py-2 text-lg font-semibold  transition-all ${
              activeTab === "yourPosts"
                ? " border-b border-primary text-primary"
                : "border-b border-gray-700 text-gray-700 "
            }`}
            onClick={() => setActiveTab("user")}
          >
            User reports
          </button>
        </div>

        <h1 className="text-2xl font-bold text-center mt-6">
          {activeTab === "post" ? "Reported Posts" : " Reported User"}
        </h1>
        <div className="p-4 md:p-8">
          {activeTab === "post" ? (
            all.length > 0 ? (
              all.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row mb-8 border border-gray-200 rounded-lg shadow-md dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <div className="relative md:w-1/2 w-full group">
                  <Image
  src={item.postId?.images?.[0] || ""}
  alt="Post"
  className="object-cover w-[400px] h-[300px] rounded-t-lg md:rounded-none md:rounded-s-lg"
  width={400}
  height={300}
/>


                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-70 text-black text-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.postId?.description || "No Description"}
                    </div>
                  </div>

                  <div className="md:w-1/2 w-full flex flex-col justify-between p-6">
                    <div className="relative inline-block text-left mb-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => setIsOpen(!isOpen)}
                          className="px-4 py-2 text-primary"
                        >
                          <BsThreeDotsVertical />
                        </button>
                      </div>

                      {isOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                deletePost(item.postId?._id);
                                setIsOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {item.postId.isDeleted
                                ? " Removed"
                                : "Remove Post"}
                            </button>
                            <button
                              onClick={() => {
                                handleDismissReport(item._id);
                                setIsOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Dismiss
                            </button>
                            <button
                              onClick={() => router.push(`/admin/dashboard`)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Back
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="font-semibold">Reason:-</span>
                      <p className="my-2 text-gray-700 dark:text-gray-300">
                        {item?.reason}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold dark:text-white">
                        Reported By:
                      </span>
                      <div className="flex items-center mt-2">
                        <Image
                          className="rounded-full w-10 h-10 object-cover"
                          src={
                            item.reportedBy?.profileImage ||
                            "https://via.placeholder.com/150"
                          }
                          alt="Reporter Profile"
                          width={40}
                          height={40}
                        />
                        <div className="ml-3">
                          <p className="font-medium dark:text-white">
                            {item.reportedBy?.lastName || "Unknown"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.reportedBy?.jobTitle?.[0] || "MERN Developer"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-500 text-xs mt-4">
                      Created At:{" "}
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No Reported posts available.
              </p>
            )
          ) : null}

          {activeTab === "user" ? (
            all.length > 0 ? (
              all.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row mb-8 border border-gray-200 rounded-lg shadow-md dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-6">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white ">
                      Reported User
                    </h3>

                    <div className="relative group mb-4">
                      <Image
                        src={
                          item.userId?.profileImage ||
                          "https://via.placeholder.com/150"
                        }
                        alt="Reported User"
                        className="object-cover w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600"
                        width={96}
                        height={96}
                      />

                      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 text-black text-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center rounded-b-full">
                        {item.userId?.email || "No Email"}
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="font-semibold text-lg dark:text-white">
                        {item.userId?.firstName || "Unknown"}{" "}
                        {item.userId?.lastName || "User"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {item.userId?.jobTitle?.[0] || "No Job Role"}
                      </p>
                    </div>
                  </div>

                  <div className="md:w-1/2 w-full flex flex-col justify-between p-6">
                    <div className="relative inline-block text-left mb-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => setIsOpen(!isOpen)}
                          className="px-4 py-2 text-primary"
                        >
                          <BsThreeDotsVertical />
                        </button>
                      </div>

                      {isOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                handleBlock(item.userId?._id);
                                setIsOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {item.userId?.isBlocked
                                ? " Unblock User"
                                : "Block User"}
                            </button>
                            <button
                              onClick={() => {
                                handleDismissReport(item._id);
                                setIsOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Dismiss
                            </button>
                            <button
                              onClick={() => router.push(`/admin/dashboard`)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Back
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="font-semibold">Reason:-</span>
                      <p className="my-2 text-gray-700 dark:text-gray-300">
                        {item?.reason}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold dark:text-white">
                        Reported By:
                      </span>
                      <div className="flex items-center mt-2">
                        <Image
                          className="rounded-full w-10 h-10 object-cover"
                          src={
                            item.reportedBy?.profileImage ||
                            "https://via.placeholder.com/150"
                          }
                          alt="Reporter Profile"
                          width={40}
                          height={40}
                        />
                        <div className="ml-3">
                          <p className="font-medium dark:text-white">
                            {item.reportedBy?.lastName || "Unknown"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.reportedBy?.jobTitle?.[0] || "MERN Developer"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-500 text-xs mt-4">
                      Created At:{" "}
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No Reported users found.
              </p>
            )
          ) : null}

          {activeTab !== "post" && activeTab !== "user" && (
            <p className="text-center text-gray-500">Please select a tab.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportedPosts;
