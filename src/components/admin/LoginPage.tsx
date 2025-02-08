'use client'

import { loginAdmin } from '@/lib/store/features/actions/adminActions';
import { useAppDispatch } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify';


export default function LoginPage() {
  const dispatch=useAppDispatch()
  const router=useRouter()
const[showPassword,setShowPassword]=useState(false)

  const[datas,setDatas]=useState({
    email:"",
    password:""
  })
  console.log("gggggggggg",datas);
  
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setDatas((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((pre)=>({
...pre,
      [name]: value.trim() === "" ? `${name} is required` : "",
    }))
  };
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const resultAction = await dispatch(loginAdmin(datas));
  
      if (loginAdmin.fulfilled.match(resultAction)) {
        router.push("/admin/dashboard");
        toast.success("Login Successful!")
      }
    };
  return (
    <div className="flex items-center justify-center min-h-screen">
     
      <div
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/illustration-social-media-concept_53876-9147.jpg?t=st=1738738972~exp=1738742572~hmac=7697e2c58c301eb52bc2c15b15800f0be106ae22e573fdcdccbc9d856d6735ea&w=826')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.6,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      ></div>

      
      
        
        
        
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
          <h2 className="text-2xl text-white font-semibold mb-2">Welcome</h2>
          <p className="text-sm  mb-6">
            Please login to Admin Dashboard.
          </p>

          
          <form 
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-4">
            
            <div>
              <label htmlFor="email" className="sr-only">
                Username
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={datas.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
                {errors.email && <p className="ml-10 text-red-500 text-xs">{errors.email}</p>}

            </div>

           
            <div className='relative'>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type={showPassword?"text":"password"}
                id="password"
                placeholder="Password"
                name="password"
                value={datas.password}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm  border border-gray-300 rounded-md  focus:ring-orange-500 focus:border-orange-500"
              />

<div
      className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      )}
    </div>
            {errors.password && <p className="ml-10 text-red-500 text-xs">{errors.password}</p>}

            </div>

            
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-white-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              
            >
              Login
            </button>
          </form>
        </div>
    
    </div>
  )
}
