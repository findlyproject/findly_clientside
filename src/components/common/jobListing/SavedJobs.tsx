"use client";

import React, { useEffect, useState } from "react";
import { JobCard, JobSkeleton } from "./jobcard";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchSavedJobs } from "@/lib/store/features/actions/userActions";
import { SavedType } from "@/types/Types";

const SavedJobs = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (savedjobs.length !== 0) {
      setLoading(false)
    }
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    dispatch(fetchSavedJobs(page))
  }, [])
  const savedjobs:SavedType[] = useAppSelector((state) => state.user.savedJobs);
console.log(".....",savedjobs);

  return (
    <div className="p-4">
      <div className="flex justify-start flex-wrap gap-5 items-center mb-4">
        {loading && page === 1 ? (
          <div className="flex justify-start flex-wrap gap-5">
            {[...Array(6)].map((_, index) => (
              <JobSkeleton key={index} />
            ))}
          </div>
        ) : savedjobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedjobs.map((job, index) => (
              <JobCard
                key={index}
                date={job.jobId.createdAt}
                company={job.jobId.company.name}
                role={job.jobId.title}
                tags={job.jobId.jobType}
                salary={job.jobId.salary}
                location={job.jobId.location}
                logo={job.jobId.company.logo||""}
                bgColor="#ffff"
                _id={job.jobId._id}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No saved jobs found.</p>
        )}
      </div>

      {hasMore && savedjobs.length !== 0 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
