"use client";
import { useState },React={} from "react";
import { FiImage } from "react-icons/fi";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic
    console.log({ title, image, description });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900">Create a Post</h2>
      <p className="text-gray-600 mb-6">
        Share Your Thoughts: Create a Post to Engage and Inspire the Community
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add attractive title"
            className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-purple-200 outline-none"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Image</label>
          <div className="relative border border-gray-300 rounded-md p-3 flex items-center cursor-pointer">
            <FiImage className="text-gray-500 w-6 h-6 mr-2" />
            <span className="text-gray-500">Upload Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          {image && (
            <p className="text-sm text-gray-500 mt-1">
              Selected file: {image.name}
            </p>
          )}
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add your description..."
            className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-purple-200 outline-none h-28"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-medium py-3 rounded-md hover:bg-purple-700 transition"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
