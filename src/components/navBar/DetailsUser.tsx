"use client";



import React, { useEffect, useState, useRef } from "react";
import api from "@/utils/api";
import {setDetailes} from "@/lib/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import verification from "../../../public/assets/verify.jpg";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface Connection {
  connectionID: {
    connecting: string[];
    _id: string;
    profileImage: string;
    firstName: string;
    jobTitle: string[];
  };
  status: boolean;
}
interface Education {
  college: string;
  qualification?: string;
  startYear: number;
  endYear: number;
}
interface Experience {
  companyName: string;
  jobRole: string;
  startYear: number;
  endYear: number;
}

interface Projects{
  title:string;
  description:string;
  link:string;
}

interface UserProfile {
  connecting: Connection[];
  skills?: string[];
  education?: Education[];
  about: string;
  banner: string;
  profileImage: string;
  jobTitle: string[];
  role: string;
  firstName: string;
  lastName: string;
  location: string;
  experience: Experience[];
  email: string;
  createdAt: string;
  updatedAt: string;
  projects:Projects[]
}

const DetailsUser = ({ id }: { id: string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Requested = useAppSelector((state) => state.user.connectionRequest);

  const connections = useAppSelector((state) => state.user.connections);

  console.log("id", id);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const activeuserid = useAppSelector((state) => state.user.activeuser);
  console.log("activeuseridactiveuserid", activeuserid);

  const user = useAppSelector(
    (state) => state.user.userdetails
  ) as UserProfile | null;

  console.log("log user",user);
  
  // const userdetailes = user?.connecting.map(
  //   (person) => person.connectionID?._id
  // );

  useEffect(() => {
    const fetch = async () => {
      const response = await api.get(`/user/spacificuserdetails/${id}`);
      console.log("response,response....", response.data.finduserprofile);

      dispatch(setDetailes(response.data.finduserprofile));
    };
    fetch();
  }, [dispatch]);

  const handleRequest = async () => {
    console.log("connection userid from params");

    const response = await api.post(`/connecting/request/${id}`);
    console.log(" responsevresponse connection", response.data.targetUser);
    dispatch(setDetailes(response.data.targetUser));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-5">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-visible mt-5">
        <div className="relative h-36 bg-gray-300">
          <Image
            className="object-cover"
            src={user?.banner || ""}
            alt="Profile Banner"
            fill
          />
        </div>

        <div className="p-6 relative  ">
          <div className="w-24 h-24 rounded-full border-4 border-white absolute -top-12 left-6">
            <Image
              src={user?.profileImage || ""}
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
                  {user?.firstName} {user?.lastName}
                </h2>
                <span>
                  {user?.role === "premium" && (
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
                {user?.jobTitle?.map((title) => title)}
              </p>
              <p className="text-gray-900 text-sm">
                {user?.location?.city}•{" "}
                {user?.connecting?.filter((item) => item.status === true)
                  .length || 0}{" "}
                connections
              </p>

              <div className="relative flex gap-4 mt-5">
                {user?.connecting?.some(
                  (conn) =>
                    conn.connectionID._id === activeuserid?._id &&
                    conn.status === false
                ) ? (
                  <button
                    className="text-white font-semibold bg-primary py-1 px-2 rounded-full"
                    onClick={handleRequest}
                  >
                    Pending
                  </button>
                ) : (
                  !user?.connecting?.some(
                    (conn) => conn.connectionID?._id === activeuserid?._id
                  ) && (
                    <button
                      className="text-white font-semibold bg-primary py-1 px-2 rounded-full"
                      onClick={handleRequest}
                    >
                      Connect
                    </button>
                  )
                )}
                {user?.connecting?.some(
                  (conn) =>
                    conn.connectionID?._id === activeuserid?._id &&
                    conn.status === true
                ) ? (
                  <button className="text-primary border border-primary font-semibold bg-white py-1 px-2 rounded-full">
                    Message
                  </button>
                ) : (
                  <button className="text-primary border border-primary font-semibold bg-white py-1 px-2 rounded-full">
                    Message
                  </button>
                )}

                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className=" relative text-primary border border-primary font-semibold bg-gray-100 py-1 px-3 rounded-full hover:bg-gray-300 transition"
                  >
                    More
                  </button>

                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    >
                      <ul className="text-gray-700">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Remove Connection
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Report
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={openModal}
                        >
                          About This Profile
                        </li>
                      </ul>
                    </div>
                  )}
                  {/* Modal */}
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="relative bg-white p-6 rounded-lg shadow-lg w-80">
                        <button
                          onClick={closeModal}
                          className=" absolute top-0 right-2 mt-4 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
                        >
                          ❌
                        </button>
                        <h2 className=" text-2xl font-bold">
                          About this Profile
                        </h2>
                        <p className="mt-2 text-lg font-semibold text-gray-700">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-gray-700"> {user?.email}</p>
                        <p className="text-gray-700">
                          <span className="text-black font-semibold">
                            Location:
                          </span>{" "}
                          {user?.location}
                        </p>
                        <p className="text-gray-700">
                          <span className="text-black font-semibold">
                            Joined:
                          </span>
                          {user?.createdAt
                            ? new Date(user.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            : "No date available"}
                        </p>

                        <p className="text-gray-700">
                          <span className="text-black font-semibold">
                            Updated:
                          </span>
                          {user?.updatedAt
                            ? new Date(user.updatedAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            : "No date available"}
                        </p>

                        <div></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {user?.education && user.education.length > 0 ? (
              <div className="p-6 ">
                <div className="mt-2 flex flex-col justify-center md:justify-start">
                  {user.education.map((institute, index) => (
                    <div
                      key={index}
                      className="w-full flex items-center justify-start md:justify-start mb-4"
                    >
                      <p className="text-center">{institute.college}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 ">
                <h1>no education detailes</h1>
              </div>
            )}
          </div>
        </div>

        {user?.about ? (
          <div className="p-6 border-t">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-gray-600">{user?.about ? user.about : ""}</p>
            <div className=" flex justify-center mt-5 ">
              {" "}
              <button className="text-center text-primary">View More</button>
            </div>
          </div>
        ) : (
          <div className="p-6 border-t">
            <h3 className="text-lg font-semibold">About</h3>
          </div>
        )}
      </div>

      {user?.experience && user.experience.length > 0 ? (
        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold">Experience</h3>
          {user.experience?.map((item) => (
            <div className="mt-2  flex">
              <div>
                <img
                  className="w-14 mr-5"
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
              </div>
              <div>
                <p className="font-bold">{item.jobRole}</p>
                <p className="text-gray-600">
                  {item.companyName} • {item.startYear} - {item.endYear}
                </p>
              </div>
            </div>
          ))}

          <hr className="mt-5 mb-5" />
        </div>
      ) : (
        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold">Experience</h3>
        </div>
      )}

      {user?.education && user.education.length > 0 ? (
        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold">Education</h3>
          <div className="mt-2">
            {user.education.map((item, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold">{item.college}</p>
                <p className="text-gray-600">
                  {item.qualification ? item.qualification + " • " : ""}
                  {item.startYear} - {item.endYear}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold">Education</h3>
        </div>
      )}


{user?.projects && user.projects.length > 0 ? (
        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold">Projects</h3>
          <div className="mt-2">
            {user.projects.map((item, index) => (
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
        </div>
      )}

      {user?.skills && user.skills.length > 0 ? (
        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold">Skills</h3>
          <ul className="mt-2 list-disc list-inside">
            {user.skills.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold">Skills</h3>
        </div>
      )}

      <div className="p-6 border-t">
        <h3 className="text-lg font-semibold border-b pb-2">Interests</h3>
        <div className="flex space-x-1  overflow-x-auto p-2 justify-center flex-wrap ">
          {user?.connecting
            ?.filter((person) => person.status === true)
            .map((person) => (
              <div
                key={person.connectionID._id}
                className="flex items-center space-x-3 p-3 border rounded-lg shadow-sm w-64 mb-4 sm:w-80 md:w-96"
              >
                <div onClick={()=>router.push(`/userdetails/${person?.connectionID?._id}`)}>
                <Image
                  className="w-12 h-12 rounded-full"
                  src={person.connectionID.profileImage}
                  alt={person.connectionID.firstName}
                  width={100}
                  height={100}
                />
                </div>
                
                <div>
                  <p className="font-semibold">
                    {person.connectionID.firstName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {person.connectionID.connecting
                      ? person.connectionID.connecting.length
                      : 0}{" "}
                    followers
                  </p>
                  <button className="mt-1 px-3 py-1 text-gray-700 border rounded-full text-sm">
                    ✓ Following
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsUser;
