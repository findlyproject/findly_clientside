"use client";

import { loginAdmin } from "@/lib/store/features/actions/adminActions";
import { useAppDispatch } from "@/lib/store/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [datas, setDatas] = useState({
    email: "",
    password: "",
  });

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
  };

  const validate = () => {
    let newErrors = { email: "", password: "" };
    let isValid = true;

    if (!datas.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(datas.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!datas.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (datas.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const resultAction = await dispatch(loginAdmin(datas));

    if (loginAdmin.fulfilled.match(resultAction)) {
      router.push("/admin/dashboard");
      toast.success("Login Successful!");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
     
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/illustration-social-media-concept_53876-9147.jpg?t=st=1738738972~exp=1738742572~hmac=7697e2c58c301eb52bc2c15b15800f0be106ae22e573fdcdccbc9d856d6735ea&w=826')",
        }}
      />

      <div className="relative z-10 w-full max-w-sm bg-white p-8 rounded-lg shadow-md text-end">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-2">
          Welcome
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please login to Admin Dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={datas.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full px-4 py-2 text-sm border rounded-md focus:ring-orange-500 focus:border-orange-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={datas.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full px-4 py-2 text-sm border rounded-md focus:ring-orange-500 focus:border-orange-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-6 h-6"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-6 h-6"
                >
                  <path d="M3 3l18 18M3 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <path d="M9.9 9.9a3 3 0 1 1 4.2 4.2" />
                </svg>
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary hover:bg-primary"
          >
            Login
          </button>
        </form>
        <Link
          href={`/`}
          className="text-sm text-primary underline :hover-underline-text-purple-500"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
