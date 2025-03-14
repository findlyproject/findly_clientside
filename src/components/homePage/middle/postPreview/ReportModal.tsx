"use client";

import { useState } from "react";
import { ReportPostModalType } from "@/types/Types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { reportPost } from "@/lib/store/features/actions/userActions";
import { toast } from "react-toastify";


export const ReportPostModal: React.FC<ReportPostModalType> = ({ postId, onClose })=> {
  const activeCompany=useAppSelector((state)=>state.companyLogin.activeCompany)
  const route=activeCompany?"company":"user"
  const [reason, setReason] = useState("");
const dispatch=useAppDispatch()
  const handleSubmit = async () => {
    const result=await dispatch(reportPost({reason,postId,route}))
    if(result.type==="report/posts/fulfilled"){
      onClose();
      toast.success("reported")
    }

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96">
        <h2 className="text-lg font-semibold mb-2">Report Post</h2>
        <p className="text-sm text-gray-600 mb-4">
          Why are you reporting this post?
        </p>

        <textarea
          className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-primary"
          rows={3}
          placeholder="Enter reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-gray-200 px-4 py-2 rounded-md text-sm hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
