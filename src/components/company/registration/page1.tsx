"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Page1: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendCount, setResendCount] = useState(0); // State to track OTP resend attempts
  const router = useRouter();

  // Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("* Company Name is required"),
    email: Yup.string()
      .email("* Invalid email ")
      .required("* Email is required"),
    otp: otpSent
      ? Yup.number().required("* OTP is required") 
      : Yup.string(), 
  });

  // Handle OTP sending
  const HandleOtpSend = async (values: { name: string; email: string }) => {
    if (resendCount >= 3) {
      alert("You have reached the maximum OTP resend attempts.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post("company/send-otp", values);
      console.log("Response:", response);
      toast.success("OTP sent successfully! Check your email.");
      setOtpSent(true);
      setResendCount(resendCount + 1); 
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const HandleOtpVerify = async (values: { otp: string; email: string;name:string }) => {
    setLoading(true);
    try {
      const response = await api.post("company/verify-otp", values);
      toast.success("OTP verified successfully!");
      router.push(`/company/register/form?email=${encodeURIComponent(values.email)}&name=${encodeURIComponent(values.name)}`);
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen flex-wrap text-slate-800">
      {/* Left Section */}
      <div className="relative hidden h-screen select-none flex-col justify-center bg-primary text-center md:flex md:w-1/2">
        <div className="mx-auto py-16 px-8 text-white xl:w-[40rem]">
          <p className="my-6 text-3xl font-semibold leading-10 mb-10">
            Start Your Career
            <span className="mx-auto p-1 block w-60 whitespace-nowrap rounded-lg bg-white py-2 text-primary">
              Journey with Us
            </span>
          </p>
          <p className="mb-4">
            Join FINDLY, the leading platform connecting job seekers with top
            employers. Register today and unlock exclusive job opportunities
            tailored to your skills and expertise.
          </p>
          <Link
            href="/about"
            className="font-semibold tracking-wide text-white underline underline-offset-4"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12">
          <Link href="/" className="text-2xl font-bold text-primary">
            {" "}
            Findly .{" "}
          </Link>
        </div>

        <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
          <p className="text-center text-3xl font-bold md:text-left md:leading-tight">
            Create your free account
          </p>
          <p className="mt-6 text-center font-medium md:text-left">
            Already using Findly?
            <Link
              href="c-login"
              className="whitespace-nowrap font-semibold text-purple-800"
            >
              {" "}
              Login here
            </Link>
          </p>

          {/* Google Signup Button */}
          <button className="w-full mt-8 flex items-center justify-center rounded-md border px-4 py-2 outline-none transition hover:border-transparent hover:bg-primary hover:text-white focus:ring-2">
            <Image
              className="mr-2 h-5"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google Icon"
              width={20}
              height={20}
            />
            Get started with Google
          </button>

          {/* Divider */}
          <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
            <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">
              Or use email instead
            </div>
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={{ name: "", email: "", otp: "" }}
            validationSchema={validationSchema}
            onSubmit={otpSent ? HandleOtpVerify : HandleOtpSend}
          >
            {({ values, isSubmitting }) => (
              <Form className="flex flex-col items-stretch pt-3 md:pt-8">
                {/* Company Name */}
                <div className="flex flex-col pt-4">
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-primary">
                    <Field
                      type="text"
                      name="name"
                      className="w-full bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="Company Name"
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col pt-4">
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-primary">
                    <Field
                      type="email"
                      name="email"
                      className="w-full bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="Email"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* OTP Input (only visible after OTP is sent) */}
                {otpSent && (
                  <>
                    <div className="flex flex-col pt-4">
                      <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-primary">
                        <Field
                          type="number"
                          name="otp"
                          className="w-full bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                          placeholder="Enter OTP"
                        />
                      </div>
                      <ErrorMessage
                        name="otp"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Resend OTP Button */}
                    <button
                      type="button"
                      onClick={() => HandleOtpSend(values)} // Pass the form values here
                      className="mt-4 text-sm text-primary underline"
                    >
                      Resend OTP
                    </button>
                  </>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-6 bg-primary text-white rounded-lg px-4 py-2 font-semibold shadow-md transition hover:bg-blue-700 md:w-32"
                  disabled={isSubmitting || loading}
                >
                  {loading
                    ? "Sending..."
                    : otpSent
                    ? "Verify OTP"
                    : "Send Email"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Page1;
