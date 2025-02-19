"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Camera } from "lucide-react";
import Image from "next/image";
import { Country, State, City } from "country-state-city";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import api from "@/utils/api";
const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [pincode, setPincode] = useState("");

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Company Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number")
      .required("Mobile Number is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .positive("Age must be a positive number")
      .integer("Age must be an integer")
      .required("Age is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    IndustryType: Yup.string().required("Industry Type is required"),
  
    // ✅ Corrected address validation (Nested Object)
    address: Yup.object().shape({
      landmark: Yup.string().required("Landmark is required"),
      country: Yup.string().required("Country is required"),
      state: Yup.string().required("State is required"),
      city: Yup.string().required("City is required"),
      pincode: Yup.string()
        .matches(/^[0-9]{6}$/, "Invalid Pincode")
        .required("Pincode is required"),
    }),
  });
  
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (values:any) => {
    try {
      // Spread form data and add the profile image (logo)
     const formData = new FormData();
// Object.entries(values).forEach(([key, value]) => {
//   if (key === "address") {
//     Object.entries(value).forEach(([subKey, subValue]) => {
//       formData.append(`address[${subKey}]`, subValue);
//     });
//   } else {
//     formData.append(key, value);
//   }
// });

// // Append image file
//  formData.append("logo", previewImage);

  
      // Send a POST request to your backend API
      const response = await api.post('/company/final-register', formData);  
  
      // Handle success
      console.log('Registration successful:', response.data);
      alert('Registration successful');
    } catch (error) {
      // Handle error
      console.error('Error during registration:', error);
      alert('Error during registration. Please try again later.');
    }
  };
  

  return (
    <div className=" min-h-screen p-4 flex items-center justify-center">
      <div className="w-full mx-auto max-w-screen-lg rounded-xl  p-4 md:p-6 ">
        <div className="flex justify-center">
          <label className="relative cursor-pointer">
            <div className="w-24 h-24 md:w-28 md:h-28 mb-6 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden group hover:bg-gray-200 transition-colors">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                  width={300}
                  height={300}
                />
              ) : (
                <Camera className="w-8 h-8 md:w-10  md:h-10 text-gray-400 group-hover:text-gray-500" />
              )}
              <div className="absolute inset-0 mb-6 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all flex items-center justify-center">
                <Camera className="w-8 h-8 md:w-10  md:h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            contact: "",
            age: "",
            password: "",
            cpassword: "",
            IndustryType: "",
            address: {
              landmark: "",
              country: "",
              state: "",
              city: "",
              pincode: "",
            },
          }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ values, isSubmitting,setFieldValue  }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    placeholder="company name"
                    name="name"
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="email"
                    placeholder="email@gmail.com"
                    name="email"
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <select className="p-2.5 border rounded-lg rounded-r-none border-r-0 focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base min-w-[4rem]">
                      <option>IN</option>
                    </select>
                    <Field
                      type="tel"
                      placeholder="00000 00000"
                      name="contact"
                      className="w-full p-2.5 border rounded-lg rounded-l-none focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                    />
                  </div>
                  <ErrorMessage
                    name="contact"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Age of the company (Year){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="number"
                    placeholder="5"
                    name="age"
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••"
                      name="password"
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                      
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••"
                       name="cpassword"
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                     
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                    <ErrorMessage
                      name="cpassword"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Industry Type <span className="text-red-500">*</span>
                  </label>
                  <Field
                  as="select"
                    name="IndustryType"
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                    value={values.IndustryType || ""}
                    onChange={(e) => {
                      setFieldValue("IndustryType",e.target.value);
                    }}
                  >
                     <option value=""></option>
                    <option value="IT">IT</option>
                    <option></option>

                  </Field>
                  <ErrorMessage
                    name="IndustryType"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Landmark <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="address.landmark"
                    type="text"
                    placeholder="landmark"
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                  />
                  <ErrorMessage
                    name="address.landmark"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Country Dropdown */}
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-700">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <Field
                    as="select"
                      name="address.country"
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                      value={values.address.country || ""}
                      onChange={(e) => {
                        setFieldValue("address.country",e.target.value);
                      }}
                    >
                      <option value="">Select Country</option>
                      {Country.getAllCountries().map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                          {country.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="address.country"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* State Dropdown */}
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-700">
                      State <span className="text-red-500">*</span>
                    </label>
                    <Field
                    as="select"
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                      value={values.address.state || ""}
                      onChange={(e) => {
                        setFieldValue("address.state", e.target.value);
                      }}
                      name="state"
                      
                    >
                      <option value="">Select State</option>
                      {values.address.country &&
                        State.getStatesOfCountry(values.address.country)?.map(
                          (state) => (
                            <option key={state.isoCode} value={state.isoCode}>
                              {state.name}
                            </option>
                          )
                        )}
                    </Field>
                    <ErrorMessage
                      name="address.state"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* City Dropdown */}
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Field
                    as="select"
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                      value={values.address.city || ""}

                      onChange={(e) => setFieldValue("address.city", e.target.value)}
                     
                      name="city"
                    >
                      <option value="">Select City</option>
                      {values.address.state &&
                        City.getCitiesOfState(
                          values.address.country,
                          values.address.state
                        )?.map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                    </Field>
                    <ErrorMessage
                      name="address.city"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Pincode Input */}
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-700">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="number"
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                      placeholder="Enter Pincode"
                      name="address.pincode"
                    />
                    <ErrorMessage
                      name="address.pincode"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 transition-colors text-sm md:text-base font-medium"
                
              >
                 {isSubmitting ? "Submitting..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
