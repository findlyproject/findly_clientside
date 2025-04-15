"use client";
import { useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Connection } from "@/types/Types";
import FileUpload from "../user/ressume/Upload";
import OutsideClickHandler from "react-outside-click-handler";
export const ViewProfile = () => {
  const router = useRouter();

  const { activeuser } = useAppSelector((state) => state.user);
  const route = activeuser ? "user" : "company";
  const aboutText = activeuser?.about ?? "Tell about yourself...";

  const [isExpanded, setIsExpanded] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [resume, setResume] = useState(false);

  useEffect(() => {
    const fetchConnections = async () => {
      const response = await api.get(`/connecting/getconnection`);

      setConnections(response.data.connections);
    };
    fetchConnections();
  }, []);

  return (
    <>
      <section className="relative ">
        <Image
          src={activeuser?.banner || ""}
          alt="cover-image"
          className="w-full absolute top-20 px-10 left-0 z-0 h-60 object-cover"
          width={240}
          height={240}
        />
        <div className="w-full max-w-7xl mx-auto space-y-5 px-6 md:px-8">
          <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
            <Image
              src={activeuser?.profileImage || ""}
              alt="user-avatar-image"
              className="border-4 size-28 order-solid border-white rounded-full object-cover"
              width={112}
              height={112}
            />
          </div>
          <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
            <div className="block">
              <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-1">
                {activeuser?.firstName} {activeuser?.lastName}
              </h3>
              <p className="font-normal text-base leading-7 text-gray-500">
                {activeuser?.location?.city}
              </p>
            </div>
            
            <button className="rounded-full py-3.5 px-5 bg-gray-100 flex items-center group transition-all duration-500 hover:bg-indigo-100 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  className="stroke-gray-700 transition-all duration-500 group-hover:stroke-indigo-600"
                  d="M14.1667 11.6666V13.3333C14.1667 14.9046 14.1667 15.6903 13.6785 16.1785C13.1904 16.6666 12.4047 16.6666 10.8333 16.6666H7.50001C5.92866 16.6666 5.14299 16.6666 4.65483 16.1785C4.16668 15.6903 4.16668 14.9047 4.16668 13.3333V11.6666M16.6667 9.16663V13.3333M11.0157 10.434L12.5064 9.44014C14.388 8.18578 15.3287 7.55861 15.3287 6.66663C15.3287 5.77466 14.388 5.14749 12.5064 3.89313L11.0157 2.8993C10.1194 2.3018 9.67131 2.00305 9.16668 2.00305C8.66205 2.00305 8.21393 2.3018 7.31768 2.8993L5.82693 3.89313C3.9454 5.14749 3.00464 5.77466 3.00464 6.66663C3.00464 7.55861 3.9454 8.18578 5.82693 9.44014L7.31768 10.434C8.21393 11.0315 8.66205 11.3302 9.16668 11.3302C9.67131 11.3302 10.1194 11.0315 11.0157 10.434Z"
                  stroke="#374151"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <span className="px-2 font-medium text-base leading-7 text-gray-700 transition-all duration-500 group-hover:text-indigo-600">
                {activeuser?.jobTitle&&activeuser?.jobTitle[0]}
              </span>
            </button>
          </div>
          <div className="flex mr-3 hover:cursor-pointer" title="my networks" onClick={() => router.push(`/mynetwork/networklist`)}
          >
                {Array.isArray(activeuser?.connecting) &&
                  activeuser.connecting
                    .slice(0, 3)
                    .map((user, index) => (
                      <Image
                        key={index}
                        className="border-2 border-white rounded-full h-10 w-10 -mr-4"
                        src={
                          user?.connectionID?.profileImage ||
                          "/https://res.cloudinary.com/dq1auwpkm/image/upload/v1738735360/profile_jtwxaj.png-profile.png"
                        }
                        width={40}
                        height={40}
                        alt="Profile"
                      />
                    ))}

                <span className="flex items-center justify-center bg-white text-sm text-gray-800 font-semibold border-2 border-gray-200 rounded-full h-11 w-11">
                  {activeuser?.connecting.length}+
                </span>
              </div>
          <div className="flex flex-col lg:flex-row max-lg:gap-5 items-center justify-between py-0.5">
            <div className="flex items-center gap-4">
              <button
                className="py-3.5 px-5 rounded-full bg-primary text-white font-semibold text-base leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-100 hover:bg-indigo-700"
                onClick={() => router.push(`/${route}/profile/edit`)}
              >
                Edit Profile
              </button>
              <button
                className="py-3.5 px-5 rounded-full bg-purple-100 text-primary font-semibold text-base leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-100"
                onClick={() => setResume(true)}
              >
                Resume upload
              </button>
             
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6 ">
              <p className="flex items-center gap-2 font-medium text-lg leading-8 text-gray-400 ">
                Skills
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.78135 5.55191C9.4453 3.5173 9.77728 2.5 10.3928 2.5C11.0083 2.5 11.3403 3.5173 12.0043 5.55191L12.2949 6.44244C12.4784 7.00479 12.5701 7.28596 12.7928 7.44706C13.0155 7.60816 13.3125 7.60816 13.9063 7.60816H14.8683C17.0355 7.60816 18.119 7.60816 18.3081 8.19335C18.4972 8.77854 17.6169 9.40763 15.8563 10.6658L15.0921 11.2118C14.6069 11.5586 14.3643 11.732 14.278 11.9937C14.1918 12.2554 14.2841 12.5382 14.4687 13.1038L14.7569 13.9872C15.4209 16.0218 15.7529 17.0391 15.2549 17.3993C14.7569 17.7595 13.8878 17.1308 12.1496 15.8733L11.3887 15.323C10.9083 14.9754 10.6681 14.8016 10.3928 14.8016C10.1175 14.8016 9.87731 14.9754 9.39687 15.323L8.63605 15.8733C6.89779 17.1308 6.02866 17.7595 5.5307 17.3993C5.03273 17.0391 5.36471 16.0218 6.02866 13.9872L6.31927 13.0966C6.50278 12.5343 6.59454 12.2531 6.50948 11.9924C6.42441 11.7318 6.18419 11.558 5.70375 11.2104L4.94293 10.6601C3.20467 9.40261 2.33555 8.77389 2.52575 8.19102C2.71596 7.60816 3.79026 7.60816 5.93886 7.60816H6.87929C7.47315 7.60816 7.77008 7.60816 7.99277 7.44706C8.21547 7.28596 8.30723 7.00479 8.49074 6.44244L8.78135 5.55191Z"
                    stroke="#9CA3AF"
                    strokeWidth="1.6"
                  />
                </svg>
              </p>
              <ul className="flex items-center max-sm:justify-center max-sm:flex-wrap gap-2.5">
                {activeuser?.skills &&
                  activeuser.skills.map((skill, index) => (
                    <li
                      key={index}
                      className="py-3.5 px-7 rounded-full  font-semibold text-xs leading-7 text-gray-700"
                    >
                      {skill}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div>
          {activeuser?.jobTitle && (
  <span className="font-medium text-base leading-7 text-gray-700 transition-all duration-500 group-hover:text-indigo-600">
    {activeuser.jobTitle.join(" | ")}
  </span>
)}

              </div>
          <hr></hr>
          <div>
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
                  className="px-4 py-2 text-white bg-primary border border-primary rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 hover:border-blue-700 active:scale-95"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              </div>
            )}
          </div>
          <hr></hr>
          <div>
            <h2 className="text-lg font-semibold">Experience</h2>
            {activeuser?.experience && activeuser.experience.length > 0 ? (
              <>
                {activeuser?.experience.map((experience, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between flex-wrap gap-2 w-full">
                      <span className="text-gray-700 font-bold">
                        {experience?.jobRole}
                      </span>
                      <p>
                        <span className="text-gray-700 mr-2">
                          {experience.companyName}
                        </span>
                        <span className="text-gray-700">
                          {experience.startYear}-{experience.startYear}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-gray-600">No experience data available.</p>
            )}
          </div>
          <hr></hr>
          <div>
            <h3 className="text-lg font-semibold">Education</h3>
            <div className="mt-2 flex">
              <div>
                {activeuser?.education && activeuser.education.length > 0 ? (
                  activeuser.education.map((item, index) => (
                    <div key={index} className="flex mb-4">
                      <div className="">
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
          <hr></hr>
          <div>
            {activeuser?.projects && activeuser.projects.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold">Projects</h3>
                <div className="mt-2">
                  {activeuser.projects.map((item, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-bold">{item.title}</p>
                      <p className="text-gray-600">{item.description}</p>

                      <Link
                        className="text-blue-500 underline"
                        href={item.link ?? "/"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold">Project</h3>
                <p>No Project available</p>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold pb-2">Interests</h3>
            <div className="flex space-x-1 border overflow-x-auto p-2 justify-center flex-wrap ">
              {connections.length > 0 ? (
                connections.slice(0, 4).map((connect, index) => (
                  <div  key={index} >
                    <div
                     
                      className="flex-col items-center space-x-3 p-3 border rounded-lg shadow-sm mb-4 w-auto"
                    >
                      <div
                        onClick={() =>
                          router.push(
                            `/userdetails/${connect?.connectionID?._id}`
                          )
                        }
                      >
                        <Image
                          className="w-12 h-12  rounded-full"
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
                    <button
                      onClick={() => router.push(`/mynetwork/networklist`)}
                      className="w-full text-blue-600 mt-3 text-sm"
                    >
                      Show all→
                    </button>
                  </div>
                ))
              ) : (
                <p>No connections available.</p>
              )}
            </div>
          </div>
        </div>
        <div></div>
      </section>
      {resume && (
        <section className="fixed  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <OutsideClickHandler onOutsideClick={() => setResume(false)}>
            <FileUpload />
          </OutsideClickHandler>
        </section>
      )}
    </>
  );
};
