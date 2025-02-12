"use client";
import { useState } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IPost } from "@/lib/store/features/postSlice";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import {ReportPostModal} from '@/components/homePage/middle/postPreview/ReportModal'
interface PostPreviewProps {
  post: IPost;
}
export const PostMenu = ({ post }: PostPreviewProps) => {  
  console.log("postpostpost",post);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
 

 
  return (
    <section className="absolute inset-0 z-10">
     
      <div className="absolute inset-0" ></div>

     
      <div className="relative bg-white rounded-lg shadow-lg w-72 p-4">
        
        <button
          className="flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded-md transition"
          
        >
          <FontAwesomeIcon icon={faCopy} className="mr-2 text-blue-500" />
          <span>Copy link to post</span>
        </button>

        
        <button
          className="flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded-md transition mt-2"
          onClick={() => setIsModalOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-primary">
  <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clipRule="evenodd" />
</svg>

          <span>Report post</span>
        </button>
        {isModalOpen && <ReportPostModal postId={post._id} onClose={() => setIsModalOpen(false)} />}
      </div>
    </section>
  );
};
