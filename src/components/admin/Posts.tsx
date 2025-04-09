"use client";

import { fetchAllPostsAdmin } from "@/lib/store/features/actions/postActions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Company, IPost, User } from "@/types/Types";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5;
  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.post.postsAdmin as IPost[]);

  useEffect(() => {
    dispatch(fetchAllPostsAdmin());
  }, []);

  const router = useRouter();
  const isUser = (owner: unknown): owner is User => {
    return typeof owner === "object" && owner !== null && "firstName" in owner;
  };

  const isCompany = (owner: unknown): owner is Company => {
    return typeof owner === "object" && owner !== null && "name" in owner;
  };

  const totalPages = Math.ceil(posts?.length / postPerPage);
  const indexOfLastUser = currentPage * postPerPage;
  const indexOfFirstUser = indexOfLastUser - postPerPage;
  const currentPosts = posts?.slice(indexOfFirstUser, indexOfLastUser);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="overflow-x-auto max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {Array.isArray(posts) && posts.length === 0 ? (
        <p className="text-center p-4 text-gray-500">No posts available</p>
      ) : (
        <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600 text-xs sm:text-sm uppercase tracking-wider">
                Owner
              </th>
              <th className="px-4 py-3 text-left text-gray-600 text-xs sm:text-sm uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-gray-600 text-xs sm:text-sm uppercase tracking-wider">
                Media
              </th>
              <th className="px-4 py-3 text-left text-gray-600 text-xs sm:text-sm uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentPosts) &&
              currentPosts.map((post, index) => (
                <tr
                  key={`${post._id}-${index}`}
                  className="hover:bg-gray-50 transition duration-200 ease-in-out"
                >
                  <td className="border-t px-3 py-3 text-xs sm:text-sm">
                    <div className="flex items-center space-x-3">
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
                      <div className="min-w-[120px]">
                        {isUser(post.owner) ? (
                          <>
                            <p className="font-medium truncate">
                              {post.owner.firstName} {post.owner.lastName}
                            </p>
                            <p className="text-gray-500 text-xs truncate">
                              {post.owner.email}
                            </p>
                          </>
                        ) : isCompany(post.owner) ? (
                          <>
                            <p className="font-medium truncate">
                              {post.owner.name}
                            </p>
                            <p className="text-gray-500 text-xs truncate">
                              {post.owner.email}
                            </p>
                          </>
                        ) : (
                          <p>Unknown Owner</p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="border-t px-3 py-3 text-xs sm:text-sm">
                    {isUser(post.owner)
                      ? "User"
                      : isCompany(post.owner)
                      ? "Company"
                      : "Unknown"}
                  </td>

                  <td className="border-t px-3 py-3 text-xs sm:text-sm">
                    <div className="flex gap-2 items-center">
                      {post.images?.slice(0, 1).map((image, index) => (
                        <Image
                          key={index}
                          className="rounded-md h-12 w-12 object-cover"
                          src={image}
                          alt={`Post Image ${index + 1}`}
                          width={50}
                          height={50}
                        />
                      ))}
                      {post.video && (
                        <video
                          className="rounded-md h-12 w-12 object-cover"
                          controls
                        >
                          <source src={post.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </td>

                  <td className="border-t px-3 py-3 text-xs sm:text-sm">
                    <button
                      onClick={() => router.push(`/admin/posts/${post._id}`)}
                      className="bg-primary  text-white px-4 py-1.5 rounded-md text-xs sm:text-sm transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-center items-center p-4 gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Posts;
