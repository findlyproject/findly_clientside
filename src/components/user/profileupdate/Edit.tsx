"use client";
import React, { useState } from 'react';
import Personaldetails from "./Personaldetails"
import Skils from './Skils';
import Education from './Education';
import Project from './Project';
import Joblocation from './Joblocation';
import Location from './Location';
import Jobtitle from './Jobtitle';
import api from '@/utils/api';
import { useAppSelector } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

function Edit() {
    const route = useRouter()
    const activeuser = useAppSelector((state)=>state.user.activeuser)
    const [isloading,setIsloading]= useState(false)
    
const handilclik =async ()=>{
    setIsloading(true)

    try {
        const respons =await api.put("/user/profile",activeuser)
        toast.success("Profile Updated")
    console.log("response",respons);
    } catch (error) {
        console.log(error);
        
    } finally {
        setIsloading(false)
    }
}

  
  return (
        <div className="w-full h-auto flex justify-center py-4">
           {
            isloading?(
                <div className='h-screen w-full flex justify-center items-center'>
                    <CircularProgress />
                </div>
            ):(
                <div className="w-5/6 border rounded-2xl shadow-2xl p-6 relative">
                <h1 className="text-3xl font-bold">Edit Profile</h1>
                <Personaldetails loading={setIsloading}/>
                <Skils/>
                <Jobtitle/>
                <Education/>
                <Project/>
                <Joblocation/>
                <Location/>
                <div className="flex justify-end gap-3 mt-4">
                <button 
                onClick={()=>route.push("/ownprofile")}
                className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700">
                        cancel
                    </button>
                    <button 
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                    onClick={handilclik}
                    >
                        Save Profile
                    </button>
                   
                </div>
            </div>
            )
           }
        </div>
    );
}

export default Edit;
