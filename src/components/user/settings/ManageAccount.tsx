'use client'
import { useAppSelector } from '@/lib/store/hooks';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoIosLogOut } from "react-icons/io";

export default function ManageAccount() {
  const user = useAppSelector((state) => state.user.activeuser);
  console.log("user...", user);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleDropdown = () => {
    setIsShow(!isShow);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-start py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Your Account</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile Information</h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
            <Image
              src={user?.profileImage || "https://i.pinimg.com/736x/85/a4/a1/85a4a1fb0cc0528ffea6b2b00ffb4e67.jpg"}
              alt="User Profile Picture"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="space-y-2">
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Name:</span> {user?.firstName} {user?.lastName}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Location:</span> {user?.location?.city}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            href={`/user/profile/edit`}
            className="text-blue-500 hover:underline"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Display</h2>

        <div className='flex justify-between items-center'>
          <h1>Dark mode</h1>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isDarkMode}
              onChange={handleToggle}
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-primary peer-focus:ring-4 peer-focus:ring-primary transition-all duration-300">
              <span className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-5' : ''}`}></span>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Language Preference</h2>

        <div className='flex justify-between items-center'>
          <h1>Language</h1>
          <button className='bg-primary text-white font-semibold px-4 py-2 rounded-full'>Select</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Subscriptions & Payments</h2>

        <div className='flex flex-col'>
          <Link href={`/`} className='text-primary text-md mb-2'>Upgrade your account</Link>
          <hr className='w-[calc(100%+64px)] -mx-8 border-gray-300' />
          <div className='flex justify-between items-center'>
            <button className='text-primary text-start text-md mb-2'>View Purchase History</button>
            <svg
              onClick={handleDropdown}
              className={`w-4 h-4 transition-transform ${isShow ? 'rotate-180' : 'rotate-0'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>

          {isShow && (
            <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
              <ul className='space-y-2'>
                <li>Order #12345 - $49.99 - Completed</li>
                <li>Order #67890 - $29.99 - Completed</li>
                <li>Order #11223 - $19.99 - Pending</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Management</h2>

        <div className='flex flex-col'>
          <Link href={`/`} className='text-primary text-md mb-2'>Change Password</Link>
          <h1 className='text-primary text-md mb-2'>Close Account</h1>

          <div className='flex justify-between items-center'>
            <h1 className='text-primary text-md mb-4'>{user?.email}</h1>
            <button className='text-xl text-primary' title='Logout'>
              <IoIosLogOut />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
