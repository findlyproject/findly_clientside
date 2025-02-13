"use client";

import { useAppSelector } from "@/lib/store/hooks";
import verification from "../../../public/assets/verify.jpg";
import Image from "next/image";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface Connection {
  connectionID: {
    _id: string;
    profileImage: string;
    firstName: string;
    jobTitle: string[];
  };
}

const connections: Connection[] = []; 
export default function ViewProfile() {
  const router = useRouter();

  const currentUser = useAppSelector((state) => state.user.activeuser);

  console.log("kk", currentUser);
  console.log("lo", currentUser);
  const aboutText = currentUser?.about ?? "Tell me about yourself...";

  const [isExpanded, setIsExpanded] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([]);

  console.log(
    "connections",
    connections.map((item) => item.connectionID._id)
  );

  useEffect(() => {
    const fetchConnections = async () => {
      const response = await api.get(`/connecting/getconnection`);
      console.log("all connections of user response", response);

      setConnections(response.data.connections);
    };
    fetchConnections();
  }, []);

  console.log("dd", currentUser?.role === "premium");

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-5">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-5">
        <div className="relative h-36 bg-gray-300">
          <Image
            className="object-cover"
            src={currentUser?.banner || ""}
            alt="Profile Banner"
            fill
          />
        </div>

        <div className="p-6 relative  ">
          <div className="w-24 h-24 rounded-full border-4 border-white absolute -top-12 left-6">
            <Image
              src={currentUser?.profileImage || ""}
              alt="Landing Page Illustration"
              width={100}
              height={200}
              className="object-cover rounded-md"
            />
          </div>
          <div className=" flex flex-col md:flex-row justify-between">
            <div className="mt-12 flex flex-col items-start">
              <div className="flex items-center justify-between ">
                <h2 className="text-xl font-bold">
                  {currentUser?.firstName} {currentUser?.lastName}
                </h2>
                <span>
                  {currentUser?.role === "premium" && (
                    <Image
                      src={verification}
                      width={30}
                      height={20}
                      alt="Verified"
                    />
                  )}
                </span>
              </div>
              <p className="text-gray-900">
                {currentUser?.jobTitle?.map((title) => title)}
              </p>
              <p className="text-gray-900 text-sm">
                {currentUser?.location?.city}• {connections.length} connections
              </p>
            </div>

            <div className="p-6">
           <div className="flex gap-4 justify-end">
           <div className="relative group">
      {/* Hover Text */}
      <span className="hidden group-hover:block absolute bottom-12 -left-8 w-24 bg-gray-800 text-white px-2 py-1 rounded-md text-sm">
        Edit Profile
      </span>

      <button 
        onClick={() => router.push(`/editprofile`)}
        className="text-white bg-primary font-semibold text-xl p-2 rounded-md group flex items-center gap-2">
        
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        
      </button>
    </div>
    <div className="relative group">
      <span className="hidden group-hover:block absolute bottom-12 -left-8 w-32 bg-gray-800 text-white px-2 py-1 rounded-md text-sm">
        Upload Resume
      </span>

      
      <button 
           onClick={()=>router.push(`/ownprofile/resume`)}
           className="text-white bg-primary font-semibold text-xl p-2 rounded-md group flex items-center gap-2"
           ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
         </svg>
         </button>
    </div>
           </div>



              <div className="mt-2 flex flex-col justify-center md:justify-start">
                {currentUser?.education?.length ? (
                  currentUser.education.map((institute, index) => (
                    <div
                      key={index}
                      className="w-full flex items-center justify-start md:justify-start mb-4"
                    >
                      <p className="text-center ms-5">{institute.college}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">
                    No education details available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold">About</h3>
          <p
            className={`text-gray-600 transition-all duration-300 ${
              isExpanded ? "" : "line-clamp-3"
            }`}
          >
            {aboutText}
          </p>

          {aboutText.length > 150 && (
            <div className="flex justify-center mt-5">
              <button
                className="px-4 py-2 text-white bg-blue-600 border border-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 hover:border-blue-700 active:scale-95"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 border-t">
        <h3 className="text-lg font-semibold">Experience</h3>
        <div className="mt-2 flex">
          <div>
            {currentUser?.experience && currentUser.experience.length > 0 ? (
              currentUser.experience.map((item, index) => (
                <div key={index} className="flex mb-4">
                  <div className="ml-5">
                    <h4>{item.jobRole}</h4>
                    <p>{item.companyName}</p>
                    <p className="text-sm text-gray-500">
                      {item.startYear}
                      {item.endYear}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No experience data available.</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 border-t">
        <h3 className="text-lg font-semibold">Education</h3>
        <div className="mt-2 flex">
          <div>
            {currentUser?.education && currentUser.education.length > 0 ? (
              currentUser.education.map((item, index) => (
                <div key={index} className="flex mb-4">
                  <div className="ml-5">
                    <h4>{item.college}</h4>
                    <p>{item.qualification}</p>
                    <p className="text-sm text-gray-500">
                      {item.startYear}-{item.endYear}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No Education data available.</p>
            )}
          </div>
        </div>
      </div>


      {currentUser?.projects && currentUser.projects.length > 0 ? (
        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold">Projects</h3>
          <div className="mt-2">
            {currentUser.projects.map((item, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold">{item.title}</p>
                <p className="text-gray-600">
                  {item.description}
                  
                </p>
                
                <Link className="text-blue-500 underline" href={item.link ?? "/"} target="_blank" rel="noopener noreferrer">
  Project Link
</Link>

              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold">Project</h3>
          <p>No Project available</p>
        </div>
      )}

      <div className="p-6 border-t">
        <h3 className="text-lg font-semibold">Skills</h3>
        <ul className="mt-2 list-disc list-inside">
          {currentUser?.skills &&
          Array.isArray(currentUser.skills) &&
          currentUser.skills.length > 0 ? (
            currentUser.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))
          ) : (
            <p>No skills available</p>
          )}
        </ul>
      </div>

      <div className="p-6 border-t">
        <h3 className="text-lg font-semibold border-b pb-2">Interests</h3>
        <div className="flex space-x-1  overflow-x-auto p-2 justify-center flex-wrap ">
          {connections.length > 0 ? (
            connections.map((connect) => (
              <div
                key={connect?.connectionID?._id}
                className="flex items-center space-x-3 p-3 border rounded-lg shadow-sm w-64 mb-4 sm:w-80 md:w-96"
              >
                <div onClick={()=>router.push(`/userdetails/${connect?.connectionID?._id}`)}>
                <Image
                  className="w-12 h-12 rounded-full"
                  src={connect?.connectionID?.profileImage}
                  alt="Profile"
                  width={100}
                  height={100}
                />
                </div>
               
                <div>
                  <p className="font-semibold">
                    {connect?.connectionID?.firstName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {connect.connectionID?.jobTitle[0]}
                  </p>
                  <p className="text-xs text-gray-500">
                    {connections.length} followers
                  </p>
                  <button className="mt-1 px-3 py-1 text-gray-700 border rounded-full text-sm">
                    ✓ Following
                  </button>
                </div>
               
              </div>
               
            
            
              
            ))
          ) : (
            <p>No connections available.</p>
          )}
        </div>
        <button
               onClick={() => router.push(`/mynetwork/networklist`)}
               className="w-full text-blue-600 mt-3 text-sm"
             >
               Show all→
             </button>
            
      </div>
    </div>
  );
}
