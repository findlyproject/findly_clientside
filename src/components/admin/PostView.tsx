"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/utils/api";
import Image from "next/image";
import { Company, IPost, User } from "@/types/Types";
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { GoReport } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
const PostView = () => {
  const { id } = useParams();
  console.log(id);
  const router = useRouter();
  const [post, setPost] = useState<IPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("description");
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    if (!id) return;
    api
      .get(`post/post/${id}`)
      .then((response) => {
        setPost(response.data.onepost);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setError("Failed to load post.");
      });
  }, [id]);

  if (error) return <p className="text-center p-4 text-red-500">{error}</p>;
  if (!post) return <p className="text-center p-4">Post not found</p>;
  const isUser = (owner: unknown): owner is User => {
    return typeof owner === "object" && owner !== null && "firstName" in owner;
  };

  const isCompany = (owner: unknown): owner is Company => {
    return typeof owner === "object" && owner !== null && "name" in owner;
  };
  const tabs = [
    { label: "Description", key: "description" },
    { label: "Owner", key: "owner" },
    { label: "Comments", key: "comments" },
    { label: "Reports", key: "reports" },
  ];
  console.log("pooooo", post);

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4 space-y-4 mt-10">



<div className="grid gap-2 sm:gap-4">
      {post.images.length === 1 && (
        <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden">
          <Image
            src={post.images[0]}
            alt="Post Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}

      {post.images.length === 2 && (
        <div className="grid grid-cols-2 gap-2">
          {post.images.slice(0, 2).map((img, index) => (
            <div key={index} className="relative h-40 sm:h-60 rounded-lg overflow-hidden">
              <Image src={img||""} alt={`Post Image ${index + 1}`} layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
      )}

      {post.images.length === 3 && (
        <div className="grid grid-cols-3 gap-2">
          {post.images.slice(0, 3).map((img, index) => (
            <div key={index} className="relative h-32 sm:h-48 rounded-lg overflow-hidden">
              <Image src={img||""} alt={`Post Image ${index + 1}`} layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
      )}

      {post.images.length === 4 && (
        <div className="grid grid-cols-2 gap-2">
          {post.images.slice(0, 4).map((img, index) => (
            <div key={index} className="relative h-32 sm:h-48 rounded-lg overflow-hidden">
              <Image src={img||""} alt={`Post Image ${index + 1}`} layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
      )}

      {post.images.length >= 5 && (
        <div className="grid grid-cols-3 gap-2">
          {post.images.slice(0, 5).map((img, index) => (
            <div key={index} className="relative h-28 sm:h-40 rounded-lg overflow-hidden">
              <Image src={img||""} alt={`Post Image ${index + 1}`} layout="fill" objectFit="cover" />
              {index === 4 && post.images.length > 5 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold">
                  +{post?.images?.length - 5} More
                </div>
              )}
            </div>
          ))}
        </div>
      )}

{post?.video && (
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <video
        src={post.video||""}
        controls
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  )}
    </div>






      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="bg-purple-100 text-purple-800 text-md font-semibold px-2.5 py-0.5 rounded flex items-center gap-1">
            <SlLike /> {post.likedBy ? post.likedBy.length : 0}
          </span>

          <span className="bg-purple-100 text-purple-800 text-md font-semibold px-2.5 py-0.5 rounded flex items-center gap-1">
            <FaRegComment /> {post.comments ? post.comments.length : 0}
          </span>
          <span className="bg-purple-100 text-purple-800 text-md font-semibold px-2.5 py-0.5 rounded flex items-center gap-1">
            <IoEyeOutline />
            {post.comments ? post.comments.length : 0}
          </span>
          <span className="bg-purple-100 text-purple-800 text-md font-semibold px-2.5 py-0.5 rounded flex items-center gap-1">
            <GoReport /> {post.reports ? post.reports.length : 0}
          </span>
          <div className="relative inline-block">
            <button
              className="text-primary text-md"
              onClick={() => setDropdown(!dropdown)}
            >
              <BsThreeDotsVertical />
            </button>

            {dropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
                {post?.reports.length > 0 ? (
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-gray-100"
                    // onClick={() => handleDelete(post._id)} // Example function for delete
                  >
                    Delete
                  </button>
                ) : (
                  <p></p>
                )}

                <button
                  className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-gray-100"
                  onClick={() => router.push(`/admin/posts`)}
                >
                  Back
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-500 text-xs">
          <strong>Created At:</strong>{" "}
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="w-full max-w-3xl mx-auto mt-6 px-4">
        <div className="flex gap-4 border-b border-gray-200 text-sm overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2 whitespace-nowrap ${
                activeTab === tab.key
                  ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4 text-gray-700 text-sm leading-relaxed space-y-2">
          {activeTab === "description" && (
            <p>{post?.description || "No description available."}</p>
          )}

          {activeTab === "owner" && (
            <div>
              {post?.owner ? (
                <div className="space-y-1">
                  <div className="flex space-x-2">
                    <div>
                      <Image
                        src={
                          isUser(post.owner)
                            ? post.owner.profileImage ||
                              "https://via.placeholder.com/40"
                            : isCompany(post.owner)
                            ? post.owner.logo ||
                              "https://via.placeholder.com/40"
                            : "https://via.placeholder.com/40"
                        }
                        alt={
                          isUser(post.owner)
                            ? post.owner.firstName
                            : isCompany(post.owner)
                            ? post.owner.name
                            : "Unknown"
                        }
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                        width={40}
                        height={40}
                      />
                    </div>
                    {post.owner && (
  <div>
    {isUser(post.owner) && (
      <>
        <p>
          <span className="font-medium">Name:</span> {post.owner.firstName}
        </p>
        <p>
          <span className="font-medium">Email:</span> {post.owner.email}
        </p>
      </>
    )}

    {isCompany(post.owner) && (
      <>
        <p>
          <span className="font-medium">Company Name:</span> {post.owner.name}
        </p>
        <p>
          <span className="font-medium">Company Email:</span> {post.owner.email || "N/A"}
        </p>
      </>
    )}
  </div>
)}

                  </div>
                </div>
              ) : (
                <p>Owner information not available.</p>
              )}
            </div>
          )}

          {activeTab === "comments" &&
            (post?.comments?.length ? (
              <ul className="mt-4 space-y-3">
                {post.comments.map((comment, index) => (
                  <li key={index} className="p-3 border rounded-lg bg-gray-50">
                    <p className="text-gray-500 text-xs">
                      {isUser(post.owner)
                        ? post.owner.firstName
                        : isCompany(post.owner)
                        ? post.owner.name
                        : "Unknown"}
                    </p>
                    <p className="text-gray-700 text-sm mt-1">
                      {comment.comment}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-4">No comments yet.</p>
            ))}

          {activeTab === "reports" &&
            (post?.reports?.length ? (
              <ul className="mt-4 space-y-3">
                {post.reports.map((report, index) => (
                  <li key={index} className="p-3 border rounded-lg bg-gray-50">
                    <p className="text-gray-500 text-xs">
                      {isUser(post.owner)
                        ? post.owner.firstName
                        : isCompany(post.owner)
                        ? post.owner.name
                        : "Unknown"}
                    </p>
                    <p className="text-gray-700 text-sm mt-1">
                      Reason: {report.reason}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Date: {new Date(report.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-4">No reports yet.</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostView;
