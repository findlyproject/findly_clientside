

"use client";

import { applicationList, deleteApplcation, getSavedApplication, handleSaveApplication } from "@/lib/store/features/actions/companyActions";
import { useAppDispatch } from "@/lib/store/hooks";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import classNames from "classnames";


const AppliedUsers = () => {
  interface Jobpost {
    _id: string;
    title: string;
  }

  interface Application {
    _id: string;
    jobId: {
      _id: string;
      company: string;
    };
    userId: {
      _id: string;
      email: string;
      phoneNumber: string;
      education: { college: string }[];
      firstName: string;
      profileImage: string;
      jobTitle: string[];
    };
    title: string;
    company: string;
    status: string;
    createdAt: string;
    isSaved: boolean
  }

  const [jobs, setJobs] = useState<Jobpost[]>([]);
  const [application, setApplication] = useState<Application[]>([]);
  const [selectedJobIds, setSelectedJobIds] = useState<string[]>([]);
  const [searchProfile, setSearchProfile] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    isSaved: false, // Default value
  });

  const toggleSavedFilter = () => {
    setFilters((prev) => ({ ...prev, isSaved: !prev.isSaved }));
  };


  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(applicationList());
    postedJobs();
    allApplications();
    findAllsavedApplications()
  }, []);


  const findAllsavedApplications = async () => {
    const result = await dispatch(getSavedApplication())
    if (result.type === 'find/application/fulfilled') {
      console.log("result", result);

    }
  }

  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prevSelected) =>
      prevSelected.includes(status)
        ? prevSelected.filter((s) => s !== status)
        : [...prevSelected, status]
    );
  };
  const handleCheckboxChange = (jobId: string) => {
    setSelectedJobIds((prevSelected) =>
      prevSelected.includes(jobId)
        ? prevSelected.filter((id) => id !== jobId)
        : [...prevSelected, jobId]
    );
  };




  const postedJobs = async () => {
    const response = await api.get("/company/getjobs");
    if (response.status === 200) {
      setJobs(response.data.postedJobs);
    }
  };

  const allApplications = async () => {
    const response = await api.get("/company/findapplications");
    if (response.status === 200) {
      setApplication(response.data.appliedUsers);
    }
  };

  const handleDelete=async(applicationId:string)=>{
    const result =await dispatch(deleteApplcation(applicationId))
    if(result.type==="delete/application/fulfilled"){
      allApplications()
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const startIndex = (currentPage - 1) * itemsPerPage;

  const filteredApplications = application.filter((app) => {
    const matchesJobFilter =
      selectedJobIds.length > 0 ? selectedJobIds.includes(app?.jobId?._id) : true;

    const matchesProfileFilter = searchProfile
      ? app.userId?.firstName?.toLowerCase().includes(searchProfile.toLowerCase())
      : true;

    const matchesLocationFilter = searchLocation
      ? app.userId?.education?.some((edu) =>
        edu.college.toLowerCase().includes(searchLocation.toLowerCase())
      )
      : true;
    const matchesStatusFilter =
      selectedStatuses.length > 0 ? selectedStatuses.includes(app.status) : true;
    const matchesSavedFilter = filters.isSaved ? app.isSaved === true : true;

    return matchesJobFilter && matchesProfileFilter && matchesLocationFilter && matchesStatusFilter && matchesSavedFilter
  });

  const handleSave = async (applicationId: string) => {
    const result = await dispatch(handleSaveApplication(applicationId))

    if (result.type === "save/application/fulfilled") {

      allApplications()

    }
  }

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 pt-20 ">
      <div className="flex flex-col md:flex-row justify-end items-center mb-4 gap-4">
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Find specific Profile"
            className="border px-3 py-2 rounded-md w-full md:w-64"
            value={searchProfile}
            onChange={(e) => setSearchProfile(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter location"
            className="border px-3 py-2 rounded-md w-full md:w-64"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <button className="bg-primary text-white px-4 py-2 rounded-md w-full md:w-auto">
            Search
          </button>
        </div>
      </div>

      <h1 className=" text-sm font-semibold text-end mb-3">
        {selectedJobIds.length > 0 ? (
          <span className="font-bold italic text-primary">
            {jobs
              .filter((job) => selectedJobIds.includes(job._id))
              .map((job) => job.title)
              .join(", ")}
          </span>
        ) : (
          "All Applications"
        )}
      </h1>

      <div className="flex flex-col lg:flex-row gap-6  ">

        <aside className="w-full lg:w-1/4  bg-gray-300 p-4 rounded-md shadow-md overflow-y-auto">

          <h2 className="text-lg font-semibold mb-2">Filter Profiles</h2>
          <div className="space-y-3 " >
            <div>
              <h3 className="font-medium mb-2">Job title</h3>
              <ul className="text-sm text-gray-600">
                {jobs.map((job) => (
                  <li key={job._id} className="text-xl">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedJobIds.includes(job._id)}
                      onChange={() => handleCheckboxChange(job._id)}
                    />{" "}
                    {job.title}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Others</h3>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    checked={filters.isSaved}
                    onChange={toggleSavedFilter}
                  />{" "}
                  Saved
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes("Rejected")}
                    onChange={() => handleStatusChange("Rejected")}
                  />{" "}
                  Rejected
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes("Accepted")}
                    onChange={() => handleStatusChange("Accepted")}
                  />{" "}
                  Accepted
                </li>
              </ul>

            </div>
          </div>
        </aside>


        <main className="w-full lg:w-3/4 flex flex-col justify-between  ">
          <div>
            {filteredApplications.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredApplications.slice(startIndex, startIndex + itemsPerPage).map((user, index) => (
                  <div
                    key={index}
                    className="bg-gray-300 p-6 rounded-lg shadow-md flex flex-col justify-between items-start transition-transform transform hover:scale-[1.02] hover:shadow-lg cursor-pointer"

                  >
                    <div className="bg-gray-300 w-full flex justify-between">
                      <Image
                        src={user.userId?.profileImage || "/default-profile.png"}
                        width={80}
                        height={80}
                        className="size-12 rounded-full"
                        alt="Profile"
                      />

                      <div className="flex space-x-3">
                       
                        <span className="text-primary text-sm font-bold">

                        {
                            user.status
                          }
                        </span>



                        <span 
                        onClick={()=>handleDelete(user._id)}
                        > <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                          <path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clip-rule="evenodd" />
                        </svg></span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start text-center ">
                      <h3 className="text-lg font-semibold text-gray-900">{user.userId?.firstName}</h3>
                      <p className="text-sm text-gray-800">{user.userId?.jobTitle || ""}</p>
                      <p className="text-sm text-gray-600">{user.userId?.education?.[0]?.college || ""}</p>
                      <p className="text-sm text-gray-600">{user.userId?.phoneNumber || ""}</p>
                      <p className="text-sm text-gray-600">{user.userId?.email || ""}</p>
                    </div>

                    <div className="flex justify-between w-full">
                      <button
                        onClick={() =>
                          router.push(`/company/candidatelist/${user.userId._id}/${user.jobId._id}`)
                        }
                        className="bg-gray-200 hover:bg-white hover:border hover:border-gray-400 text-primary font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
                        Details
                      </button>
                      <button
                        onClick={() => handleSave(user._id)}
                        className={`rounded-md ${user.isSaved ? "bg-white text-primary" : "bg-gray-200 text-white"}  p-2.5 border border-transparent text-center text-sm  transition-all shadow-sm hover:shadow-lg  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 ">
                          <path d="M3.75 2a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 1.28.53L8 10.06l3.72 3.72a.75.75 0 0 0 1.28-.53V2.75a.75.75 0 0 0-.75-.75h-8.5Z" />
                        </svg>

                      </button>
                    </div>



                  </div>

                ))}

              </div>

            ) : (
              <div className="flex justify-center items-center h-96">
                <span className="bg-red-500 text-white text-lg px-4 py-2 rounded-md shadow-md">
                  No Applications Received Yet
                </span>
              </div>
            )}
          </div>


          {filteredApplications.length > 0 && (
            <div className="flex justify-center mt-4">
              <button className="px-3 py-1 border mx-1" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Prev
              </button>
              <button className="px-3 py-1 border mx-1" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AppliedUsers;

