"use client";

import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { toast } from "react-toastify";
import { forgotPassword } from "@/lib/store/features/actions/userActions";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { setforgotPassword } from "@/lib/store/features/userSlice";

function ResetPassword() {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(192); // 3:12 in seconds
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const data = useAppSelector((state)=>state.user.forgotPassword)
  const dispatch = useAppDispatch()
  const route = useRouter()
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };
  const verifyotp = () => {
    const verify = data.otp == otp.join("")
    if(verify){
      toast.success("OTP verified successfully");
      setStep(2);
    }else{
      toast.error("OTP is incorrect");
    }    
  }

  const formattedTime = `${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`;
  const validatePassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if(!validatePassword(password)){
      toast.error("It is not a strong password");
      return;
    }
    try {
      const response = await api.post(`/user/resetpasword/${data.email}/${password}`)
      console.log("response",response);
      toast.success("Password reset successfully")
      dispatch(setforgotPassword({email:"",otp:""}))
      route.push("/login")
    } catch (error) {
console.log(error);
      
      
    }
    }

    const resendOtp = ()=>{
      if(data.email){
      dispatch(forgotPassword({email:data.email}))
      toast.success("OTP sent to your email")
    }else{
      toast.error("Email not found")
    }
    }
  
    

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-200">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 ">
        {step === 1 ? (
          <>
            <div className="flex justify-center items-center px-4">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-xl font-semibold text-center">Check your email</h2>
                <p className="text-gray-500 text-center mb-4">
                We&apos;ve sent the code to your email{""}{data.email}
                </p>

                <div className="flex justify-center space-x-2 mb-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-2xl text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-center text-sm text-gray-500">
                  Code expires in:{" "}
                  <span className="text-yellow-500 font-semibold">{formattedTime}</span>
                </p>

                <button
                  className="mt-4 w-full py-2 rounded-lg bg-primary text-white font-semibold"
                  onClick={verifyotp}
                >
                  Verify
                </button>

                <button 
                onClick={resendOtp}
                className="mt-2 w-full py-2 rounded-lg bg-gray-200 text-gray-600">
                  Send again
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
           <div className="flex justify-center items-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center">Reset your password</h2>
        <p className="text-gray-500 text-center mb-4">
          Please enter your new password
        </p>

        {/* Password Input */}
        <div className="relative flex items-center border rounded-lg px-3 py-2">
          <FaLock className="text-gray-400 mr-2" />
          <input
            type={!showPassword ? "text" : "password"}
            placeholder="Enter new password"
            className="w-full focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        <br />

        {/* Confirm Password Input */}
        <div className="relative flex items-center border rounded-lg px-3 py-2">
          <FaLock className="text-gray-400 mr-2" />
          <input
            type={!showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            className="w-full focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        <button
        onClick={handleSubmit}
        className="mt-4 w-full py-2 rounded-lg text-white font-semibold bg-primary">
          Done
        </button>
      </div>
    </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
