"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faShare, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface PostActionsProps {
  userId: string;
}

export const PostActions = ({ userId }: PostActionsProps) => {
  const router = useRouter();

  return (
    <section className="flex items-center justify-around mb-2">
      <button className="flex items-center justify-center bg-white text-gray-500 px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">
        <FontAwesomeIcon icon={faThumbsUp} className="w-5 h-5 mr-2" />
        <span className="hidden sm:inline">Like</span>
      </button>
      <button className="flex items-center justify-center bg-white text-gray-500 px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">
        <FontAwesomeIcon icon={faComment} className="w-5 h-5 mr-2" />
        <span className="hidden sm:inline">Comment</span>
      </button>
      <button className="flex items-center justify-center bg-white text-gray-500 px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">
        <FontAwesomeIcon icon={faShare} className="w-5 h-5 mr-2" />
        <span className="hidden sm:inline">Share</span>
      </button>
      <button
        className="flex items-center justify-center bg-white text-gray-500 px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black"
        onClick={() => router.push(`/main/message/${userId}`)}
      >
        <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5 mr-2" />
        <span className="hidden sm:inline">Send</span>
      </button>
    </section>
  );
};
