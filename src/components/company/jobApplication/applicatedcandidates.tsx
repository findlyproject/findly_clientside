

"use client";

import { applicationList } from "@/lib/store/features/actions/companyActions";
import { useAppDispatch } from "@/lib/store/hooks";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

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
  }

  const [jobs, setJobs] = useState<Jobpost[]>([]);
  const [application, setApplication] = useState<Application[]>([]);
  const [selectedJobIds, setSelectedJobIds] = useState<string[]>([]);
  const [searchProfile, setSearchProfile] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(applicationList());
    postedJobs();
    allApplications();
  }, []);

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

    return matchesJobFilter && matchesProfileFilter && matchesLocationFilter;
  });

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-100  ">
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

      <h1 className="text-sm font-semibold text-end mb-3">
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

      <div className="flex flex-col lg:flex-row gap-6 ">
       
        <aside className="w-full lg:w-1/4 bg-white p-4 rounded-md shadow-md  max-h-fit ">
          <h2 className="text-lg font-semibold mb-2">Filter Profiles</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium mb-5">Job title</h3>
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
          </div>
        </aside>

      
        <main className="w-full lg:w-3/4 flex flex-col justify-between  ">
          <div>
            {filteredApplications.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredApplications.slice(startIndex, startIndex + itemsPerPage).map((user, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                    onClick={() =>
                      router.push(`/company/candidatelist/${user.userId._id}/${user.jobId._id}`)
                    }
                  >
                    <div className="w-20 h-20 rounded-full bg-gray-300  border border-gray-200">
                      <Image
                        src={user.userId?.profileImage || "/default-profile.png"}
                        width={80}
                        height={80}
                        className="object-cover"
                        alt="Profile"
                      />
                    </div>
                    <div className="flex flex-col items-center text-center mt-2">
                      <h3 className="text-lg font-semibold text-gray-900">{user.userId?.firstName}</h3>
                      <p className="text-sm text-gray-800">{user.userId?.jobTitle || "No Job Title"}</p>
                      <p className="text-sm text-gray-600">{user.userId?.education?.[0]?.college || "No College Info"}</p>
                      <p className="text-sm text-gray-600">{user.userId?.phoneNumber || "No Phone Number"}</p>
                      <p className="text-sm text-gray-600">{user.userId?.email || "No Email"}</p>
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

