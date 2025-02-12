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
import { profile } from 'console';
import { setActive } from '@/lib/store/features/userSlice';
import { useRouter } from 'next/navigation';

function Edit() {
    const route = useRouter()
    const activeuser = useAppSelector((state)=>state.user.activeuser)
    console.log("activ user ",activeuser);
    const dispatch = useAppDispatch()
  
    
const handilclik =async ()=>{
    const formData = new FormData();
formData.append("profileImage", activeuser?.profileImage || "");
formData.append("banner", activeuser?.banner || "");
formData.append("firstName",activeuser?.firstName || "")
formData.append("lastName",activeuser?.lastName || "")
formData.append("about",activeuser?.about || "")
formData.append("email",activeuser?.email || "")
formData.append("phoneNumber",activeuser?.phoneNumber || "")
formData.append("dateOfBirth",activeuser?.dateOfBirth || "")
// console.log(formData.get());
    try {
        const respons =await api.put("/user/profile",formData)
    console.log("response",respons);
    } catch (error) {
        console.log(error);
        
    }
    

}

const getuserprfilr = async ()=>{
    try {
        const response = await api.get("/user/currentuserdetails")
        console.log("response",response);
        dispatch(setActive(response.data.currentUserDetails))
    } catch (error) {
        console.log("error",error);
        
    }
    
}
useEffect(()=>{
getuserprfilr()
},[])  
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
