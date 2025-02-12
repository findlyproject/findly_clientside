"use client";
import { fetchAllPosts } from "@/lib/store/features/actions/postActions";
import { IPost, updatePost } from "@/lib/store/features/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import api from "@/utils/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const ReportedPosts = () => {
  const [openReportId, setOpenReportId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
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

  // Toggle report actions dropdown
  const handleOpen = (id: string) => {
    setOpenReportId((prevId) => (prevId === id ? null : id));
  };

  // delete a post
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

  // delete a report
  const handleDismissReport = async (postId: string) => {
    const response = await api.post(`/admin/dismissreports/${postId}`);
    console.log(response.data);

    dispatch(updatePost({ postId, updatedData: { reports: [] } }));

    alert("Report dismissed successfully!");
  };

  if (reportedPosts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">No reported posts found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-3 sm:px-6 lg:px-8">
      <section className="py-24 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-5 lg:px-5">
          <div className="flex justify-between items-center gap-8 flex-wrap">
            <h2 className="text-gray-900 text-3xl font-bold">Reported Posts</h2>
          </div>

          <div className="overflow-x-auto w-full mt-6">
            <table className="w-full border rounded-lg">
              <tbody>
                {reportedPosts.map((post) => (
                  <tr key={post._id} className="bg-white hover:bg-gray-50">
                    <td className="p-5 flex items-center gap-3">
                      {(post.images && post.images.length > 0) || post.video ? (
                        <div className="flex gap-2">
                          {post.images &&
                            post.images.map((image, index) => (
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
                      ) : null}

                      <div className="flex flex-col sm:flex-row">
                        <h5 className="text-gray-500 text-sm">
                          ID: {post._id}
                        </h5>
                      </div>
                    </td>
                    <td className="flex flex-col sm:flex-row gap-4 ">
                      {/* Show reports under each post */}
                      {Array.isArray(post.reports) &&
                        post?.reports?.length > 0 && (
                          <div className="mt-2 p-3 border rounded-lg bg-gray-100 w-full pl-10">
                            <h5 className="text-gray-900 text-lg font-semibold mb-2">
                              Reports:
                            </h5>
                            {post.reports?.map((report) => (
                              <div
                                key={report._id}
                                className="border-b py-2 last:border-none"
                              >
                                <p className="text-gray-600 text-sm">
                                  {new Date(
                                    report.createdAt
                                  ).toLocaleDateString()}{" "}
                                  -{" "}
                                  {new Date(
                                    report.createdAt
                                  ).toLocaleTimeString()}
                                </p>
                                <p className="text-gray-900 font-semibold">
                                  Reason: {report.reason}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                    </td>

                    <td className="py-5 px-3 relative">
                      <div className="flex justify-center relative">
                        {/* Button to open the dropdown */}
                        <button
                          onClick={() => handleOpen(post._id)}
                          className="p-2 hover:bg-gray-100 transition-all duration-300"
                        >
                          ⋮
                        </button>

                        <OutsideClickHandler
                          onOutsideClick={() => setOpenReportId(null)}
                        >
                          {openReportId === post._id && (
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-40 sm:w-48 bg-white border rounded-lg shadow-lg z-50">
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
                          )}
                        </OutsideClickHandler>
                      </div>
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
