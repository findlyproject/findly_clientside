"use client";

import { useEffect, useState } from "react";
import { FaPencilAlt, FaEye } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { MdOutlineEmail } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import api from "@/utils/api";
import { setActiveCompany } from "@/lib/store/features/companyslice";
import { UserProfile } from "@/lib/store/features/userSlice";
export default function ProfileEdit() {
  const activecompany = useAppSelector(
    (state) => state.companyLogin.activeCompany
  );

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
  const [employees, setEmployees] = useState<UserProfile[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [positions, setPosition] = useState({
    employee: "",
    position: "",
  });

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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Company Name is required"),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number")
      .required("Mobile Number is required"),
    about: Yup.string().required("bio is required"),
    founder: Yup.string().required("founder is required"),
    foundedAt: Yup.string().required("founded at is required"),
    services: Yup.string().required("Services are required"),

    workHours: Yup.object()
      .shape({
        start: Yup.string().required("Start time is required"),
        end: Yup.string().required("End time is required"),
      })
      .required("Work hours are required"),
    socialMedia: Yup.object().shape({
      facebook: Yup.string().url("Invalid Facebook URL"),
      instagram: Yup.string().url("Invalid Instagram URL"),
      twitter: Yup.string().url("Invalid Twitter URL"),
      linkedin: Yup.string().url("Invalid LinkedIn URL"),
    }),
    employees: Yup.array()
      .of(
        Yup.object().shape({
          employee: Yup.string().required("Employee name is required"),
          position: Yup.string().required("Position is required"),
        })
      )
      .min(1, "At least one employee is required"),

    IndustryType: Yup.string().required("Industry Type is required"),
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

  const handleSubmit = async (values: any) => {
    console.log("vallueee", values);

    const response = await api.patch(
      `/company/edit/${activecompany?._id}`,
      values
    );
    console.log("responseresponse", response);
    dispatch(setActiveCompany(response.data.company));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      console.log("File selected:", file);
    }
  };
  console.log("selectedFile...", selectedFile);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedBanner(file);
      setbannerPreview(URL.createObjectURL(file));
      console.log("File selected:", file);
    }
  };

  console.log("selectedBanner", selectedBanner);

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("logo", selectedFile);

    try {
      const response = await api.patch(
        `/company/edit/logo/${activecompany?._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("response of logo upload", response);
      setSelectedFile(null);
      dispatch(setActiveCompany(response.data.company));
    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };

  const handlebannerUpload = async () => {
    if (!selectedBanner) return;

    const formData = new FormData();
    formData.append("banner", selectedBanner);

    try {
      const response = await api.patch(
        `/company/edit/banner/${activecompany?._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("response of banner upload", response);
      setSelectedBanner(null);
      dispatch(setActiveCompany(response.data.company));
    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen p-6 bg-gray-100">
        <aside className="  w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <div className="relative w-full h-40 bg-gray-300 flex items-center justify-center">
              <Image
                src={bannerPreview}
                alt="Banner"
                layout="fill"
                objectFit="cover"
                className="absolute"
              />

              <input
                type="file"
                accept="image/*"
                id="bannerUpload"
                className="hidden"
                onChange={handleBannerChange}
              />
              {selectedBanner ? (
                <button
                  onClick={handlebannerUpload}
                  className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-primary text-white py-1 px-3 rounded"
                >
                  Upload
                </button>
              ) : (
                <label
                  htmlFor="bannerUpload"
                  className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition"
                >
                  <FaPencilAlt className="text-gray-600 text-sm" />
                </label>
              )}

              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={preview}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />

                <input
                  type="file"
                  accept="image/*"
                  id="logoUpload"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {selectedFile !== null ? (
                  <button
                    onClick={handleUpload}
                    className="absolute inset-0 flex items-center justify-center bg-primary text-white p-1 rounded"
                  >
                    Upload
                  </button>
                ) : (
                  <label
                    htmlFor="logoUpload"
                    className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition"
                  >
                    <FaPencilAlt className="text-gray-600 text-sm" />
                  </label>
                )}
              </div>
            </div>
            <h2 className="mt-4 font-semibold">{activecompany?.name}</h2>
            <p className="text-gray-600 flex items-center space-x-2">
              <MdOutlineEmail className="text-xl" />
              <span>{activecompany?.email}</span>
            </p>

            <p className="flex items-center space-x-2">
              <CiPhone className="text-xl" />
              <span>{activecompany?.contact}</span>
            </p>
          </div>

          <h1 className="text-sm font-semibold mt-10">Social Media Profiles</h1>

          <div className="flex items-center space-x-4">
            <Link
              href={activecompany?.socialMedia?.facebook || ""}
              target="_blank"
            >
              <FaFacebook className="text-blue-600 text-3xl cursor-pointer hover:text-blue-800 transition" />
            </Link>

            <Link
              href={activecompany?.socialMedia?.instagram || ""}
              target="_blank"
            >
              <FaInstagram className="text-pink-600 text-3xl cursor-pointer hover:text-blue-800 transition" />
            </Link>

            <Link
              href={activecompany?.socialMedia?.twitter || ""}
              target="_blank"
            >
              <FaTwitter className="text-blue-600 text-3xl cursor-pointer hover:text-blue-800 transition" />
            </Link>

            <Link
              href={activecompany?.socialMedia?.linkedin || ""}
              target="_blank"
            >
              <FaLinkedin className="text-blue-600 text-3xl cursor-pointer hover:text-blue-800 transition" />
            </Link>
          </div>
        </aside>

        <section className="flex-1 bg-white p-6 rounded-lg shadow-md mt-6 lg:mt-0 lg:ml-6">
          <h1 className="text-2xl font-bold">Edit profile</h1>
          <Formik
            initialValues={{
              name: activecompany?.name || "",
              contact: undefined,
              founder: activecompany?.founder || "",
              foundedAt: activecompany?.foundedAt || "",
              about: activecompany?.about || "",
              workHours: {
                start: activecompany?.workHours.start || "",
                end: activecompany?.workHours.end || "",
              },
              services: activecompany?.services || [],
              IndustryType: activecompany?.IndustryType || "",
              address: {
                landmark: activecompany?.address.landmark || "",
                country: activecompany?.address.country || "",
                state: activecompany?.address.state || "",
                city: activecompany?.address.city || "",
                pincode: activecompany?.address.pincode || "",
              },
              socialMedia: {
                facebook: activecompany?.socialMedia.facebook || "",
                instagram: activecompany?.socialMedia.instagram || "",
                twitter: activecompany?.socialMedia.twitter || "",
                linkedin: activecompany?.socialMedia.linkedin || "",
              },

              employees: activecompany?.employees || [],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="mt-6 space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                      <label className="text-sm font-medium">Name *</label>
                      <Field
                        type="text"
                        name="name"
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-sm font-medium">
                        {" "}
                        Mobile Number *
                      </label>

                      <PhoneInput
                        country={"in"}
                        value={values.contact || ""}
                        onChange={(phone) => {
                          console.log("phone", phone);

                          setFieldValue("contact", phone);
                        }}
                        inputProps={{
                          name: "contact",
                          required: true,
                          className:
                            "w-full px-12 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm md:text-base",
                        }}
                      />
                      <ErrorMessage
                        name="contact"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full relative">
                      <label className="text-sm font-medium">Founder*</label>
                      <Field
                        type="text"
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        name="founder"
                      />

                      <ErrorMessage
                        name="founder"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="w-full relative">
                      <label className="text-sm font-medium">
                        Founded At *
                      </label>
                      <Field
                        type="text"
                        name="foundedAt"
                        placeholder="dd/mm/yyyy"
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md pr-8"
                      />

                      <ErrorMessage
                        name="foundedAt"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full relative">
                      <label className="text-sm font-medium">
                        Our services *
                      </label>
                      <Field
                        type="text"
                        name="services"
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        placeholder="eg:-Data Analytics & Big Data"
                      />
                      <ErrorMessage
                        name="services"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="w-full relative">
                      <label className="text-sm font-medium">Industry *</label>

                      <Field
                        as="select"
                        name="IndustryType"
                        className="w-full border p-2 rounded-md pr-8"
                        value={values.IndustryType || ""}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          setFieldValue("IndustryType", e.target.value);
                        }}
                      >
                        <option value=""> choose your industry</option>
                        {industryTypes.map((type) => (
                          <option key={type.id} value={type.name}>
                            {type.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="IndustryType"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full relative">
                      <span className="text-sm font-medium ">Work hours</span>
                      <div className="flex justify-evenly gap-2">
                        <div className="flex flex-col w-1/2">
                          <label className="text-sm ">Start*</label>
                          <Field
                            type="text"
                            onChange={handleChange}
                            name="workHours.start"
                            className="w-full border p-2 rounded-md"
                            placeholder="HH:MM AM/PM"
                          />
                          <ErrorMessage
                            name="workHours.start"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="flex flex-col w-1/2">
                          <label className="text-sm ">End*</label>
                          <Field
                            type="text"
                            name="workHours.end"
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                            placeholder="HH:MM AM/PM"
                          />
                          <ErrorMessage
                            name="workHours.end"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full relative">
                      <span className="text-sm font-medium">Add Employees</span>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border p-2 rounded-md pr-8"
                        placeholder="Search employees..."
                      />
                      {showDropdown && employees.length > 0 && (
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
                  </div>

                  <div>
                    <label className="text-sm font-medium">Write Bio</label>
                    <Field
                      as="textarea"
                      onChange={handleChange}
                      className="w-full border p-2 rounded-md"
                      name="about"
                    />
                    <ErrorMessage
                      name="about"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <span className="text-sm font-medium">Address</span>
                  <div className="flex items-center justify-center">
                    <div className="flex flex-col md:flex-row gap-2">
                      <div className="w-full">
                        <label className="text-sm ">City *</label>
                        <Field
                          as="select"
                          type="text"
                          name="address.city"
                          className="w-full border p-2 rounded-md"
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
                      <div className="w-full">
                        <label className="text-sm ">State *</label>
                        <Field
                          as="select"
                          type="text"
                          name="address.state"
                          className="w-full border p-2 rounded-md"
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
                      <div className="w-full">
                        <label className="text-sm font-medium">Country *</label>
                        <Field
                          as="select"
                          type="text"
                          name="address.country"
                          className="w-full border p-2 rounded-md"
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

                      <div className="w-full">
                        <label className="text-sm ">Landmark *</label>
                        <Field
                          type="text"
                          onChange={handleChange}
                          name="address.landmark"
                          className="w-full border p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="address.landmark"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="w-full">
                        <label className="text-sm ">Pincode *</label>
                        <Field
                          type="text"
                          name="address.pincode"
                          onChange={handleChange}
                          className="w-full border p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="address.pincode"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <span className="text-sm font-medium">
                    Social media profiles
                  </span>

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

                <div className="w-1/4">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white p-2 rounded-md h-10 font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "save"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </>
  );
}
