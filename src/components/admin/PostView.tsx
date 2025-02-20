"use client"; // Only needed if this file is inside `app/` directory
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/utils/api";
import { IPost } from "@/lib/store/features/postSlice";
import Image from "next/image";

const PostView = () => {
  const { id } = useParams();
  console.log(id)
  const router = useRouter();
  const [post, setPost] = useState<IPost | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <button onClick={() => router.back()} className="mb-4 text-blue-600">
        ← Back
      </button>

      {/* Images */}
      {post.images?.length ? (
        <div className="flex gap-2 overflow-x-auto">
          {post.images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Post Image ${index}`}
              width={10}
              height={10}
              className="w-32 h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      ) : null}

      {/* Video */}
      {post.video ? (
        <video controls className="w-full mt-4 rounded-lg">
          <source src={post.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : null}

      {/* Description */}
      <h2 className="text-xl font-semibold mt-4">Description</h2>
      <p className="text-gray-700">
        {post.description || "No description provided."}
      </p>

      {/* Owner */}
      <h2 className="text-xl font-semibold mt-4">Owner</h2>
      {post.owner ? (
        <div className="flex items-center gap-3">
          <Image
            src={post.owner.profileImage || "https://via.placeholder.com/40"}
            width={10}
            height={10}
            alt="Owner"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">
              {post.owner.firstName} {post.owner.lastName}
            </p>
            <p className="text-gray-500 text-sm">{post.owner.email}</p>
          </div>
        </div>
      ) : (
        <p>No owner details available.</p>
      )}

      {/* Likes */}
      <h2 className="text-xl font-semibold mt-4">Likes</h2>
      <p>{post.likedBy?.length || 0} people liked this post</p>

      {/* Comments */}
      {/* <h2 className="text-xl font-semibold mt-4">Comments</h2> */}
      {/* {post.comments?.length ? (
        <ul className="mt-2 space-y-2">
          {post?.comments.map((comment, index) => (
            <li key={index} className="p-2 border rounded-lg">
              <p className="text-sm font-medium">{comment.user?.firstName} {comment.user?.lastName}</p>
              <p className="text-gray-600">{comment?.comment}</p>
              <p className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )} */}
    </div>
  );
};

export default PostView;
