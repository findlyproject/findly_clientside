"use client";
import { useAppSelector } from "@/lib/store/hooks";

export const AddPost = () => {
  const { activeuser } = useAppSelector((state) => state.login);

  return (
    <section className="bg-white border border-gray-300 rounded-xl p-4 shadow-md w-full max-w-3xl mx-auto">
      {/* Top Section */}
      <section className="flex items-center gap-3 sm:gap-4 mb-3">
        {/* Profile Image */}
        <div className="w-10 h-10 sm:w-12 sm:h-12">
          <img
            src={activeuser?.profileImage || "/default-profile.png"}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        {/* Start a Post Button */}
        <button className="flex-grow px-4 py-2 sm:py-3 border border-gray-400 rounded-full text-gray-500 text-left hover:bg-gray-100">
          Start a post
        </button>
      </section>

      {/* Button Actions (Responsive Grid) */}
      <section className="grid grid-cols-2 sm:flex sm:justify-between gap-2 sm:gap-4">
        <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 p-2 rounded-md text-sm sm:text-base">
          <span>📷 Photo</span>
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 p-2 rounded-md text-sm sm:text-base">
          <span>🎥 Video</span>
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 p-2 rounded-md text-sm sm:text-base">
          <span>📅 Event</span>
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 p-2 rounded-md text-sm sm:text-base">
          <span>📝 Write article</span>
        </button>
      </section>
    </section>
  );
};
