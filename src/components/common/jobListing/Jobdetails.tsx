"use client";

import api from '@/utils/api';
import { Calendar, Image } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaRegCopy, FaWhatsapp } from 'react-icons/fa';

interface JobPosting {
  _id: string;
  title: string;
  description: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  industry: string;
  salary: {
    max: string;
    min: string;
    rate: string;
  } | undefined;
  requirements: string[];
  jobResponsibilities: string[];
  benefits: string[];
  applicationDeadline: string;
  contactEmail: string;
  contactPhone: string;
  company: {
    address: string;
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
  };
  createdAt: string;
  updatedAt: string;
  status: string;
  isDeleted: boolean;
  __v: number;
};

const JobDetails = () => {
  const { id } = useParams();
  const route = useRouter()
  const [detail, setDetails] = useState<JobPosting | null>(null);

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

  const [copied, setCopied] = useState(false);
  const currentURL = typeof window !== 'undefined' ? window.location.href : '';
console.log("handilcopy",currentURL);

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(currentURL); // Copy to clipboard
    setCopied(false);
    setTimeout(() => setCopied(false), 5000); // Hide message after 2 sec
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

const sendwhatsapp =async ()=>{
  const message = `🚀 *Job Opportunity Available!* 🚀

📌 *Position:* ${detail?.title}
🏢 *Company:* ${detail?.company}
📍 *Location:* ${detail?.location}
💰 *Salary:* $${detail?.salary?.min} - $${detail?.salary?.max} per ${detail?.salary?.rate}
📅 *Deadline:* ${new Date(detail?.applicationDeadline).toLocaleDateString()}

🔗 Apply Now: ${currentURL}

Don't miss out on this opportunity! ✨`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank"); 
}
  return (
    <div className='w-5/6 flex md:flex-col sm:flex-col lg:flex-row 2xl:flex-col mx-auto'>
      <div className="w-full mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b">
        <div className="flex flex-wrap items-start justify-between">
          <div className='relative '>
            <h1 className="text-2xl font-semibold mb-7">{detail?.title}</h1>
            <div className='flex items-center gap-2 absolute top-7 text-sm'>
              <Calendar size={16} /> {detail?.createdAt && new Date(detail.createdAt).toLocaleDateString("en-US")}

            </div>
            <div className="flex items-center gap-2 mb-4">
              <Image width={100} height={100} src={detail?.company?.logo} alt={detail?.postedBy?.name} className="rounded" />
              <div>
                <p className="font-medium">{detail?.company}</p>
                <p className="text-sm text-gray-500">{detail?.location}</p>
                <p className="text-xs text-gray-500">{detail?.contactEmail}</p>
                <p className="text-xs text-gray-500">{detail?.contactPhone}</p>

              </div>
            </div>
            <div className="flex gap-2 m-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{detail?.jobType}</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{detail?.experienceLevel}</span>
            </div>
          </div>

          <div className='relative'>
            <div className="flex gap-4 mb-8">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={()=>route.push(`/user/jobs/apply/${detail?._id}`)}>
                Apply Now
              </button>
              <button className="p-2 border rounded-lg hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              <button className="p-2 border rounded-lg hover:bg-gray-50 " onClick={()=>setCopied(!copied)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
              {copied && (
  <div className="w-full absolute right-0 top-12 bg-white p-1 border rounded-xl shadow-lg overflow-hidden">
    <div className='w-full flex justify-center items-center'>
    <span
      className="w-full max-w-[85%] m-2 border bg-slate-100 p-1 overflow-x-auto whitespace-nowrap rounded-lg text-sm font-medium text-gray-700"
      style={{
        scrollbarWidth: "thin", 
        msOverflowStyle: "none",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      {currentURL}
    </span>

    <button
     onClick={handleCopy}
      className="p-2 rounded-lg hover:bg-gray-200 transition duration-200"
    >
      <FaRegCopy className="text-gray-600 hover:text-gray-800" size={18} />
    </button>
    </div>
    <div className='flex m-2'>
      <button onClick={sendwhatsapp}>
      <FaWhatsapp  className='text-green-500 text-5xl'/>
      </button>
    </div>
  </div>
)}

            </div>

          </div>
          
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-4">About this role</h2>
            <p className="text-gray-600">
              {detail?.description}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Qualification</h2>
            <ul className="list-disc pl-4 space-y-2 text-gray-600">
              {
                detail?.requirements?.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))
              }

            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Responsibility</h2>
            <ul className="list-disc pl-4 space-y-2 text-gray-600">
              {
                detail?.jobResponsibilities?.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))
              }
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Benefits</h2>
            <ul className="list-disc pl-4 space-y-2 text-gray-600">
              {
                detail?.benefits?.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))
              }
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Salary</h2>
            <div className='mx-4 flex gap-4'>
              <button className='p-2 border rounded-xl bg-slate-100'>{detail?.salary?.min}{" "}{detail?.salary?.rate}</button>
              <button className='p-2 border rounded-xl bg-slate-100'>{detail?.salary?.max}{" "}{detail?.salary?.rate}</button>
            </div>
          </section>

          
        </div>
      </div>
      
    </div>
    <div className=''>
      <section>
            <h2 className="text-lg font-semibold mb-4">Similar Jobs</h2>
            <div className="space-y-4">
              {similarJobs.map((job, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <Image width={100} height={100} src={job.logo} alt={`${job.company} logo`} className="rounded" />
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
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
                      <Image src={job.logo} alt={`${job.company} logo`} className="rounded" />
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
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
  );
};

export default JobDetails;