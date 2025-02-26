

"use client";
import { useEffect } from "react";
import { Posts } from "./middle/Posts";
import { LeftSideBar } from "./leftSide/LeftSide";
import { fetchAllPosts } from "@/lib/store/features/actions/postActions"; // ✅ Import the asyncThunk
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchAllComments } from "@/lib/store/features/actions/commentActions";

const HomePage = () => {
  const dispatch = useAppDispatch(); 
  const activeCompany=useAppSelector((state)=>state.companyLogin.activeCompany)
  console.log("activeCompany",activeCompany);
  

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchAllComments());
  }, [dispatch]);

  return (
    <section className="grid bg-gray-100 w-full gap-x-6 gap-y-6 grid-cols-1 sm:grid-cols-[1fr,2fr] lg:grid-cols-[1fr,3fr] px-4">
      <LeftSideBar />
      <Posts />
    </section>
  );
};

export default HomePage;



