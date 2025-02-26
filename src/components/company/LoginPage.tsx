
"use client"
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { forgotPassword, loginCompany } from "@/lib/store/features/actions/companyActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";



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

    const validateEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    
      const forgotPasswordee =async () =>{
        
        console.log("formData.email",formData.email);
        
        if (!formData.email) {
          toast.error("Please enter your email");
          return;
        }
        if (!validateEmail(formData.email)) {
          toast.error("Please enter a valid email");
          return;
        }
        console.log("object",formData.email)
    
        try {
          
          const result = await dispatch(forgotPassword({ email: formData.email }));
    
          if (forgotPassword.rejected.match(result)) {
            toast.error("You Have no Accunt With This Email");
            return;
          }
          toast.success("OTP sent successfully!");
          router.push("/resetpasswordcompany");
        } catch (err) {
          console.error("Error:", err);
         toast.error("You Have no Accunt With This Email");
        }
       }

  return (
    <div className="flex min-h-screen w-full border border-black justify-center items-center p-4">
    <div className="flex flex-col md:flex-row h-auto md:h-4/6 bg-red-500 w-full max-w-4xl rounded-xl overflow-hidden border border-black shadow-lg">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Corporate Access</h1>
        <p className="text-gray-500 mb-6 text-center">Let’s get started with your 30-day free trial</p>

        {/* Google Button */}
        <div className="flex space-x-4 mb-4 w-full justify-center">
          <button className="px-4 py-2 border rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 w-3/4 text-center">
            <FcGoogle className="mr-2 text-xl" />
            <span>Google</span>
          </button>
        </div>

        <p className="text-gray-400 mb-4">OR</p>

        {/* Email Input */}
        <div className="w-full max-w-sm">
          <label className="text-gray-700">Email *</label>
          <div className="flex items-center border rounded-lg p-2 mb-4">
            <span className="text-gray-500 px-2"><IoMail /></span>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="harsh@pagedone.com"
              className="flex-1 outline-none"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="w-full max-w-sm">
          <label className="text-gray-700">Password *</label>
          <div className="flex items-center border rounded-lg p-2 mb-2">
            <span className="text-gray-500 px-2"><FaLock /></span>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="XXXXXXXXX"
              className="flex-1 outline-none"
            />
          </div>
          <a  onClick={forgotPasswordee} className="text-blue-500 text-sm mb-4 block">Forgot password?</a>
        </div>

        {/* Login Button */}
        <button
          onClick={handleSubmit}
          className="w-full max-w-sm bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 mb-4">
          Login
        </button>

        {/* Sign Up Link */}
        <p className="text-gray-600">
          Don’t have an account? <a  onClick={() => router.push(`/company/register`)} href="#" className="text-blue-500">Sign Up</a>
        </p>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:block w-1/2">
        <img className="h-full w-full object-cover" src="https://media.tacdn.com/media/attractions-splice-spp-674x446/07/80/19/43.jpg" alt="Corporate Access" />
      </div>
    </div>
  </div>
  );
};

export default Login;
