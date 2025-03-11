
"use client";

import React, { useEffect, useState } from "react";
import { JobCard, JobSkeleton } from "./jobcard";
import api from "@/utils/api";
import { LuRotateCw } from "react-icons/lu";
import { InputType, Job } from "@/types/Types";

export interface Input{
  input:InputType
}

function AllJobs({input}:Input) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Debounce input changes
  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);

    return () => clearTimeout(handler);
  }, [input]);

  useEffect(() => {
    setPage(1);
  }, [debouncedInput]);

  const fetchJobs = async () => {
    if (loading) return;

    setLoading(true);

    try {
      console.log("Fetching jobs...");
      const response = await api.get<{
        jobs: Job[];
        hasMore: boolean;
        totalPages: number;
      }>(
        `company/getalljobs?page=${page}&title=${debouncedInput?.title || ""}&experienceLevel=${debouncedInput?.experienceLevel || ""}&industry=${debouncedInput?.industry || ""}&jobType=${debouncedInput?.jobType || ""}`
      );


      setJobs((prev) => (page === 1 ? response.data.jobs : [...prev, ...response.data.jobs]));
      setHasMore(response.data.hasMore);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, debouncedInput]);

  const setPagination = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  console.log("job",jobs);
  
  return (
    <div className="p-4 h-full overflow-y-auto bg-slate-100">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <JobSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-start gap-4 mb-5">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                date={job.createdAt}
                company={job.company.name}
                role={job.title}
                tags={job.jobType}
                salary={job.salary}
                location={job.location}
                logo={job.company.logo||""}
                bgColor="#ffff"
                _id={job._id}
              />
            ))}
          </div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, index) => (
                <JobSkeleton key={index} />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="flex justify-center my-4">
              <button
                onClick={setPagination}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded flex items-center justify-center gap-2 hover:bg-blue-600 disabled:bg-gray-400"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  </>
                ) : (
                  <div className="flex justify-center items-center gap-1">
                    <LuRotateCw />
                    More
                  </div>
                )}
              </button>
            </div>
          )}

          {!hasMore && <p className="text-center my-4">No more jobs available.</p>}
        </>
      )}
    </div>
  );
}

export default AllJobs;
