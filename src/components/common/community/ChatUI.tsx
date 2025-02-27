"use client";
import { useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { HiPaperClip } from "react-icons/hi";
import { LuSend } from "react-icons/lu";
import { useAppSelector } from "@/lib/store/hooks";
import api, { socket } from "@/utils/api";
export default function ChatUI() {
  const [community,setCommunity] = useState(null)
  const activeuser=useAppSelector((state)=>state.user.activeuser)
  const [input,setInput] = useState({
    message:"",
    type:"text"
  })
  const [message,setMessage] = useState([])
  console.log("input",input);
  
  console.log("community",input);
console.log('members',community?.members)
//// send message in community 

// const sendmessage =async (id)=>{
//   try {
//     const response = await api.post(`/message/communtyMessage/${id}`,input)
//     console.log("message send",response);
//     setInput({
//       message:"",
//       type:"text"
//     })
//   } catch (error) {
//     console.log("error",error);
    
//   }
// }
  //// join to community 

  const handleJoin =async (id:string)=>{
    try {
      const response =await api.patch(`/message/join/${id}`)
    console.log("response join",response)
    socket.on("communtjoin",(data)=>{
      console.log("join comunity",data);
      setCommunity(data)
     })
    } catch (error) {
      console.log("join error",error);
    }

  }

  ///// get comunity mssage ////// 

  // const getcommunitymessage = async()=>{
  //   try {
  //     const response = await api.get(`message/getCommuntyMessage/${community._id}`)
  //     console.log("get messge community",response);
  //     setMessage(response.data.Message)
  //   } catch (error) {
  //     console.log("object",error)
  //   }
  // }

  // useEffect(()=>{
  // getcommunitymessage()

  // },[community])
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
         
          <div>
            {!community.members.includes(activeuser._id) ? (
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
            ):(
              <div>
         {/* <ul>
         {
          message.map((item,index)=>(
            <li key={index}
            className="w-auto max-w-44 bg-slate-200 m-3 p-3 rounded-lg"
            >{item.message}</li>
          ))
         }
         </ul> */}
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
            value={input.message}
            onChange={(e)=>setInput({message:e.target.value, type: "text"})}
            className="flex-1 p-2 border rounded-l-md focus:outline-none"
          />
          <button className=" text-primary px-4 py-2 rounded-r-md">
            <HiPaperClip />
          </button>

          <button className="bg-primary text-white px-4 py-2 rounded-r-md"
          onClick={()=>sendmessage(community._id)}
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
