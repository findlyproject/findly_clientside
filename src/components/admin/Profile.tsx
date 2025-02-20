'use client';

import { AdminProfile, setAdmin } from '@/lib/store/features/adminSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import api from '@/utils/api';
import Image from 'next/image';
import { useState } from 'react';
import { FaUser, FaEnvelope, FaCamera } from 'react-icons/fa';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Profile() {
  const admin = useAppSelector((state) => state.admin.admin as AdminProfile);
  const dispatch = useAppDispatch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(admin.profileImage || null);

<<<<<<< HEAD
=======
  const [activeLink, setActiveLink] = useState('accountSettings');
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
>>>>>>> 0e7888464bd06148eee8a0fd7563175062a8f8d6
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0])); 
    }
  };

  //validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
    bio: Yup.string().required('Bio is required'),
  });

  
  const handleUpdate = async (values: AdminProfile) => {
    const formDataToSend = new FormData();
    formDataToSend.append('firstName', values.firstName);
    formDataToSend.append('lastName', values.lastName);
    formDataToSend.append('email', values.email);
    formDataToSend.append('phoneNumber', values.phoneNumber);
    formDataToSend.append('bio', values.bio);
    if (selectedFile) {
      formDataToSend.append('profileImage', selectedFile);
    }

    try {
      const response = await api.patch(`/admin/editprofile`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('response of admin profile edit', response);
      dispatch(setAdmin(response.data.admin));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 p-6">
      <aside className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center text-center">
          <label htmlFor="fileInput" className="relative cursor-pointer">
            <Image
              src={preview || '/default-avatar.png'}
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
<<<<<<< HEAD
        
=======
        <nav className="mt-6 space-y-3">
          <a href="#" className="block text-gray-700 hover:text-primary hover:font-semibold">Account Settings</a>
           <a href="#" className="block text-gray-700 hover:text-primary hover:font-semibold">Password</a>
           <a href="#" className="block text-gray-700 hover:text-primary hover:font-semibold">Security & Privacy</a>
           <a href="#" className="block text-gray-700 hover:text-primary hover:font-semibold">Application</a>
           <a href="#" className="block text-gray-700 hover:text-primary hover:font-semibold">Notification</a>
         </nav>
>>>>>>> 0e7888464bd06148eee8a0fd7563175062a8f8d6
      </aside>

      <main className="flex-1 bg-white shadow-md rounded-lg p-6 md:ml-6">
        <h2 className="text-2xl font-semibold">Account Setting</h2>
        <Formik
          initialValues={{
            firstName: admin?.firstName || '',
            lastName: admin?.lastName || '',
            email: admin?.email || '',
            phoneNumber: admin?.phoneNumber || '',
            bio: admin?.bio || '',
            profileImage:admin?.profileImage||""
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ handleChange, values, errors, touched,resetForm  }) => (
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
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
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
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
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
  
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
<<<<<<< HEAD


              
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
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
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
                <ErrorMessage name="bio" component="div" className="text-red-500 text-sm" />
              </div>
=======
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
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
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
                <ErrorMessage name="bio" component="div" className="text-red-500 text-sm" />
              </div>
>>>>>>> 0e7888464bd06148eee8a0fd7563175062a8f8d6
              <div className="flex space-x-4">
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">
                  Update
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
}

