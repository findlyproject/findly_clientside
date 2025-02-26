import { AddPost } from "./AddPost";
import { PostsList } from "./PostsList";

export const Posts = () => {
  return (
    <section className="grid-area-posts space-y-3 w-full mx-auto flex flex-col-reverse md:flex-col ">
      <AddPost />
      <PostsList />
    </section>
  );
};
