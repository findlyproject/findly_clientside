"use client";

import {
  postresume,
  removeResume,
} from "@/lib/store/features/actions/resumeActions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import React, { useState, ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";

interface FilesState {
  resume?: File | null;
  introductionVideo?: File | null;
}

const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

const FileUpload = () => {
  const resumePdf = useAppSelector((state) => state.user.activeuser?.resumePDF);
  const resumevideo = useAppSelector((state) => state.user.activeuser?.resumeVideo);

  const dispatch = useAppDispatch();

  const [files, setFiles] = useState<FilesState>({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("resume");

  useEffect(() => {
    if (resumePdf?.[0]) {
      setPreviewUrl(resumePdf.fileUrl);
    } else if (resumevideo?.[0]) {
      setPreviewUrl(resumevideo.fileUrl);
    }
  }, [resumePdf, resumevideo]);

  const handleFileUpload = (
    event: ChangeEvent<HTMLInputElement>,
    type: keyof FilesState
  ) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (!selectedFile) return;

    const isValid = validateFile(selectedFile, type);
    if (!isValid) return;

    setFiles((prevFiles) => ({ ...prevFiles, [type]: selectedFile }));
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const validateFile = (file: File, type: keyof FilesState) => {
    const allowedExtensions =
      type === "resume" ? [".pdf"] : [".mp4", ".mov", ".avi"];
    const maxSize = type === "resume" ? MAX_RESUME_SIZE : MAX_VIDEO_SIZE;

    const fileExtension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      setErrorMessage(
        `Invalid file type. Allowed: ${allowedExtensions.join(", ")}`
      );
      return false;
    }

    if (file.size > maxSize) {
      setErrorMessage(
        `File size exceeds limit. Max: ${maxSize / 1024 / 1024}MB`
      );
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.resume && !files.introductionVideo) {
      setErrorMessage("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    if (files.resume) formData.append("resume", files.resume);
    if (files.introductionVideo)
      formData.append("video", files.introductionVideo);

    try {
      setErrorMessage("");
      const result = await dispatch(postresume(formData));

      if (result.type === "post/resume/fulfilled") {
        toast.success("File uploaded successfully");
        setFiles({ resume: null, introductionVideo: null });
        setPreviewUrl(null);
      }
    } catch (error) {
      setErrorMessage("An error occurred during the upload.");
      console.error("Upload Error:", error);
    } finally {
    }
  };

  const handleRemoveResume = async (type: string) => {
    const removeResult = await dispatch(removeResume(type));
    if (removeResult.type === "remove/resume/fulfilled") {
      setFiles({ resume: null, introductionVideo: null });
      setPreviewUrl(null);
    }
  };

  return (
      <div className="mx-auto w-full rounded-md bg-white">
        <form className="py-6 px-9" onSubmit={handleUpload}>
          {/* Tabs */}
          <div className="mb-5 flex justify-around">
            <p
              onClick={() => setActiveTab("resume")}
              className={`cursor-pointer ${
                activeTab === "resume"
                  ? "text-primary font-bold"
                  : "text-gray-500"
              }`}
            >
              Resume
            </p>
            <p
              onClick={() => setActiveTab("video")}
              className={`cursor-pointer ${
                activeTab === "video"
                  ? "text-primary font-bold"
                  : "text-gray-500"
              }`}
            >
              Video
            </p>
          </div>

          {/* File Upload Section */}
          <div className="mb-6 pt-4">
            {activeTab === "resume" ? (
              <>
                <>
                  {files.resume || (resumePdf && resumePdf.length > 0) ? (
                    <div>
                      <p className="text-sm font-semibold">
                        {files.resume?.name || resumePdf[0]?.fileName}
                      </p>
                      <iframe
                        src={files.resume ? previewUrl : resumePdf[0]?.fileUrl}
                        title="Resume Preview"
                        width="400px"
                        height="400px"
                        className="border border-gray-300 bg-gray-100"
                      />
                      <div className="flex justify-between items-center mt-3">
                        <button
                          type="button"
                          className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition"
                          onClick={() => handleRemoveResume("resume")}
                        >
                          Remove
                        </button>
                        <button
                          type="submit"
                          className="bg-primary py-2 px-6 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                        >
                          Upload File
                        </button>
                      </div>
                    </div>
                  ) : (
                    <FileInput
                      accept=".pdf"
                      onChange={(e) => handleFileUpload(e, "resume")}
                    />
                  )}
                </>
              </>
            ) : (
              <>
                {files.introductionVideo ||
                (resumevideo && resumevideo.length > 0) ? (
                  <>
                  <div>
                    <p className="text-sm font-semibold">
                      {files.introductionVideo?.name ||
                        resumevideo[0]?.fileName}
                    </p>
                    <video
                      controls
                      width="400px"
                      height="100%"
                      className="border border-gray-300 bg-gray-100"
                    >
                      <source
                        src={
                          files.introductionVideo
                            ? previewUrl
                            : resumevideo[0]?.fileUrl
                        }
                        type="video/mp4"
                      />
                    </video>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                        <button
                          type="button"
                          className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition"
                          onClick={() => handleRemoveResume("introductionVideo")}
                        >
                          Remove
                        </button>
                        <button
                          type="submit"
                          className="bg-primary py-2 px-6 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                        >
                          Upload File
                        </button>
                      </div>
                    
                    </>
                  
                ) : (
                  <FileInput
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e, "introductionVideo")}
                  />
                )}
              </>
            )}
          </div>

          {/* Submit Button */}

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}
        </form>
      </div>
  );
};

const FileInput = ({
  accept,
  onChange,
}: {
  accept: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <label className="mb-5 block text-xl font-semibold text-[#07074D]">
      Upload File
    </label>
    <div className="mb-8">
      <label className="relative flex h-[400px] w-[400px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
        <input
          type="file"
          accept={accept}
          onChange={onChange}
          className="sr-only"
        />
        <div>
          <span className="mb-2 block text-xl font-semibold text-[#07074D]">
            Drop files here
          </span>
          <span className="mb-2 block text-base font-medium text-[#6B7280]">
            Or
          </span>
          <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
            Browse
          </span>
        </div>
      </label>
    </div>
  </div>
);

export default FileUpload;
