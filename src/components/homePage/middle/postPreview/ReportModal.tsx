"use client";

import { useState } from "react";
import api from "@/utils/api";
import { useAppDispatch } from "@/lib/store/hooks";

export const ReportPostModal = ({ postId, onClose }) => {
  console.log("postId", postId);
  const [reason, setReason] = useState("");

  const handleSubmit = async () => {
    const response = await api.post(`/post/user/reportpost`, {
      reason: reason,
      postId,
    });
    console.log("response of report", response);
    onClose();
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
