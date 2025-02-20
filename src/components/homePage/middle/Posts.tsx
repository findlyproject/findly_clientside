import { AddPost } from "./AddPost";
import { PostsList } from "./PostsList";

export const Posts = () => {
  return (
    <section className="grid-area-posts space-y-3 px-4 sm:px-6 md:px-0 lg:w-full  max-w-3xl mx-auto flex flex-col-reverse md:flex-col">
      <AddPost />
      <PostsList />
    </section>
  );
};
