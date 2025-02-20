"use client";

import { useState } from "react";
import api from "@/utils/api";


export const ReportUserModal = ({ repoteduserid, onClose }) => {
  console.log("postId", repoteduserid);
  const [reason, setReason] = useState("");

  const handleSubmit = async () => {
    const response = await api.post(`/user/reportuser`, {
      reason: reason,
      repoteduserid,
    });
    console.log("response of report userrr", response);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96">
        <h2 className="text-lg font-semibold mb-2">Report User</h2>
        <p className="text-sm text-gray-600 mb-4">
          Why are you reporting this user?
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
            className="bg-primary text-white px-4 py-2 rounded-md text-sm"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
