import {  useAppSelector } from "@/lib/store/hooks";
import { PostPreview } from "./postPreview/PostPreview";
import React from "react";
import { propspsts } from "@/types/Types";
export const PostsList:React.FC<propspsts> = ({loadMorePosts,loading}) => {

  const { posts } = useAppSelector((state) => state.post);

  return (
    <section className="w-full  mx-auto  lg:px-8 space-y-3 rounded-lg py-4  xl:mr-20">
      {/* Posts List */}
      {Array.isArray(posts) && posts.length > 0 ? (
        posts
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt || 0).getTime() -
              new Date(a.createdAt || 0).getTime()
          )
          .map((post) => <PostPreview key={post._id} post={post} />)
      ) : (
        <div className="flex justify-center items-center ">
          <p className="text-center text-gray-500">No posts available.</p>
        </div>
      )}

      {/* Load More Button */}
      {Array.isArray(posts) && posts.length >= 3 && (
        <div className="flex justify-center items-center my-4">
         <button
            onClick={loadMorePosts}
            disabled={loading}
            className="text-gray-500 cursor-pointer hover:text-black transition duration-300 bg-white px-4 py-2 rounded-lg shadow-md"
          >
            {loading ? "Loading..." : "Read More"}
          </button>
        </div>
      )}
    </section>
  );
};
