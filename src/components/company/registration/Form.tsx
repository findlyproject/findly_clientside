"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Camera } from "lucide-react";
import { Country, State, City } from "country-state-city";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import api from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
const RegistrationForm = () => {
  const searchParams = useSearchParams();
  const Email = searchParams.get("email");
  const Name = searchParams.get("name");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]; // Get the first file
  if (file) {
    const imageUrl = URL.createObjectURL(file); // Convert File to URL
    setPreviewImage(imageUrl);
  }
};

  const router = useRouter();

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
    logo: Yup.mixed()
    .required("Company logo is required")
    .test("fileType", "Only image files are allowed", (value) => {
      return value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
    }),
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

  
  

  const handleSubmit = async (values) => {
    console.log("first")
    try {
    
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        console.log(key, value);
        if (key === "address" && typeof value === "object" && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            formData.append(`address[${subKey}]`, subValue);
          });
        } else {
          formData.append(key, value);
        }
      });

      if (previewImage instanceof File) {
        formData.append("logo", previewImage);
      } else {
        console.warn("Invalid file: previewImage is not a File object");
      }

      const response = await api.post("/company/final-register", formData);
if(response.status==201){
      // Handle success
      console.log("Registration successful:", response.data);
      toast.success("Registration successful");
      router.push("/company/home");
}

    } catch (error) {
      // Handle error
      console.error("Error during registration:", error);
      alert("Error during registration. Please try again later.");
    }
  };

  return (
    <div className=" min-h-screen p-4 flex items-center justify-center">
      <div className="w-full mx-auto max-w-screen-lg rounded-xl  p-4 md:p-6 ">
        <div className="flex justify-center">
          <label className="relative cursor-pointer">
            <div className="w-24 h-24 md:w-28 md:h-28 mb-6 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden group hover:bg-gray-200 transition-colors">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profilepreview"
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
            name: Name,
            email: Email,
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
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
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
                      setFieldValue("IndustryType", e.target.value);
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
                        setFieldValue("address.country", e.target.value);
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
                      onChange={(e) =>
                        setFieldValue("address.city", e.target.value)
                      }
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
                disabled={isSubmitting}
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

// "use client";
// import React, { useState } from "react";
// import { Eye, EyeOff, Camera } from "lucide-react";
// import Image from "next/image";
// import { Country, State, City } from "country-state-city";
// import { Formik, Form, ErrorMessage, Field } from "formik";
// import * as Yup from "yup";
// import api from "@/utils/api";
// import { useRouter } from "next/navigation";
// const RegistrationForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [previewImage, setPreviewImage] = useState<File>();
//   const router = useRouter();

//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required("Company Name is required"),
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),
//     contact: Yup.string()
//       .matches(/^[0-9]{10}$/, "Invalid mobile number")
//       .required("Mobile Number is required"),
//     age: Yup.number()
//       .typeError("Age must be a number")
//       .positive("Age must be a positive number")
//       .integer("Age must be an integer")
//       .required("Age is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//     cpassword: Yup.string()
//       .oneOf([Yup.ref("password"), null], "Passwords must match")
//       .required("Confirm Password is required"),
//     IndustryType: Yup.string().required("Industry Type is required"),
//     address: Yup.object().shape({
//       landmark: Yup.string().required("Landmark is required"),
//       country: Yup.string().required("Country is required"),
//       state: Yup.string().required("State is required"),
//       city: Yup.string().required("City is required"),
//       pincode: Yup.string()
//         .matches(/^[0-9]{6}$/, "Invalid Pincode")
//         .required("Pincode is required"),
//     }),
//   });

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPreviewImage(file);
//     }
//   };

//   const handleFormSubmit = async (values: any) => {
//     try {
//       const formData = new FormData();

//       Object.entries(values).forEach(([key, value]) => {
//         console.log(key, value);
//         router.push("/home");
//         if (key === "address" && typeof value === "object" && value !== null) {
//           Object.entries(value).forEach(([subKey, subValue]) => {
//             formData.append(`address[${subKey}]`, subValue);
//           });
//         } else {
//           formData.append(key, value);
//         }
//       });

//       if (previewImage instanceof File) {
//         formData.append("logo", previewImage);
//       } else {
//         console.warn("Invalid file: previewImage is not a File object");
//       }

//       const response = await api.post("/company/final-register", formData);

//       // Handle success
//       console.log("Registration successful:", response.data);
//       alert("Registration successful");
//     } catch (error) {
//       // Handle error
//       console.error("Error during registration:", error);
//       alert("Error during registration. Please try again later.");
//     }
//   };

//   return (
//     <div className=" min-h-screen p-4 flex items-center justify-center">
//       <div className="w-full mx-auto max-w-screen-lg rounded-xl  p-4 md:p-6 ">
//         <div className="flex justify-center">
//           <label className="relative cursor-pointer">
//             <div className="w-24 h-24 md:w-28 md:h-28 mb-6 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden group hover:bg-gray-200 transition-colors">
//               {previewImage ? (
//                 <img
//                   src={previewImage||"data:image/jpeg;base64,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"}
//                   alt="Profile preview"
//                   className="w-full h-full object-cover"
               
//                 />
//               ) : (
//                 <Camera className="w-8 h-8 md:w-10  md:h-10 text-gray-400 group-hover:text-gray-500" />
//               )}
//               <div className="absolute inset-0 mb-6 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all flex items-center justify-center">
//                 <Camera className="w-8 h-8 md:w-10  md:h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
//               </div>
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//             />
//           </label>
//         </div>
//         <Formik
//           initialValues={{
//             name: "",
//             email: "",
//             contact: "",
//             age: "",
//             password: "",
//             cpassword: "",
//             IndustryType: "",
//             address: {
//               landmark: "",
//               country: "",
//               state: "",
//               city: "",
//               pincode: "",
//             },
//           }}
//           validationSchema={validationSchema}
//           onSubmit={handleFormSubmit}
//         >
//           {({ values, isSubmitting, setFieldValue }) => (
//             <Form className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="block text-sm text-gray-700">
//                     Company Name <span className="text-red-500">*</span>
//                   </label>
//                   <Field
//                     type="text"
//                     placeholder="company name"
//                     name="name"
//                     className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
//                   />
//                   <ErrorMessage
//                     name="name"
//                     component="div"
//                     className="text-red-500 text-sm"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm text-gray-700">
//                     Email <span className="text-red-500">*</span>
//                   </label>
//                   <Field
//                     type="email"
//                     placeholder="email@gmail.com"
//                     name="email"
//                     className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
//                   />
//                   <ErrorMessage
//                     name="email"
//                     component="div"
//                     className="text-red-500 text-sm"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="block text-sm text-gray-700">
//                     Mobile Number <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex">
//                     <select className="p-2.5 border rounded-lg rounded-r-none border-r-0 focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base min-w-[4rem]">
//                       <option>IN</option>
//                     </select>
//                     <Field
//                       type="tel"
//                       placeholder="00000 00000"
//                       name="contact"
//                       className="w-full p-2.5 border rounded-lg rounded-l-none focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
//                     />
//                   </div>
//                   <ErrorMessage
//                     name="contact"
//                     component="div"
//                     className="text-red-500 text-sm"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="block text-sm text-gray-700">
//                     Age of the company (Year){" "}
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <Field
//                     type="number"
//                     placeholder="5"
//                     name="age"
//                     className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
//                   />
//                   <ErrorMessage
//                     name="age"
//                     component="div"
//                     className="text-red-500 text-sm"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="block text-sm text-gray-700">
//                     Password <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <Field
//                       type={showPassword ? "text" : "password"}
//                       placeholder="••••••"
//                       name="password"
//                       className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
//                     >
//                       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                     </button>
//                     <ErrorMessage
//                       name="password"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm text-gray-700">
//                     Confirm Password <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <Field
//                       type={showConfirmPassword ? "text" : "password"}
//                       placeholder="••••••"
//                       name="cpassword"
//                       className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowConfirmPassword(!showConfirmPassword)
//                       }
//                       className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff size={20} />
//                       ) : (
//                         <Eye size={20} />
//                       )}
//                     </button>
//                     <ErrorMessage
//                       name="cpassword"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="block text-sm text-gray-700">
//                     Industry Type <span className="text-red-500">*</span>
//                   </label>
//                   <Field
//                     as="select"
//                     name="IndustryType"
//                     className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
//                     value={values.IndustryType || ""}
//                     onChange={(e) => {
//                       setFieldValue("IndustryType", e.target.value);
//                     }}
//                   >
//                     <option value=""></option>
//                     <option value="IT">IT</option>
//                     <option></option>
//                   </Field>
//                   <ErrorMessage
//                     name="IndustryType"
//                     component="div"
//                     className="text-red-500 text-sm"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm text-gray-700">
//                     Landmark <span className="text-red-500">*</span>
//                   </label>
//                   <Field
//                     name="address.landmark"
//                     type="text"
//                     placeholder="landmark"
//                     className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
//                   />
//                   <ErrorMessage
//                     name="address.landmark"
//                     component="div"
//                     className="text-red-500 text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Country Dropdown */}
//                   <div className="space-y-2">
//                     <label className="block text-sm text-gray-700">
//                       Country <span className="text-red-500">*</span>
//                     </label>
//                     <Field
//                       as="select"
//                       name="address.country"
//                       className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
//                       value={values.address.country || ""}
//                       onChange={(e) => {
//                         setFieldValue("address.country", e.target.value);
//                       }}
//                     >
//                       <option value="">Select Country</option>
//                       {Country.getAllCountries().map((country) => (
//                         <option key={country.isoCode} value={country.isoCode}>
//                           {country.name}
//                         </option>
//                       ))}
//                     </Field>
//                     <ErrorMessage
//                       name="address.country"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </div>

//                   {/* State Dropdown */}
//                   <div className="space-y-2">
//                     <label className="block text-sm text-gray-700">
//                       State <span className="text-red-500">*</span>
//                     </label>
//                     <Field
//                       as="select"
//                       className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
//                       value={values.address.state || ""}
//                       onChange={(e) => {
//                         setFieldValue("address.state", e.target.value);
//                       }}
//                       name="state"
//                     >
//                       <option value="">Select State</option>
//                       {values.address.country &&
//                         State.getStatesOfCountry(values.address.country)?.map(
//                           (state) => (
//                             <option key={state.isoCode} value={state.isoCode}>
//                               {state.name}
//                             </option>
//                           )
//                         )}
//                     </Field>
//                     <ErrorMessage
//                       name="address.state"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* City Dropdown */}
//                   <div className="space-y-2">
//                     <label className="block text-sm text-gray-700">
//                       City <span className="text-red-500">*</span>
//                     </label>
//                     <Field
//                       as="select"
//                       className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
//                       value={values.address.city || ""}
//                       onChange={(e) =>
//                         setFieldValue("address.city", e.target.value)
//                       }
//                       name="city"
//                     >
//                       <option value="">Select City</option>
//                       {values.address.state &&
//                         City.getCitiesOfState(
//                           values.address.country,
//                           values.address.state
//                         )?.map((city) => (
//                           <option key={city.name} value={city.name}>
//                             {city.name}
//                           </option>
//                         ))}
//                     </Field>
//                     <ErrorMessage
//                       name="address.city"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </div>

//                   {/* Pincode Input */}
//                   <div className="space-y-2">
//                     <label className="block text-sm text-gray-700">
//                       Pincode <span className="text-red-500">*</span>
//                     </label>
//                     <Field
//                       type="number"
//                       className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
//                       placeholder="Enter Pincode"
//                       name="address.pincode"
//                     />
//                     <ErrorMessage
//                       name="address.pincode"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 transition-colors text-sm md:text-base font-medium"
//               >
//                 {isSubmitting ? "Submitting..." : "Register"}
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;