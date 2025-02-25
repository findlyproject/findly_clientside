
"use client"
import { useAppSelector } from '@/lib/store/hooks';
import api from '@/utils/api';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Apply = () => {
  const activ = useAppSelector((state) => state.user.activeuser);
  const { id } = useParams();
  
  const [data, setData] = useState({
    resumDocName: activ?.resumePDF?.[0]?.fileName || "my resume",
    resumDocUploadedAt: activ?.resumePDF?.[0]?.uploadedAt || null,
    resumDocUrl: activ?.resumePDF?.[0]?.fileUrl || null,
    resumVideoName: activ?.resumeVideo?.[0]?.fileName || null,
    resumVideouploadedAt: activ?.resumeVideo?.[0]?.uploadedAt || null,
    resumVideoUrl: activ?.resumeVideo?.[0]?.fileUrl || null,
    coverLetter: "",
  });
  
  const [files, setFile] = useState<{ doc: File | null; video: File | null }>({ doc: null, video: null });
  const [fileNames, setFileNames] = useState({ doc: "", video: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // interface FileData {
  //   doc: string;
  //   video: string;
  // }
  
  interface FileNames {
    doc: string;
    video: string;
  }
  
  const handleFileChange = (type: "doc" | "video", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile((prevFiles) => ({
        ...prevFiles,
        [type]: file,
      }));
      setFileNames((prevFileNames: FileNames) => ({
        ...prevFileNames,
        [type]: file.name,
      }));
    }
  };
  
  const uploadFile = async (file: File, type: "raw" | "video") => {
    if (!file) return null;
    try {
      const response = await api.get("/user/generate-signed-url", {
        params: { fileType: file.type, resourceType: type },
      });
  
      const { api_key, timestamp, signature, folder, cloudName } = response.data;
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", folder);
  
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`;
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });
  
      const data = await uploadResponse.json();
      if (!data.secure_url) throw new Error(`${type} Upload Failed`);
  
      // toast.success(`${type === "raw" ? "Resume" : "Video"} uploaded successfully!`);
      return data.secure_url;
    } catch {
      toast.error(`Error uploading ${type === "raw" ? "resume" : "video"}`);
      return null;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedData = { ...data };
  
      if (files.doc || files.video) {
        const uploadPromises = [];
        if (files.doc) uploadPromises.push(uploadFile(files.doc, "raw"));
        if (files.video) uploadPromises.push(uploadFile(files.video, "video"));
  
        const [docUrl, videoUrl] = await Promise.all(uploadPromises);
  
        if (docUrl) updatedData.resumDocUrl = docUrl;
        if (videoUrl) updatedData.resumVideoUrl = videoUrl;
        setData(updatedData);
      }
  
      if (!updatedData.resumDocUrl) {
        toast.warning("Upload your resume document");
        return;
      }
      if (!updatedData.resumVideoUrl) {
        toast.warning("Upload your introduction video");
        return;
      }
  
      await postToBackend(updatedData);
    } catch {
      toast.error("Error uploading files. Please try again.");
    }
  };
  
  const postToBackend = async (updatedData: typeof data) => {
    try {
      await api.post(`user/applytojob/${id}`, {
        coverLetter: updatedData.coverLetter,
        resumeName: updatedData.resumDocName,
        resumeUrl: updatedData.resumDocUrl,
        resumeVideoName: updatedData.resumVideoName,
        resumeVideoUrl: updatedData.resumVideoUrl,
      });
      toast.success("Applied successfully!");
    } catch (error) {
      toast.warning(error.response?.data?.message || "Error applying to job.");
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Your Application Documents</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Resume Document</h2>
            
            {data.resumDocUrl && (
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p className="font-medium">{data?.resumDocName}</p>
                      <p className="text-sm text-gray-500">Uploaded on {data?.resumDocUploadedAt ? new Date(data.resumDocUploadedAt).toLocaleDateString() : "N/A"}</p>
                    </div>
                  </div>
                  {/* <button type="button" className="text-blue-500 hover:text-blue-700" onClick={()=>"jkfhgjhdjgfdghdfjk"}>
                    View Resume
                  </button> */}
                  <a href={data.resumDocUrl || undefined} className="text-blue-500 hover:text-blue-700 cursor-pointer">veiw resum</a>
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
              <div className="flex flex-col items-center">
                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange('doc', e)}
                  className="hidden"
                  id="resumeDoc"
                />
                <label
                  htmlFor="resumeDoc"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
                >
                  {data.resumDocUrl ? "Update Document":"Upload Document"}
                </label>
                {fileNames.doc && (
                  <p className="mt-2 text-sm text-gray-600">Selected: {fileNames.doc}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">Accepted formats: PDF, DOC, DOCX</p>
              </div>
            </div>
          </div>

          
                    {/* Video Resume Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Video Resume</h2>
                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <div>
                                        <p className="font-medium">{data?.resumVideoName || "No video uploaded"}</p>
                                        <p className="text-sm text-gray-500">Uploaded on {data?.resumVideouploadedAt ? new Date(data.resumVideouploadedAt).toLocaleDateString() : "N/A"}</p>
                                    </div>
                                </div>
                                <button 
                                    type="button" 
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Play
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Modal for Video Playback */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center h-44 mt-40">
                            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
                                <button 
                                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-lg"
                                    onClick={() => setIsModalOpen(false)}>
                                    ✖
                                </button>
                                <h2 className="text-lg font-bold mb-4">Resume Video</h2>
                                <video 
                                    controls 
                                    className="w-full rounded-lg"
                                >
                                    <source src={data?.resumVideoUrl || "/api/placeholder/400/320"} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    )}
                <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
              <div className="flex flex-col items-center">
                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange('video', e)}
                  className="hidden"
                  id="resumeVideo"
                />
                <label
                  htmlFor="resumeVideo"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
                >
                  Update Video
                </label>
                {fileNames.video && (
                  <p className="mt-2 text-sm text-gray-600">Selected: {fileNames.video}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">Max size: 100MB</p>
              </div>
            </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Cover Letter</h2>
            <textarea
              rows={6}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your cover letter here..."
              value={data.coverLetter}
              onChange={(e) => setData({...data, coverLetter: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Update Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default Apply;