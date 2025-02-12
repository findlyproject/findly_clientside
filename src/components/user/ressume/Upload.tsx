// "use client"

// import { postresume } from "@/lib/store/features/actions/resumeActions";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import React, { useState, ChangeEvent } from "react";


// interface FilesState {
//   resume: File | null;
//   introductionVideo: File | null;
// }

// const FileUpload = () => {
//   const [files, setFiles] = useState<FilesState>({
//     resume: null,
//     introductionVideo: null,
//   });
//   const dispatch = useAppDispatch();
//   const resumePdf = useAppSelector((state) => state.user.activeuser?.resumePDF);
//   const resumevideo = useAppSelector((state) => state.user.activeuser?.resumeVideo);

//   const [loading, setLoading] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const [modalContent, setModalContent] = useState<string | null>(null); // New state for modal content
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // New state for modal visibility

//   // Handle file selection
//   console.log("modalContent",modalContent);
//   console.log("isModalOpen",isModalOpen);
  
//   const handleFileUpload = (event: ChangeEvent<HTMLInputElement>, type: keyof FilesState) => {
//     const selectedFile = event.target.files ? event.target.files[0] : null;
//     if (selectedFile) {
//       setFiles((prevFiles) => ({
//         ...prevFiles,
//         [type]: selectedFile,
//       }));
//     }
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     const { resume, introductionVideo } = files;

//     if (!resume && !introductionVideo) {
//       setErrorMessage("Please select a file to upload");
//       return;
//     }

//     if (resume) formData.append("resume", resume);
//     if (introductionVideo) formData.append("video", introductionVideo);

//     try {
//       setLoading(true);
//       setErrorMessage("");
//       const result = await dispatch(postresume(formData));
//       console.log("result", result);
//     } catch (error) {
//       setErrorMessage("An error occurred during the upload.");
//       console.error("Upload Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to open the modal and set content
//   const openModal = (type: "resume" | "introductionVideo") => {
//     console.log("type",type);
    
//     if (type === "resume" && resumePdf && resumePdf[0]) {
//       console.log("resumePdf",resumePdf);
      
//       setModalContent(resumePdf[0].fileUrl); // Set the resume URL for the modal
//     } else if (type === "introductionVideo" && resumevideo && resumevideo[0]) {
//       setModalContent(resumevideo[0].fileUrl); // Set the video URL for the modal
//     }
//     setIsModalOpen(true);
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setModalContent(null);
//   };

//   console.log("modalContent",modalContent);
  

//   return (
//     <div className="flex flex-col items-center justify-center h-screen p-10 bg-gray-100">
//       <div className="flex flex-col gap-6 w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
//         <h2 className="text-xl font-bold text-center">Upload Your Files</h2>

//         {(["resume", "introductionVideo"] as (keyof FilesState)[]).map((type) => (
//           <div key={type} className="p-6 border rounded-lg shadow-md text-center">
//             {files[type] ? (
//               <div>
//                 <p className="text-sm font-semibold">{files[type]?.name}</p>
//                 <p className="text-xs text-gray-500">
//                   {files[type] ? `${(files[type]!.size / 1024).toFixed(1)} KB` : ""}
//                 </p>
//                 <div className="flex justify-center gap-4 mt-2">
//                   <button
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     onClick={() => openModal(type)}
//                   >
//                     View {type}
//                   </button>
//                   <button
//                     className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     onClick={() => setFiles((prev) => ({ ...prev, [type]: null }))}
//                   >
//                     Remove {type}
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <label className="cursor-pointer flex flex-col items-center p-6 border-2 border-dashed rounded-lg hover:bg-gray-100">
//                 <span className="text-sm font-semibold">
//                   Upload {type === "resume" ? "Resume (PDF)" : "Introduction Video"}
//                 </span>
//                 <input
//                   type="file"
//                   accept={type === "resume" ? ".pdf" : "video/*"}
//                   className="hidden"
//                   onChange={(e) => handleFileUpload(e, type)}
//                   disabled={loading}
//                 />
//               </label>
//             )}
//           </div>
//         ))}

//         {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}

//         <button
//           className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           onClick={handleUpload}
//           disabled={loading}
//         >
//           {loading ? "Uploading..." : "Upload Files"}
//         </button>
//       </div>

//       {/* Modal for viewing file */}
//       {isModalOpen && modalContent && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-3/4 max-w-2xl">
//             <button
//               className="absolute top-2 right-2 text-lg font-bold"
//               onClick={closeModal}
//             >
//               X
//             </button>
//             {modalContent.includes(".pdf") ? (
//       <h1>dsaf</h1>
// ):(
//               <video controls width="100%" height="500px">
//                 <source src={modalContent} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;



"use client";

import { postresume, removeResume } from "@/lib/store/features/actions/resumeActions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import React, { useState, ChangeEvent, useEffect } from "react";


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

  // Set initial files if resumePdf or resumevideo is available
  useEffect(() => {
    setFiles({
      resume: resumePdf?.[0] ? new File([""], "Existing Resume.pdf", { type: "application/pdf" }) : null,
      introductionVideo: resumevideo?.[0] ? new File([""], "Existing Video.mp4", { type: "video/mp4" }) : null,
    });
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
    const { resume, introductionVideo } = files;
    console.log(`resume--${resume}--introductionVideo==${introductionVideo}`);
    

    if (!resume && !introductionVideo) {
      setErrorMessage("Please select a file to upload");
      return;
    }

    if (resume) formData.append("resume", resume);
    if (introductionVideo) formData.append("video", introductionVideo);

    try {
      setLoading(true);
      setErrorMessage("");
      const result = await dispatch(postresume(formData));
      console.log("Upload result:", result);
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
   
  
  
    // const response=await api.delete(`/user/removeresume?fileType=${type}`)
    // console.log("resss",response);
    
      
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
              <iframe src={modalContent} width="100%" height="500px"></iframe>
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

