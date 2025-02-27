"use client";
import { LuSend } from "react-icons/lu";
import { useEffect, useState } from "react";
import { HiPaperClip } from "react-icons/hi2";
import React from "react";
import api, { socket } from "@/utils/api";
import { useAppSelector } from "@/lib/store/hooks";
import { FaEllipsisV } from "react-icons/fa";

export default function ChatList() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  
  const activeuser = useAppSelector((state) => state.user.activeuser);

  // Fetch Chat Members
  useEffect(() => {
    const fetch = async () => {
      const response = await api.get(`/connecting/getconnection`);
      console.log("response of members", response);
      setMembers(response.data.connections);


      
      
    };
    fetch();
  }, []);
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser) { 
        const responseofMessage = await api.get(
          `/message/conversation/${activeuser._id}/${selectedUser.connectionID._id}`
        );
        console.log("responseofMessage", responseofMessage);
        setMessages(responseofMessage.data.messages); 
      }
    };
    fetchMessages();
  }, [selectedUser, activeuser._id]);
  
  const handleUserSelect = (user) => {
    console.log("user....",user)
    setSelectedUser(user);
    setMessages([]); 
    socket.emit("joinRoom", user.connectionID._id);
  };

  // Send Message
  const handleSendMessage = async () => {
    const response = await api.post(
      `/message/send/${activeuser._id}/${selectedUser.connectionID._id}`,
      { message: message }
    );
    console.log("responseresponse", response);

    setMessage("");
  };

  useEffect(() => {

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

   
    socket.emit("joinRoom", activeuser._id);

    
    socket.on("receiveMessage", (data) => {
      console.log("Received message:", data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    // Cleanup on Component Unmount
    return () => {
      socket.off("receiveMessage");
      socket.off("connect");
    };
  }, [selectedUser?.connectionID?._id]);

  console.log("all messages", messages);
console.log("selectedUser",selectedUser);

  return (
    <div className="flex h-screen">
      {/* Sidebar - List of Users */}
      <aside className="w-1/4 bg-gray-100 border-r overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Users</h2>
          <div className="space-y-4 mt-4">
            {members.map((chat, index) => (
              <div
                key={index}
                className={`flex items-center p-2 rounded-lg cursor-pointer transition ${
                  selectedUser === chat
                    ? "bg-blue-100"
                    : "bg-white hover:bg-gray-200"
                }`}
                onClick={() => handleUserSelect(chat)}
              >
                <img
                  src={chat.connectionID.profileImage}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <h2 className="text-sm font-semibold">
                    {chat.connectionID.firstName}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Right Chat Window */}
      <main className="w-3/4 flex flex-col h-full bg-white">
        {selectedUser ? (
          <>
            <header className="flex items-center justify-between bg-gray-50 p-4 border-b">
              <div className="flex items-center">
                <img
                  src={selectedUser.connectionID.profileImage}
                  className="w-10 h-10 rounded-full"
                  alt="User"
                />
                <div className="ml-3">
                  <h2 className="font-medium">
                    {selectedUser.connectionID.firstName}
                  </h2>
                </div>
              </div>

               <div className="relative">
                          <div
                            className="flex space-x-4 cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            <FaEllipsisV className="text-gray-600" />
                          </div>
              
                          
                        </div>
            </header>
{/* Chat Messages Section */}
<div className="flex-grow p-4 overflow-y-auto">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`flex mb-2 ${
        msg.sender === activeuser._id
          ? "justify-end"   
          : "justify-start" 
      }`}
    >
      <span
        className={`inline-block p-2 rounded-lg max-w-xs break-words ${
          msg.sender === activeuser._id
            ? "bg-blue-500 text-white"  
            : "bg-gray-200 text-black" 
        }`}
      >
        {msg.message}
      </span>
    </div>
  ))}
</div>

{/* Fixed Input Section */}
<footer className="p-4 bg-gray-50 border-t flex items-center">
  <input
    type="text"
    placeholder="Type a message..."
    className="flex-1 p-2 border rounded-l-md focus:outline-none"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />
  <button className="text-gray-600 px-4 py-2">
    <HiPaperClip />
  </button>
  <button
    onClick={handleSendMessage}
    className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
  >
    <LuSend />
  </button>
</footer>


           
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </main>
    </div>
  );
}
