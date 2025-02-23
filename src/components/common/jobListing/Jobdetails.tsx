"use client";

import api from '@/utils/api';
// import api from "@/utils/api";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const JobDetails = () => {
//     const { id } = useParams(); 
//     const [detail,setDetails]=useState([])

//     const jobDetails = async () => {
//         try {
//             console.log("Fetching job details...");

//             const response = await api.get(`/company/getJobsById/${id}`);
//             console.log("Job Data:", response.data.findJob);
//             setDetails(response.data.findJob)

//         } catch (error) {
//             console.error("Error fetching job details:", error);
//         }
//     };

//     useEffect(() => {
//         if (id) {
//             jobDetails();
//         }
//     }, [id]); 
//     return (
//         <div>
//             <h1>Job Details Page</h1>
//             <p>Job ID: {id}</p>
//         </div>
//     );
// };

// export default JobDetails;


import { Image } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const JobDetails = () => {
    const { id } = useParams(); 
    const [detail,setDetails]=useState([])

    const jobDetails = async () => {
        try {
            console.log("Fetching job details...");

            const response = await api.get(`/company/getJobsById/${id}`);
            console.log("Job Data:", response.data.findJob);
            setDetails(response.data.findJob)

        } catch (error) {
            console.error("Error fetching job details:", error);
        }
    };

    useEffect(() => {
        if (id) {
            jobDetails();
        }
    }, [id]); 
  const similarJobs = [
    {
      title: "Lead UI Designer",
      company: "Gojek",
      location: "Jakarta, Indonesia",
      type: "Fulltime",
      workMode: "Onsite",
      experience: "3-5 Years",
      posted: "2 days ago",
      applicants: 521,
      logo: "/api/placeholder/48/48"
    },
    {
      title: "Sr. UX Designer",
      company: "GoPay",
      location: "Jakarta, Indonesia", 
      type: "Fulltime",
      workMode: "Onsite",
      experience: "3-5 Years",
      posted: "2 days ago",
      applicants: 210,
      logo: "/api/placeholder/48/48"
    }
  ];

  const otherJobs = [
    {
      title: "UI Designer",
      company: "Pixelz Studio",
      location: "Yogyakarta, Indonesia",
      type: "Internship",
      workMode: "Onsite",
      experience: "Fresh Graduate",
      posted: "a day ago",
      applicants: 35,
      logo: "/api/placeholder/48/48"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-4">{detail?.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Image width={100} height={100} src={detail.postedBy?.logo} alt={detail.postedBy?.name} className="rounded" />
              <div>
                <p className="font-medium">{detail.company}</p>
                <p className="text-sm text-gray-500">{detail.location}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{detail.jobType}</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{detail.experienceLevel}</span>
            </div>
          </div>
          {/* <button className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button> */}
          <div className="flex gap-4 mb-8">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Apply Now
          </button>
          <button className="p-2 border rounded-lg hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <button className="p-2 border rounded-lg hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-4">About this role</h2>
            <p className="text-gray-600">
              As an UI/UX Designer on Pixelz Studio, you'll focus on design user-friendly on several platform (web, mobile, dashboard, etc) to our users needs. Your innovative solution will enhance the user experience on several platforms. Join us and let's making impact on user engagement at Pixelz Studio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Qualification</h2>
            <ul className="list-disc pl-4 space-y-2 text-gray-600">
              <li>At least 2-4 years of relevant experience in product design or related roles.</li>
              <li>Knowledge of design validation, either through quantitative or qualitative research.</li>
              <li>Have good knowledge using Figma and Figjam</li>
              <li>Experience with analytics tools to gather data from users.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Responsibility</h2>
            <ul className="list-disc pl-4 space-y-2 text-gray-600">
              <li>Create design and user journey on every features and product/business units across multiples devices (Web+App)</li>
              <li>Identifying design problems through user journey and devising elegant solutions</li>
              <li>Develop low and hi fidelity designs, user experience flow, & prototype, translate it into highly-polished visual composites following style and brand guidelines.</li>
              <li>Brainstorm and works together with Design Lead, UX Engineers, and PMs to execute a design sprint on specific story or task</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Similar Jobs</h2>
            <div className="space-y-4">
              {similarJobs.map((job, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <img src={job.logo} alt={`${job.company} logo`} className="rounded" />
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{job.type}</span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{job.workMode}</span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{job.experience}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          {job.posted} • {job.applicants} Applicants
                        </p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Other Jobs From Pixelz Studio</h2>
            <div className="space-y-4">
              {otherJobs.map((job, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <img src={job.logo} alt={`${job.company} logo`} className="rounded" />
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{job.type}</span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{job.workMode}</span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{job.experience}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          {job.posted} • {job.applicants} Applicants
                        </p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;