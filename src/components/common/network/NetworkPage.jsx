'use client'

import { useAppDispatch } from '@/lib/store/hooks';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import React,{useEffect, useState} from 'react'

export default function NetworkPage() {
  const router=useRouter()
    const[invitations,setInvitations]=useState([])
    const[connections,setConnections]=useState([])
    const dispatch=useAppDispatch()
    console.log("invitations",invitations);
    const s=invitations.map((item)=>item.connectionID._id)
    console.log("connectionID",s);
    
    
    const [currentPage, setCurrentPage] = useState(1);
    const invitationsPerPage = 5;
  
    const indexOfLast = currentPage * invitationsPerPage;
    const indexOfFirst = indexOfLast - invitationsPerPage;
    const currentInvitations = invitations.slice(indexOfFirst, indexOfLast);
    
    const totalPages = Math.ceil(invitations.length / invitationsPerPage);
    useEffect(()=>{
        const fetch=async()=>{
            const response=await api.get(`/connecting/connectionrequest`)
            console.log("response of invitations",response);
            
            setInvitations(response.data.requests)
        }
        fetch()
    },[])

    useEffect(()=>{
      const fetchConnections=async()=>{
        const response=await api.get(`/connecting/getconnection`)
        console.log("all connections of user response",response);
       
        setConnections(response.data.connections)
      }
      fetchConnections()
    },[])

    const handleAccept=async(requestId)=>{
  const response=await api.post(`/connecting/accept/${requestId}`)
  console.log("response of acceptance",response);

  setInvitations((prevInvitations) =>
    prevInvitations.filter((invite) => invite.connectionID?._id !== requestId)
  );
 
    }


    const handleIgnore=async(requestId)=>{
        const response=await api.post(`/connecting/ignore/${requestId}`)
        console.log("response of ignore...",response);
        
        setInvitations((prevInvitations) =>
            prevInvitations.filter((invite) => invite.connectionID?._id !== requestId)
          );
    }
  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold">Manage My Network</h2>
        <button className='hover:bg-gray-300 w-full'
        onClick={()=>router.push(`/mynetwork/networklist`)}>
        <p className="text-gray-500 mt-2">Connections                 {connections?connections.length:0}</p>

        </button>
       
      </div>
      
      {/* Invitations Container */}
      <div className="w-full md:w-3/4 bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Invitations ({invitations.length})</h2>
          
        </div>

        {/* Invitation List */}
        <div className="overflow-hidden rounded-lg border border-gray-200">
          {invitations.map((invite) => (
            <div key={invite._id} className="flex justify-between items-center p-4 border-b">
                <div 
                onClick={()=>router.push(`/userdetails/${invite.connectionID._id}`)}
                >
                <div className="flex items-center gap-3">
                <img src={invite.connectionID?.profileImage} alt="avatar" className="w-10 h-10 rounded-full" />
                <span className="font-medium">{invite.connectionID?.firstName}</span>
                
               
              </div>
              <p className='ml-12 text-sm'>{invite.connectionID?.jobTitle[0]}</p>
                </div>
              
              
              <div className="flex gap-2">
                <button className="bg-white text-primary font-semibold border border-primary px-4 py-2 rounded-md"
                onClick={()=>handleIgnore(invite.connectionID?._id)}
                >Ignore</button>
                <button className="bg-primary text-white font-semibold px-4 py-2 rounded-md"

                onClick={()=>handleAccept(invite.connectionID?._id)}
                >Accept</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
