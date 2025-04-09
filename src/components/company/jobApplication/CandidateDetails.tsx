/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { applicationData } from "../../../types/Types";
import handleAsync from "@/utils/handleAsync";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { applicatioAproving, applicationList, applicatioRejecting, deleteApplcation, handleSaveApplication } from "@/lib/store/features/actions/companyActions";
import {  Tooltip, Typography } from "@material-tailwind/react";
import ConfirmationModal from "./DeleteConfirm";
import { toast } from "react-toastify";




export default function CandidateDetails() {
  const [activeTab, setActiveTab] = useState("CoverLetter");
  const [user, setUser] = useState<applicationData>();
  const [offerLetter, setOfferLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [date,setDate] = useState("");
  const [modal,setmodal] = useState(false);


  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { activeCompany } = useAppSelector((state) => state.companyLogin)
  const dispatch = useAppDispatch()
  const route = activeCompany ? "company" : "user"
  const { userId, jobId } = useParams();
  console.log("user", user);


  const fetchData = async () => {
    const response = await handleAsync(() =>
      api.get(`/company/findapplications/${userId}/${jobId}`),
    );
    if (response) {
      setUser(response.data.application);
    }
  };

  useEffect(() => {
    if (userId && jobId) {
      fetchData();
    }
  }, [userId, jobId,modal]);

  const rejectJobApplication = async () => {

    const result = await dispatch(applicatioRejecting({
      userId: userId as string,
      jobId: jobId as string,
    }))

    if (result.type === "application/rejecting/fulfilled") {
      fetchData();
    }

  };

  const generateOfferLetter = async (id:string) => {
    try {
      setLoading(true);
      const response = await api.post("company/generate-offer-letter", {jobApplicationId:id, startDate:date});
      setOfferLetter(response.data.offerLetter); // Update textarea with generated content
    } catch (error) {
      console.error("Error generating offer letter:", error);
      toast.error("Failed to generate offer letter");
    } finally {
      setLoading(false);
    }
  };

  const approveApplication = async () => {

    const result = await dispatch(applicatioAproving({
      userId: userId as string,
      jobId: jobId as string,
      offerLetter
    }));
    if (result.type === "application/approve/fulfilled") {
      fetchData()
    }

  };


  const handleDelete = async () => {
    if (!selectedId) return
    const result = await dispatch(deleteApplcation(selectedId))
    if (result.type === "delete/application/fulfilled") {
      dispatch(applicationList());
      router.push("/company/candidatelist")
    }
    setIsModalOpen(false)
  }

  const handleSave = async (applicationId: string) => {
    const result = await dispatch(handleSaveApplication(applicationId))
    if (result.type === "save/application/fulfilled") {
      dispatch(applicationList());
      fetchData();

    }
  }
  return (
    <div className=" min-h-screen font-sans pt-24">

      <div className=" mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          <div className="lg:col-span-1 ">
            <div className=" sm:min-h-[264px] rounded-lg md:min-w-[264px] border border-black p-6 flex flex-col items-center md:min-h-[364px]">
              <div className="flex items-start bg-white p-6  md:min-h-[264px] shadow-2xl rounded-lg justify-between w-full">

                <div>
                  <div className="w-16 h-16 rounded-full bg-blue-100 overflow-hidden mb-4 flex items-center justify-center">
                    <Image
                      src={
                        user?.userId?.profileImage ||
                        "data:image/jpeg;base64,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"
                      }
                      alt="profile image"
                      className=" size-16"
                      width={100}
                      height={100}
                    />

                  </div>
                  <h2 className="text-lg font-semibold mb-1 hover:cursor-pointer" onClick={() => router.push(`/${route}/${user?.userId._id}/User`)}>
                    {user?.userId?.firstName} {user?.userId?.lastName}
                  </h2>
                  <p className="text-sm text-black text-center ">
                    {user?.userId.jobTitle}
                  </p>
                 <span
                    className={`inline-block text-sm   bg-white rounded mb-5 `}
                  >
                    {user?.userId?.location?.state},{user?.userId?.location?.country}
                  </span>
                  <div className="flex justify-start w-full">
                <button 
                onClick={()=>router.push("/company/profile")}
                className="px-4 py-2  bg-primary   text-white font-semibold rounded-lg shadow-md hover:bg-primaryfocus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all">
                    View Profile
                  </button>
                </div>
                
                </div>


                <div className="flex items-center ">

                  {user?._id && (
                    <span onClick={() => {
                      setSelectedId(user?._id || "")
                      setIsModalOpen(true);
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                        <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                  {
                    user?._id && (
                      <button
                        onClick={() => handleSave(user?._id)}
                        className={`rounded-md ms-5 ${user?.isSaved ? "bg-white text-primary" : "bg-gray-200 text-white"}  p-2.5 border border-transparent text-center text-sm  transition-all shadow-sm hover:shadow-lg  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 ">
                          <path d="M3.75 2a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 1.28.53L8 10.06l3.72 3.72a.75.75 0 0 0 1.28-.53V2.75a.75.75 0 0 0-.75-.75h-8.5Z" />
                        </svg>

                      </button>
                    )
                  }
                  <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleDelete}
                  />
                </div>

              

              </div>
              



              <div className="mt-2 text-sm md:min-h-[264px] max-h-[400px] overflow-auto break-words text-gray-600 bg-white w-full p-6 rounded-lg shadow-2xl border-t border-gray-100 pt-4">
                <h2 className="text-center text-xl font-semibold border-b border-black mb-5">Informations</h2>
                <div className="flex items-start">

                  <p>Applied for :  </p>
                  <p className="font-medium text-gray-800">
                    &nbsp;{user?.jobId.title}
                  </p>
                </div>

                <div className=" bg-gray-50 rounded pt-2">

                  Application: <span
                    className={`inline-block text-xs px-2 py-1 bg-white rounded mt-1 
      ${user?.status === "Accepted"
                        ? " text-green-800"
                        : user?.status === "Rejected"
                          ? "text-red-800"
                          : " text-blue-800"
                      }`}
                  >
                    {user?.status}
                  </span>

                </div>

                <div className=" bg-gray-50 rounded pt-2">

                  Email: <span
                    className={`inline-block text-xs px-2 py-1 bg-white rounded mt-1 `}
                  >
                    {user?.userId.email}
                  </span>

                </div>
                <div className=" flex items-center justify-start bg-gray-50 rounded pt-2 ">

                  Education:{user?.userId?.education?.map((edu) => (
                    <span
                      key={edu._id}
                      className="inline-block text-xs px-2 py-1 bg-white rounded mt-1"
                    >
                      {edu.college} ({edu.startYear} - {edu.endYear})
                    </span>
                  ))}
                </div>
                <div className=" bg-gray-50 rounded pt-2">

                  location: <span
                    className={`inline-block text-xs px-2 py-1 bg-white rounded mt-1 `}
                  >
                    {user?.userId?.location?.state},{user?.userId?.location?.country}
                  </span>

                </div>
                <div className=" bg-gray-50 rounded pt-2">

                  contact: <span
                    className={`inline-block text-xs px-2 py-1 bg-white rounded mt-1 `}
                  >
                    {user?.userId?.phoneNumber || "Not updated"}
                  </span>

                </div>

                {
                  user?.userId.phoneNumber && (

                    <div className=" bg-gray-50 rounded pt-2">

                      Contact: <span
                        className={`inline-block text-xs px-2 py-1 bg-white rounded mt-1 `}
                      >
                        {user?.userId.phoneNumber}
                      </span>

                    </div>
                  )
                }
              </div>
            </div>
          </div>

          {/* Right Column - Application Details */}
          <div className="md:col-span-3">
            <div className=" rounded-lg shadow h-screen">
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  <button
                    className={`px-4 py-3 border-b-2 ${activeTab === "CoverLetter"
                      ? "border-blue-500 text-blue-600"
                      : ""
                      } font-medium flex items-center`}
                    onClick={() => setActiveTab("CoverLetter")}
                  >
                    <span className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center mr-2">
                      <span className="text-blue-500 text-xs">📄</span>
                    </span>
                    CoverLetter
                  </button>
                  <button
                    className={`px-4 py-3 border-b-2 ${activeTab === "Resume"
                      ? "border-blue-500 text-blue-600"
                      : ""
                      } font-medium flex items-center`}
                    onClick={() => setActiveTab("Resume")}
                  >
                    <span className="w-4 h-4 bg-gray-100 rounded flex items-center justify-center mr-2">
                      <span className="text-gray-500 text-xs">📝</span>
                    </span>
                    Resume
                  </button>
                  <button
                    className={`px-4 py-3 border-b-2 ${activeTab === "Video"
                      ? "border-blue-500 text-blue-600"
                      : ""
                      } font-medium flex items-center`}
                    onClick={() => setActiveTab("Video")}
                  >
                    <span className="w-4 h-4 bg-gray-100 rounded flex items-center justify-center mr-2">
                      <span className="text-gray-500 text-xs">🎥</span>
                    </span>
                    Video
                  </button>
                  <button
                    className={`px-4 py-3 border-b-2 ${activeTab === "Finalization"
                      ? "border-blue-500 text-blue-600"
                      : ""
                      } font-medium flex items-center`}
                    onClick={() => setActiveTab("Finalization")}
                  >
                    <span className="w-4 h-4 bg-gray-100 rounded flex items-center justify-center mr-2">
                      <span className="text-gray-500 text-xs">✓</span>
                    </span>
                    Finalization
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 h-3/5 ">
                <div className="mb-6 h-full ">
                  {activeTab === "CoverLetter" ? (
                    <>

                      <textarea
                        className="w-full h-full  border"
                        readOnly
                        value={user?.coverLetter || ""}
                      />

                    </>
                  ) : activeTab === "Resume" ? (
                    <div className="h-full">
                      <iframe
                        src={user?.resumeurl}
                        title={user?.resumeName}
                        width="100%"

                        className="border border-gray-300 h-full bg-gray-100"
                      />
                    </div>
                  ) : activeTab === "Video" ? (
                    <div className="flex justify-center items-center w-full h-[400px]">
                      {user?.introVideoUrl ? (
                        <video className="w-full h-full object-cover" controls>
                          <source src={user?.introVideoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <p>No video available</p>
                      )}
                    </div>

                  ) : activeTab === "Finalization" ? (
                    user?.status === "Pending" ? (

                      <div>
                        <p className="text-lg h-full  font-semibold italic text-gray-700">
                          We appreciate your interest in this candidate.
                          If you find them suitable for the role, you can proceed with an offer letter or schedule a Zoom interview.
                          Engaging with the candidate early can help secure top talent.
                          Feel free to reach out if you need further details or assistance.
                        </p>


                        <div className="flex items-center mt-2 justify-end gap-5">
                          <button
                            className="bg-primary text-white rounded-xl w-20 p-2"
                            onClick={rejectJobApplication}
                          >
                            Reject
                          </button>
                          <Tooltip
                            content={
                              <div className="w-80  p-0 ">
                                <Typography color="white" className="font-medium" {...({} as React.ComponentProps<typeof Typography>)}>
                                  Do you want select
                                </Typography>
                                <Typography color="white" className="font-normal  opacity-80" {...({} as React.ComponentProps<typeof Typography>)}>
                                  You can now proceed by sending an offer letter or scheduling a Zoom interview. Choose the best option to move forward in the hiring process.
                                </Typography>
                              </div>
                            }
                          >
                            <button
                              className="bg-primary text-white rounded-xl w-20 p-2"
                              onClick={() => setOpen(true)}
                            >
                              select
                            </button>

                          </Tooltip>





                        </div>
                        {
                          open && (

                            <div className="min-h-96">
                            <div className="flex justify-between mb-2 mt-4 h-full">
                              <h3 className="text-lg font-medium">Offer Letter</h3>
        {/* <input type="date" value={date} onChange={(e:InputChangeEvent)=>setdate(e.target.value)}/> */}
        <input
  type="date"
  value={date || ''}
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
/>

                              <button
                                className="text-white bg-primary p-2 rounded-lg"
                                onClick={()=>{generateOfferLetter(user?._id);setmodal(true)}}
                                disabled={loading}
                              >
                                {loading ? "Generating..." : "Generate"}
                              </button>
                            </div>
                      
                            <div className="relative">
                              <button
                                onClick={() => setOfferLetter("")}
                                className="absolute right-2 top-2"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 16 16"
                                  fill="currentColor"
                                  className="size-4"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                      
                              <textarea
                                className="w-full min-h-96 border p-2"
                                value={offerLetter}
                                onChange={(e) => setOfferLetter(e.target.value)}
                                placeholder="Generated offer letter will appear here..."
                              />
                            </div>
                      
                            <div className="flex items-center mt-2 justify-end gap-5">
                              <button className="bg-primary text-white rounded-xl p-2" onClick={approveApplication}>
                                Approve
                              </button>
                            </div>
                          </div>
                          )
                        }

                      </div>

                    ) : user?.status === "Rejected" ? (
                      <div className="flex items-center justify-center h-48">
                        <div className="mt-6 w-full max-w-md bg-white p-4 rounded-lg shadow-lg border border-green-400 animate-fadeIn">
                          <h2 className="text-xl font-semibold text-red-700">Application Rejected ❌</h2>
                          <p className="text-gray-700 mt-2">
                            The candidate s application has been successfully rejected. A notification has been sent to inform them of the decision. You can review other applicants in your dashboard and proceed with the next steps in your hiring process. If needed, you may provide feedback to help them improve for future opportunities. Thank you for using our platform to manage your recruitment efficiently.
                          </p>

                        </div>

                      </div>
                    ) : user?.status === "Accepted" ? (
                      <div className="flex flex-col items-center justify-center space-x-1">
                        <div className="mt-6 w-full max-w-md bg-white p-4 rounded-lg shadow-lg border border-green-400 animate-fadeIn">
                          <h2 className="text-xl font-semibold text-green-700">Offer Letter Sent Successfully! 🎉</h2>
                          <p className="text-gray-700 mt-2">
                            Congratulations! Your offer letter has been successfully sent.
                            The candidate will receive the details shortly.
                            You can track their response in your dashboard.
                            If needed, you may also schedule a follow-up interview.
                            Thank you for choosing our platform to streamline your hiring process.
                          </p>
                          <div className="flex justify-end p-5"><button
                            onClick={() => setOpen(!open)}
                          >
                            {
                              !open ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                  <path fillRule="evenodd" d="M1.756 4.568A1.5 1.5 0 0 0 1 5.871V12.5A1.5 1.5 0 0 0 2.5 14h11a1.5 1.5 0 0 0 1.5-1.5V5.87a1.5 1.5 0 0 0-.756-1.302l-5.5-3.143a1.5 1.5 0 0 0-1.488 0l-5.5 3.143Zm1.82 2.963a.75.75 0 0 0-.653 1.35l4.1 1.98a2.25 2.25 0 0 0 1.955 0l4.1-1.98a.75.75 0 1 0-.653-1.35L8.326 9.51a.75.75 0 0 1-.652 0L3.575 7.53Z" clip-rule="evenodd" />
                                </svg>

                              )
                            }
                          </button></div>
                        </div>
                        {
                          user.status === "Accepted" && open && (
                            <div className="w-full p-8">
                              <textarea
                                className="w-full  min-h-64 p-5  border"
                                readOnly
                                value={
                                  user?.offerLetter || "No offer letter available"
                                }
                              />
                            </div>
                          )
                        }
                      </div>
                    ) : null
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    

    </div>
  );
}
