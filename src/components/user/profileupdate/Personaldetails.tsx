import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import api from "@/utils/api";
import {
  registerSendOtp,
  updateBanner,
  updateBasicInfo,
  updateProfileImage,
  verifyOtp,
} from "@/lib/store/features/actions/userActions";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import OTPInput from "react-otp-input";
interface ImageType {
  profileImage: string | File | undefined;
  banner: string | File | undefined;
}

function Personaldetails() {
  const dispatch = useAppDispatch();
  const { activeuser } = useAppSelector((state) => state.user);
  console.log(activeuser);
  const [image, setImage] = useState<ImageType>({
    profileImage: activeuser?.profileImage,
    banner: activeuser?.banner,
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files ? e.target.files[0] : null;

    // Update state first
    setImage((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  // Trigger handleUploadImage when `image` state updates

  const [showOtpField, setShowOtpField] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    otp: showOtpField
      ? Yup.number().required("* OTP is required")
      : Yup.string(),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be only digits")
      .min(10, "Phone number must be at least 10 digits"),
    dateOfBirth: Yup.date(),
    gender: Yup.string().required("Please select a gender"),
    about: Yup.string().max(500, "Maximum 500 characters allowed"),
  });
  interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    otp?: string;
    phoneNumber?: string;
    dateOfBirth?: Date | string;
    gender: string;
    about?: string;
  }

  useEffect(() => {
    const handleUploadImage = async () => {
      const uploadImage = async (image: File) => {
        if (!image || !image.type) {
          return null;
        }
        const response = await api.get("/user/generate-signed-url", {
          params: { fileType: image.type },
        });

        if (!response.data) {
          throw new Error("Failed to get signed URL");
        }

        const { api_key, timestamp, signature, folder, cloudName } =
          response.data;

        const formData = new FormData();
        formData.append("file", image);
        formData.append("api_key", api_key);
        formData.append("timestamp", timestamp.toString());
        formData.append("signature", signature);
        formData.append("folder", folder);

        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await uploadResponse.json();
        if (!data.secure_url) {
          throw new Error("Upload failed");
        }

        return data.secure_url;
      };

      try {
        const profileImageUrl = image.profileImage
          ? await uploadImage(image.profileImage as File)
          : null;
        const bannerImageUrl = image.banner
          ? await uploadImage(image.banner as File)
          : null;

        if (profileImageUrl) dispatch(updateProfileImage(profileImageUrl));
        if (bannerImageUrl) dispatch(updateBanner(bannerImageUrl));

        if (profileImageUrl || bannerImageUrl) {
          toast.success("Image uploaded successfully!");
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };
    if (image.profileImage || image.banner) {
      handleUploadImage();
    }
  }, [image.banner, image.profileImage, dispatch]);

  const originalEmail = activeuser?.email;

  const handleSubmit = (values: FormValues) => {
    if (values.email !== originalEmail) {
      // Trigger OTP process
      HandleOtpSend(values.email);
    } else {
      dispatch(updateBasicInfo({ basicInfo: values }));
      toast.success("Personal details saved successfully!");
    }
  };
  const handleClick = (values: FormValues) => {
    if (showOtpField) {
      if (values.email && values.otp) {
        HandleOtpVerify({ email: values.email, otp: values.otp });
      }
    } else {
      handleSubmit(values);
    }
  };

  const HandleOtpSend = async (email: string) => {
    console.log(email);
    const result = await dispatch(registerSendOtp(email));
    if (result.type === "user/otp/register/fulfilled") {
      setShowOtpField(true);
    }
  };

  // Handle OTP verification
  const HandleOtpVerify = async (values: { otp: string; email: string }) => {
    const result = await dispatch(verifyOtp(values));
    if (result.type === "user/otp/verification/fulfilled") {
      setShowOtpField(false);
    }
  };
  //date conversion
  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <div className="py-2 relative">
        <Image
          src={
            image?.banner
              ? typeof image?.banner === "string"
                ? image?.banner
                : URL.createObjectURL(image?.banner)
              : "/assets/loginbanner.jpg"
          }
          alt="banner image"
          width={500}
          height={50}
          className="w-full h-44 object-cover rounded-lg"
        />

        <input
          type="file"
          accept="image/*"
          name="banner"
          className="hidden"
          id="bannerUpload"
          onChange={handleImage}
        />
        <button
          onClick={() => document.getElementById("bannerUpload")?.click()}
        >
          <div className="absolute top-5 right-5 text-back bg-gray-100 p-1 rounded-full cursor-pointer text-4xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
          </div>
        </button>

        <div className="absolute top-24 left-5 flex flex-col items-center">
          <Image
            src={
              image?.profileImage
                ? typeof image?.profileImage === "string"
                  ? image?.profileImage
                  : URL.createObjectURL(image?.profileImage)
                : "/assets/profile.png"
            }
            alt="profile image"
            width={100}
            height={100}
            className="w-32 h-32 rounded-full shadow-xl border border-gray-300 object-cover"
          />

          <input
            type="file"
            accept="image/*"
            name="profileImage"
            className="hidden"
            id="profileUpload"
            onChange={handleImage}
          />
          <button
            onClick={() => document.getElementById("profileUpload")?.click()}
          >
            <div className="absolute top-24 left-24 text-black bg-gray-100 p-1 rounded-full cursor-pointer text-3xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <Formik<FormValues>
        initialValues={{
          firstName: activeuser?.firstName || "",
          lastName: activeuser?.lastName || "",
          email: activeuser?.email || "",
          phoneNumber: activeuser?.phoneNumber || "",
          dateOfBirth: activeuser?.dateOfBirth ? formatDate(activeuser.dateOfBirth) : "",
          gender: activeuser?.gender || "",
          about: activeuser?.about || "",
          otp: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (showOtpField) {
            if (values.email && values.otp) {
              HandleOtpVerify({ email: values.email, otp: values.otp });
            } else {
              console.error("Email or OTP is missing");
            }
          } else {
            handleSubmit(values);
          }
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="p-6 bg-gray-100 rounded-lg shadow-lg mt-4 w-full">
            <h2 className="text-xl font-semibold mb-4">Personal Details</h2>

            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="grid gap-3">
                <label>First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  className="p-2 border rounded-md"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="grid gap-3">
                <label>Last Name</label>
                <Field
                  type="text"
                  name="lastName"
                  className="p-2 border rounded-md"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* Email & Phone Number */}
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <div className="flex gap-2 items-center">
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="p-2 border rounded-md flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => handleClick(values)}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {showOtpField ? "Verify OTP" : "change"}
                  </button>
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="grid gap-3">
                <label>Phone Number</label>
                <Field
                  type="text"
                  name="phoneNumber"
                  className="p-2 border rounded-md"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* OTP Field (Only if email is changed) */}
            {showOtpField && (
              <div className="grid gap-3 my-4">
                <label>Enter OTP</label>
                <OTPInput
                  value={values.otp}
                  onChange={(otp) => setFieldValue("otp", otp)}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    width: "55px",
                    height: "55px",
                    margin: "5px",
                    fontSize: "20px",
                    textAlign: "center",
                    border: "1px solid #6b48ab",
                    borderRadius: "5px",
                  }}
                />
              </div>
            )}

            {/* Date of Birth & Gender */}
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="grid gap-3">
                <label>Date of Birth</label>
                <Field
                  type="date"
                  name="dateOfBirth"
                  className="p-2 border rounded-md"
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="grid gap-3">
                <label>Gender</label>
                <Field
                  as="select"
                  name="gender"
                  className="p-2 border rounded-md"
                >
                  <option value="">Choose your Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* About */}
            <div className="grid gap-3">
              <label>About</label>
              <Field
                as="textarea"
                name="about"
                className="mt-4 w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="about"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="p-2 bg-primary rounded-lg text-xl text-white mt-3"
                disabled={isSubmitting}
              >
                save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Personaldetails;
