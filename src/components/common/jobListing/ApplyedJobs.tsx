
"use client"
import React, { useEffect, useState } from 'react';
import api from '@/utils/api';
import { ApplyJobSkeleton } from './jobcard';
import { applicationData } from '@/types/Types';

const ApplyedJobs = () => {
  const [jobs, setJobs] = useState<applicationData[]>([])
  const [isloading, setIsLoading] = useState(true)
  const fetchapplyedjobs = async () => {
    try {
      const respons = await api.get("user/applyedjobs")
      setJobs(respons.data.data)
      console.log(respons.data.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchapplyedjobs()

  }, [])
  return (
    <div className=" h-auto flex items-center justify-center p-4 w-full">
      {isloading ? (
        <ApplyJobSkeleton />

      ) : (
        <div className="flex-1 p-6 bg-white rounded-xl shadow-lg w-3/4">

          <div className="space-y-6">
            {jobs.map((job,index) => (
              <div key={index} className="border-b pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{job?.jobId?.title}</h3>
                    <span className="text-sm">{job?.jobId?.industry}</span>

                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <span className="font-medium">{job?.jobId?.company?.name}</span>
                      <span className="mx-1">•</span>
                      <span>{job?.jobId?.location}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {job?.jobId?.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-2">Applied: {new Date(job?.createdAt).toLocaleDateString("en-US")}</div>
                    <button
                      className={` 
    ${job.status === "Accepted" ? "text-green-500" : job?.status === "Rejected" ? "text-red-400" : "text-primary"} 
    font-medium px-4 py-1 rounded-md text-sm cursor-default
  `}
                    >
                      {job.status}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyedJobs;