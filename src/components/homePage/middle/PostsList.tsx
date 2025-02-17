import { useAppSelector } from "@/lib/store/hooks";
import { PostPreview } from "./postPreview/PostPreview";

export const PostsList = () => {
  const { posts } = useAppSelector((state) => state.post);

console.log("posts",posts);

  return (
    <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 border bg-white rounded-lg shadow-md py-4">
      {/* Posts List */}
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => <PostPreview key={post._id} post={post} />)
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-center text-gray-500">No posts available.</p>
        </div>
      )}

      {/* Load More Button */}
      {Array.isArray(posts) && posts.length >= 3 && (
        <div className="flex justify-center items-center my-4">
          <p className="text-gray-500 cursor-pointer hover:text-black transition duration-300">
            This is the end...
          </p>
        </div>
      )}
    </section>
  );
};
