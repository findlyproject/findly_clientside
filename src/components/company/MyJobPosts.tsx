"use client";

import api from "@/utils/api";
import React, { useEffect, useState } from "react";

export const MyJobPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3
 const[jobs,setJobs]=useState([])


  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);


  useEffect(()=>{
    const fetchjobs=async()=>{
        const res=await api.get(`/company/getjobs`)
        console.log("response of jobs by this company",res);
        setJobs(res.data.postedJobs)
    }
    fetchjobs()
  },[])

  console.log("jooobs ",jobs);
  
  return (
    <div className="max-w-4xl mx-auto mt-8">
      {currentJobs.map((job) => (
        <div
          key={job._id}
          className="bg-white shadow-md rounded-lg p-5 mb-4 flex justify-between items-center"
        >
          <div>
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p className="text-gray-500">{job.company.name} • {job.location} • {job.jobType}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {job.benefits.map((tag, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{job.salary.min}-{job.salary.max}</p>
            <button className="mt-2 px-4 py-2 bg-primary text-white rounded ">
              Apply
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-2 border rounded transition ${
              currentPage === i + 1 ? "bg-primary text-white" : "hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
