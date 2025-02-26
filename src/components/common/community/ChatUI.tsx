"use client";
import { useState} from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { HiPaperClip } from "react-icons/hi";
import { LuSend } from "react-icons/lu";
import { useAppSelector } from "@/lib/store/hooks";
import api, { socket } from "@/utils/api";
import SelectInput from "@mui/material/Select/SelectInput";
export default function ChatUI() {
  const [community,setCommunity] = useState(null)
  const activeuser=useAppSelector((state)=>state.user.activeuser)
  const [input,setInput] = useState("")
  const [message,setMessage] = useState([])
  console.log("community",input);
  console.log("message",message);


  const handilpush = ()=>{
    setMessage((prev) => [...prev, input]);
  }
  //// join to community 

  const handleJoin = (id:string)=>{
    try {
      const response = api.patch(`/message/join/${id}`)
    console.log("response join",response)
    socket.on("communtjoin",(data)=>{
      console.log("join comunity",data);
      setCommunity(data)
     })
    } catch (error) {
      console.log("join error",error);
    }

  }
   
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar props={{setCommunity,community}}/>

      <main className="flex-1 flex flex-col" key={community?._id}>
    {community ? (
      <>
        <header className="flex items-center justify-between bg-white p-4 border-b">
          <div className="flex items-center">
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
         
          <div className="flex justify-center px-4 py-8">
            {!community.members.includes(activeuser._id) ? (
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
            ):(
              <div>
          {message.map((item)=>(
            <div>{item}</div>
          ))}
          </div>
            )}
          </div>
        </div>
        <footer className="p-4 h-20 bg-white border-t flex">
          {community?.members.includes(activeuser._id) ?(
            <>
              <input
            type="text"
            placeholder="Type a message..."
            onChange={(e)=>setInput(e.target.value)}
            className="flex-1 p-2 border rounded-l-md focus:outline-none"
          />
          <button className=" text-primary px-4 py-2 rounded-r-md">
            <HiPaperClip />
          </button>

          <button className="bg-primary text-white px-4 py-2 rounded-r-md"
          onClick={handilpush}
          >
            <LuSend />
          </button>
            </>
          ):(
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
    </div>
  );
}
function push(input: string): import("react").SetStateAction<never[]> {
  throw new Error("Function not implemented.");
}

