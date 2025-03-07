import Link from "next/link";
import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoCallOutline } from "react-icons/io5";

export default function HelpandSupport() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-start py-8 px-4 space-y-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-center">Help & Support</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl">
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 space-y-4 md:space-y-0">
          <HiOutlineMail className="text-primary text-4xl" />
          <div className="text-center md:text-left">
            <p className="text-xl font-semibold">Need more help?</p>
            <p className="text-gray-600">
              Get in touch with us, support is provided daily.{" "}
              <span>
                <Link href={`/`} className="text-primary underline">
                  Contact us
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl">
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 space-y-4 md:space-y-0">
          <IoCallOutline className="text-primary text-4xl" />
          <div className="text-center md:text-left">
            <p className="text-xl font-semibold">Have Questions?</p>
            <p className="text-gray-600">
              Our support team is here to assist you—reach out to us anytime.{" "}
              <span>
                <Link href={`/`} className="text-primary underline">
                  Call us
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
