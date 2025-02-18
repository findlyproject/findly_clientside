"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { forgotPassword, googlloginUser, loginUser } from "@/lib/store/features/actions/userActions";
import { toast } from "react-toastify";
import { setGooglelogin } from "@/lib/store/features/userSlice";


interface Istate {
  email: string;
  password: string;
}
function Loginpage() {
  const router = useRouter()
  const {data:session} = useSession()
  const [state, setState] = useState<Istate>({
    email: "",
    password: ""
  })
  const {googlestate} = useAppSelector((state)=>state.login)
console.log("googlestate",googlestate);


  const dispatch = useAppDispatch()
  const handilchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser(state));

    if (loginUser.fulfilled.match(resultAction)) {
      router.push("/home");
      toast.success("Login Successful!")
    }
  };


  const googlelogin = () => {
    signIn("google");
  };
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  useEffect(() => {
    if (session && googlestate && !hasLoggedIn) {
      const data = {
        email: session.user?.email || "",  
        name: session.user?.name || "",    
        image: session.user?.image || "",
      };
  
      dispatch(googlloginUser(data))
        .unwrap()
        .then(() => {
          if (!hasLoggedIn) {
            toast.success("Login Success");
            dispatch(setGooglelogin());
            router.push("/home");
            setHasLoggedIn(true);
          }
        })
        .catch((error) => {
          console.error("Login Failed:", error);
        });
    }
  }, [googlestate, dispatch, hasLoggedIn, router, session]);
  
  
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  

  const forgotPasswordee =async () =>{
    

    if (!state.email) {
      toast.error("Please enter your email");
      return;
    }
    if (!validateEmail(state.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    console.log("object",state.email)

    try {
      
      const result = await dispatch(forgotPassword({ email: state.email }));

      if (forgotPassword.rejected.match(result)) {
        toast.error("You Have no Accunt With This Email");
        return;
      }

      toast.success("OTP sent successfully!");
      router.push("/resetpassword");
    } catch (err) {
      console.error("Error:", err);
     toast.error("You Have no Accunt With This Email");
    }
   }
    
   

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">  
      <div className="absolute top-3 left-1">
        <Image
          src="/assets/findlylogo.png"
          alt="Findly Logo"
          width={100}
          height={100}
        />

      </div>

      <div className="flex flex-wrap bg-white shadow-xl rounded-3xl overflow-hidden w-3/4 max-w-5xl">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800">
            Sign In
          </h1>
          <p className="text-gray-500 text-center mt-2">
            Explore jobs and build skills
          </p>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit} >
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
              <div className="w-fullfont-bold  flex justify-end pr-6 cursor-pointer">
                <div
                onClick={forgotPasswordee}
                >
                <p className="underline ">Forgot Password</p>
                </div>
              </div>
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
          <div className="flex mt-3">
            <p>Don&apos;t have any account? <a href="/register" className="underline">create account</a></p>
           
          </div>

        </div>

        <div className="hidden md:block md:w-1/2 bg-gray-300">
          <Image
            src="/assets/loginbanner.jpg"
            alt="Login Background"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
