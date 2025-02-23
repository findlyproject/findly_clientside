
"use client"
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { loginCompany } from "@/lib/store/features/actions/companyActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const cloginimage = "/assets/companyLogin.jpg";


const Login = () => {
  const router= useRouter()
    const dispatch=useAppDispatch()
    const activeCompany=useAppSelector((state)=>state.companyLogin.activeCompany)
    console.log("activeCompany",activeCompany);
    
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    console.log("formData",formData);
    
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
         const {value,name}=e.target
         setFormData({...formData,[name]:value})

    }
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
      const loginStatus= await dispatch(loginCompany(formData))
      if(loginStatus.type==="logincompany/fulfilled"){

        toast.success("login successfully")
        router.push("/company/home")
      }
      

        
    }

  return (
    <div className="flex h-screen w-full border border-black justify-center items-center">
     <div className="flex h-4/6 bg-red-500  w-3/6 rounded-xl overflow-hidden   border border-black">
       
      <div className="w-full flex flex-col justify-center items-center border boreder-black bg-white p-8 b">
        <h1 className="text-3xl font-bold mb-4">Corporate Access</h1>
        <p className="text-gray-500 mb-6">Let’s get started with your 30 days free trial</p>
        
        
        <div className="flex space-x-4 mb-4 w-full justify-center">
          <button className="px-20 py-1 border rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 w-3/4 text-center  ">

            <FcGoogle className="mr-2 " /> <span className="mb-2 space-x-2">google</span>
          </button>
        </div>
        
        <p className="text-gray-400 mb-4">OR</p>

        
        <div className="w-full max-w-sm">
          <label className="text-gray-700">Email *</label>
          <div className="flex items-center border rounded-lg p-2 mb-4">
            <span className="text-gray-500 px-2"><IoMail/></span>
            <input
            onChange={handleChange}
              type="email"
              name="email"
              placeholder="harsh@pagedone.com"
              className="flex-1 outline-none"
            />
          </div>
        </div>

   
        <div className="w-full max-w-sm">
          <label className="text-gray-700">Password *</label>
          <div className="flex items-center border rounded-lg p-2 mb-2">
            <span className="text-gray-500 px-2"><FaLock/></span>
            <input 
                 onChange={handleChange}
            type="password" 
            name="password"
            placeholder="XXXXXXXXX" 
            className="flex-1 outline-none" />
          </div>
          <a href="#" className="text-blue-500 text-sm mb-4 block">Forgot password?</a>
        </div>

        
        <button 
        onClick={handleSubmit}
        className="w-full max-w-sm bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 mb-4">
          Login
        </button>
        
        <p className="text-gray-600">
          Don’t have an account? <a href="/company/register" className="text-blue-500">Sign Up</a>
        </p>
      </div>
<div className="h-full">
<img className="h-full w-full" src="https://media.tacdn.com/media/attractions-splice-spp-674x446/07/80/19/43.jpg" alt="" />
</div>

      <div>

      </div>
     </div>
    </div>
  );
};

export default Login;
