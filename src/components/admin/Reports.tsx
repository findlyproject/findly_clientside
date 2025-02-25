"use client";
import { fetchAllPosts } from "@/lib/store/features/actions/postActions";
import { IPost, updatePost } from "@/lib/store/features/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import api from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const ReportedPosts = () => {
  const [openReportId, setOpenReportId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const dispatch = useAppDispatch();
const router =useRouter()

  const reportedPosts: IPost[] = useAppSelector(
    (state) =>
      state.post.posts?.filter(
        (post) =>
          Array.isArray(post.reports) &&
          post.reports.length > 0 &&
          !post.isDeleted
      ) || []
  );

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  // Function to get date range
  const getFilteredPosts = () => {
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const thisWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return reportedPosts.filter((post) =>
      post.reports?.some((report) => {
        const reportDate = new Date(report.createdAt);
        if (filter === "today") return reportDate >= today;
        if (filter === "week") return reportDate >= thisWeek;
        if (filter === "month") return reportDate >= thisMonth;
        return true; // "all"
      })
    );
  };

  // Toggle report actions dropdown
  const handleOpen = (id: string) => {
    setOpenReportId((prevId) => (prevId === id ? null : id));
  };

  // Delete a post
  const deletePost = async (postId: string) => {
    try {
      await api.patch(`admin/deletepost/${postId}`, {
        isDeleted: true,
      });
      dispatch(updatePost({ postId, updatedData: { isDeleted: true } }));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Dismiss a report
  const handleDismissReport = async (postId: string) => {
    try {
      await api.post(`/admin/dismissreports/${postId}`);
      dispatch(updatePost({ postId, updatedData: { reports: [] } }));
      alert("Report dismissed successfully!");
    } catch (error) {
      console.error("Error dismissing report:", error);
    }
  };

  const filteredPosts = getFilteredPosts();

  if (filteredPosts.length === 0) {
    return (
      <>
       {/* Filter Dropdown */}
       <div className="mb-4">
       <label className="text-gray-700 font-semibold mr-2">Filter by:</label>
       <select
         className="border px-3 py-2 rounded-lg"
         value={filter}
         onChange={(e) => setFilter(e.target.value)}
       >
         <option value="all">All Reports</option>
         <option value="today">Today</option>
         <option value="week">This Week</option>
         <option value="month">This Month</option>
       </select>
     </div>
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">No reported posts found.</p>
      </div>
      </>
    );
  }

  return (
    <div className="flex flex-col p-4">
      <section className="overflow-x-auto pb-4">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-5 lg:px-5">
          <h2 className="text-gray-900 text-3xl font-bold mb-6">Reported Posts</h2>

          {/* Filter Dropdown */}
          <div className="mb-4">
            <label className="text-gray-700 font-semibold mr-2">Filter by:</label>
            <select
              className="border px-3 py-2 rounded-lg"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Reports</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full border rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Post</th>
                  <th className="p-3 text-left">Reports</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post._id} className="bg-white hover:bg-gray-50 border-b" >
                    
                    <td className="p-5"  onClick={()=>router.push(`/admin/posts/${post._id}`)}>{post._id}</td>
                    <td className="p-5 flex items-center gap-3"  onClick={()=>router.push(`/admin/posts/${post._id}`)}>
                      {(post?.images?.length && post?.images?.length > 0 || post.video) && (
                        <div className="flex gap-2">
                          {post.images?.slice(0, 2).map((image, index) => (
                            <Image
                              key={index}
                              className="rounded-xl max-h-32 object-cover w-20 lg:w-auto"
                              src={image}
                              alt={`Post Image ${index + 1}`}
                              width={100}
                              height={100}
                            />
                          ))}
                          {post.video && (
                            <video
                              className="rounded-xl max-h-32 object-cover"
                              controls
                              width={100}
                              height={100}
                            >
                              <source src={post.video} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="p-5"  onClick={()=>router.push(`/admin/posts/${post._id}`)}>
                      {post.reports?.length && post.reports?.length > 0 && (
                        <div className="p-3 border rounded-lg bg-gray-100 w-full">
                          <h5 className="text-gray-900 text-lg font-semibold mb-2">Reports:</h5>
                          {post.reports?.map((report) => (
                            <div key={report._id} className="border-b py-2 last:border-none">
                              <p className="text-gray-600 text-sm">
                                {new Date(report.createdAt).toLocaleDateString()} -{" "}
                                {new Date(report.createdAt).toLocaleTimeString()}
                              </p>
                              <p className="text-gray-900 font-semibold">
                                Reason: {report.reason}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="py-5 px-3 text-center relative">
                      <button
                        onClick={() => handleOpen(post._id)}
                        className="p-2 hover:bg-gray-100 transition-all duration-300"
                      >
                        ⋮
                      </button>
                      {openReportId === post._id && (
                        <OutsideClickHandler onOutsideClick={() => setOpenReportId(null)}>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-40 bg-white border rounded-lg shadow-lg z-50">
                            <button
                              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => handleDismissReport(post._id)}
                            >
                              Dismiss Report
                            </button>
                            <button
                              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => deletePost(post._id)}
                            >
                              Delete Post
                            </button>
                          </div>
                        </OutsideClickHandler>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReportedPosts;
