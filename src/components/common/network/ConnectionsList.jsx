'use client';
import { CommunityPanel } from '@/components/homePage/leftSide/CommunityPanel';
import { setAllConnections, setDetailes } from '@/lib/store/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import api from '@/utils/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function ConnectionsList() {
  const router=useRouter()
  const[connections,setConnections]=useState([])
  const {peopleIknow}=useAppSelector((state)=>state.user)
const {activeuser}=useAppSelector(state=>state.user)
 
  
  const dispatch=useAppDispatch()
  useEffect(()=>{
    const fetchConnections=async()=>{
      const response=await api.get(`/connecting/getconnection`)
      console.log("all connections of user response",response);
      dispatch(setAllConnections(response.data.connections))
      setConnections(response.data.connections)
    }
    fetchConnections()
  },[])

  const handleRemove=async(connectionId)=>{
    console.log(" connectionId",connectionId);
    
    const response=await api.post(`/connecting/removeconnection/${connectionId}`)
    console.log("response of remove",response);
    setConnections((prevConnections) =>
      prevConnections.filter((connection) => connection.connectionID?._id !== connectionId)
    );  
  }
  
  const handleRequest = async (id) => {
    const response = await api.post(`/connecting/request/${id}`);
    console.log(" responsevresponse connection", response.data.targetUser);
    dispatch(setDetailes(response.data.targetUser)); 
     if(activeuser){dispatch(fetchPeopleKnow())}
  };
  return (
    <>
    <div className="min-h-[80vh] bg-white mt-7 shadow-lg px-4 rounded-lg">
      <h2 className="text-xl font-semibold pt-11  mb-4">{connections?connections.length:0} Connections</h2>
     
      <div>
        {connections.map((connection, index) => (
          <div key={index} className="flex items-center justify-between p-3 ">
            <div className="flex items-center gap-4"
             onClick={()=>router.push(`user/${connection.connectionID._id}/User`)}
            >
              <Image src={connection.connectionID.profileImage} alt={connection.connectionID.firstName} width={50} height={50} className="rounded-full" />
              <div>
                <p className="font-medium text-gray-900">{connection.connectionID.firstName}</p>
                <p className="text-sm text-gray-600">{connection.connectionID.jobTitle[0]}</p>
                <p className="text-xs text-gray-500">{connection.createdAt ? new Date(connection.createdAt).toLocaleDateString() : ""}
                </p>
              </div>
            </div>
            <div className='flex gap-4'>
            <button onClick={()=>handleRemove(connection.connectionID._id)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
            </button>
 

              </div>
            
          </div>
        ))}
      </div>
      <hr></hr>
      <div className=" mx-auto mt-10">
  <h2 className="text-xl font-semibold pt-11 mb-4">Here are some recommendations</h2>

  <div className="grid grid-cols-3 gap-2 pt-5 hover:cursor-pointer">
    {peopleIknow.length > 0 ? (
      peopleIknow.map((user,index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <div
  className="flex flex-col items-center justify-center p-4 bg-white  cursor-pointer transition-transform transform hover:scale-105"
  onClick={() => router.push(`/user/${user._id}/User`)}
>
  {/* Profile Image */}
  <img
    src={user.profileImage || "/default-avatar.png"}
    alt={user.name}
    className="w-20 h-20 rounded-full object-cover mb-2"
  />

  {/* User Name */}
  <h3 className="text-sm font-semibold text-center">{user.firstName} {user.lastName}</h3>

  {/* Job Title */}
  <p className="text-gray-500 text-xs text-center">{user.jobTitle[0] || "No details available"}</p>
</div>

          <button
            onClick={() => handleRequest(user._id)}
           
            className={`px-4 py-2 text-white font-medium rounded-md w-full ${
              connections.includes(user.id)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            
            {(() => {
    const userConnection = user.connecting.find(conn => conn.connectionID === activeuser._id);

    if (!userConnection) {
      return "Connect";
    } else if (userConnection.status === false) {
      return "Requested";
    } else if (userConnection.status === true) {
      return "Connected";
    }
  })()}
          </button>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No recommendations available.</p>
    )}
  </div>
</div>

      
    </div>
    </>
  );
}
