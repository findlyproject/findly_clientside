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
    console.log("kkkkkkkkk")
  }, [dispatch]);
  return (
    <section className="grid grid-cols-[minmax(0,5fr)_minmax(0,13fr)_minmax(300px,7fr)] grid-rows-auto gap-x-10 gap-y-10 pt-16 sm:grid-cols-[minmax(0,5fr)_minmax(0,13fr)] sm:gap-x-6 sm:gap-y-6 xs:grid-cols-1 xs:mx-6">
      <LeftSideBar />
      <Posts />
    </section>
  );
};

export default HomePage;


