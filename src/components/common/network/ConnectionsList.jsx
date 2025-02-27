'use client';
import { setAllConnections } from '@/lib/store/features/userSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import api from '@/utils/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function ConnectionsList() {
  const router=useRouter()
  const[connections,setConnections]=useState([])
  
  console.log("connections",connections);
  
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
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{connections?connections.length:0} Connections</h2>
     
      <div>
        {connections.map((connection, index) => (
          <div key={index} className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-4"
            onClick={()=>router.push(`/userdetails/${connection.connectionID._id}`)}
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
            <button className="bg-blue-500 text-white px-4 py-1 rounded-md">Message</button>
            <button onClick={()=>handleRemove(connection.connectionID._id)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
            </button>
 

              </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
