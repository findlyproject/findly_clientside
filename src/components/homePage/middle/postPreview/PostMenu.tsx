"use client";
import {  useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {  setSaved } from "@/lib/store/features/postSlice";
import {  PostPreviewProps } from "@/types/Types";
import { ReportPostModal } from "@/components/homePage/middle/postPreview/ReportModal";
import { UpdatePost } from "../UpdatePost";
import OutsideClickHandler from "react-outside-click-handler";
import {
  DeletePost,
  fetchAllPosts,
} from "@/lib/store/features/actions/postActions";
import api from "@/utils/api";

export const PostMenu = ({ post }: PostPreviewProps) => {
  const { activeuser } = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [UpdateOpen, setIsUpdateOpen] = useState(false); // post update

  
  const dispatch = useAppDispatch();
 
  //delete post
  const deletePost = async (id: string) => {
    dispatch(DeletePost({ postId: id }));
    dispatch(fetchAllPosts(0));
  };
  return (
    <section className="absolute z-10">
      <div className=" bg-white text-sm rounded-lg shadow-lg  p-1">
        
        {activeuser?._id == post?.owner?._id ? (
          <>
            <button
              className="flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded-md transition mt-2"
              onClick={() => setIsUpdateOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>

              <span>Update</span>
            </button>
            <button
              className="flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded-md transition mt-2"
              onClick={() => deletePost(post._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>

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
        {isModalOpen && (
           <OutsideClickHandler onOutsideClick={() => setIsModalOpen(false)}>
          <ReportPostModal
            postId={post._id}
            onClose={() => setIsModalOpen(false)}
            
          />
          </OutsideClickHandler>
        )}

        {UpdateOpen && post?._id && (
          <section className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <OutsideClickHandler onOutsideClick={() => setIsUpdateOpen(false)}>
              <UpdatePost post={post} setIsUpdateOpen={setIsUpdateOpen} />
            </OutsideClickHandler>
          </section>
        )}
      </div>
    </section>
  );
};
