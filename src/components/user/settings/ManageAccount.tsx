"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { IoMdCloseCircle } from "react-icons/io";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";

import { useRouter } from "next/navigation";
import DeleteAccount from "./DeleteAccount";
import { setDetailes, SetLogout } from "@/lib/store/features/userSlice";
import { setCompanyLogOut } from "@/lib/store/features/companyslice";
import { deleteAccount, deleteAccountVerification } from "@/lib/store/features/actions/userActions";
import { useTranslation } from "@/Context/TranslationContext";
import api from "@/utils/api";
import { button } from "@material-tailwind/react";


export default function ManageAccount() {
  const router = useRouter();

  const [otpModal, setOtpModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPick, setShowPick] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120);
  const [selectedReasons, setSelectedReasons] = useState<number[]>([]);
  const user = useAppSelector((state) => state.user.activeuser );
  const company = useAppSelector((state) => state.companyLogin.activeCompany );
  const[activeSubscriptions,setactiveSubscriptions]=useState()
  const route = user ? "user" : "company";
  const dispatch = useAppDispatch();
  const reasons = [
    "I am receiving too many irrelevant job offers",
    "I prefer using a different job search platform",
    "I am taking a career break and don't need job alerts",
    "I am not satisfied with the user experience or features",
    "Other",
  ];

  const companyDeletionReasons = [
    "Our company has closed or merged with another business",
    "The platform’s pricing or subscription plans are too expensive",
    "We aren't satisfied with the quality of applicants received",
    "platform’s features don't meet our recruitment requirements",
    "We have concerns about data security and privacy",
    "Other",
  ];
  const { translateText, language, setLanguage } = useTranslation();
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = async () => {
    const translated = await translateText("Hello, how are you?");
    setTranslatedText(translated);
  };

  const closeOtpModal = () => {
    setShowPick(false);
    setOtpModal(false);
    setOtpModal(false);
    setSelectedReasons([]);
    setShowModal(false);
  };
  useEffect(() => {
    if (otpModal) {
      setTimer(120);
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            closeOtpModal();

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
    document.documentElement.classList.toggle("dark");
  };
  useEffect(() => {
    const details = async () => {
      const response = await api.get(`/payment/subscriptiondetails`);
      console.log("Response of details of payment", response);
  
      // Filter active subscriptions
      const activeSubscription = response.data.subscription.filter((sub) =>
        new Date(sub.endDate) > new Date()
      );
      setactiveSubscriptions(activeSubscription)
     
    };
  
    details();
  }, []);
  
  const handleDropdown = () => {
    setIsShow(!isShow);
  };

  const onDelete = async () => {
    try {
      const result =await dispatch(deleteAccount(route))
      if(result.type==="delete/account/fulfilled"){
        setOtpModal(true);
        setShowModal(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleVerification = async () => {
    try {
      const reasonStrings: string[] = selectedReasons.map(
        (item) => reasons[item]
      );
      const result =await dispatch(deleteAccountVerification({otp,reasonStrings,route}))
      if(result.type==="delete/account/verification/fulfilled"){
        setOtpModal(false);
        if (user) {
          dispatch(SetLogout());
        } else {
          dispatch(setCompanyLogOut());
        }
        router.push("/");
      }

    
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClickReason = (index: number, item: string) => {
    console.log("item", item);

    setSelectedReasons((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const formatTime = (time: number) =>
    `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`;
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center  py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manage Your Account
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Profile Information
        </h2>

        {user ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
              <Image
                src={
                  user?.profileImage ||
                  "https://i.pinimg.com/736x/85/a4/a1/85a4a1fb0cc0528ffea6b2b00ffb4e67.jpg"
                }
                alt="User Profile Picture"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-2">
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Name:</span> {user?.firstName}{" "}
                {user?.lastName}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Email:</span> {user?.email}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Gender:</span>{" "}
                {user?.gender}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
              <Image
                src={
                  company?.logo ||
                  "https://i.pinimg.com/736x/85/a4/a1/85a4a1fb0cc0528ffea6b2b00ffb4e67.jpg"
                }
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
                <p>
                  <span className="font-medium">City:</span>{" "}
                  {company?.address?.city}
                </p>
                <p>
                  <span className="font-medium">Landmark:</span>{" "}
                  {company?.address?.landmark}
                </p>
                <p>
                  <span className="font-medium">State:</span>{" "}
                  {company?.address?.state}
                </p>
                <p>
                  <span className="font-medium">Country:</span>{" "}
                  {company?.address?.country}
                </p>
                <p>
                  <span className="font-medium">Pincode:</span>{" "}
                  {company?.address?.pincode}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Link
            href={`/${route}/profile/edit`}
            className="text-primary hover:underline"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Display</h2>

        <div className="flex justify-between items-center">
          <h1>Dark mode</h1>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isDarkMode}
              onChange={handleToggle}
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-primary peer-focus:ring-4 peer-focus:ring-primary transition-all duration-300">
              <span
                className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  isDarkMode ? "translate-x-5" : ""
                }`}
              ></span>
            </div>
          </label>
        </div>
      </div> */}

<div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-3xl">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Language Preference
      </h2>

      <div className="flex justify-between items-center mb-4">
        <h1>Current Language: {language.toUpperCase()}</h1>
        <select
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
          className="border rounded-md p-2"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
        </select>
      </div>

      <button
        onClick={handleTranslate}
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Translate
      </button>

      {translatedText && (
        <p className="mt-4 text-gray-700 font-semibold">
          Translated: {translatedText}
        </p>
      )}
    </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Subscriptions & Payments
        </h2>

        <div className=" flex-col space-y-4">
          <Link href={`/${route}/premium`} className="text-primary text-md mb-2">
            Upgrade your account
          </Link>
          
          <div className="flex justify-between items-center" onClick={handleDropdown}>
            <button className="text-primary text-start text-md mb-2">
              View Active Subscription
            </button>
            <svg
              
              className={`w-4 h-4 transition-transform ${
                isShow ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>

          {isShow && (
            <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
             <ul className="space-y-2">
             <ul className="space-y-2">
  {activeSubscriptions?.map((subscription) => (
    <li key={subscription._id} className="p-2 border rounded-lg">
      <strong>Plan:</strong> {subscription.plan} <br />
      <strong>Price:</strong> ₹{subscription.price} <br />
      <strong>End Date:</strong> {new Date(subscription.endDate).toLocaleDateString()} <br />
      <strong>Payment Status:</strong> {subscription.paymentStatus} <br />

      {subscription.paymentStatus === "pending" && (
        <button
          onClick={() => router.push(`/${route}/premium/verification/${subscription.sessionId}`)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Finish
        </button>
      )}
    </li>
  ))}
</ul>

</ul>

            </div>
          )}
        </div>
      

        <h2 className="text-xl font-semibold text-gray-700 mt-5 mb-4">
          Account Management
        </h2>

        <div className="flex flex-col items-start">
          <Link href={`/`} className="text-black text-md mb-2">
            Change Password
          </Link>

          <h1 className="text-black text-md mb-4">{user?.email}</h1>
          <div className="flex space-x-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-500 rounded-lg p-3 text-white text-md mb-2"
          >
            Delete Account
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-500 flex gap-3 rounded-lg p-3 text-white text-md mb-2"
          >

  Logout <IoIosLogOut className="text-xl pt-1" />
</button>

          </div>

          {showModal &&
            (user ? (
              <DeleteAccount
                user={user}
                showPick={showPick}
                setShowPick={setShowPick}
                selectedReasons={selectedReasons}
                handleClickReason={handleClickReason}
                onClose={() => closeOtpModal()}
                onDelete={onDelete}
                reasons={reasons}
              />
            ) : (
              <DeleteAccount
                user={company}
                showPick={showPick}
                setShowPick={setShowPick}
                selectedReasons={selectedReasons}
                handleClickReason={handleClickReason}
                onClose={() => closeOtpModal()}
                onDelete={onDelete}
                reasons={companyDeletionReasons}
              />
            ))}

          {otpModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                <div className="flex justify-end">
                  <button onClick={() => closeOtpModal()}>
                    <IoMdCloseCircle />
                  </button>
                </div>
                <h2 className="text-lg font-semibold text-red-600">
                  ⚠️ Warning: Account Deletion
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Entering the OTP will permanently delete your account. This
                  action cannot be undone.
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

                <p className="text-red-500 mt-3 text-sm">
                  Time Remaining: {formatTime(timer)}
                </p>

                <button
                  onClick={handleVerification}
                  className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                >
                  Confirm Deletion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
