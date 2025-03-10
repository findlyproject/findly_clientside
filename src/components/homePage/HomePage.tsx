

"use client";
import { useEffect, useRef, useState } from "react";
import { Posts } from "./middle/Posts";
import { LeftSideBar } from "./leftSide/LeftSide";
import { fetchAllPosts } from "@/lib/store/features/actions/postActions"; 
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchAllComments } from "@/lib/store/features/actions/commentActions";
import { fetchPeopleKnow } from "@/lib/store/features/actions/userActions";

import { motion } from "framer-motion";
import RightSide from "./rightSide/RightSide";

const HomePage = () => {
  const lastFetchedPage = useRef<number>(null);
  const [page, setPage] = useState<number>(1); 
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch(); 
const {activeuser}=useAppSelector(state=>state.user)
const [isLeftSticky, setIsLeftSticky] = useState(false);
  const leftSidebarRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!leftSidebarRef.current) return;
      
  //     const sidebarBottom = leftSidebarRef.current.getBoundingClientRect().bottom;
  //     const windowHeight = window.innerHeight;
      
  //     if (sidebarBottom <= windowHeight) {
  //       setIsLeftSticky(true);  // Make it sticky when it reaches the end
  //     } else {
  //       setIsLeftSticky(false); // Allow normal scrolling
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  
  useEffect(() => {
 
    dispatch(fetchAllComments());
    if(activeuser){dispatch(fetchPeopleKnow())}

  }, [dispatch])
  useEffect(()=>{
   Display()
  },[])

  const Display=async()=>{
    console.log("lastFetchedPage.current",lastFetchedPage.current);
    
    if (lastFetchedPage.current === page) return; 
    lastFetchedPage.current = page;
    const result=await dispatch(fetchAllPosts(1))
    console.log("stttuts",result);
    
  }
  const loadMorePosts = async () => {
    console.log('he');
    
    console.log('ho');
    setLoading(true);
    await dispatch(fetchAllPosts(page + 1));
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  const [showMessage,setShowMessage]=useState(true)

  return (
  <section
  className="grid bg-gray-100 pt-16 -z-10 transition-all duration-300 grid-cols-1 lg:grid-cols-[15%_20%_40%_25%] lg:justify-center "
>
  <div className="w-full"></div>
<div
        ref={leftSidebarRef}
        className={`overflow-y-auto ${
          isLeftSticky ? "sticky top-0 h-screen" : "h-auto"
        }`}
      >
        <LeftSideBar />
      </div>

  <Posts loadMorePosts={loadMorePosts} loading={loading} />
  {activeuser&&
  <>
  <button
    type="button"
    onClick={() => setShowMessage(!showMessage)}
    className="fixed right-0 py-10 px-2 inline-flex justify-center bg-white items-center text-primary text-sm font-medium rounded-lg shadow-sm align-middle focus:outline-none"
    aria-haspopup="dialog"
    aria-expanded="false"
    aria-controls="hs-sidebar-empty-content"
    aria-label="Toggle navigation"
    data-hs-overlay="#hs-sidebar-empty-content"
    style={{ writingMode: "vertical-rl", textOrientation: "sideways" }}
    onMouseEnter={() => setShowMessage(true)}
  >
    messages
  </button>
  { showMessage &&
    <motion.div 
    className="pr-10  pt-7 " 
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}   
    exit={{ opacity: 0, x: 50, scale: 0.9 }}  
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
  <RightSide/>
  </motion.div>}
  </>}
</section>

  );
};

export default HomePage;



