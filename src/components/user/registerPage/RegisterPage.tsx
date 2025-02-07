"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setEmail, setPassword } from "@/lib/store/features/registerSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import api from "@/utils/api";
// import { log } from "console";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const [Email, setLocalemail] = useState("");
  const [Password, setLocalpassword] = useState("");
  const [ConformPassword, setConformPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [ConformPasswordError, setConformPasswordError] = useState("");

  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    return passwordRegex.test(password);
  };

  const checkEmailExists = async (email: string) => {
    console.log("emailll",email);
    
    try {
      const response = await api.get(`/api/user/all?email=${email}`);
      return response.data.exists;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const validateForm = async () => {
    let isValid = true;

    if (!Email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(Email)) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    } else {
      const emailExists = await checkEmailExists(Email);
      if (emailExists) {
        setEmailError("Email already exists. Please use a different email.");
        isValid = false;
      } else {
        setEmailError("");
      }
    }

    if (!Password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!validatePassword(Password)) {
      setPasswordError(
        "Password must include uppercase, lowercase, and a number."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!ConformPassword) {
      setConformPasswordError("Confirm Password is required.");
      isValid = false;
    } else if (ConformPassword !== Password) {
      setConformPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setConformPasswordError("");
    }

    return isValid;
  };

  const handleContinue = async () => {
    if (await validateForm()) {
      dispatch(setEmail(Email));
      dispatch(setPassword(Password));
      
      router.push(`/register/namepage`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-8 px-4">
      <div className="w-full max-w-sm p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Create Account
        </h1>
        <p className="text-gray-600 mb-6">
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
              onFocus={() => setEmailError("")}
              onChange={(e) => setLocalemail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {EmailError && <span className="text-red-500">{EmailError}</span>}
          </div>

          <div className="relative">
  <label htmlFor="password" className="block text-gray-700">
    Password
  </label>
  <div className="relative">
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder=" Password"
      value={Password}
      onFocus={() => setPasswordError("")}
      onChange={(e) => setLocalpassword(e.target.value)}
      className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary pr-10"
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
  </div>
  {PasswordError && <span className="text-red-500">{PasswordError}</span>}
</div>


          <div className="relative">
            <label htmlFor="confirm-password" className="block text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={ConformPassword}
              onFocus={() => setConformPasswordError("")}
              onChange={(e) => setConformPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
            
            
            <div
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
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
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
              </div>
            </div>
            {ConformPasswordError && (
              <span className="text-red-500">{ConformPasswordError}</span>
            )}
          </div>

          <button
            className="w-full py-2 bg-primary text-white font-semibold rounded-full mt-4 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={handleContinue}
          >
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

