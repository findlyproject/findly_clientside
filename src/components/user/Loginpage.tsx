"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  forgotPassword,
  googlloginUser,
  loginUser,
} from "@/lib/store/features/actions/userActions";
import { toast } from "react-toastify";
import { setGooglelogin } from "@/lib/store/features/userSlice";

function Loginpage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [ispassword, setPassword] = useState(false);
  const { googlestate } = useAppSelector((state) => state.user);
  console.log("googlestate", googlestate);

  const dispatch = useAppDispatch();
  const handilchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser(state));

    if (loginUser.fulfilled.match(resultAction)) {
      router.push("/user/home");
      toast.success("Login Successful!");
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

  const forgotPasswordee = async () => {
    if (!state.email) {
      toast.error("Please enter your email");
      return;
    }
    if (!validateEmail(state.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    console.log("object", state.email);

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
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 py-4 sm:py-8 px-10 sm:px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center min-h-[85vh]">
          <div className="flex flex-col md:flex-row bg-white shadow-lg sm:shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden w-full">
            {/* Logo */}
            {/* <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
          <Logo/>
        </div> */}

            {/* Form Section */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800">
                Sign In
              </h1>
              <p className="text-gray-500 text-center mt-1 sm:mt-2 text-xs sm:text-sm">
                Explore jobs and build skills
              </p>

              <form className="mt-4 sm:mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-gray-700 font-medium text-xs sm:text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full p-2 sm:p-3 rounded-full border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                    onChange={handilchange}
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-medium text-xs sm:text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={ispassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      className="w-full p-2 sm:p-3 pr-10 rounded-full border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                      onChange={handilchange}
                      value={state.password}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setPassword(!ispassword)}
                      className="absolute right-3 top-7 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
                    >
                      {ispassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="w-full flex justify-end mt-1">
                    <div
                      onClick={forgotPasswordee}
                      className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    >
                      <p className="hover:underline">Forgot Password?</p>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all text-white text-sm sm:text-base font-semibold py-2 sm:py-3 rounded-full shadow-md hover:shadow-lg"
                  type="submit"
                >
                  Sign In
                </button>

                <div className="flex items-center justify-center gap-2 sm:gap-3 py-1 sm:py-2">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-xs sm:text-sm font-medium text-gray-500">
                    OR
                  </span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
              </form>

              <button
                className="w-full text-sm sm:text-base font-medium py-2 sm:py-3 rounded-full bg-white border border-gray-300 hover:bg-gray-50 flex justify-center items-center gap-2 mt-3 sm:mt-4 shadow-sm transition-all"
                onClick={googlelogin}
              >
                <FcGoogle className="text-lg sm:text-xl" />
                <span>Continue with Google</span>
              </button>

              <div className="flex justify-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
                <p>
                  Don&apos;t have an account?{" "}
                  <a
                    href="/user/register"
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    Create account
                  </a>
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="hidden md:block w-1/2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-r-2xl sm:rounded-r-3xl overflow-hidden">
              <div className="h-full w-full relative">
                <Image
                  src="/assets/loginbanner.jpg"
                  alt="Login Background"
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-500 ease-in-out opacity-90 hover:opacity-100"
                  priority
                />
                {/* Overlay text */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 bg-gradient-to-t from-black/60 to-transparent">
                  <h2 className="text-white text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-white/90 text-xs sm:text-sm">
                    Discover opportunities that match your skills and
                    aspirations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
