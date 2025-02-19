import { useAppSelector } from "@/lib/store/hooks";
import { PostPreview } from "./postPreview/PostPreview";

export const PostsList = () => {
  const { posts } = useAppSelector((state) => state.post);

  return (
    <section className="w-full max-w-3xl mx-auto px-4 sm:px-10 lg:px-8 space-y-3 rounded-lg py-4">
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
          <p className="text-gray-500 cursor-pointer hover:text-black transition duration-300">
            This is the end...
          </p>
        </div>
      )}
    </section>
  );
};
