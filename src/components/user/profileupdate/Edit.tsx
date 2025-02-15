"use client";
import React, { useEffect } from 'react';
import Personaldetails from "./Personaldetails"
import Skils from './Skils';
import Education from './Education';
import Project from './Project';
import Joblocation from './Joblocation';
import Location from './Location';
import Jobtitle from './Jobtitle';
import api from '@/utils/api';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';

function Edit() {
    const route = useRouter()
    const activeuser = useAppSelector((state)=>state.user.activeuser)
    console.log("activ user ",activeuser);
    const dispatch = useAppDispatch()
  
    
const handilclik =async ()=>{
   
    try {
        const respons =await api.put("/user/profile",activeuser)
    console.log("response",respons);
    } catch (error) {
        console.log(error);
        
    }
}

  
  return (
        <div className="w-full h-auto flex justify-center py-4">
            <div className="w-5/6 border rounded-2xl shadow-2xl p-6 relative">
                <h1 className="text-3xl font-bold">Edit Profile</h1>
                <Personaldetails/>
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
        </div>
    );
}

export default Edit;
