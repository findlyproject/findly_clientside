'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setEmail,setPassword } from "@/lib/store/features/registerSlice";
import { useAppDispatch } from "@/lib/store/hooks";
export default function RegisterPage() {
  const dispatch=useAppDispatch()
  const [Email,setLocalemail]=useState("")
  const [Password,setLocalpassword]=useState("")
  console.log(Email,Password);
  
  const[conformpassword,setConformPassword]=useState("")
const router=useRouter()
    const handleContinue=()=>{
      dispatch(setEmail(Email))
      dispatch(setPassword(Password))
        router.push(`/register/namepage`)
    }

    
  return (
    <div className="flex justify-center items-center min-h-screen  py-8 px-4">
      <div className="w-full max-w-sm  p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold  text-gray-800 mb-4">
          Create Account
        </h1>
        <p className=" text-gray-600 mb-6">
          Sign up, explore jobs, and build your skills
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder=" Email"
              value={Email}
              onChange={(e)=>setLocalemail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder=" Password"
              value={Password}
              onChange={(e)=>setLocalpassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={conformpassword}
              onChange={(e)=>setConformPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <button className="w-full py-2 bg-purple-700 text-white font-semibold rounded-full mt-4 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          onClick={handleContinue}>
            Continue
          </button>
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-t border-gray-300" />
          <span className="mx-4 text-gray-600">or</span>
          <hr className="flex-1 border-t border-gray-300" />
        </div>

        <button className="w-full py-2 border-2 border-gray-300 text-gray-800 font-semibold rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center justify-center space-x-2">
          <img
            src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
            className="w-5 h-5"
          />
          <span>Sign in with Google</span>
        </button>

        <p className="mt-4 text-center text-gray-600">
          Have an account?{" "}
          <span className="text-blue-500 cursor-pointer hover:underline">
            Sign in
          </span>
        </p>
      </div>

      <img
        src="https://i.pinimg.com/736x/d8/7c/cf/d87ccf6c788636ccb74610dfb35380b2.jpg"
        className="rounded-md h-[600px]"
      />
    </div>
  );
}
