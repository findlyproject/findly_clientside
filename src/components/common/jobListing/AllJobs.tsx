"use client"

import React, { useEffect, useState, useRef, useCallback } from "react";
import { JobCard } from "./jobcard";
import api from "@/utils/api";

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  industry: string;
  description: string;
  requirements: string[];
  jobResponsibilities: string[];
  applicationDeadline: string;
  benefits: string[];
  contactEmail: string;
  contactPhone: string;
  postedBy: PostedBy;
  likes: string[];
  salary?: Salary[] | undefined; 
  comments: string[];
  reports: string[];
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Salary {
  min: number;
  max: number;
  rate: string;
}

export interface PostedBy {
  address: Address;
  _id: string;
  name: string;
  logo: string;
  email: string;
  password: string;
  contact: number;
  role: string;
  age: number;
  IndustryType: string;
  subscriptionEndDate: string;
  subscriptionStartDate: string;
  isDeleted: boolean;
  employees: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Address {
  pincode: string;
  city: string;
  state: string;
  country: string;
}

function AllJobs() {
  const [jobs, setJobs] = useState<Job[]>([]); 
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchJobs = async (): Promise<void> => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await api.get<{ jobs: Job[] }>(`company/getalljobs?page=${page}`);
      console.log("Fetched jobs:", response.data.jobs);

      if (response.data.jobs.length === 0) {
        setHasMore(false);
      } else {
        setJobs((prevJobs) => [...prevJobs, ...response.data.jobs]); 
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }

    setLoading(false);
  };

  const lastJobRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchJobs();
          }
        },
        { threshold: 1.0 }
      );

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-4 h-full overflow-y-auto bg-slate-100">
      <div className="flex flex-wrap justify-stretch gap-4 mb-32">
        {jobs.map((job, index) => (
          <JobCard
            key={index}
            date={job.createdAt}
            company={job.company}
            role={job.title}
            tags={job.jobType}
            salary={job.salary}
            location={job.location}
            logo={job.postedBy.logo}
            bgColor="#C9E69F"
            _id={job._id}
            ref={index === jobs.length - 1 ? lastJobRef : null}
          />
        ))}
      </div>

      {loading && <p className="text-center my-4">Loading more jobs...</p>}
      {!hasMore && <p className="text-center my-4">No more jobs available.</p>}
    </div>
  );
}

export default AllJobs;
