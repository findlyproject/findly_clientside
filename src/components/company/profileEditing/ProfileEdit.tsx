"use client";

import { useEffect, useState } from "react";

import { IoMdAdd } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import api from "@/utils/api";
import { RxCross2 } from "react-icons/rx";
import { User } from "@/types/Types";
import { editContact, editProfile, uploadBanner, uploadLogo } from "@/lib/store/features/actions/companyActions";
import HeaderProfile from "./Header";
import { IoIosSave } from "react-icons/io";
export default function ProfileEdit() {

  const [loading, setLoading] = useState(false)
  const activecompany = useAppSelector(
    (state) => state.companyLogin.activeCompany
  );
  console.log("activecompany", activecompany);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(
    activecompany?.logo || "/default-profile.png"
  );

  const [selectedBanner, setSelectedBanner] = useState<File | null>(null);
  const [bannerPreview, setbannerPreview] = useState(
    activecompany?.banner || "/default-profile.png"
  );

  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState<User[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [positions, setPosition] = useState({
    employee: "",
    position: "",
  });
  const [services, setServices] = useState(activecompany?.services);
const [serviceInput, setServiceInput] = useState("");

  const [contact, setContact] = useState({
    stats: false,
    name: ""
  })




  useEffect(() => {
    const fetch = async () => {
      if (searchQuery.length > 0) {
        const res = await api.get(`/company/users?query=${searchQuery}`);
        setEmployees(res.data.users || []);
        setShowDropdown(true);
      } else {
        setEmployees([]);
        setShowDropdown(false);
      }
    };
    fetch();
  }, [searchQuery]);

const serviceValidation=Yup.object().shape({
  services: Yup.array()
    .of(Yup.string().required("Service cannot be empty")) 
    .min(1, "At least one service is required"),
})

  const contactValidation=Yup.object().shape({
    name: Yup.string().required("Company Name is required"),
    phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(10, "Phone number must be at least 10 digits"),
    founder: Yup.string().required("founder is required"),
    email: Yup.string().required("email is required"),
  })

  const aboutVlidation = Yup.object().shape({
    // name: Yup.string().required("Company Name is required"),
    // contact: Yup.string()
    //   .matches(/^[0-9]{10}$/, "Invalid mobile number")
    //   .required("Mobile Number is required"),
    about: Yup.string().required("bio is required"),
    // founder: Yup.string().required("founder is required"),
    // email: Yup.string().required("email is required"),
    // foundedAt: Yup.string().required("founded at is required"),
    // services: Yup.string().required("Services are required"),

    // workHours: Yup.object()
    //   .shape({
    //     start: Yup.string().required("Start time is required"),
    //     end: Yup.string().required("End time is required"),
    //   })
    //   .required("Work hours are required"),
    // socialMedia: Yup.object().shape({
    //   facebook: Yup.string().url("Invalid Facebook URL"),
    //   instagram: Yup.string().url("Invalid Instagram URL"),
    //   twitter: Yup.string().url("Invalid Twitter URL"),
    //   linkedin: Yup.string().url("Invalid LinkedIn URL"),
    // }),
    // employees: Yup.array()
    //   .of(
    //     Yup.object().shape({
    //       employee: Yup.string().required("Employee name is required"),
    //       position: Yup.string().required("Position is required"),
    //     })
    //   )
    //   .min(1, "At least one employee is required"),

    // IndustryType: Yup.string().required("Industry Type is required"),
    // address: Yup.object().shape({
    //   landmark: Yup.string().required("Landmark is required"),
    //   country: Yup.string().required("Country is required"),
    //   state: Yup.string().required("State is required"),
    //   city: Yup.string().required("City is required"),
    //   pincode: Yup.string()
    //     .matches(/^[0-9]{6}$/, "Invalid Pincode")
    //     .required("Pincode is required"),
    // }),
  });
  console.log("selectedemployeee", selectedEmployee);
  console.log("position", positions);

  const position = [
    { id: 1, name: "Chief Executive Officer" },
    { id: 2, name: "Chief Operating Officer" },
    { id: 3, name: "Chief Technology Officer" },
    { id: 4, name: "Chief Financial Officer" },
    { id: 5, name: "Chief Marketing Officer" },
    { id: 6, name: "Director of Operations" },
    { id: 7, name: "General Manager" },
    { id: 8, name: "General Manager" },
    { id: 9, name: "Team Lead" },
  ];
  const industryTypes = [
    { id: 1, name: "Information Technology" },
    { id: 2, name: "Finance & Banking" },
    { id: 3, name: "Healthcare & Pharmaceuticals" },
    { id: 4, name: "Education & E-Learning" },
    { id: 5, name: "Manufacturing" },
    { id: 6, name: "Retail & E-commerce" },
    { id: 7, name: "Real Estate & Construction" },
    { id: 8, name: "Telecommunications" },
    { id: 9, name: "Automobile & Transportation" },
    { id: 10, name: "Energy & Utilities" },
    { id: 11, name: "Hospitality & Tourism" },
    { id: 12, name: "Media & Entertainment" },
    { id: 13, name: "Legal & Consulting" },
    { id: 14, name: "Agriculture & Farming" },
    { id: 15, name: "Aerospace & Defense" },
    { id: 16, name: "Biotechnology" },
    { id: 17, name: "Fashion & Apparel" },
    { id: 18, name: "Food & Beverage" },
    { id: 19, name: "Government & Public Administration" },
    { id: 20, name: "Marketing & Advertising" },
    { id: 21, name: "Non-Profit & Social Services" },
    { id: 22, name: "Sports & Fitness" },
    { id: 23, name: "Supply Chain & Logistics" },
  ];

  console.log("activecompany", activecompany);


  const handleSubmit = async (values: any) => {

    const companyId = activecompany?._id
    const result = await dispatch(editProfile({ companyId, values }))
    if (result.type === "edit/profile/fulfilled") {
      

    }
  };

  const handleContactSubmit = async (event: React.FormEvent, values: any) => {
    event.preventDefault(); // Prevent default form submission
    event.stopPropagation(); // Stop event propagation
  
    console.log("hetetrrrrrrrrrrrrrrrrrr",values);
    
    const companyId = activecompany?._id
    const result=await dispatch(editContact({companyId,values }))
    if (result.type === "edit/contact/fulfilled") {
      console.log("editedcontact",result);

    }

  }

  const handleServicesSubmit=(values)=>{
        console.log("serviiiiii",values);
        
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
     
    }
  };


  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    

    if (file) {
      setSelectedBanner(file);
      setbannerPreview(URL.createObjectURL(file));
      console.log("File selected:", file);
    }
  };



  const handleUpload = async () => {
    
    if (!selectedFile) return;
    setLoading(true)



    const formData = new FormData();
    formData.append("logo", selectedFile);

    try {
      const companyId = activecompany?._id
      const result = await dispatch(uploadLogo({ companyId, formData }))
      if (result.type === "upload/profile/logo/fulfilled") {
        setSelectedFile(null);
        setLoading(false)
      }

    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };

  const handlebannerUpload = async () => {
    if (!selectedBanner) return;
    setLoading(true)
    const formData = new FormData();
    formData.append("banner", selectedBanner);

    try {
      const companyId = activecompany?._id
      const result = await dispatch(uploadBanner({ companyId, formData }))
      if (result.type === "upload/profile/banner/fulfilled") {
        setSelectedBanner(null);
        setLoading(false)
      }

    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };

  const handleAddService = (event) => {
    event.stopPropagation();
    if (serviceInput.trim() !== "") {
      setServices([...services, serviceInput]); // Add service to state
      setServiceInput(""); // Clear input field
    }
  };

  const handleDeleteService = (index: number) => {
    setServices((prevServices) => prevServices.filter((_, i) => i !== index));
  };




  return (
    <>
      <div className="flex flex-col items-center  justify-center lg:flex-row min-h-screen p-6  bg-white pt-36">
        <section className="flex flex-col p-10  rounded-lg shadow-[1px_0px_10px_4px_rgba(0,0,0,0.8)] mt-6 lg:mt-0 lg:ml-6 w-4/5">


          <HeaderProfile handlebannerUpload={handlebannerUpload} loading={loading} handleUpload={handleUpload} activecompany={activecompany} selectedFile={selectedFile} handleFileChange={handleFileChange} bannerPreview={bannerPreview} handleBannerChange={handleBannerChange} selectedBanner={selectedBanner} preview={preview} />



          <Formik
            initialValues={{
              // name: activecompany?.name || "",
              // contact: activecompany?.contact,
              // founder: activecompany?.founder || "",
              // foundedAt: activecompany?.foundedAt || "",
              about: activecompany?.about || "",
              // email: activecompany?.email || "",

              // workHours: {
              //   start: activecompany?.workHours?.start || "",
              //   end: activecompany?.workHours?.end || "",
              // },
              // services: [],
              // IndustryType: activecompany?.IndustryType || "",
              // address: {
              //   landmark: activecompany?.address.landmark || "",
              //   country: activecompany?.address.country || "",
              //   state: activecompany?.address.state || "",
              //   city: activecompany?.address.city || "",
              //   pincode: activecompany?.address.pincode || "",
              // },
              // socialMedia: {
              //   facebook: activecompany?.socialMedia?.facebook || "",
              //   instagram: activecompany?.socialMedia?.instagram || "",
              //   twitter: activecompany?.socialMedia?.twitter || "",
              //   linkedin: activecompany?.socialMedia?.linkedin || "",
              // },

              // employees: activecompany?.employees || [],
            }}
            validationSchema={aboutVlidation}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty, values, handleChange, isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="mt-6 space-y-4  ">
                  <div className="bg-gray-200 rounded-xl  p-5 flex flex-col items-end" >
                    {/* about section */}
                    <div className="flex w-full justify-between items-start p-2">
                      <h2 className="mb-5">About</h2>
                      {
                        contact.stats && contact.name === "about" ? (
                          <div className="flex items-center space-x-5">


                            <button
                              type="submit"
                              className="w-full  text-black p-2 text-2xl rounded-md h-10 font-medium"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Submitting..." : <IoIosSave />}
                            </button>
                            <button
                              onClick={() => setContact(prev => ({ ...prev, stats: false, name: "" }))}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
                              </svg>
                            </button>

                          </div>
                        ) : (
                          <button
                            onClick={() => setContact(prev => ({ ...prev, stats: true, name: "about" }))}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-5">
                              <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                              <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
                            </svg>
                          </button>
                        )
                      }
                    </div>
                    {
                      contact.stats && contact.name === "about" ? (
                        <div className="w-full h-full">
                          <Field
                            as="textarea"
                            onChange={handleChange}
                            className="w-full h-44 border p-2 rounded-md"
                            name="about"
                          />
                          <ErrorMessage
                            name="about"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      ) : (
                        <div>
                          <span>{values.about} </span>
                        </div>
                      )
                    }
                  </div>
                  {/* <span className="text-sm font-medium">
                    Social media profiles
                  </span> */}

                  {/* <div className="flex gap-4 items-end">
                    {["facebook", "instagram", "linkedin", "twitter"].map(
                      (platform) => (
                        <div key={platform} className="w-1/4 flex flex-col">
                          <label className="text-sm  capitalize">
                            {platform} *
                          </label>
                          <Field
                            type="text"
                            name={`socialMedia.${platform}`}
                            value={
                              values.socialMedia[
                              platform as keyof typeof values.socialMedia
                              ]
                            }
                            onChange={(
                              e: React.ChangeEvent<HTMLSelectElement>
                            ) =>
                              setFieldValue(
                                `socialMedia.${platform}`,
                                e.target.value
                              )
                            }
                            className="w-full border p-2 rounded-md h-10"
                          />
                          <ErrorMessage
                            name="socialMeadia[platform]"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      )
                    )}
                  </div> */}
                </div>
              </Form>
            )}
          </Formik>

          <Formik
            initialValues={{
              name: activecompany?.name || "",
              contact: undefined,
              founder: activecompany?.founder || "",
              email: activecompany?.email || "",

             
            }}
            validationSchema={contactValidation}
            onSubmit={handleContactSubmit}
          >
            {({ isValid, dirty, values, handleChange, isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="mt-6 space-y-4  ">
                  
<div className="flex justify-center">
{/* contact section */}
<div className="flex flex-col items-start w-full justify-center rounded-xl bg-gray-200">
  <div className="flex justify-between w-full p-5  font-bold"><h2 className="text-start text-xl">Contacts</h2>
    {
      contact.stats && contact.name === "contact" ? (
        <div className="flex items-center ">

          <button
            type="submit"
            className="w-full  text-black p-2 text-2xl rounded-md h-10 font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : <IoIosSave />}
          </button>
          <button
            onClick={() => setContact(prev => ({ ...prev, stats: false, name: "" }))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
            </svg>

          </button>
        </div>
      ) : (
        <button
          onClick={() => setContact(prev => ({ ...prev, stats: true, name: "contact" }))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-5">
            <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
            <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
          </svg>
        </button>
      )
    }
  </div>



  <div className="p-5 flex  w-full justify-start rounded-lg">
    {
      contact.stats && contact.name === "contact" ? (

        <div className=" gap-4 space-y-4 w-full ">
          <div className="w-full flex items-center ">
            <label className="text-md font-medium bg-white w-2/6 h-10  rounded-xl p-2 space-y-4">Name Of Company:</label>

            <Field
              type="text"
              onChange={handleChange}
              className="w-4/6 ms-3 rounded-xl border p-2 "
              name="name"
              placeholder="Enter name.."
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="w-full flex items-center ">
            <label className="text-md font-medium h-10 bg-white w-2/6  rounded-xl p-2 space-y-4">Contact Number:</label>
            <div className="bg-red-700 w-4/6 ms-3">


              <PhoneInput
                country={"in"}
                value={values.contact ||""}
                onChange={(phone) => {
                  console.log("phone", phone); // Debugging log
                  setFieldValue("contact", phone || ""); // Ensure it's always a string
                }}
                inputProps={{
                  name: "contact",
                  required: true,
                  className: "w-full ms-3 rounded-xl border ps-5 p-2",
                }}
              />
              <ErrorMessage
              name="contact"
              component="div"
              className="text-red-500 text-sm"
            />
            </div>
          </div>
          <div className="w-full flex items-center">
            <label className="text-md font-medium h-10 bg-white w-2/6  rounded-xl p-2 space-y-4">Email:</label>
            <Field
              type="email"
              onChange={handleChange}
              className="w-4/6 ms-3 rounded-xl border p-2 "
              name="email"
              placeholder="Enter Email.."
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="w-full flex items-center">
            <label className="text-md font-medium h-10 bg-white w-2/6  rounded-xl p-2 space-y-4">Founder Of Company:</label>
            <Field
              type="text"
              onChange={handleChange}
              className="w-4/6 ms-3 rounded-xl border p-2"
              name="founder"
            />
            <ErrorMessage
              name="founder"
              component="div"
              className="text-red-500 text-sm"
            />

           
          </div>
        </div>
      ) : (
        <div className=" gap-4 space-y-4 w-full ">
          <div className="w-full flex items-center ">
            <label className="text-md font-medium bg-white w-2/6 h-10  rounded-xl p-2 space-y-4">Name Of Company:</label>
            <span className="text-md font-medium italic h-10 rounded-xl p-2  ms-3 bg-white w-4/6 space-y-4">{activecompany?.name || "Not update yet"}</span>
          </div>
          <div className="w-full flex items-center ">
            <label className="text-md font-medium h-10 bg-white w-2/6  rounded-xl p-2 space-y-4">Contact Number:</label>
            <span className="text-md font-medium italic h-10 bg-white w-4/6 ms-3  rounded-xl p-2 space-y-4">{activecompany?.contact || "Not update yet"}</span>
          </div>
          <div className="w-full flex items-center">
            <label className="text-md font-medium h-10 bg-white w-2/6  rounded-xl p-2 space-y-4">Email:</label>
            <span className="text-md font-medium italic h-10 bg-white w-4/6 ms-3  rounded-xl p-2 space-y-4">{activecompany?.email || "N/Not update yet"}</span>
          </div>
          <div className="w-full flex items-center">
            <label className="text-md font-medium h-10 bg-white w-2/6  rounded-xl p-2 space-y-4">Founder Of Company:</label>
            <span className="text-md font-medium italic h-10 bg-white w-4/6 ms-3  rounded-xl p-2 space-y-4">{activecompany?.founder || "N/Not update yet"}</span>
          </div>
        </div>
      )
    }
  </div>



</div>
</div>

                </div>
              </Form>
            )}
          </Formik>



          <Formik
            initialValues={{
              // name: activecompany?.name || "",
              // contact: activecompany?.contact,
              // founder: activecompany?.founder || "",
              // foundedAt: activecompany?.foundedAt || "",
              about: activecompany?.about || "",
              // email: activecompany?.email || "",

              // workHours: {
              //   start: activecompany?.workHours?.start || "",
              //   end: activecompany?.workHours?.end || "",
              // },
              // services: [],
              // IndustryType: activecompany?.IndustryType || "",
              // address: {
              //   landmark: activecompany?.address.landmark || "",
              //   country: activecompany?.address.country || "",
              //   state: activecompany?.address.state || "",
              //   city: activecompany?.address.city || "",
              //   pincode: activecompany?.address.pincode || "",
              // },
              // socialMedia: {
              //   facebook: activecompany?.socialMedia?.facebook || "",
              //   instagram: activecompany?.socialMedia?.instagram || "",
              //   twitter: activecompany?.socialMedia?.twitter || "",
              //   linkedin: activecompany?.socialMedia?.linkedin || "",
              // },

              // employees: activecompany?.employees || [],
            }}
            validationSchema={aboutVlidation}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty, values, handleChange, isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="mt-6 space-y-4  ">
                  <div className="bg-gray-200 rounded-xl  p-5 flex flex-col items-end" >
                    {/* about section */}
                    <div className="flex w-full justify-between items-start p-2">
                      <h2 className="mb-5">About</h2>
                      {
                        contact.stats && contact.name === "about" ? (
                          <div className="flex items-center space-x-5">


                            <button
                              type="submit"
                              className="w-full  text-black p-2 text-2xl rounded-md h-10 font-medium"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Submitting..." : <IoIosSave />}
                            </button>
                            <button
                              onClick={() => setContact(prev => ({ ...prev, stats: false, name: "" }))}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
                              </svg>
                            </button>

                          </div>
                        ) : (
                          <button
                            onClick={() => setContact(prev => ({ ...prev, stats: true, name: "about" }))}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-5">
                              <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                              <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
                            </svg>
                          </button>
                        )
                      }
                    </div>
                    {
                      contact.stats && contact.name === "about" ? (
                        <div className="w-full h-full">
                          <Field
                            as="textarea"
                            onChange={handleChange}
                            className="w-full h-44 border p-2 rounded-md"
                            name="about"
                          />
                          <ErrorMessage
                            name="about"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      ) : (
                        <div>
                          <span>{values.about} </span>
                        </div>
                      )
                    }
                  </div>
                  {/* <span className="text-sm font-medium">
                    Social media profiles
                  </span> */}

                  {/* <div className="flex gap-4 items-end">
                    {["facebook", "instagram", "linkedin", "twitter"].map(
                      (platform) => (
                        <div key={platform} className="w-1/4 flex flex-col">
                          <label className="text-sm  capitalize">
                            {platform} *
                          </label>
                          <Field
                            type="text"
                            name={`socialMedia.${platform}`}
                            value={
                              values.socialMedia[
                              platform as keyof typeof values.socialMedia
                              ]
                            }
                            onChange={(
                              e: React.ChangeEvent<HTMLSelectElement>
                            ) =>
                              setFieldValue(
                                `socialMedia.${platform}`,
                                e.target.value
                              )
                            }
                            className="w-full border p-2 rounded-md h-10"
                          />
                          <ErrorMessage
                            name="socialMeadia[platform]"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      )
                    )}
                  </div> */}
                </div>
              </Form>
            )}
          </Formik>

          <Formik
            initialValues={{ services: [] }}
            validationSchema={serviceValidation}
            onSubmit={handleServicesSubmit}
          >
            {({ isValid, dirty, values, handleChange, isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="mt-6 space-y-4  ">
     

<div className="flex justify-center">
{/* serviece section */}
<div className="flex flex-col items-start w-full justify-center rounded-xl bg-gray-200">
  <div className="flex justify-between w-full p-5  font-bold"><h2 className="text-start text-xl">Services</h2>
    {
      contact.stats && contact.name === "serviece" ? (
        <div className="flex items-center ">

          <button
            type="submit"
            className="w-full  text-black p-2 text-2xl rounded-md h-10 font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : <IoIosSave />}
          </button>
          <button
            onClick={() => setContact(prev => ({ ...prev, stats: false, name: "" }))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
            </svg>

          </button>
        </div>
      ) : (
        <button
          onClick={() => setContact(prev => ({ ...prev, stats: true, name: "serviece" }))}

        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-5">
            <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
            <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
          </svg>
        </button>
      )
    }
  </div>
  <div className="p-5 flex  w-full justify-start rounded-lg">
    <div className=" gap-4 space-y-4 w-full ">
      <div className="w-full flexcflex-col items-center justify-start ">
        {
          contact.stats && contact.name === "serviece" && (
            <div>
              <div className="w-full flex justify-center items-center gap-3">
                <Field
                  type="text"
                  name="services"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  className="w-3/6 border h-12 p-2 rounded-md"
                  placeholder="Enter your services here.."
                />
                 <ErrorMessage
                name="services"
                component="div"
                className="text-red-500 text-sm mt-1 text-center"
              />
                <div className="flex items-center">
                <button
              
              className="bg-primary text-white w-full md:w-auto px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 "
       onClick={handleAddService}
      //  disabled={!isValid || !dirty}
            >
              Add Project
            </button>
                </div>
              </div>
             
            </div>
          )
        }
        <div>
    {services.map((value, index) => (
      <ul key={index} className="flex items-center gap-2">
        <li>{value}</li>
        <button onClick={() => handleDeleteService(index)}>
                    <RxCross2 className="text-red-500 text-xl cursor-pointer hover:text-red-700 transition" />
                  </button>
     
      </ul>
    ))}
  </div>
      </div>
    </div>
  </div>
</div>
</div>

                </div>
              </Form>
            )}
          </Formik>







        </section>
      </div>
    </>
  );
}
