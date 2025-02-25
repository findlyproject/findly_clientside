"use client"
import { applicationList } from "@/lib/store/features/actions/companyActions";
import { useAppDispatch } from "@/lib/store/hooks";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/utils/api";

const AppliedUsers = () => {
  interface Jobpost {
    _id: string;
    title: string;
  }

  interface Application {
    _id: string;
    jobId: {
      _id: string;
      postedBy: string;
    };
    userId: {
      _id: string;
      email: string;
      phoneNumber: string;
      education: { college: string }[];
      firstName: string;
      profileImage: string;
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
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Applied Users</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Find specific Profile"
            className="border px-3 py-2 rounded-md"
            value={searchProfile}
            onChange={(e) => setSearchProfile(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter location"
            className="border px-3 py-2 rounded-md"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md">Search</button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <aside className="w-1/4 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Filter Profiles</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium">Job title</h3>
              <ul className="text-sm text-gray-600">
                {jobs &&
                  jobs.map((job) => (
                    <li key={job?._id}>
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

        {/* Candidate Grid */}
        <main className="w-3/4">
          <h1 className="text-2xl font-semibold">
            {selectedJobIds.length > 0 ? (
              <span className="font-bold italic text-purple-600">
                {jobs
                  .filter((job) => selectedJobIds.includes(job._id))
                  .map((job) => job.title)
                  .join(", ")}
              </span>
            ) : (
              "All Applications"
            )}
          </h1>

          <div className="grid grid-cols-3 gap-4">
            {filteredApplications.slice(startIndex, startIndex + itemsPerPage).map((user, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-md text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3">
                  <Image
                    src={user.userId?.profileImage || ""}
                    width={64}
                    height={64}
                    className="rounded-full"
                    alt="Profile"
                  />
                </div>
                <h3 className="text-lg font-semibold">{user.userId?.firstName}</h3>
                <p className="text-sm text-gray-500">{user.userId?.education?.[0]?.college}</p>
                <p className="text-sm text-gray-500">{user.userId?.phoneNumber}</p>
                <p className="text-sm text-gray-500">{user.userId?.email}</p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              className={`px-3 py-1 border mx-1 ${currentPage === 1 ? "bg-gray-300" : ""}`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 border mx-1 ${currentPage === i + 1 ? "bg-purple-600 text-white" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`px-3 py-1 border mx-1 ${currentPage === totalPages ? "bg-gray-300" : ""}`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppliedUsers;
