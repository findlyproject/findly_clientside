

"use client";
import { useEffect, useRef, useState } from "react";
import { Posts } from "./middle/Posts";
import { LeftSideBar } from "./leftSide/LeftSide";
import { fetchAllPosts } from "@/lib/store/features/actions/postActions"; // ✅ Import the asyncThunk
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchAllComments } from "@/lib/store/features/actions/commentActions";
import { fetchPeopleKnow } from "@/lib/store/features/actions/userActions";
import RightSide from "./rightSide/RightSide";
import { motion } from "framer-motion";

const HomePage = () => {
  const dispatch = useAppDispatch(); 
const {activeuser}=useAppSelector(state=>state.login)
const [isLeftSticky, setIsLeftSticky] = useState(false);
  const leftSidebarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!leftSidebarRef.current) return;
      
      const sidebarBottom = leftSidebarRef.current.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      if (sidebarBottom <= windowHeight) {
        setIsLeftSticky(true);  // Make it sticky when it reaches the end
      } else {
        setIsLeftSticky(false); // Allow normal scrolling
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchAllComments());
    if(activeuser){dispatch(fetchPeopleKnow())}

  }, [dispatch]);
  const [showMessage,setShowMessage]=useState(false)

  return (
  <section
  className={`grid bg-gray-100 pt-16 px-10 -z-10 transition-all duration-300 ${
    showMessage && activeuser? "grid-cols-[20%_40%_40%]" : "grid-cols-[20%_40%] justify-center"
  }`}
>
<div
        ref={leftSidebarRef}
        className={`overflow-y-auto ${
          isLeftSticky ? "sticky top-0 h-screen" : "h-auto"
        }`}
      >
        <LeftSideBar />
      </div>

  <Posts />
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
    message
  </button>
  { showMessage &&
    <motion.div 
    className=" w-[580px] sticky pt-7   right-10"
    initial={{ opacity: 0, x: 50 }}  // Starts from right
    animate={{ opacity: 1, x: 0 }}   // Moves to normal position
    exit={{ opacity: 0, x: 50, scale: 0.9 }}  // Closes smoothly (moves right & shrinks)
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
  
  <RightSide  />
  </motion.div>}
  </>}
</section>

  );
};

export default HomePage;



