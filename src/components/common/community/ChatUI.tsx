/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { FaEllipsisV, FaTrash, FaCopy } from "react-icons/fa";
import { useAppSelector } from "@/lib/store/hooks";
import api, { socket } from "@/utils/api";
import { MdClose, MdImage, MdVideoCameraBack } from "react-icons/md";
import { toast } from "react-toastify";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import CommunityDetails from "./CommunityDetails";


import { Community,CommunityMessage } from "@/types/Types";
interface FilePreview {
  type: "image" | "video";
  url: string;
  file: File;
}

export default function ChatUI() {
  
  const [selectedCommunity, setSelectedCommunity] = useState<Community|null>(null);
  const [community, setCommunity] = useState<Community|null>(null);
  const activeuser = useAppSelector((state) => state.user.activeuser);
  const [input, setInput] = useState({
    message: "",
    type: "text",
  });
  const [message, setMessage] = useState<CommunityMessage[]>([]);
  const [showFileModal, setShowFileModal] = useState(false);
  const [filePreview, setFilePreview] = useState<FilePreview | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string|null>(null);
  console.log("input", input);
  console.log("community", community);
  const activeCompany = useAppSelector(
    (state) => state.companyLogin.activeCompany
  );
  const handleCommunityClick = async (community:Community) => {
    setSelectedCommunity(community);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && activeDropdown && !target.closest(".message-dropdown")) {
        setActiveDropdown(null);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);
  

  const toggleFileModal = () => {
    setShowFileModal(!showFileModal);

    if (!showFileModal) {
      setFilePreview(null);
    }
  };

 
  const handleFileSelect = (type: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute(
        "accept",
        type === "image" ? "image/*" : "video/*"
      );
      fileInputRef.current.click();
    }
  };

  
  const handleFileChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    
    const fileURL = URL.createObjectURL(file);
    setFilePreview({
      type: file.type.startsWith("image/") ? "image" : "video",
      url: fileURL,
      file: file,
    });
  };
  console.log("filePreview", filePreview);

  // Delete message function
  const onDelete = async (messageId:string) => {
    try {
      const response = await api.post(
        `message/deletCommuntyMessage/${messageId}`
      );
      console.log("delete response", response);
      toast.success("Message deleted successfully");
      setMessage((prevMessages) =>
        prevMessages.filter((msg) => msg._id != messageId)
      );
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  //// send message in community

  const sendmessage = async (id:string) => {
    console.log("iiii", id);

    try {
      console.log("hhhhh.......");

      const response = await api.post(`/message/communtyMessage/${id}`, input);
      console.log("inpuutt", input);

      console.log("message send", response);
      setFilePreview(null);
      setShowFileModal(false);
      setInput({
        message: "",
        type: "",
      });
      socket.on("sendedMessage", (data) => {
        console.log("socketdata", data);
        setCommunity((prev) => prev ? { ...prev, data } : prev);

      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const sendFile = async () => {
    try {
      if (!filePreview) return;

      const response = await api.get("/user/generate-signed-url", {
        params: { fileType: filePreview.type },
      });

      const { api_key, timestamp, signature, folder, cloudName } =
        response.data;

      const formData = new FormData();
      formData.append("file", filePreview.file);
      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", folder);

      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${filePreview.type}/upload`;
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      const data = await uploadResponse.json();
      if (!data.secure_url) throw new Error(`Upload Failed`);

      console.log(data);

      setInput({
        message: data.secure_url,
        type: filePreview.type,
      });
      if (!community) {
        toast.error("Community not found!");
        return;
      }
      
      sendmessage(community._id);
      
      
      return;
    } catch {
      toast.error(`Error uploading`);
      return null;
    }
  };
console.log("commuu",community);

  const cancelFileSelection = () => {
    setFilePreview(null);
  };
 const getcommunity = async () => {
    const response = await api.get("/message/all");
    console.log("respons all comunity", response);
    
  };
  //// join to community
  const handleJoin = async (id:string) => {
    try {
      const response = await api.patch(`/message/join/${id}`);
      console.log("response join", response);
      socket.on("communtjoin", (data) => {
        console.log("join comunity", data);
        setCommunity(data);
        getcommunity()
      });
    } catch (error) {
      console.log("join error", error);
    }
  };

  console.log("community", community);

  const getcommunitymessage = async () => {
    try {
      const response = await api.get(
        `/message/getCommuntyMessage/${community?._id}`
      );
      console.log("get messge community", response);
      setMessage(response.data.Message);
    } catch (error) {
      console.log("object", error);
    }
  };

  useEffect(() => {
    if (community?._id) {
      getcommunitymessage();
    }
  }, [community, input]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  console.log("community populate", community);
  const [isopen, setIsopen] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (e:MediaQueryListEvent) => {
      if (e.matches) {
        setIsopen(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  });
  console.log("isopen", isopen);
  console.log("community",community )
  return (
    <div className="w-full  flex bg-gray-100 relative h-screen ">
      <div className={`${isopen ? "flex absolute left-0 z-50" : ""}`}>
        <div
          className={`w-auto relative h-screen overflow-y-auto ${
            isopen ? "block absolute left-0 sm:hidden" : "hidden sm:block"
          }`}
        >
          {/* <Sidebar props={{ setCommunity, community, isopen, setIsopen }} /> */}
          <Sidebar  setCommunity={setCommunity} 
  community={community} 
  isopen={isopen} 
  setIsopen={setIsopen}/>
        </div>
        <span
          className={`${
            isopen ? "block sm:hidden" : "hidden"
          } bg-white text-xl rounded-full h-16 p-2`}
          onClick={() => setIsopen(!isopen)}
        >
          <RxCross2 />
        </span>
      </div>

      <div className="w-full relative h-screen flex flex-col">
        {!selectedCommunity ? (
          <>
            <main
              className="flex flex-col w-full h-full overflow-hidden"
              key={community?._id}
            >
              {community ? (
                <>
                  <header className="  flex items-center gap-2 bg-white p-4 border-b">
                    <button
                      className="p-2 block sm:hidden text-3xl"
                      onClick={() => setIsopen(!isopen)}
                    >
                      <IoReorderThreeOutline />
                    </button>
                    <div
                      className="flex items-center"
                      onClick={() => handleCommunityClick(community)}
                    >
                      <Image
                        width={100}
                        height={100}
                        src={community?.profile}
                        className="w-10 h-10 rounded-full"
                        alt="Group"
                      />
                      <div className="ml-3">
                        <h2 className="font-medium">{community?.name}</h2>
                        <span className="text-sm text-gray-500">
                          {community?.members.length} Members
                        </span>
                      </div>
                    </div>
                  </header>
                  <div className="overflow-y-auto p-4 h-screen overflow-hidden ">
                    <div>
                      {community.members.find(
                        (member) =>
                          member.memberId == activeCompany?._id ||
                          member.memberId == activeuser?._id
                      ) ? (
                        <div>
                          <ul className="flex flex-col space-y-4 p-4  rounded-lg">
                            {message.map((item, index) => {
                              console.log("item", item);

                              
                              const isSender =
                                item.senderModel === "User"
                                  ? item.sender?._id == activeuser?._id
                                  : activeCompany?._id;
                              console.log("isSender", isSender);

                              const isConsecutive =
                                index > 0 &&
                                item.sender?._id ===
                                  message[index - 1].sender?._id;
                              const showTimestamp =
                                index === 0 ||
                                new Date(item.timestamp).getTime() -
                                  new Date(
                                    message[index - 1].timestamp
                                  ).getTime() >
                                  300000;

                              return (
                                <li key={index} className="flex flex-col ">
                                  {showTimestamp && (
                                    <div className="flex justify-center my-2">
                                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                        {new Date(
                                          item.timestamp
                                        ).toLocaleDateString("en-US")}
                                      </span>
                                    </div>
                                  )}

                                  <div
                                    className={`flex items-end ${
                                      isSender ? "justify-end" : "justify-start"
                                    }`}
                                  >
                                    {!isSender && !isConsecutive && (
                                      <div className="flex flex-col items-center mr-2">
                                        <div className="relative">
                                          <Image
                                            width={32}
                                            height={32}
                                            src={
                                              item.sender?.profileImage ||
                                              item.sender?.logo ||
                                              "/default-avatar.png"
                                            }
                                            alt={`${
                                              item.sender?.firstName ||
                                              item.sender?.name
                                            }'s Profile`}
                                            className="w-8 h-8 rounded-full shadow-md object-cover border border-gray-200"
                                          />
                                          {/* {item.sender?.online && (
                                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                                          )} */}
                                        </div>
                                        {!isConsecutive && (
                                          <span className="text-xs text-gray-600 mt-1 font-medium">
                                            {item.sender?.firstName ||
                                              item.sender?.name}
                                          </span>
                                        )}
                                      </div>
                                    )}

                                    <div
                                      className={`relative p-3 rounded-lg max-w-96 break-words shadow-sm ${
                                        isSender
                                          ? "bg-primary text-white rounded-tr-none"
                                          : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
                                      } ${
                                        isConsecutive
                                          ? isSender
                                            ? "mr-10"
                                            : "ml-10"
                                          : ""
                                      }`}
                                    >
                                     
                                      {isSender && (
                                        <div className="absolute top-1 right-1 message-dropdown">
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setActiveDropdown(
                                                activeDropdown == item._id
                                                  ? null
                                                  : item._id
                                              );
                                            }}
                                            className={`p-1.5 rounded-full ${
                                              isSender
                                                ? "text-blue-100 "
                                                : "text-gray-400 hover:bg-gray-100"
                                            }`}
                                          >
                                            <FaEllipsisV className="text-sm mt-[-4]" />
                                          </button>

                                          {activeDropdown == item._id && (
                                            <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
                                              <button
                                                onClick={() => {
                                                  onDelete(item._id);
                                                  setActiveDropdown(null);
                                                }}
                                                className="flex w-full items-center px-3 py-2 text-sm text-primary hover:bg-red-50"
                                              >
                                                <FaTrash className="w-3 h-3 mr-2" />
                                                Delete
                                              </button>

                                              <button
                                                onClick={() => {
                                                 
                                                  navigator.clipboard.writeText(
                                                    item.message
                                                  );
                                                  setActiveDropdown(null);
                                                  toast.success(
                                                    "Copied to clipboard"
                                                  );
                                                }}
                                                className="flex w-full items-center px-3 py-2 text-sm text-primary hover:bg-gray-50"
                                              >
                                                <FaCopy className="w-3 h-3 mr-2" />
                                                Copy
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      )}

                                      {item.type === "text" && (
                                        <p className="text-sm">
                                          {item.message}
                                        </p>
                                      )}

                                      {item.type === "video" && (
                                        <div className="rounded-lg overflow-hidden">
                                          <video
                                            src={item.message}
                                            controls
                                            className="w-60 rounded-lg"
                                          />
                                          <p className="text-xs mt-1 opacity-70">
                                            {isSender
                                              ? "You sent a video"
                                              : `${
                                                  item.sender?.firstName ||
                                                  item.sender?.name
                                                } sent a video`}
                                          </p>
                                        </div>
                                      )}

                                      {item.type === "image" && (
                                        <div className="rounded-lg overflow-hidden">
                                          <Image
                                            width={240}
                                            height={180}
                                            src={
                                              item.message ||
                                              "/placeholder-image.jpg"
                                            }
                                            alt="Chat Image"
                                            className="w-60 rounded-lg object-cover"
                                          />
                                          <p className="text-xs mt-1 opacity-70">
                                            {isSender
                                              ? "You sent an image"
                                              : `${
                                                  item.sender.firstName ||
                                                  "User"
                                                } sent an image`}
                                          </p>
                                        </div>
                                      )}

                                      <div
                                        className={`text-xs mt-1 ${
                                          isSender
                                            ? "text-blue-100"
                                            : "text-gray-500"
                                        } text-right`}
                                      >
                                        {new Date(
                                          item.timestamp
                                        ).toLocaleTimeString("en-US", {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: true,
                                        })}
                                      </div>
                                    </div>

                                    {isSender && !isConsecutive && (
                                      <div className="flex flex-col items-center ml-2">
                                        <div className="relative">
                                          <Image
                                            width={32}
                                            height={32}
                                            src={
                                              activeuser?.profileImage ||
                                              activeCompany?.logo ||
                                              "/default-avatar.png"
                                            }
                                            alt="Your Profile"
                                            className="w-8 h-8 rounded-full shadow-md object-cover border border-gray-200"
                                          />
                                          <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                                        </div>
                                        {!isConsecutive && (
                                          <span className="text-xs text-gray-600 mt-1 font-medium">
                                            You
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </li>
                              );
                            })}
                            <div ref={messagesEndRef} />
                          </ul>
                        </div>
                      ) : (
                        <div className="flex justify-center px-4 py-8">
                          <div className="border border-primary rounded-lg shadow-lg max-w-md w-full bg-white p-6">
                            <div className="text-center">
                              <h1 className="text-black font-bold text-2xl mb-2">
                                Join Our Community
                              </h1>
                              <p className="text-gray-600 mb-4">
                                Connect with job seekers and employers, expand
                                your network, and unlock new opportunities.
                                Share experiences and get the support you need
                                to land your dream job.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <footer className="p-4 h-20 bg-white border-t flex">
                    {community.members.find(
                      (member) =>
                        member.memberId == activeCompany?._id ||
                        member.memberId ==activeuser?._id
                    ) ? (
                      <>
                      




                        
<div className="w-full pl-3 pr-1 py-1 rounded-3xl border border-gray-200 items-center gap-2 inline-flex justify-between ">
<div className="flex items-center gap-2">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-primary">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
</svg>

  <input className="grow shrink basis-0 text-black text-xs font-medium leading-4 focus:outline-none" placeholder="Type here..." value={input.message}
                          onChange={(e) =>
                            setInput({ message: e.target.value, type: "text" })
                          }/>
</div>
<div className="flex items-center gap-2">
  <button onClick={toggleFileModal}>
  <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <g id="Attach 01">
      <g id="Vector">
        <path d="M14.9332 7.79175L8.77551 14.323C8.23854 14.8925 7.36794 14.8926 6.83097 14.323C6.294 13.7535 6.294 12.83 6.83097 12.2605L12.9887 5.72925M12.3423 6.41676L13.6387 5.04176C14.7126 3.90267 16.4538 3.90267 17.5277 5.04176C18.6017 6.18085 18.6017 8.02767 17.5277 9.16676L16.2314 10.5418M16.8778 9.85425L10.72 16.3855C9.10912 18.0941 6.49732 18.0941 4.88641 16.3855C3.27549 14.6769 3.27549 11.9066 4.88641 10.198L11.0441 3.66675" stroke="#9CA3AF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14.9332 7.79175L8.77551 14.323C8.23854 14.8925 7.36794 14.8926 6.83097 14.323C6.294 13.7535 6.294 12.83 6.83097 12.2605L12.9887 5.72925M12.3423 6.41676L13.6387 5.04176C14.7126 3.90267 16.4538 3.90267 17.5277 5.04176C18.6017 6.18085 18.6017 8.02767 17.5277 9.16676L16.2314 10.5418M16.8778 9.85425L10.72 16.3855C9.10912 18.0941 6.49732 18.0941 4.88641 16.3855C3.27549 14.6769 3.27549 11.9066 4.88641 10.198L11.0441 3.66675" stroke="black" stroke-opacity="0.2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14.9332 7.79175L8.77551 14.323C8.23854 14.8925 7.36794 14.8926 6.83097 14.323C6.294 13.7535 6.294 12.83 6.83097 12.2605L12.9887 5.72925M12.3423 6.41676L13.6387 5.04176C14.7126 3.90267 16.4538 3.90267 17.5277 5.04176C18.6017 6.18085 18.6017 8.02767 17.5277 9.16676L16.2314 10.5418M16.8778 9.85425L10.72 16.3855C9.10912 18.0941 6.49732 18.0941 4.88641 16.3855C3.27549 14.6769 3.27549 11.9066 4.88641 10.198L11.0441 3.66675" stroke="black" stroke-opacity="0.2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </g>
  </svg>
  </button>
  
  <button 
  onClick={() => sendmessage(community?._id)}
  disabled={!input.message.trim()}
  className="items-center flex px-3 py-2 bg-primary rounded-full shadow ">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <g id="Send 01">
        <path id="icon" d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z" stroke="white" stroke-width="1.6" stroke-linecap="round" />
      </g>
    </svg>
    <h3 className="text-white text-xs font-semibold leading-4 px-2">Send</h3>
  </button>
</div>
</div>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          handleJoin(community?._id);
                          console.log("community._id", community._id);
                        }}
                        className="text-white bg-primary hover:bg-primary-dark transition-colors duration-300 font-semibold rounded-md py-2 px-4 w-full"
                      >
                        Join Now
                      </button>
                    )}


                  </footer>
                </>
              ) : (
                <div className="flex">
                  <div className="block sm:hidden">
                  <Sidebar setCommunity={setCommunity} community={community} isopen={isopen} 
  setIsopen={setIsopen}/>

                  </div>
                  <div className="flex-1 flex items-center justify-center text-gray-600">
                    Select a community to start chatting!
                  </div>
                </div>
              )}
            </main>
          </>
        ) : (
          <>
           {community && (
      <CommunityDetails
      params={{ id: community._id }}
        onClose={() => setSelectedCommunity(null)}
      />
    )}
          </>
        )}

        {showFileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Share Media</h3>
                <button
                  onClick={toggleFileModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <MdClose className="w-6 h-6" />
                </button>
              </div>

              {filePreview ? (
                <div className="space-y-4">
                  <div className="border rounded-lg p-2 bg-gray-50">
                    {filePreview.type === "image" ? (
                      <Image
                        src={filePreview.url}
                        alt="Preview"
                        width={400}
                        height={300}
                        className="w-full h-auto rounded-lg object-contain max-h-72"
                      />
                    ) : (
                      <video
                        src={filePreview.url}
                        controls
                        className="w-full rounded-lg max-h-72"
                      />
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={cancelFileSelection}
                      className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={sendFile}
                      className="flex-1 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark"
                    >
                      Send
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleFileSelect("image")}
                    className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <MdImage className="w-12 h-12 text-primary mb-2" />
                    <span>Image</span>
                  </button>
                  <button
                    onClick={() => handleFileSelect("video")}
                    className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <MdVideoCameraBack className="w-12 h-12 text-primary mb-2" />
                    <span>Video</span>
                  </button>
                </div>
              )}

              
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
