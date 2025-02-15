"use client";

import { useAppSelector } from "@/lib/store/hooks";
import verification from "../../../public/assets/verify.jpg";
import Image from "next/image";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
interface Connection {
  connectionID: {
    _id: string;
    profileImage: string;
    firstName: string;
    jobTitle: string[];
  };
}


export default function ViewProfile() {
  const router = useRouter();

  const currentUser = useAppSelector((state) => state.user.activeuser);

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


      setConnections(response.data.connections);
    };
    fetchConnections();
  }, []);



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
                {currentUser?.location}• {connections.length} connections
              </p>
            </div>

            <div className="p-6">
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
                
                <Image
                 src={connect?.connectionID.profileImage}
                 alt="profile"
                 width={50}
                 height={50}
                
                />
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
