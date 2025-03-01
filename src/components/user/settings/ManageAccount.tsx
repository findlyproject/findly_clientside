'use client'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import api from '@/utils/api';
import { IoMdCloseCircle } from "react-icons/io";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import DeleteAccount from './DeleteAccount';
import { SetLogout } from '@/lib/store/features/userSlice';
import { setCompanyLogOut } from '@/lib/store/features/companyslice';

export default function ManageAccount() {
  const router = useRouter()

  const [otpModal, setOtpModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPick, setShowPick] = useState(false)
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120);
  const [selectedReasons, setSelectedReasons] = useState<number[]>([]);
  const user = useAppSelector((state) => state.user.activeuser);
  const company = useAppSelector((state) => state.companyLogin.activeCompany)
  const route = user ? "user" : "company"
  const dispatch = useAppDispatch()
  const reasons = [
    "I am receiving too many irrelevant job offers",
    "I prefer using a different job search platform",
    "I am taking a career break and don't need job alerts",
    "I am not satisfied with the user experience or features",
    "Other"
  ];

  const companyDeletionReasons = [
    "Our company has closed or merged with another business",
    "The platform’s pricing or subscription plans are too expensive",
    "We aren't satisfied with the quality of applicants received",
    "platform’s features don't meet our recruitment requirements",
    "We have concerns about data security and privacy",
    "Other"
  ];

  const closeOtpModal = () => {
    setShowPick(false)
    setOtpModal(false)
    setOtpModal(false)
    setSelectedReasons([])
    setShowModal(false)
  }
  useEffect(() => {
    if (otpModal) {
      setTimer(120);
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            closeOtpModal()

            return 0;
          }
          return prev - 1;
        });
      }, 1000);


      return () => clearInterval(countdown);
    }
  }, [otpModal, showModal]);




  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleDropdown = () => {
    setIsShow(!isShow);
  };




  const onDelete = async () => {
    try {
      console.log("jeieidkf");
      const response = await api.post(`/${route}/accountdeletionreqst`)
      console.log("e", response);
      if (response.status === 200) {
        setOtpModal(true)
        setShowModal(false)
      }
    } catch (error) {
      console.log("error", error);

    }

  }
  const handleVerification = async () => {
    try {
      const reasonStrings: string[] = selectedReasons.map((item) => reasons[item])
      const response = await api.post(`/${route}/verifyOtp`, { otp, reasons: reasonStrings })


      if (response.status === 200) {
        setOtpModal(false)
        toast.success("account deleted successfully")
        if (user) {
          dispatch(SetLogout())
        } else {
          dispatch(setCompanyLogOut())
        }

        router.push("/")
      }
    } catch (error) {
      console.log("error", error);

    }

  }

  const handleClickReason = (index: number, item: string) => {

    setSelectedReasons((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]

    );
  }


  const formatTime = (time: number) => `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center  py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Your Account</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile Information</h2>

        {
          user ? (
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
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                <Image
                  src={company?.logo || "https://i.pinimg.com/736x/85/a4/a1/85a4a1fb0cc0528ffea6b2b00ffb4e67.jpg"}
                  alt="User Profile Picture"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-2">
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Name:</span> {company?.name}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Email:</span> {company?.email}
                </p>
                <div className="text-lg text-gray-600">
                  <p className="font-semibold">Address:</p>
                  <p><span className="font-medium">City:</span> {company?.address?.city}</p>
                  <p><span className="font-medium">Landmark:</span> {company?.address?.landmark}</p>
                  <p><span className="font-medium">State:</span> {company?.address?.state}</p>
                  <p><span className="font-medium">Country:</span> {company?.address?.country}</p>
                  <p><span className="font-medium">Pincode:</span> {company?.address?.pincode}</p>
                </div>
              </div>
            </div>
          )
        }

        <div className="mt-6 flex justify-end">
          <Link
            href={`/${route}/profile/edit`}
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

        <div className='flex flex-col items-start'>
          <Link href={`/`} className='text-black text-md mb-2'>Change Password</Link>



          <h1 className='text-black text-md mb-4'>{user?.email}</h1>
          <button onClick={() => setShowModal(true)} className='text-red-900 text-md mb-2'>Delete Account</button>
          <button className='text-xl text-red-900' title='Logout'>
            <IoIosLogOut />
          </button>

          {
            showModal && (
              user ?
                <DeleteAccount
                  user={user}
                  showPick={showPick}
                  setShowPick={setShowPick}
                  selectedReasons={selectedReasons}
                  handleClickReason={handleClickReason}
                  onClose={() => closeOtpModal()}
                  onDelete={onDelete}
                  reasons={reasons}
                /> : <DeleteAccount
                  user={company}
                  showPick={showPick}
                  setShowPick={setShowPick}
                  selectedReasons={selectedReasons}
                  handleClickReason={handleClickReason}
                  onClose={() => closeOtpModal()}
                  onDelete={onDelete}
                  reasons={companyDeletionReasons}
                />
            )
          }


          {
            otpModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                  <div className='flex justify-end'><button onClick={() => closeOtpModal()}><IoMdCloseCircle /></button></div>
                  <h2 className="text-lg font-semibold text-red-600">
                    ⚠️ Warning: Account Deletion
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Entering the OTP will permanently delete your account. This action cannot be undone.
                  </p>

                  {/* OTP Input */}
                  <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>

                  <p className="text-red-500 mt-3 text-sm">Time Remaining: {formatTime(timer)}</p>

                  <button
                    onClick={handleVerification}
                    className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                  >
                    Confirm Deletion
                  </button>
                </div>
              </div>
            )
          }


        </div>
      </div>
    </div>
  );
}
