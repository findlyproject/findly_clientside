"use client";

import { saveJobs } from "@/lib/store/features/actions/userActions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import api from "@/utils/api";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuBookmark, LuBookmarkCheck } from "react-icons/lu";
import { Jobdetailcard, JobDetailSkeleton } from "./jobcard";
import { Job, JobPosting } from "@/types/Types";
import OutsideClickHandler from "react-outside-click-handler";
import ShareMenu from "../ShareMenu";

const JobDetails = () => {
  const { id } = useParams();
  const route = useRouter();
  const [detail, setDetails] = useState<JobPosting | null>(null);
  const [similarjob, setimilarjob] = useState<Job[]>([]);
  const [isShareMenuVisible, setShareMenuVisible] = useState(false);
  const [applied,setapplied]=useState()

  const [samecompany, setSamecompany] = useState<Job[]>([]);
  const [loading, setLoadin] = useState(true);
  const [isLoding, setIsLoding] = useState(true);

  const savedjobs = useAppSelector((state) => state.user.savedJobs);
  const jobDetails = async () => {
    try {
      setLoadin(false);
      const response = await api.get(`/company/getJobsById/${id}`);
      setDetails(response.data.findJob);
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setLoadin(true);
    }
  };
  const fetchapplyedjobs = async () => {
    try {
      const respons = await api.get("user/applyedjobs")
      setapplied(respons.data.data)
      console.log(respons.data.data)
     
     
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
      fetchapplyedjobs()
    }, [])
  useEffect(() => {
    if (id) {
      jobDetails();
    }
  }, [id]);
  const { activeuser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const routes = activeuser ? "user" : "company";

  ///getsimilarjob

  const getsimilarjob = async (jobType?: string, companyName?: string) => {
    try {
      setIsLoding(false);
      const response = await api.get(
        `/user/similarjobs/${jobType}/${companyName}`
      );
      setimilarjob(response.data.similarjobs);
      setSamecompany(response.data.similarcompany);
    } catch (error) {
      console.error("Error fetching similar jobs:", error);
    } finally {
      setIsLoding(true);
    }
  };

  useEffect(() => {
    if (detail?.jobType) {
      getsimilarjob(detail.jobType, detail.company?.name);
    }
  }, [detail]);

  console.log("detail", detail);

  return (
    <>
      <div className="w-5/6 flex md:flex-col sm:flex-col lg:flex-row 2xl:flex-col mx-auto p-5 gap-4 pt-20">
        {loading ? (
          <div className="w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header section with improved styling */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="relative flex-1 min-w-[280px]">
                  <h1 className="text-2xl font-bold text-gray-800 mb-7">
                    {detail?.title}
                  </h1>
                  <div className="flex items-center gap-4 mb-5 mt-4">
                    <div className="flex-shrink-0 bg-gray-100 rounded-lg p-1 shadow-sm">
                      <Image
                        src={detail?.company?.logo || "/default-logo.png"}
                        alt={detail?.company?.name || "Company logo"}
                        className="rounded-md object-cover"
                        width={64}
                        height={64}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">
                        {detail?.company?.name}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {detail?.location}
                      </p>
                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          {detail?.contactEmail}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          {detail?.contactPhone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                      {detail?.jobType}
                    </span>
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium">
                      {detail?.experienceLevel}
                    </span>
                    {detail?.industry && (
                      <span className="px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
                        {detail?.industry}
                      </span>
                    )}
                  </div>
                </div>

                <div className="relative min-w-[200px]">
                  <div className="flex gap-3 mb-8">
                    {activeuser && (
                      <button
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center gap-2 font-medium"
                        onClick={() =>
                          route.push(`/user/jobs/apply/${detail?._id}`)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {applied?.some((user) => user.jobId?._id === detail?._id) ? "Applied" : "Apply Now"}

                           
                      </button>
                    )}

                    {/* <button className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-500"
                    onClick={() => dispatch(saveJobs(id))}
                  >
                    {savedjobs.find((item) => item.jobId._id.includes(id)) ? <LuBookmarkCheck /> : <LuBookmark />
                    }
                  </button> */}

                    <button
                      className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-500"
                      onClick={() => {
                        if (typeof id === "string") {
                          dispatch(saveJobs(id));
                        } else {
                          console.error("Invalid id:", id); // Optional error handling
                        }
                      }}
                    >
                      {savedjobs.find((item) => item.jobId._id === id) ? (
                        <LuBookmarkCheck />
                      ) : (
                        <LuBookmark />
                      )}
                    </button>

                    <button
                      className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-500"
                      onClick={() => setShareMenuVisible((prev) => !prev)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                    </button>
                  </div>
                  {isShareMenuVisible && (
                    <OutsideClickHandler
                      onOutsideClick={() => setShareMenuVisible(false)}
                    >
                      <div className="absolute right-0 bg-white shadow-lg rounded-lg pt-4 pl-4 w-[400px] h-[150px] z-50">
                        <ShareMenu
                          url={`http://localhost:3000/${routes}/jobs/details/${detail?._id}`}
                          isShareMenuVisible={isShareMenuVisible}
                        />
                      </div>
                    </OutsideClickHandler>
                  )}
                </div>
              </div>
            </div>

            {/* Job details with improved styling */}
            <div className="p-6">
              <div className="space-y-8">
                <section>
                  <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    About this role
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {detail?.description}
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Qualifications
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <ul className="space-y-2 text-gray-700">
                      {detail?.requirements?.map(
                        (item: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span>{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Responsibilities
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <ul className="space-y-2 text-gray-700">
                      {detail?.jobResponsibilities?.map(
                        (item: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                      />
                    </svg>
                    Benefits
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {detail?.benefits?.map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Salary Range
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 mb-1">
                          Minimum
                        </span>
                        <div className="px-4 py-2 border rounded-xl bg-white shadow-sm font-medium text-gray-800">
                          {detail?.salary?.min}{" "}
                          <span className="text-sm text-gray-500">
                            {detail?.salary?.rate}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 mb-1">
                          Maximum
                        </span>
                        <div className="px-4 py-2 border rounded-xl bg-white shadow-sm font-medium text-gray-800">
                          {detail?.salary?.max}{" "}
                          <span className="text-sm text-gray-500">
                            {detail?.salary?.rate}
                          </span>
                        </div>
                      </div>

                      {detail?.applicationDeadline && (
                        <div className="flex flex-col ml-auto">
                          <span className="text-sm text-gray-500 mb-1">
                            Application Deadline
                          </span>
                          <div className="px-4 py-2 border rounded-xl bg-white shadow-sm font-medium text-red-600 flex items-center gap-2">
                            <Calendar size={16} />
                            {new Date(
                              detail.applicationDeadline
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        ) : (
          <JobDetailSkeleton />
        )}
        {activeuser && (
          <div className="h-screen overflow-auto">
            <section>
              <h2 className="text-lg font-semibold mb-4">Similar Jobs</h2>

              {isLoding ? (
                <div className="space-y-4 mb-3 h-1/2 overflow-y-auto">
                  {similarjob.map((job, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 bg-white shadow-lg"
                    >
                      <div className="flex items-start justify-between">
                        <Link href={`/user/jobs/details/${job._id}`}>
                          <div className="flex gap-3">
                            <Image
                              width={48}
                              height={48}
                              src={job?.company.logo || ""}
                              alt={`${job.company?.name} logo`}
                              className="rounded w-5 h-5"
                            />
                            <div>
                              <h3 className="font-medium">{job?.title}</h3>
                              <p className="text-sm text-gray-500">
                                {job?.company?.name} • {job.location}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                  {job.jobType}
                                </span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                  {job.experienceLevel}
                                </span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                  {job.industry}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 mt-2">
                                {new Date(job.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        </Link>
                        <button
                          className="p-2 text-gray-500 hover:text-gray-700"
                          onClick={() => dispatch(saveJobs(job?._id))}
                        >
                          {savedjobs.find((item) =>
                            item.jobId._id.includes(job?._id)
                          ) ? (
                            <LuBookmarkCheck />
                          ) : (
                            <LuBookmark />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Jobdetailcard />
              )}
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4">{`Other Jobs From ${detail?.company.name}`}</h2>
              {isLoding ? (
                <div className="space-y-4 mb-3 h-1/2 overflow-y-auto">
                  {samecompany.map((job, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 bg-white shadow-lg"
                    >
                      <div className="flex items-start justify-between">
                        <Link href={`/user/jobs/details/${job._id}`}>
                          <div className="flex gap-3">
                            <Image
                              width={48}
                              height={48}
                              src={job?.company?.logo || ""}
                              alt={`${job.company?.name} logo`}
                              className="rounded w-5 h-5"
                            />
                            <div>
                              <h3 className="font-medium">{job?.title}</h3>
                              <p className="text-sm text-gray-500">
                                {job?.company?.name} • {job.location}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                  {job.jobType}
                                </span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                  {job.experienceLevel}
                                </span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                  {job.industry}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 mt-2">
                                {new Date(job.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        </Link>
                        <button
                          className="p-2 text-gray-500 hover:text-gray-700"
                          onClick={() => dispatch(saveJobs(job?._id))}
                        >
                          {savedjobs.find((item) =>
                            item.jobId._id.includes(job?._id)
                          ) ? (
                            <LuBookmarkCheck />
                          ) : (
                            <LuBookmark />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : samecompany.length == 0 ? (
                <>
                  <h1>not Other Jobs From findly </h1>
                </>
              ) : (
                <Jobdetailcard />
              )}
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default JobDetails;
