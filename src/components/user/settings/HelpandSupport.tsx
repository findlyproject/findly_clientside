import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoCallOutline } from "react-icons/io5";

export default function HelpandSupport() {
  const {activeuser}=useAppSelector(state=>state.user)
  const route =activeuser?"user":"company"
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center  py-16 px-6">
      <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center">
        Help & Support
      </h1>

      {/* Container for horizontal layout */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-10 w-full max-w-5xl">
        
        {/* Help Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full md:w-1/2 flex flex-col items-center text-center space-y-6">
          <HiOutlineMail className="text-primary text-6xl" />
          <p className="text-2xl font-semibold">Need more help?</p>
          <p className="text-lg text-gray-600 max-w-md">
            Get in touch with us, support is provided daily.
          </p>
          <Link href={`contactus/contact`} className="text-primary  text-xl">
            Contact us 
          </Link>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full md:w-1/2 flex flex-col items-center text-center space-y-6">
          <IoCallOutline className="text-primary text-6xl" />
          <p className="text-2xl font-semibold">Feedback Form</p>
          <p className="text-lg text-gray-600 max-w-md">
          We value your opinion! Share your feedback to help us improve.
          </p>
          <Link href={`/${route}/rateus`} className="text-primary  text-xl">
            Call us
          </Link>
        </div>

      </div>
    </div>
  );
}
