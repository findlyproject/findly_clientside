"use client";

import { useEffect, useState } from "react";



import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import api from "@/utils/api";
import { RxCross2 } from "react-icons/rx";
import { User } from "@/types/Types";
import { editContact, editEmployee, editProfetional, editProfile, editService, editsocialmedia, uploadBanner, uploadLogo } from "@/lib/store/features/actions/companyActions";
import HeaderProfile from "./Header";
import { IoIosSave, IoMdAdd } from "react-icons/io";
import { Spinner } from "flowbite-react";
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

  console.log("positionsadfssssssssssssssssssssssssss",positions);
  

  const [services, setServices] = useState(activecompany?.services || []);

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

  const serviceValidation = Yup.object().shape({
    services: Yup.array()
      .of(Yup.string().required("Service cannot be empty"))
      .min(1, "At least one service is required"),
  })

  const employeeValidation = Yup.object().shape({
  employees: Yup.array()
      .of(
        Yup.object().shape({
          employee: Yup.string().required("Employee name is required"),
          position: Yup.string().required("Position is required"),
        })
      )
      .min(1, "At least one employee is required"),
  })

  const profetionalValidation = Yup.object().shape({
    name: Yup.string().required("Company Name is required"),
    email: Yup.string().required("email is required"),
    address: Yup.object().shape({
      landmark: Yup.string().required("Landmark is required"),
      country: Yup.string().required("Country is required"),
      state: Yup.string().required("State is required"),
      city: Yup.string().required("City is required"),
      pincode: Yup.string()
        .matches(/^[0-9]{6}$/, "Invalid Pincode")
        .required("Pincode is required"),
    }),
  })

  const socialMediaValidation = Yup.object().shape({
    socialMedia: Yup.object().shape({
      facebook: Yup.string().url("Invalid Facebook URL"),
      instagram: Yup.string().url("Invalid Instagram URL"),
      twitter: Yup.string().url("Invalid Twitter URL"),
      linkedin: Yup.string().url("Invalid LinkedIn URL"),
    }),
  })

  const contactValidation = Yup.object().shape({
    name: Yup.string().required("Company Name is required"),
    // phoneNumber: Yup.string()
    // .matches(/^[0-9]+$/, "Phone number must be only digits")
    // .min(10, "Phone number must be at least 10 digits"),
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
    setLoading(true)
    const companyId = activecompany?._id
    const result = await dispatch(editProfile({ companyId, values }))
    if (result.type === "edit/profile/fulfilled") {

      setTimeout(() => {
        setLoading(false)
        setContact(prev => ({ ...prev, stats: false, name: "" }))
      }, 2000)
    }
  };

  const handleContactSubmit = async (values: any) => {

    setLoading(true)

    console.log("hetetrrrrrrrrrrrrrrrrrr", values);

    const companyId = activecompany?._id
    const result = await dispatch(editContact({ companyId, values }))
    if (result.type === "edit/contact/fulfilled") {
      console.log("editedcontact", result);
      setTimeout(() => {
        setLoading(false)
        setContact(prev => ({ ...prev, stats: false, name: "" }))
      }, 2000)
    }

  }

  const handleSocialMediaSubmit = async (values: any) => {

    console.log("www", values);

    const companyId = activecompany?._id
    const result = await dispatch(editsocialmedia({ companyId, values }))
    if (result.type === "edit/contact/fulfilled") {
      console.log("editedcontact", result);

    }

  }

  const handleServicesSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const companyId = activecompany?._id
    console.log("serviiiiii", services);
    const result = await dispatch(editService({ companyId, services }))
    if (result.type === "edit/service/fulfilled") {
      console.log("editedcontact", result);
      setTimeout(() => {
        setLoading(false)
        setContact(prev => ({ ...prev, stats: false, name: "" }))
      }, 2000)
    }

  }

  const handleemployeeSubmit = async (values) => {
    setLoading(true)


    const companyId = activecompany?._id

    console.log("values employeee", values)
    const result = await dispatch(editEmployee({ companyId, values }))
    if (result.type === "edit/employee/fulfilled") {
      console.log("editedcontact", result);
      setTimeout(() => {
        setLoading(false)
        setContact(prev => ({ ...prev, stats: false, name: "" }))
      }, 2000)

    }

  }

  
  const handleProfetionalSubmit = async (values) => {
    setLoading(true)
    const companyId = activecompany?._id

    console.log("valuew", values)
    const result = await dispatch(editProfetional({ companyId, values }))
    if (result.type === "edit/profetional/fulfilled") {
      console.log("editedcontact", result);
      setTimeout(() => {
        setLoading(false)
        setContact(prev => ({ ...prev, stats: false, name: "" }))
      }, 2000)

    }

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
      setServices((prev) => [...prev, serviceInput]);
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
                              {loading && contact.name === "about" ? <Spinner className="text-primary text-xl" /> : <IoIosSave className="text-primary" />}
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
                            className="w-full h-44 border p-2 rounded-md resize-none overflow-hidden"
                            name="about"
                          />
                          <ErrorMessage
                            name="about"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      ) : (


                        <div className="w-full">
                          {
                            (isSubmitting) && (
                              <Spinner />
                            )
                          }<div className="flex justify-start w-full">
                            <span className="w-full break-words whitespace-normal">
                              {values.about}
                            </span>
                          </div>


                        </div>
                      )
                    }
                  </div>

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
                                {loading && contact.name === "contact" ? <Spinner className="text-primary text-xl" /> : <IoIosSave className="text-primary" />}
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
                                    value={values.contact || ""}
                                    onChange={(phone) => {
                                      console.log("phone", phone); 
                                      setFieldValue("contact", phone || ""); 
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
            initialValues={{ services: "" }}
            validationSchema={serviceValidation}
            onSubmit={(values, { setSubmitting }) => {
              // handleServicesSubmit();
              setSubmitting(false);
            }}

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
                                onClick={handleServicesSubmit}
                                disabled={isSubmitting}
                                className="w-full  text-black p-2 text-2xl rounded-md h-10 font-medium"

                              >
                                {loading && contact.name === "serviece" ? <Spinner className="text-primary text-xl" /> : <IoIosSave className="text-primary" />}
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
                      <div className=" flex  w-full justify-start rounded-lg">
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
                                        Add Service
                                      </button>
                                    </div>
                                  </div>

                                </div>
                              )
                            }
                            <div className="p-10 flex justify-center">
                              <ul className="list-none space-y-3 w-full max-w-md"> {/* Controls width of the list */}
                                {services?.map((value, index) => (
                                  <li
                                    key={index}
                                    className={`flex justify-between items-center w-full ${contact.stats && contact.name === "serviece" ? "bg-gray-800 text-white" : "bg-white text-black"}   p-2 rounded-md shadow-md`}
                                  >
                                    <span className="text-md">{value}</span> {/* Service text */}

                                    <button onClick={() => handleDeleteService(index)} className="p-1">
                                      <RxCross2 className="text-red-500 text-lg cursor-pointer hover:text-red-700 transition" />
                                    </button>
                                  </li>
                                ))}
                              </ul>
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



          <Formik
            initialValues={{ employees: activecompany?.employees || [], }}
            // validationSchema={employeeValidation}
            onSubmit={handleemployeeSubmit}
          >
            {({ isValid, dirty, values, handleChange, isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="mt-6 space-y-4  ">


                  <div className="flex justify-center">
                    {/* employees section */}
                    <div className="flex flex-col items-start w-full justify-center rounded-xl bg-gray-200">
                      <div className="flex justify-between w-full p-5  font-bold"><h2 className="text-start text-xl">Add Employees</h2>
                        {
                          contact.stats && contact.name === "employees" ? (
                            <div className="flex items-center ">

                              <button
                                type="submit"
                                className="w-full  text-black p-2 text-2xl rounded-md h-10 font-medium"
                                disabled={isSubmitting}
                              >
                                {loading && contact.name === "employees" ? <Spinner className="text-primary text-xl" /> : <IoIosSave className="text-primary" />}
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
                              onClick={() => setContact(prev => ({ ...prev, stats: true, name: "employees" }))}
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
                              contact.stats && contact.name === "employees" && (


                                <div>

                                  <span className="text-sm font-medium">Add Employees</span>
                                  <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full border p-2 rounded-md pr-8"
                                    placeholder="Search employees..."
                                  />

                                  {/* {showDropdown && employees.length > 0 && (
                                    <div className="absolute w-full bg-white border rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
                                      {employees.map((emp) => (
                                        <div
                                          key={emp?._id}
                                          onClick={() => {
                                            setSelectedEmployee(emp?.firstName);
                                            setPosition((prev) => ({
                                              ...prev,
                                              employee: emp?.firstName,
                                            }));
                                            setSearchQuery("");
                                            setEmployees([]);
                                          }}
                                          className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                                        >
                                          <span>{emp?.firstName}</span>
                                          <span className="text-gray-500 text-sm">
                                            {emp?.email}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  )} */}

{showDropdown && employees.length > 0 && (
  <div className="absolute w-full bg-white border rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
    {employees.map((emp) => (
      <div
        key={emp?._id}
        onClick={() => {
          setSelectedEmployee(emp?.firstName);
          setPosition((prev) => ({
            ...prev,
            employee: emp?.firstName, // Updating employee name
            email: emp?.email, // Adding email
            id: emp?._id, // Storing ID if needed
          }));
          setSearchQuery("");
          setEmployees([]);
        }}
        className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
      >
        <span>{emp?.firstName}</span>
        <span className="text-gray-500 text-sm">{emp?.email}</span>
      </div>
    ))}
  </div>
)}

                                  <div className="flex items-center gap-2">
                                    <div className="flex flex-col w-1/2">
                                      <label className="text-sm">Employee *</label>
                                      <Field
                                        type="text"
                                        value={selectedEmployee}
                                        name="employees.employee"
                                        onChange={(
                                          e: React.ChangeEvent<HTMLSelectElement>
                                        ) =>
                                          setPosition({
                                            ...positions,
                                            employee: e.target.value,
                                          })
                                        }
                                        className="w-full border p-2 rounded-md pr-8"
                                      />
                                      <ErrorMessage
                                        name="employees.employee"
                                        component="div"
                                        className="text-red-500 text-sm"
                                      />
                                    </div>

                                    <div className="flex flex-col w-1/2">
                                      <label className="text-sm">Position *</label>
                                      <Field
                                        as="select"
                                        type="text"
                                        name="employees.position"
                                        className="w-full border p-2 rounded-md pr-8"
                                        value={positions.position || ""}
                                        onChange={(
                                          e: React.ChangeEvent<HTMLSelectElement>
                                        ) =>
                                          setPosition({
                                            ...positions,
                                            position: e.target.value,
                                          })
                                        }
                                      >
                                        <option value=""> choose position</option>
                                        {position.map((type) => (
                                          <option key={type.id} value={type.name}>
                                            {type.name}
                                          </option>
                                        ))}
                                      </Field>

                                      <ErrorMessage
                                        name="employees.position"
                                        component="div"
                                        className="text-red-500 text-sm"
                                      />
                                    </div>

                                    <div className="flex items-center">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (!selectedEmployee || !positions.position) {
                                            alert("Please select an employee and position");
                                            return;
                                          }

                                          setFieldValue("employees", [
                                            ...values.employees,
                                            {
                                              employee: selectedEmployee,
                                              position: positions.position,
                                            },
                                          ]);

                                          setSelectedEmployee("");
                                          setPosition({ employee: "", position: "" });
                                        }}
                                        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                                      >
                                        <IoMdAdd className="text-gray-600 text-xl" />
                                      </button>
                                    </div>
                                  </div>


                                </div>
                              )
                            }

                            <div className="p-10 flex justify-center">
                              <ul className="list-none space-y-3 w-full max-w-md">
                                {values.employees?.map((value, index) => (
                                   <li
                                   key={index}
                                   className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                                 >
                                   <div>
                                     <p className="font-medium">{value.employee.firstName}</p>
                                     <p className="text-sm text-gray-600">{value.position}</p>
                                   </div>
                                   <button
                                     type="button"
                                     onClick={() => {
                                       setFieldValue(
                                         "employees",
                                         values.employees.filter((_, i) => i !== index)
                                       );
                                     }}
                                     className="text-red-500 hover:text-red-700"
                                   >
                                     Remove
                                   </button>
                                 </li>
                                ))}
                              </ul>
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





          <Formik
            initialValues={{
              name: activecompany?.name || "",
              email: activecompany?.email || "",
              address: {
                landmark: activecompany?.address.landmark || "",
                country: activecompany?.address.country || "",
                state: activecompany?.address.state || "",
                city: activecompany?.address.city || "",
                pincode: activecompany?.address.pincode || "",
              },

            }}
            // validationSchema={profetionalValidation}
            onSubmit={handleProfetionalSubmit}
          >
            {({ isValid, dirty, values, handleChange, isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="mt-6 space-y-4  ">


                  <div className="flex justify-center">
                    {/* Profetional section */}
                    <div className="flex flex-col items-start w-full justify-center rounded-xl bg-gray-200">
                      <div className="flex justify-between w-full p-5  font-bold"><h2 className="text-start text-xl">Profetional Datas</h2>
                        {
                          contact.stats && contact.name === "Profetional" ? (
                            <div className="flex items-center ">

                              <button
                                type="submit"
                                className="w-full  text-black p-2 text-2xl rounded-md h-10 font-medium"
                                disabled={isSubmitting}
                              >
                                {loading && contact.name === "Profetional" ? <Spinner className="text-primary text-xl" /> : <IoIosSave className="text-primary" />}
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
                              onClick={() => setContact(prev => ({ ...prev, stats: true, name: "Profetional" }))}

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
                          contact.stats && contact.name === "Profetional" ? (

                            <div className=" gap-4 space-y-4 w-full ">
                              <div className="w-full flex items-center ">
                                <label className="text-md font-medium bg-white w-2/6 h-10  rounded-xl p-2 space-y-4">Name Of Company</label>
                                <Field
                                  type="text"

                                  className="w-4/6 ms-3 rounded-xl border p-2 "
                                  name="name"
                                  placeholder="Enter name.."
                                />
                              </div>
                              <div className="w-full flex items-center ">
                                <label className="text-md font-medium bg-white w-2/6 h-10  rounded-xl p-2 space-y-4">Email</label>

                                <Field
                                  type="text"

                                  className="w-4/6 ms-3 rounded-xl border p-2 "
                                  name="email"
                                  placeholder="Enter email.."
                                />
                              </div>

                              <div className="w-full flex items-center ">
                                <label className="text-md font-medium bg-white w-2/6 h-10  rounded-xl p-2 space-y-4">Country *</label>
                                <Field
                                  as="select"
                                  type="text"
                                  name="address.country"
                                  className="w-4/6 ms-3 rounded-xl border p-2"
                                  value={values.address.country || ""}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>
                                  ) => {
                                    setFieldValue("address.country", e.target.value);
                                  }}
                                >
                                  <option value="">Select Country</option>
                                  {Country.getAllCountries().map((country) => (
                                    <option
                                      key={country.isoCode}
                                      value={country.isoCode}
                                    >
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

                              <div className="w-full flex items-center ">
                                <label className="text-md font-medium bg-white w-2/6 h-10  rounded-xl p-2 space-y-4">State *</label>
                                <Field
                                  as="select"
                                  type="text"
                                  name="address.state"
                                  className="w-4/6 ms-3 rounded-xl border p-2"
                                  value={values.address.state || ""}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>
                                  ) => {
                                    setFieldValue("address.state", e.target.value);
                                  }}
                                >
                                  <option value="">Select State</option>
                                  {values.address.country &&
                                    State.getStatesOfCountry(
                                      values.address.country
                                    )?.map((state) => (
                                      <option key={state.isoCode} value={state.isoCode}>
                                        {state.name}
                                      </option>
                                    ))}
                                </Field>

                                <ErrorMessage
                                  name="address.state"
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>

                              <div className="w-full flex items-center ">
                                <label className="text-md font-medium bg-white w-2/6 h-10  rounded-xl p-2 space-y-4">City *</label>
                                <Field
                                  as="select"
                                  type="text"
                                  name="address.city"
                                  className="w-4/6 ms-3 rounded-xl border p-2"
                                  value={values.address.city || ""}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>
                                  ) => {
                                    setFieldValue("address.city", e.target.value);
                                  }}
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

                              <div className="w-full flex items-center ">
                                <label className="text-md font-medium bg-white w-2/6 h-10  rounded-xl p-2 space-y-4">Landmark *</label>
                                <Field
                                  type="text"
                                  onChange={handleChange}
                                  name="address.landmark"
                                  className="w-4/6 ms-3 rounded-xl border p-2"
                                />
                                <ErrorMessage
                                  name="address.landmark"
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>

                              <div className="w-full flex items-center ">
                                <label className="text-md font-medium bg-white w-2/6 h-10  rounded-xl p-2 space-y-4">Pincode *</label>
                                <Field
                                  type="text"
                                  name="address.pincode"
                                  onChange={handleChange}
                                  className="w-4/6 ms-3 rounded-xl border p-2"
                                />
                                <ErrorMessage
                                  name="address.pincode"
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                            </div>

                          ) : (
                            <div className=" gap-4 space-y-4 w-full ">
                              <div className="w-full flex items-center ">
                                <label className="text-md font-medium bg-white w-2/6 h-10  rounded-xl p-2 space-y-4">Name Of Company</label>
                                <span className="text-md font-medium italic h-10 rounded-xl p-2  ms-3 bg-white w-4/6 space-y-4">{activecompany?.name || "Not update yet"}</span>
                              </div>
                              <div className="w-full flex items-center ">
                                <label className="text-md font-medium h-10 bg-white w-2/6  rounded-xl p-2 space-y-4">Email</label>
                                <span className="text-md font-medium italic h-10 bg-white w-4/6 ms-3  rounded-xl p-2 space-y-4">{activecompany?.email || "Not update yet"}</span>
                              </div>
                              <div className="w-full flex items-center">
                                <div className="flex flex-col w-full p-5  font-bold"><h2 className="text-start text-xl">Address</h2>
                                  <div className="flex w-full p-3  font-bold">
                                    <label className="text-md font-medium h-10 bg-white w-2/6  rounded-xl p-2 space-y-4">Country</label>
                                    <span className="text-md font-medium italic h-10 bg-white w-4/6 ms-3  rounded-xl p-2 space-y-4">{activecompany?.address.country || "N/Not update yet"}</span>

                                  </div>

                                  <div className="flex w-full p-3  font-bold">
                                    <label className="text-md font-medium h-10 bg-white w-2/6  rounded-xl p-2 space-y-4">State</label>
                                    <span className="text-md font-medium italic h-10 bg-white w-4/6 ms-3  rounded-xl p-2 space-y-4">{activecompany?.address.state || "N/Not update yet"}</span>

                                  </div>
                                  <div className="flex w-full p-3  font-bold">
                                    <label className="text-md font-medium h-10 bg-white w-2/6  rounded-xl p-2 space-y-4">city </label>
                                    <span className="text-md font-medium italic h-10 bg-white w-4/6 ms-3  rounded-xl p-2 space-y-4">{activecompany?.address.city || "N/Not update yet"}</span>

                                  </div>
                                  <div className="flex w-full p-3  font-bold">
                                    <label className="text-md font-medium h-10 bg-white w-2/6  rounded-xl p-2 space-y-4">Landmark</label>
                                    <span className="text-md font-medium italic h-10 bg-white w-4/6 ms-3  rounded-xl p-2 space-y-4">{activecompany?.address.landmark || "N/Not update yet"}</span>

                                  </div>
                                  <div className="flex w-full p-3  font-bold">
                                    <label className="text-md font-medium h-10 bg-white w-2/6  rounded-xl p-2 space-y-4">Pincode </label>
                                    <span className="text-md font-medium italic h-10 bg-white w-4/6 ms-3  rounded-xl p-2 space-y-4">{activecompany?.address.pincode || "N/Not update yet"}</span>
                                  </div>
                                </div>
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
              socialMedia: {
                facebook: activecompany?.socialMedia?.facebook || "",
                instagram: activecompany?.socialMedia?.instagram || "",
                twitter: activecompany?.socialMedia?.twitter || "",
                linkedin: activecompany?.socialMedia?.linkedin || "",
              },
            }}
            validationSchema={socialMediaValidation}
            onSubmit={handleSocialMediaSubmit}
          >
            {({ isValid, dirty, values, handleChange, isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="mt-6 space-y-4  ">


                  <div className="flex justify-center">
                    {/* Social section */}
                    <div className="flex flex-col items-start w-full justify-center rounded-xl bg-gray-200">
                      <div className="flex justify-between w-full p-5  font-bold"><h2 className="text-start text-xl">Social Media</h2>
                        {
                          contact.stats && contact.name === "Social" ? (
                            <div className="flex items-center ">
                              <button
                                type="submit"
                                className="w-full  text-black p-2 text-2xl rounded-md h-10 font-medium"
                                disabled={isSubmitting}
                              >
                                {loading && contact.name === "Social" ? <Spinner className="text-primary text-xl" /> : <IoIosSave className="text-primary" />}
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
                              onClick={() => setContact(prev => ({ ...prev, stats: true, name: "Social" }))}

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
                          contact.stats && contact.name === "Social" ? (

                            <div className=" gap-4 space-y-4 w-full ">
                              <div className="flex gap-4 items-end">
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
                              </div>

                            </div>

                          ) : (
                            <div className=" gap-4 space-y-4 w-full ">
                              <div className="w-full flex items-center ">
                                <label className="text-md font-medium bg-white w-2/6 h-10  rounded-xl p-2 space-y-4">instagram</label>
                                <span className={`text-md font-medium italic h-10 rounded-xl p-2 ms-3 w-4/6 space-y-4 ${activecompany?.socialMedia?.instagram ? "bg-white text-black" : "bg-white text-gray-300"
                                  }`}>{activecompany?.socialMedia?.instagram || "add account url"}</span>
                              </div>
                              <div className="w-full flex items-center ">
                                <label className="text-md font-medium h-10 bg-white w-2/6  rounded-xl p-2 space-y-4">facebook</label>
                                <span className={`text-md font-medium italic h-10 rounded-xl p-2 ms-3 w-4/6 space-y-4 ${activecompany?.socialMedia?.facebook ? "bg-white text-black" : "bg-white text-gray-300"
                                  }`}>{activecompany?.socialMedia?.facebook || "add account url"}</span>
                              </div>
                              <div className="w-full flex items-center">
                                <label className="text-md font-medium h-10 bg-white w-2/6  rounded-xl p-2 space-y-4">linkedin</label>
                                <span className={`text-md font-medium italic h-10 rounded-xl p-2 ms-3 w-4/6 space-y-4 ${activecompany?.socialMedia?.linkedin ? "bg-white text-black" : "bg-white text-gray-300"
                                  }`}>{activecompany?.socialMedia?.linkedin || "add account url"}</span>
                              </div>
                              <div className="w-full flex items-center">
                                <label className="text-md font-medium h-10 bg-white w-2/6  rounded-xl p-2 space-y-4">twitter</label>
                                <span className={`text-md font-medium italic h-10 rounded-xl p-2 ms-3 w-4/6 space-y-4 ${activecompany?.socialMedia?.twitter ? "bg-white text-black" : "bg-white text-gray-300"
                                  }`}>{activecompany?.socialMedia?.twitter || "add account url"}</span>
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


        </section>
      </div>
    </>
  );
}
