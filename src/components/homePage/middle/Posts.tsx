import React from "react";
import { AddPost } from "./AddPost";
import { PostsList } from "./PostsList";
export interface propspsts{
  loadMorePosts:()=>void,
  loading:boolean
}
export const Posts:React.FC<propspsts> = ({loadMorePosts,loading}) => {
  console.log("loadMorePosts",loadMorePosts);
  
  return (
    <section className="grid-area-posts space-y-3 w-full mx-auto flex flex-col-reverse md:flex-col ">
      <AddPost />
      <PostsList loadMorePosts={loadMorePosts} loading={loading} />
    </section>
  );
};
