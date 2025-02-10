"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";



export const PostMenu = () => {  
  const { activeuser } = useAppSelector((state) => state.login);


  return (
    <section className="absolute">
      

      {/* Post Menu */}
      <div className="relative bg-white rounded-lg shadow-lg w-72 p-4">
        {/* Copy Link Button */}
        <button
          className="flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded-md transition"
          
        >
          <FontAwesomeIcon icon={faCopy} className="mr-2 text-blue-500" />
          <span>Copy link to post</span>
        </button>

        {/* Delete Post Button (Optional) */}
        <button
          className="flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded-md transition mt-2"
          onClick={() => alert("Delete post functionality pending!")}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-2 text-red-500" />
          <span>Delete Post</span>
        </button>
      </div>
    </section>
  );
};
