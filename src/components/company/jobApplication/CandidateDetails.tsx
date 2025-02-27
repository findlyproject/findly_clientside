"use client";
import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import api from "@/utils/api";
import { useParams, useRouter } from "next/navigation";
import { UserProfile } from "@/lib/store/features/userSlice";
import Image from "next/image";
import { Job } from "@/components/common/jobListing/AllJobs";
import { toast } from "react-toastify";

interface applicationData {
  companyId: string;
  coverLetter: string;
  createdAt: string;
  introVideoNam: string;
  introVideoUrl: string;
  jobId: Job;
  resumeName: string;
  resumeurl: string;
  offerLetter:string;
  status: string;
  updatedAt: string;
  userId: UserProfile;
}
export default function CandidateDetails() {
  const [activeTab, setActiveTab] = useState("CoverLetter");
  const [user, setUser] = useState<applicationData>();
const [offerLetter,setOfferLetter] = useState("")
  const router = useRouter();

  const params = useParams();
  const { id1, id2 } = params;

  const fetchData = async () => {
    try {
      const response = await api.get(`/company/findapplications/${id1}/${id2}`);
      setUser(response.data.application);
    } catch (error) {
      console.error("Error fetching application data:", error);
      toast.error("Failed to load application details.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id1]);

  const rejectJobApplication = async () => {
    console.log("Rejecting application:", id1, id2);
    try {
      const response = await api.put(`/company/reject-application/${id1}/${id2}`);
      if (response.data.success) {
        toast.success("Job application rejected successfully!");
        fetchData();
      } else {
        toast.error("Failed to reject application.");
      }
    } catch (error: any) {
      console.error("Error rejecting application:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const approveApplication = async () => {
    try {
      const response = await api.put(`/company/approve/${id1}/${id2}`, { offerLetter });

      toast.success(response.data.message);
      fetchData();
    } catch (error: any) {
      console.error("Error approving application:", error.response?.data?.message || error.message);
      toast.error("Failed to approve the application");
    }
  };

  return (
    <div className=" min-h-screen font-sans">
      {/* Header */}
      <div className=" mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Column - Candidate Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-blue-100 overflow-hidden mb-4 flex items-center justify-center">
                <Image
                  src={
                    user?.userId?.profileImage ||
                    "data:image/jpeg;base64,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"
                  }
                  alt="C McTurland"
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </div>

              <h2 className="text-lg font-semibold mb-1">
                {user?.userId?.firstName} {user?.userId?.lastName}
              </h2>
              <p className="text-sm text-gray-500 text-center mb-4">
                {user?.userId.jobTitle}
              </p>

              <div className="w-full mt-4">
                <button className="text-blue-500 w-full py-2 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="font-medium">More Positions</span>
                  <ChevronUp size={16} />
                </button>

                <div className="mt-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
                  <div className="flex items-start">
                    <span className="mr-2">ⓘ</span>
                    <p>This candidate applied for the Job is :</p>
                  </div>

                  <div className="mt-3 bg-gray-50 rounded p-3">
                    <p className="font-medium text-gray-800">
                      {user?.jobId.title}
                    </p>
                    <span
  className={`inline-block text-xs px-2 py-1 rounded mt-1 
    ${user?.status === "Accepted" ? "bg-green-100 text-green-800" : 
      user?.status === "Rejected" ? "bg-red-100 text-red-800" : 
      "bg-blue-100 text-blue-800"}`}
>
  {user?.status}
</span>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Application Details */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow">
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  <button
                    className={`px-4 py-3 border-b-2 ${
                      activeTab === "CoverLetter"
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
                    className={`px-4 py-3 border-b-2 ${
                      activeTab === "Resume"
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
                    className={`px-4 py-3 border-b-2 ${
                      activeTab === "video"
                        ? "border-blue-500 text-blue-600"
                        : ""
                    } font-medium flex items-center`}
                    onClick={() => setActiveTab("video")}
                  >
                    <span className="w-4 h-4 bg-gray-100 rounded flex items-center justify-center mr-2">
                      <span className="text-gray-500 text-xs">🎥</span>
                    </span>
                    video
                  </button>
                  <button
                    className={`px-4 py-3 border-b-2 ${
                      activeTab === "Finalization"
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
              <div className="p-4">
                <div className="mb-6">
                {activeTab === "CoverLetter" ? (
  <>
    <h3 className="text-lg font-medium">Cover Letter</h3>
    <textarea
      className="w-full min-h-52 h-full border"
      readOnly
      value={user?.coverLetter || ""}
    />
  </>
) : activeTab === "Resume" ? (
  <div>
    <iframe
      src={user?.resumeurl || ""}
      width="100%"
      height="600px"
      className="border border-gray-300 bg-gray-100"
    />
  </div>
) : activeTab === "video" ? (
  <div>
    {user?.introVideoUrl ? (
      <video width="80%" height="auto" controls>
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
      <h3 className="text-lg font-medium">Offer Letter</h3>
      <textarea className="w-full min-h-52 h-full border" onChange={(e)=>setOfferLetter(e.target.value)}/>
      <div className="flex items-center justify-center gap-5">
        <button
          className="bg-red-700 text-white rounded-xl p-2"
          onClick={rejectJobApplication}
        >
          Reject
        </button>
        <button className="bg-green-700 text-white rounded-xl p-2" onClick={approveApplication}>
          Approve
        </button>
      </div>
    </div>
  ) : user?.status === "Rejected" ? (
    <p className="text-red-600 font-medium">You already rejected the application.</p>
  ) : user?.status === "Accepted" ? (
    <div>
      <h3 className="text-lg font-medium">You already approved the application.</h3>
      <textarea className="w-full min-h-52 h-full border" readOnly value={user?.offerLetter || "No offer letter available"} />
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
