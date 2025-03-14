"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSaved } from "@/lib/store/features/postSlice";
import { PostPreviewProps } from "@/types/Types";
import { ReportPostModal } from "@/components/homePage/middle/postPreview/ReportModal";
import { UpdatePost } from "../UpdatePost";
import OutsideClickHandler from "react-outside-click-handler";
import {
  DeletePost,
} from "@/lib/store/features/actions/postActions";

export const PostMenu = ({ post }: PostPreviewProps) => {
  const { activeuser } = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [UpdateOpen, setIsUpdateOpen] = useState(false); // post update

  const dispatch = useAppDispatch();

  //delete post
  const deletePost = async (id: string) => {
    dispatch(DeletePost({ postId: id }));

  };
  return (
    <>
    <section className="absolute z-10">
      <div className=" bg-white text-sm rounded-lg shadow-lg  p-1">
        {activeuser?._id == post?.owner?._id ? (
          <>
            <button
              className="flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded-md transition mt-2"
              onClick={() => setIsUpdateOpen(true)}
            >
              <span>Update</span>
            </button>
            <button
              className="flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded-md transition mt-2"
              onClick={() => deletePost(post._id)}
            >
              <span>Delete</span>
            </button>
          </>
        ) : (
          <>
            <button
              className="flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded-md transition mt-1"
              onClick={() => setIsModalOpen(true)}
            >
              <span>Report</span>
            </button>
          </>
        )}
        
      </div>
    </section>
    {isModalOpen && (
      <OutsideClickHandler onOutsideClick={() => setIsModalOpen(false)}>
        <ReportPostModal
          postId={post._id}
          onClose={() => setIsModalOpen(false)}
        />
      </OutsideClickHandler>
    )}

    {UpdateOpen && post?._id && (
          <UpdatePost post={post} UpdateOpen={UpdateOpen} />
    )}
    </>
  );
};
