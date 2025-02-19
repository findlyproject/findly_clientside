"use client";
import {
  addPostByUser,
  fetchAllPosts,
} from "@/lib/store/features/actions/postActions";
import { useAppDispatch } from "@/lib/store/hooks";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiImage } from "react-icons/fi";

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [description, setDescription] = useState("");

  useEffect(() => {
    // Cleanup object URLs to prevent memory leaks
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
      if (previewVideo) URL.revokeObjectURL(previewVideo);
    };
  }, [previewImages, previewVideo]);

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      console.log("files", event.target.files);

      setSelectedFiles((prevFiles) => {
        // Filter out duplicates
        const newFiles = files.filter(
          (file) => !prevFiles.some((prev) => prev.name === file.name)
        );

        // Combine existing and new files (limit to 5)
        const updatedFiles = [...prevFiles, ...newFiles].slice(0, 5);

        //  previews are generated
        const updatedImages = updatedFiles
          .filter((file) => file.type.startsWith("image/"))
          .map((file) => URL.createObjectURL(file));

        const updatedVideo = updatedFiles.find((file) =>
          file.type.startsWith("video/")
        )
          ? URL.createObjectURL(
              updatedFiles.find((file) => file.type.startsWith("video/"))!
            )
          : null;

        setPreviewImages(updatedImages);
        setPreviewVideo(updatedVideo);

        return updatedFiles;
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(addPostByUser({ description, mediaFiles: selectedFiles }));
    dispatch(fetchAllPosts());
    setDescription("");
    setSelectedFiles([]);
    setPreviewImages([]);
    setPreviewVideo(null);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900">Create a Post</h2>
      <p className="text-gray-600 mb-6">
        Share Your Thoughts: Create a Post to Engage and Inspire the Community
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Media Upload (Image or Video) */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Upload Media
          </label>
          <p className="text-sm text-gray-500 mt-1">
            {selectedFiles.length} / 5 images selected
          </p>
          <div className="relative border border-gray-300 rounded-md p-3 flex items-center cursor-pointer">
            <FiImage className="text-gray-500 w-6 h-6 mr-2" />
            <span className="text-gray-500">Upload Image or Video</span>

            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              multiple
            />
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-4">
          {previewImages.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {previewImages.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Preview ${index + 1}`}
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover rounded-md border"
                />
              ))}
            </div>
          )}

          {previewVideo && (
            <div className="mt-2">
              <video controls className="w-full rounded-md border">
                <source src={previewVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
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
