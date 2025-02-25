import { fetchAllPosts, updatePostByUser } from "@/lib/store/features/actions/postActions";
import { useAppDispatch } from "@/lib/store/hooks";
import { useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { IPost } from "@/lib/store/features/postSlice";
import Image from "next/image";
import { toast } from "react-toastify";

export const UpdatePost = ({ post,setIsUpdateOpen }: { post: IPost,setIsUpdateOpen:boolean }) => {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState(post?.description ?? "");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [oldPost, setOldPost] = useState<IPost | null>(post);

  useEffect(() => {
    setOldPost(post);   
  }, [post]);

  useEffect(() => {   
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
      if (previewVideo) URL.revokeObjectURL(previewVideo);
    };
  }, [previewImages, previewVideo]);

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);

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
    console.log(post._id)
    dispatch(
      updatePostByUser({
        postId: post._id,
        description,
        mediaFiles: selectedFiles,
      })
      
    )
      .unwrap()
      .then(() => {
        toast.success("Post updated successfully!");
        dispatch(fetchAllPosts())
        setIsUpdateOpen(false)
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900">Update Post</h2>

      {/* Existing Post View */}
      {oldPost && (
        <div className="mb-4 p-3 border border-gray-300 rounded-md bg-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Existing Post</h3>

          {/* Existing Images */}
          {oldPost.images?.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-2">
              {oldPost.images?.map((src, index) => (
                <img
                  key={index}
                  src={src} 
                  alt={`Old Image ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md border"
                />
              ))}
            </div>
          )}

          {/* Existing Video */}
          {oldPost.video && (
            <div className="mt-2">
              <video controls className="w-full rounded-md border">
                <source src={oldPost.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      )}

      {/* Update Form */}
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
