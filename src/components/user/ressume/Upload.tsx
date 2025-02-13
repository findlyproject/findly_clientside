


"use client";

import { postresume, removeResume } from "@/lib/store/features/actions/resumeActions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import React, { useState, ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";


interface FilesState {
  resume: File | null;
  introductionVideo: File | null;
}

const FileUpload = () => {
  const dispatch = useAppDispatch();
  const resumePdf = useAppSelector((state) => state.user.activeuser?.resumePDF);
  const resumevideo = useAppSelector((state) => state.user.activeuser?.resumeVideo);

  const [files, setFiles] = useState<FilesState>({
    resume: null,
    introductionVideo: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  useEffect(() => {
    setFiles({
      resume: resumePdf?.[0] ? new File([""], "Existing Resume.pdf", { type: "application/pdf" }) : null,
      introductionVideo: resumevideo?.[0] ? new File([""], "Existing Video.mp4", { type: "video/mp4" }) : null,
    });
  }, [resumePdf, resumevideo]);
  useEffect(() => {
    console.log("Redux Resume Data:", resumePdf);
    console.log("Redux Video Data:", resumevideo);
  }, [resumePdf, resumevideo]);
  

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>, type: keyof FilesState) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    console.log("selectedFile",selectedFile);
    
    if (selectedFile) {
      setFiles((prevFiles) => ({ ...prevFiles, [type]: selectedFile }));
    }
    console.log("files",files);
    
  };

  const handleUpload = async () => {
    const formData = new FormData();
    console.log("filesdddd",files);
    
    const { resume, introductionVideo } = files;
    console.log("resumeee",resume);
    console.log("introductionVideooo",introductionVideo);
    
    console.log(`resume--${resume}--introductionVideo==${introductionVideo}`);
    

    if (!resume && !introductionVideo) {
      setErrorMessage("Please select a file to upload");
      return;
    }

    if (resume) formData.append("resume", resume);
    if (introductionVideo) formData.append("video", introductionVideo);

    try {
      console.log("formdata",formData);
      
      setLoading(true);
      setErrorMessage("");
      const result = await dispatch(postresume(formData));
      console.log("Upload result:", result);
      setFiles({ resume: null, introductionVideo: null });
      if(result.type==="post/resume/fulfilled"){
        toast.success("resume uploaded")
      }
    } catch (error) {
      setErrorMessage("An error occurred during the upload.");
      console.error("Upload Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type: "resume" | "introductionVideo") => {
    if (type === "resume" && resumePdf?.[0]) {
      setModalContent(resumePdf[0].fileUrl);
    } else if (type === "introductionVideo" && resumevideo?.[0]) {
      setModalContent(resumevideo[0].fileUrl);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };


  const handleRemoveResume =async (type:string) => {
   const removeResult=await dispatch(removeResume(type)); 
   console.log("removeResult",removeResult);
   if(removeResult.type==="remove/resume/fulfilled"){
    setFiles({ resume: null, introductionVideo: null });
<<<<<<< HEAD
   }   
=======
   }
   
  

      
>>>>>>> f56af03f37c3d22f41985ce7aa064bc5454b9713
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-10 bg-gray-100">
      <div className="flex flex-col gap-6 w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-center">Upload Your Files</h2>

        {(["resume", "introductionVideo"] as (keyof FilesState)[]).map((type) => (
          <div key={type} className="p-6 border rounded-lg shadow-md text-center">
            {files[type] || (type === "resume" && resumePdf?.length) || (type === "introductionVideo" && resumevideo?.length) ? (
              <div>
                <p className="text-sm font-semibold">{files[type]?.name || "Uploaded File"}</p>
                <div className="flex justify-center gap-4 mt-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => openModal(type)}
                  >
                    View {type}
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleRemoveResume(type)}
                  >
                    Remove {type}
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
                  onChange={(e) => handleFileUpload(e, type)}
                  disabled={loading}
                />
              </label>
            )}
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

      {/* Modal for viewing file */}
      {isModalOpen && modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 max-w-2xl">
            <button
              className="absolute top-2 right-2 text-lg font-bold"
              onClick={closeModal}
            >
              X
            </button>
            {modalContent.includes(".pdf") ? (
          <iframe 
          className="text-black"
          src={`https://docs.google.com/gview?url=${modalContent}&embedded=true`} 
          width="100%" 
          height="500px"
          style={{ border: "none" }} 
        />
            ) : (
              <video controls width="100%" height="500px">
                <source src={modalContent} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;


