"use client";

import React, { useState, useEffect } from "react";
import { CiMail, CiLocationOn } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
import { User } from "@/types/Types";
import api from "@/utils/api";
import { useParams } from "next/navigation";

function UserView() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/admin/user/${id}`);

      setUser(response.data.finduserprofile);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {!user ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="grid gap-3 text-center">
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                width="62"
                height="62"
                viewBox="0 0 62 62"
                fill="none"
              >
                <g id="Group 1000003711">
                  <circle
                    id="Ellipse 717"
                    cx="31.0018"
                    cy="30.9993"
                    r="26.5091"
                    stroke="#6b48ab"
                    strokeWidth="8"
                    strokeDasharray="5 5"
                  />
                  <path
                    id="Ellipse 715"
                    d="M38.7435 56.3529C45.0336 54.4317 50.3849 50.2409 53.7578 44.5947C57.1307 38.9484 58.2842 32.25 56.9942 25.8008C55.7043 19.3516 52.063 13.6122 46.7779 9.69765C41.4928 5.78314 34.9412 3.97307 28.396 4.61912"
                    stroke="#6b48ab"
                    strokeWidth="8"
                  />
                </g>
              </svg>
            </div>
            <span className="text-black text-sm font-normal leading-snug">
              Loading... User not Found!!
            </span>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex flex-col items-center space-y-3">
              <img
                src={user?.profileImage || ""}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
              />

              <p
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
      ${
        user.isBlocked === false
          ? "bg-purple-200 text-primary"
          : "bg-purple-200 text-primary"
      }
    `}
              >
                {user.isBlocked === false ? "Active" : "Inactive"}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                {user?.firstName} {user?.lastName}
              </h2>
            </div>

            <div className="text-gray-600 space-y-2">
              <p className="flex items-center gap-2">
                <LuPhone className="text-primary" />
                {user?.phoneNumber}
              </p>
              
              <p className="flex items-center gap-2">
                <CiMail className="text-primary" />
                {user?.email}
              </p>
              <p className="flex items-center gap-2">
                <CiLocationOn className="text-primary" />
                {user?.location?.stateName ||
                  user?.location?.city ||
                  user?.location?.countryName}
              </p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 gap-4 text-gray-600">
                  <div>
                    <strong>First Name:</strong> {user?.firstName || "N/A"}
                  </div>
                  <div>
                    <strong>Last Name:</strong> {user?.lastName || "N/A"}
                  </div>
                  <div>
                    <strong>Email:</strong> {user?.email || "N/A"}
                  </div>
                  <div>
                    <strong>Date of Birth:</strong>{" "}
                    {user?.dateOfBirth
                      ? new Date(user.dateOfBirth).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Resume</h3>
                {user?.resumePDF && user.resumePDF.length > 0 ? (
                  <div className="space-y-3">
                    {user.resumePDF
                      .filter((item) => item.isDeleted === false)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="border border-gray-300 rounded-lg p-4 flex justify-between items-center bg-gray-50"
                        >
                          <p className="text-gray-700 font-medium truncate w-3/4">
                            {item.fileName || "Resume File"}
                          </p>
                          <a
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-indigo-700"
                          >
                            View
                          </a>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No resumes uploaded.</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">About</h3>
              <p>{user?.about}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-xl mb-6 border-b pb-2 text-gray-800">
                  Education
                </h3>
                {user?.education?.length > 0 ? (
                  <div className="space-y-4">
                    {user.education.map((item) => (
                      <div
                        key={item._id}
                        className="border rounded-xl p-5 shadow-md bg-white hover:bg-gray-50 transition duration-200"
                      >
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">
                          {item.college}
                        </h4>
                        <p className="text-sm text-gray-600">
                          <strong>Qualification:</strong> {item.qualification}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Subject:</strong> {item?.subject || "N/A"}
                        </p>
                        <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs bg-primary text-white">
                          {item.startYear} - {item.endYear}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No education found.</p>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-6 border-b pb-2 text-gray-800">
                  Experiences
                </h3>
                {user?.experience?.length > 0 ? (
                  <div className="space-y-4">
                    {user.experience.map((item) => (
                      <div
                        key={item._id}
                        className="border rounded-xl p-5 shadow-md bg-white hover:bg-gray-50 transition duration-200"
                      >
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">
                          {item.companyName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          <strong>Role:</strong> {item.jobRole}
                        </p>
                        <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs bg-primary text-white">
                          {item.startYear} - {item.endYear}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No experiences found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserView;
