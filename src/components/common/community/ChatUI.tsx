"use client";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { HiPaperClip } from "react-icons/hi";
import { LuSend } from "react-icons/lu";
import { FaEllipsisV, FaTrash, FaCopy } from "react-icons/fa";
import { useAppSelector } from "@/lib/store/hooks";


import api, { socket } from "@/utils/api";
import { MdClose, MdImage, MdVideoCameraBack } from "react-icons/md";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ChatUI() {
  const router=useRouter()
  const [community, setCommunity] = useState(null)
  const activeuser = useAppSelector((state) => state.user.activeuser)
  const [input, setInput] = useState({
    message: "",
    type: "text"
  })
  const [message, setMessage] = useState([])
  const [showFileModal, setShowFileModal] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  console.log("input", input);
  console.log("community", input);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.message-dropdown')) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const toggleFileModal = () => {
    setShowFileModal(!showFileModal);

    if (!showFileModal) {
      setFilePreview(null);
    }
  };

  // Handle file selection
  const handleFileSelect = (type) => {
    fileInputRef.current.setAttribute('accept', type === 'image' ? 'image/*' : 'video/*');
    fileInputRef.current.click();
  };

  // Process selected file
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview for selected file
    const fileURL = URL.createObjectURL(file);
    setFilePreview({
      type: file.type.startsWith('image/') ? 'image' : 'video',
      url: fileURL,
      file: file
    });
  };
  console.log("filePreview", filePreview)

  // Delete message function
  const onDelete = async (messageId) => {
    try {
      const response = await api.post(`message/deletCommuntyMessage/${messageId}`)
      console.log("delete response",response);
      toast.success("Message deleted successfully");
      setMessage((prevMessages) => prevMessages.filter(msg => msg._id != messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  //// send message in community 
  const sendmessage = async (id) => {
    try {
      const response = await api.post(`/message/communtyMessage/${id}`, input);
      console.log("message send", response);
      setFilePreview(null);
      setShowFileModal(false);
      setInput({
        message: "",
        type: ""
      });
      socket.on("sendedMessage", (data) => {
        console.log("socketdata", data)
        setCommunity((priv) => ({
          ...priv,
          data
        }))
      })
    } catch (error) {
      console.log("error", error);
    }
  }
  const sendFile = async () => {
    try {
      if (!filePreview) return;

      const response = await api.get("/user/generate-signed-url", {
        params: { fileType: filePreview.type },
      });

      const { api_key, timestamp, signature, folder, cloudName } = response.data;

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
        type: filePreview.type
      })

      sendmessage(community._id)
      return

    } catch {
      toast.error(`Error uploading`);
      return null;
    }
  };

  const cancelFileSelection = () => {
    setFilePreview(null);
  };

  //// join to community 
  const handleJoin = (id) => {
    try {
      const response = api.patch(`/message/join/${id}`)
      console.log("response join", response)
      socket.on("communtjoin", (data) => {
        console.log("join comunity", data);
        setCommunity(data)
      })
    } catch (error) {
      console.log("join error", error);
    }
  }

  ///// get comunity mssage ////// 
  const getcommunitymessage = async () => {
    try {
      const response = await api.get(`message/getCommuntyMessage/${community._id}`)
      console.log("get messge community", response);
      setMessage(response.data.Message)
    } catch (error) {
      console.log("object", error)
    }
  }

  useEffect(() => {
    if (community?._id) {
      getcommunitymessage();
    }
  }, [community]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);


  console.log("community populate",community)
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar props={{ setCommunity, community }} />

      <main className="flex-1 flex flex-col" key={community?._id}>
        {community ? (
          <>
            <header className="flex items-center justify-between bg-white p-4 border-b">
              <div className="flex items-center"
              onClick={()=>router.push(`/community/details/${community._id}`)}
              >
                <Image
                  width={100}
                  height={100}
                  src={community.profile}
                  className="w-10 h-10 rounded-full"
                  alt="Group"
                />
                <div className="ml-3">
                  <h2 className="font-medium">{community.name}</h2>
                  <span className="text-sm text-gray-500">
                    {community.members.length} Members
                  </span>
                </div>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto p-4">

              <div>
                {!community.members.find((item)=>item._id == activeuser?._id) ? (
                  <div className="flex justify-center px-4 py-8">
                    <div className="border border-primary rounded-lg shadow-lg max-w-md w-full bg-white p-6">
                      <div className="text-center">
                        <h1 className="text-black font-bold text-2xl mb-2">
                          Join Our Community
                        </h1>
                        <p className="text-gray-600 mb-4">
                          Connect with job seekers and employers, expand your network, and unlock new opportunities.
                          Share experiences and get the support you need to land your dream job.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <ul className="flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg">
                      {message.map((item, index) => {
                        const isSender = item.sender._id === activeuser._id;
                        const isConsecutive = index > 0 && item.sender._id === message[index - 1].sender._id;
                        const showTimestamp = index === 0 ||
                          new Date(item.createdAt).getTime() - new Date(message[index - 1].createdAt).getTime() > 300000;

                        return (
                          <li key={index} className="flex flex-col">
                            {showTimestamp && (
                              <div className="flex justify-center my-2">
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                   {new Date(item.timestamp).toLocaleDateString("en-US")}
                                </span>
                              </div>
                            )}

                            <div className={`flex items-end ${isSender ? "justify-end" : "justify-start"}`}>
                              {!isSender && !isConsecutive && (
                                <div className="flex flex-col items-center mr-2">
                                  
                                  <div className="relative">
                                    <Image
                                      width={32}
                                      height={32}
                                      src={item.sender.profileImage || "/default-avatar.png"}
                                      alt={`${item.sender.firstName || 'User'}'s Profile`}
                                      className="w-8 h-8 rounded-full shadow-md object-cover border border-gray-200"
                                    />
                                    {item.sender.online && (
                                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                                    )}
                                  </div>
                                  {!isConsecutive && (
                                    <span className="text-xs text-gray-600 mt-1 font-medium">
                                      {item.sender.firstName || 'User'}
                                    </span>
                                  )}
                                </div>
                              )}

                             <div
                                className={`relative p-3 rounded-lg max-w-96 break-words shadow-sm ${
                                  isSender
                                    ? "bg-blue-500 text-white rounded-tr-none"
                                    : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
                                } ${isConsecutive ? (isSender ? "mr-10" : "ml-10") : ""}`}
                              >
                                {/* Only show dropdown options for messages you can delete */}
                                {isSender && (
                                  <div className="absolute top-1 right-1 message-dropdown">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveDropdown(activeDropdown == item._id ? null : item._id);
                                      }}
                                      className={`p-1.5 rounded-full ${isSender ? 'text-blue-100 hover:bg-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
                                    >
                                      <FaEllipsisV className="w-3 h-3" />
                                    </button>
                                    
                                    {activeDropdown == item._id && (
                                      <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
                                        <button
                                          onClick={() => {
                                            onDelete(item._id);
                                            setActiveDropdown(null);
                                          }}
                                          className="flex w-full items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                          <FaTrash className="w-3 h-3 mr-2" />
                                          Delete
                                        </button>
                                        
                                        <button
                                          onClick={() => {
                                            // Add copy to clipboard functionality
                                            navigator.clipboard.writeText(item.message);
                                            setActiveDropdown(null);
                                            toast.success("Copied to clipboard");
                                          }}
                                          className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                          <FaCopy className="w-3 h-3 mr-2" />
                                          Copy
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {item.type === "text" && <p className="text-sm">{item.message}</p>}

                                {item.type === "video" && (
                                  <div className="rounded-lg overflow-hidden">
                                    <video src={item.message} controls className="w-60 rounded-lg" />
                                    <p className="text-xs mt-1 opacity-70">
                                      {isSender ? "You sent a video" : `${item.sender.firstName || "User"} sent a video`}
                                    </p>
                                  </div>
                                )}

                                {item.type === "image" && (
                                  <div className="rounded-lg overflow-hidden">
                                    <Image
                                      width={240}
                                      height={180}
                                      src={item.message || "/placeholder-image.jpg"}
                                      alt="Chat Image"
                                      className="w-60 rounded-lg object-cover"
                                    />
                                    <p className="text-xs mt-1 opacity-70">
                                      {isSender ? "You sent an image" : `${item.sender.firstName || "User"} sent an image`}
                                    </p>
                                  </div>
                                )}

                                <div className={`text-xs mt-1 ${isSender ? "text-blue-100" : "text-gray-500"} text-right`}>
                                  {new Date(item.timestamp).toLocaleTimeString("en-US", {
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
                                      src={activeuser.profileImage || "/default-avatar.png"}
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
                )}
              </div>
            </div>
            <footer className="p-4 h-20 bg-white border-t flex">
              {community.members.find((item)=>item._id == activeuser?._id) ? (
                <>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={input.message}
                    onChange={(e) => setInput({ message: e.target.value, type: "text" })}
                    className="flex-1 p-2 border rounded-l-md focus:outline-none"
                  />
                  <button
                    className="text-primary px-4 py-2 rounded-none border-t border-b border-r"
                    onClick={toggleFileModal}
                  >
                    <HiPaperClip className="w-5 h-5" />
                  </button>

                  <button
                    className="bg-primary text-white px-4 py-2 rounded-r-md"
                    onClick={() => sendmessage(community._id)}
                    disabled={!input.message.trim()}
                  >
                    <LuSend className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleJoin(community._id)}
                  className="text-white bg-primary hover:bg-primary-dark transition-colors duration-300 font-semibold rounded-md py-2 px-4 w-full"
                >
                  Join Now
                </button>
              )}
            </footer>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-600">
            Select a community to start chatting!
          </div>
        )}
      </main>

      {showFileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Share Media</h3>
              <button onClick={toggleFileModal} className="text-gray-500 hover:text-gray-700">
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            {filePreview ? (
              <div className="space-y-4">
                <div className="border rounded-lg p-2 bg-gray-50">
                  {filePreview.type === 'image' ? (
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
                  onClick={() => handleFileSelect('image')}
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <MdImage className="w-12 h-12 text-primary mb-2" />
                  <span>Image</span>
                </button>
                <button
                  onClick={() => handleFileSelect('video')}
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <MdVideoCameraBack className="w-12 h-12 text-primary mb-2" />
                  <span>Video</span>
                </button>
              </div>
            )}

            {/* Hidden file input */}
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
  );
}