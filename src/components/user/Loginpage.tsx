"use client";
import React, { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch } from "@/lib/store/hooks";
import { setActive } from "@/lib/store/features/loginSlice";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

function Loginpage() {
  const router = useRouter()
  const [state, setState] = useState({
    email: "",
    password: ""
  })
const dispatch = useAppDispatch()
  const handilchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/user/login", state)
      console.log("response",response?.data.logeduser);
      
      alert("Login Successful!")
      router.push("/home")
      dispatch(setActive(response?.data?.logeduser))
      localStorage.setItem("user",JSON.stringify(response?.data?.logeduser))
    } catch (error: any) {
      alert(error?.response.data?.message)
    }

  };
  const googlelogin = () => {
    signIn("google");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      {/* Logo in top-left */}
      <div className="absolute top-6 left-6">
        <Image src="/ascites/findlylogo.png" alt="Findly Logo" className="w-32" />
      </div>

      {/* Main Container */}
      <div className="flex flex-wrap bg-white shadow-xl rounded-3xl overflow-hidden w-3/4 max-w-5xl">
        {/* Left Section - Login Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800">
            Sign In
          </h1>
          <p className="text-gray-500 text-center mt-2">
            Explore jobs and build skills
          </p>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit} >
            {/* Email Input */}
            <div>
              <label className="text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-full border border-gray-500 mt-1 focus:outline-blue-500"
                onChange={handilchange}
                required
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-3 rounded-full border border-gray-500 mt-1 focus:outline-blue-500"
                onChange={handilchange}
                required
              />
            </div>


            <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white text-lg font-semibold py-3 rounded-full " type="submit">
              Submit
            </button>
            <div className="flex items-center justify-center gap-4">
              <div className="w-32 bg-black" style={{ height: "1px" }}></div>
              <span className="text-lg font-semibold text-gray-700">OR</span>
              <div className="w-32 bg-black" style={{ height: "1px" }}></div>
            </div>
          </form>
          <button
            className="w-full text-lg font-semibold py-2 rounded-full bg-transparent border border-black flex justify-center items-center mt-5"
            onClick={googlelogin}
          >
            <FcGoogle className="mr-2" /> <span className="mb-2">google</span>
          </button>
          <button onClick={() => signOut()} className="p-2 bg-red-500 text-white rounded">
            Sign Out
          </button>
        </div>

        <div className="hidden md:block md:w-1/2 bg-gray-300">
          <Image
            src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg"
            alt="Login Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
