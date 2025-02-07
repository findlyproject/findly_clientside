"use client"


import api from "@/utils/api";
import React, { useState, ChangeEvent } from "react";


interface FilesState {
  resume: File | null;
  introductionVideo: File | null;
}
 
const FileUpload = () => {
  const [files, setFiles] = useState<FilesState>({
    resume: null,
    introductionVideo: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

 
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>, type: "resume" | "introductionVideo") => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    console.log("selectedFile",selectedFile);
    
    if (selectedFile) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [type]: selectedFile,
      }));
    }
  };
console.log("files",files);


  const handleUpload = async () => {
    const formData = new FormData();
    const { resume, introductionVideo } = files;

    
    if (!resume && !introductionVideo) {
      setErrorMessage("Please select a file to upload");
      return;
    }


    if (resume) formData.append("resume", resume);
    if (introductionVideo) formData.append("introductionVideo", introductionVideo);
    console.log("formData",formData);
    

    try {
      setLoading(true);
      setErrorMessage(""); 
      const response = await api.post("/user/uploadressume",formData);

  console.log("ress",response);
  

      
    } catch (error) {
      setErrorMessage("An error occurred during the upload.");
      console.log("error,error",error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-10 bg-gray-100">
      <div className="flex flex-col gap-6 w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-center">Upload Your Files</h2>
        
        {["resume","introductionVideo"].map((type) => (
          <div key={type} className="p-6 border rounded-lg shadow-md text-center">
            <div>
              {files[type as keyof FilesState] ? (
                <div>
                  <p className="text-sm font-semibold">{files[type as keyof FilesState]?.name}</p>
                  <p className="text-xs text-gray-500">{files[type as keyof FilesState] ? `${(files[type as keyof FilesState]!.size / 1024).toFixed(1)} KB` : ""}</p>
   
                  <div className="flex justify-center gap-4 mt-2">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => alert(`Viewing ${type}`)}
                    >
                      <span>View {type}</span>
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => setFiles((prev) => ({ ...prev, [type]: null }))} // Remove the file
                    >
                      <span>Remove {type}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center p-6 border-2 border-dashed rounded-lg hover:bg-gray-100">
                  <span className="text-sm font-semibold">
                    Upload {type === "resume" ? "Resume (PDF)" : "Introduction Video"}
                  </span>
                  <input
                    type="file"
                    accept={type === "resume" ? ".pdf" : "video/*"}
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, type as "resume" | "introductionVideo")}
                    disabled={loading}
                  />
                </label>
              )}
            </div>
          </div>
        ))}

        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
        
        <button
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Files"}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
