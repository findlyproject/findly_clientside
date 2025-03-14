"use client";
import api from "@/utils/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { Company } from "@/types/Types";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
function CompanyView() {
  const { id } = useParams();
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      const response = await api.get(`/admin/company/${id}`);
      console.log("response,,,,,,,,,", response);

      setCompany(response.data.findCompanyprofile);
    };
    fetchCompany();
  }, []);



  return (
    <>
      {!company ? (
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
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex flex-col items-center space-y-3">
              <img
                src={company?.logo || ""}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
              />

              <p
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
      ${
        company.isBlocked === false
          ? "bg-purple-200 text-primary"
          : "bg-purple-200 text-primary"
      }
    `}
              >
                {company.isBlocked === false ? "Active" : "Inactive"}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">{company?.name}</h2>
              <p className="text-gray-400 text-sm">
                Founded since{" "}
                {company?.foundedAt
                  ? new Date(company?.foundedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>

            <h1 className="text-sm font-semibold mt-10">
              Social Media Profiles
            </h1>

            <div className="flex items-center space-x-4">
              <Link href={company?.socialMedia?.facebook || ""} target="_blank">
                <FaFacebook className="text-blue-600 text-3xl cursor-pointer hover:text-blue-800 transition" />
              </Link>
              <Link
                href={company?.socialMedia?.instagram || ""}
                target="_blank"
              >
                <FaInstagram className="text-pink-600 text-3xl cursor-pointer hover:text-blue-800 transition" />
              </Link>
              <Link href={company?.socialMedia?.twitter || ""} target="_blank">
                <FaTwitter className="text-blue-600 text-3xl cursor-pointer hover:text-blue-800 transition" />
              </Link>
              <Link href={company?.socialMedia?.linkedin || ""} target="_blank">
                <FaLinkedin className="text-blue-600 text-3xl cursor-pointer hover:text-blue-800 transition" />
              </Link>
            </div>

            <div className="text-gray-600 space-y-2">
              <p className="flex items-center gap-2">
                <LuPhone className="text-primary" />
                {company?.contact}
              </p>
              <p className="flex items-center gap-2">
                <CiMail className="text-primary" />
                {company?.email}
              </p>
              <p className="flex items-center gap-2">
                <CiLocationOn className="text-primary" />
                {company?.address?.city || company?.address?.landmark}{" "}
                {company?.address?.country} {company?.address?.pincode}
              </p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Company Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
                <div>
                  <strong>Name:</strong> {company?.name}
                </div>
                <div>
                  <strong>Founder:</strong> {company?.founder}
                </div>
                <div>
                  <strong>Founded At:</strong>{" "}
                  {company?.foundedAt
                    ? new Date(company?.foundedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </div>
                <div>
                  <strong>Industry Type:</strong> {company?.IndustryType}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">About</h3>
              <p>{company?.about}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Services</h3>
              {company?.services?.length > 0 ? (
                company?.services.map((item, index) => (
                  <p key={index} className="text-gray-600">
                    * {item}
                  </p>
                ))
              ) : (
                <p className="text-gray-400">No services available</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Employees</h3>
              <div className="flex flex-wrap gap-2">
                {company?.employees?.length > 0 ? (
                  company.employees.map((item) => (
                    <span
                      key={item._id}
                      className="px-3 py-1 rounded-full text-sm bg-primary text-white"
                    >
                      {item.employee} - {item.position}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No employees found.</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Working Hours</h3>
              <span className="px-3 py-1 rounded-full text-sm bg-primary text-white">
                {company?.workHours?.start} - {company?.workHours?.end}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default CompanyView;
