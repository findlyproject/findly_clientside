"use client";
import { AxiosError, AxiosResponse } from "axios";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { FaEllipsisV, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAppSelector } from "@/lib/store/hooks";
import { MdModeEditOutline } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

import {Community2,CommunityMessage } from "@/types/Types";
import Image from "next/image";
interface CommunityDetailsProps {
  id: string;
  onClose: () => void;
}
export default function CommunityDetails({
  id,
  onClose,
}: CommunityDetailsProps) {
  const [activeTab, setActiveTab] = useState("images");
  const activeuser = useAppSelector((state) => state.user.activeuser);
  const activeCompany=useAppSelector((state)=>state.companyLogin.activeCompany)
  const [message, setMessage] = useState<CommunityMessage[]>([]);
  const router = useRouter();
  const [details, setDetails] = useState<Community2 | null>(null);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const fetchCommunity = async () => {
    const response = await api.get(`/message/details/${id}`);
    console.log("response of details", response);
    setDetails(response.data.community);

    const responseofmessage = await api.get(
      `/message/getCommuntyMessage/${id}`
    );
    console.log("get messge community", responseofmessage);
    setMessage(responseofmessage.data.Message);
  };
  useEffect(() => {
    fetchCommunity();
  }, []);
  console.log("mmmm", message);

  const isMember = details?.members?.some(
    (item) => item.memberId?._id === activeuser?._id
  );
  console.log("isMember", isMember);

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLeaveCommunity = async (communityid: string): Promise<void> => {
    try {
      const response: AxiosResponse = await api.patch(
        `/message/leave/${communityid}`
      );
      console.log("Response of leave:", response);

      if (response.status === 200) {
        toast.success("Successfully left the community");
        router.push("/community");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
          toast.warn(error.response.data.message);
        } else {
          console.error("Unexpected error:", error);
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    console.log("ffff", details);

    const leav = details?.members;
    console.log("leav", leav);
  }, []);

  console.log("details", details);

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(details?.description || "");
  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async (communityid: string) => {
    console.log("commuuuu", communityid);

    try {
      if (!description.trim()) {
        toast.warn("Description cannot be empty!");
        return;
      }

      const response = await api.patch(`/message/update/${communityid}`, {
        description,
      });
      console.log("Updated description:", response);

      setIsEditing(false);
      fetchCommunity();
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };
  const [isnameEdit, setIsnameEdit] = useState(false);

  const [name, setName] = useState(details?.name || "");
  const handleEditNameClick = () => setIsnameEdit(true);

  const handleSaveName = async (communityid: string) => {
    try {
      if (!name.trim()) {
        toast.warn("name cannot be empty!");
        return;
      }

      const response = await api.patch(`/message/updatename/${communityid}`, {
        name,
      });
      console.log("Updated name:", response);

      setIsnameEdit(false);
      fetchCommunity();
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handleDeleteCommunity = async (communityid: string) => {
    const response = await api.patch(`/message/delete/${communityid}`);
    console.log("community removal:", response);
    onClose();

    fetchCommunity();
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(details?.profile || "");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (communityid: string) => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profile", selectedFile);
    console.log("formData", formData);

    try {
      const response = await api.patch(
        `/message/updateprofile/${communityid}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("response of logo upload", response);
      setSelectedFile(null);

      fetchCommunity();
    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };

  console.log("details",details);
  
  return (
    <div className="max-w-4xl w-full mx-auto p-4">
      <button className="absolute top-0 left-4 text-md" onClick={onClose}>
        ✕
      </button>
      <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center"></div>

      <div className="relative flex flex-col items-center -mt-12">
        <div className="relative w-24 h-24">
          <Image
            src={preview || details?.profile||""}
            alt="Community Profile"
            className="w-full h-full rounded-full border-4 border-white shadow-md"
            width={80}
            height={80}
          />

          <input
            type="file"
            accept="image/*"
            id="logoUpload"
            className="hidden"
            onChange={handleFileChange}
          />

{activeCompany?._id === details?.createdBy?._id && (
  selectedFile !== null ? (
    <button
      onClick={() => details?._id && handleUpload(details?._id)}
      className="absolute inset-0 flex items-center justify-center bg-primary text-white p-1 rounded"
    >
      Upload
    </button>
  ) : (
    <label
      htmlFor="logoUpload"
      className="absolute bottom-1 right-1 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition"
    >
      <FaPencilAlt className="text-gray-600 text-sm" />
    </label>
  )
)}

        </div>

        <h2 className="mt-2 text-xl font-semibold text-gray-800 flex items-center">
          {details?.name}
          <span className="ml-2">
  {activeCompany?._id === details?.createdBy?._id && (
    isnameEdit ? (
      <FaSave
        onClick={() => details?._id && handleSaveName(details?._id)}
        className="text-green-500 text-lg cursor-pointer"
      />
    ) : (
      <MdModeEditOutline
        onClick={handleEditNameClick}
        className="text-blue-500 text-lg cursor-pointer"
      />
    )
  )}
</span>

        </h2>

        {isnameEdit ? (
          <input
            type="text"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md mt-2 px-2 py-1 w-full"
            autoFocus
          />
        ) : (
          <p></p>
        )}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col">
          <p className="flex items-center text-black text-md font-semibold">
            Description
            <span className="ml-2">
  {activeCompany?._id === details?.createdBy?._id && (
    isEditing ? (
      <FaSave
        onClick={() => details?._id && handleSaveClick(details?._id)}
        className="text-green-500 text-lg cursor-pointer"
      />
    ) : (
      <MdModeEditOutline
        onClick={handleEditClick}
        className="text-blue-500 text-lg cursor-pointer"
      />
    )
  )}
</span>

          </p>

          {isEditing ? (
            <input
              type="text"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-md mt-2 px-2 py-1 w-full"
              autoFocus
            />
          ) : (
            <p className="text-gray-600 mt-2">
              {details ? details.description : description}
            </p>
          )}
        </div>

        <div className="relative " ref={dropdownRef}>
          <button
            onClick={handleDropdown}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <FaEllipsisV />
          </button>

          {dropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {activeuser ? (
                <button
                  onClick={() =>
                    details?._id && handleLeaveCommunity(details?._id)
                  }
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg transition duration-150"
                >
                  Leave Community
                </button>
              ) : (
                <button
                  onClick={() =>
                    details?._id && handleDeleteCommunity(details?._id)
                  }
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg transition duration-150"
                >
                  Delete Community
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "images" ? "bg-primary text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("images")}
          >
            Images
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "videos" ? "bg-primary text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("videos")}
          >
            Videos
          </button>

          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "members" ? "bg-primary text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("members")}
          >
            Members
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {activeTab === "images" ? (
            <ul className="space-y-2">
              {message
                .filter((item) => item.type === "image")
                .map((item, index) => (
                  <li key={index}>
                    <img
                      src={item.message}
                      className="w-full h-[150px] object-cover rounded-lg"
                      alt="Post"
                    />
                  </li>
                ))}
            </ul>
          ) : activeTab === "videos" ? (
            <ul className="space-y-2">
              {message
                .filter((item) => item.type === "video")
                .map((item, index) => (
                  <li key={index}>
                    <video
                      src={item.message}
                      className="w-full h-[150px] rounded-lg"
                      controls
                    />
                  </li>
                ))}
            </ul>
          ) : (
            <ul className="space-y-2">
              <h1 className="text-xl font-semibold">
                {details?.members?.length || 0} Members
              </h1>
              {details?.members.map((member, index) => (
                <li
                  key={index}
                  className="py-2 flex items-center border-b pb-2"
                >
                  <img
                    src={
                      member.memberModel === "User"
                        ? member.memberId?.profileImage
                        : member.memberId?.logo
                    }
                    className="w-8 h-8 rounded-full"
                    alt={
                      member.memberModel === "User"
                        ? member.memberId?.firstName
                        : member.memberId?.name
                    }
                  />
                  <span className="ml-3">
                    {member.memberModel === "User"
                      ? member.memberId?.firstName
                      : ""}
                  </span>

                  <p>
                    {member.memberId._id === details.createdBy?._id
                      ? details.createdBy?.name
                      : ""}
                  </p>
                  {details.createdBy._id === member.memberId._id && (
                    <span className="text-primary ml-auto bg-gray-100 border border-primary rounded-full text-sm px-2 py-1">
                      Admin
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
