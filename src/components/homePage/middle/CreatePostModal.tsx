"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAppSelector } from "@/lib/store/hooks";

const CreatePostModal = ({ onClose }: { onClose: () => void }) => {
  const { activeuser } = useAppSelector((state) => state.login);
  
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Post Data:", { body, link });
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form className="bg-white rounded-lg shadow-lg w-[90%] max-w-xl p-6 relative" onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="text-xl font-semibold">Create a post</h1>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FontAwesomeIcon icon={faXmark} className="text-lg" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 py-4">
          <img
            src={activeuser?.profileImage || "/default-profile.png"}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <h2 className="text-lg font-semibold">{activeuser?.firstName || "User"}</h2>
        </div>

        {/* Post Content */}
        <textarea
          required
          className="w-full border rounded-md p-3 mb-3 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="What do you want to talk about?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        {/* Add Link */}
        <input
          type="text"
          className="w-full border rounded-md p-3 mb-3 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Add a link here"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Done
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePostModal;
