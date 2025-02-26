"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { IPost } from "@/lib/store/features/postSlice";
import { ReportPostModal } from "@/components/homePage/middle/postPreview/ReportModal";
import { UpdatePost } from "../UpdatePost";
import OutsideClickHandler from "react-outside-click-handler";
import {
  DeletePost,
  fetchAllPosts,
} from "@/lib/store/features/actions/postActions";
interface PostPreviewProps {
  post: IPost;
}
export const PostMenu = ({ post }: PostPreviewProps) => {
  const { activeuser } = useAppSelector((state) => state.login);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [UpdateOpen, setIsUpdateOpen] = useState(false); // post update
  const dispatch = useAppDispatch();
  //delete post
  const deletePost = async (id: string) => {
    dispatch(DeletePost({ postId: id }));
    dispatch(fetchAllPosts());
  };
  return (
    <section className="absolute z-10">
      
      <div className=" bg-white text-sm rounded-lg shadow-lg  p-2">
        <button className="flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded-md transition">
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
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
            />
          </svg>

          <span>CopyLink </span>
        </button>
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
          <button
            className="flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded-md transition mt-2"
            onClick={() => setIsModalOpen(true)}
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
                d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
              />
            </svg>

            <span>Report</span>
          </button>
        )}
        {isModalOpen && (
          <ReportPostModal
            postId={post._id}
            onClose={() => setIsModalOpen(false)}
          />
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
