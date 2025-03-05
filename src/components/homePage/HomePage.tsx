

"use client";
import { useEffect } from "react";
import { Posts } from "./middle/Posts";
import { LeftSideBar } from "./leftSide/LeftSide";
import { fetchAllPosts } from "@/lib/store/features/actions/postActions"; // ✅ Import the asyncThunk
import { useAppDispatch } from "@/lib/store/hooks";
import { fetchAllComments } from "@/lib/store/features/actions/commentActions";
import { fetchPeopleKnow } from "@/lib/store/features/actions/userActions";

const HomePage = () => {
  const dispatch = useAppDispatch(); 

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchAllComments());
    dispatch(fetchPeopleKnow())

  }, [dispatch]);

  return (
    <section className="grid bg-gray-100 w-full grid-cols-1 md:[grid-template-columns:40%_60%] px-2 xl:px-16">
      <LeftSideBar />
      <Posts />
    </section>
  );
};

export default HomePage;



