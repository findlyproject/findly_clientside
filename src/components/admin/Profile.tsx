"use client";

import { Admin } from "@/types/Types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import Image from "next/image";
import { useState } from "react";
import { FaUser, FaEnvelope, FaCamera } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editAdminProfile } from "@/lib/store/features/actions/adminActions";

export const Profile = () => {
  const admin = useAppSelector((state) => state.admin.admin as Admin);
  const dispatch = useAppDispatch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    admin.profileImage || null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  //validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    bio: Yup.string().required("Bio is required"),
  });

  const handleUpdate = async (values: Admin) => {
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", values.firstName);
    formDataToSend.append("lastName", values.lastName);
    formDataToSend.append("email", values.email);
    formDataToSend.append("phoneNumber", values.phoneNumber);
    formDataToSend.append("bio", values.bio);
    if (selectedFile) {
      formDataToSend.append("profileImage", selectedFile);
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = await dispatch(editAdminProfile(formDataToSend));
      if (result.type === "edit/admin/fulfilled") {
        console.log("done");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 p-6">
      <aside className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center text-center">
          <label htmlFor="fileInput" className="relative cursor-pointer">
            <Image
              src={preview || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border"
              width={100}
              height={100}
            />
            <FaCamera className="absolute bottom-1 right-1 bg-gray-700 text-white p-1 rounded-full" />
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <h2 className="mt-2 text-lg font-semibold">
            {admin.firstName} {admin.lastName}
          </h2>
          <p className="text-gray-500">{admin.email}</p>
        </div>
      </aside>

      <main className="flex-1 bg-white shadow-md rounded-lg p-6 md:ml-6">
        <h2 className="text-2xl font-semibold">Account Setting</h2>
        <Formik
          initialValues={{
            firstName: admin?.firstName || "",
            lastName: admin?.lastName || "",
            email: admin?.email || "",
            phoneNumber: admin?.phoneNumber || "",
            bio: admin?.bio || "",
            profileImage: admin?.profileImage || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ handleChange, values, errors, touched, resetForm ,isSubmitting}) => (
            <Form className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-500" />
                  <Field
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full pl-10 p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                <Field
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full pl-10 p-2 border rounded-md"
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full p-2 border rounded-md"
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 text-xs">{errors.email}</div>
                )}
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="bio"
                  value={values.bio}
                  onChange={handleChange}
                  placeholder="Write about yourself"
                  className="w-full p-2 border rounded-md"
                  rows={3}
                />
                <ErrorMessage
                  name="bio"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex space-x-4">
              <button
  type="submit"
  className="bg-primary text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
  disabled={isSubmitting} // Optional: prevent multiple submits
>
  {isSubmitting ? (
    <>
      <svg
        className="w-5 h-5 stroke-white animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_9023_61563)">
          <path
            d="M14.6437 2.05426C11.9803 1.2966 9.01686 1.64245 6.50315 3.25548C1.85499 6.23817 0.504864 12.4242 3.48756 17.0724C6.47025 21.7205 12.6563 23.0706 17.3044 20.088C20.4971 18.0393 22.1338 14.4793 21.8792 10.9444"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_9023_61563">
            <rect width="24" height="24" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
      <span>Updating...</span>
    </>
  ) : (
    <span>Update</span>
  )}
</button>

                <button
                  type="reset"
                  onClick={() => {
                    resetForm();
                    setSelectedFile(null);
                    setPreview(admin.profileImage || null);
                  }}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};
