"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";

interface PostMenuProps {
  onClose: () => void;
  postLink: string;
}

export const PostMenu = ({ onClose, postLink }: PostMenuProps) => {  
  const { activeuser } = useAppSelector((state) => state.login);

  const handleCopyLink = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    navigator.clipboard.writeText(postLink);
    alert("Post link copied to clipboard!");
  };

  return (
    <section className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-30">
      {/* Background Overlay */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Post Menu */}
      <div className="relative bg-white rounded-lg shadow-lg w-72 p-4">
        {/* Copy Link Button */}
        <button
          className="flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded-md transition"
          onClick={handleCopyLink}
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
