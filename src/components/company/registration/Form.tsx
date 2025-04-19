"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Camera } from "lucide-react";
import { Country, State, City } from "country-state-city";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useAppDispatch } from "@/lib/store/hooks";
import { SelectChangeEvent } from "../../../types/Types";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import default styles
import { companyRegistration } from "@/lib/store/features/actions/companyActions";


 const RegistrationForm = () => {

  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const Email = searchParams.get("email") || "";
  const Name = searchParams.get("name") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<{
    file: File | null;
    url: string;
  }>({ file: null, url: "" });

  // formik validation
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Company Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contact: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, "Invalid mobile number")
      .required("Mobile Number is required"),
    foundedAt: Yup.date()
      .typeError("Invalid date format")
      .required("Founded Date is required"),
    founder: Yup.string().required("Founder Name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    IndustryType: Yup.string().required("Industry Type is required"),
    address: Yup.object().shape({
      landmark: Yup.string().required("Landmark is required"),
      country: Yup.string().required("Country is required"),
      pincode: Yup.string().matches(/^[0-9]{6}$/, "Invalid Pincode"),
    }),
  });

  // logo preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage({ file, url: imageUrl });
    }
  };

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

  type FormValues = {
    name: string;
    email: string;
    contact?: string;
    foundedAt: Date;
    password: string;
    cpassword: string;
    IndustryType: string;
    founder: string;
    address: {
      landmark: string;
      country: string;
      state: string;
      city: string;
      pincode: string;
    };
  };
  

  //registration
  const submit = async (values: FormValues) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "address" && typeof value === "object" && value !== null) {
        Object.entries(value)?.forEach(([subKey, subValue]) => {
          formData.append(`address[${subKey}]`, String(subValue));
        });
      } else {
        formData.append(key, String(value));
      }
    });

    if (previewImage && previewImage.file instanceof File) {
      formData.append("logo", previewImage.file);
    }
    const result =await dispatch(companyRegistration(formData))
    if(result.type==="company/registration/fulfilled"){
      router.push("/company/home");
    }

  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-18">
      {/* coumn1  */}
      <div className="flex justify-center items-center md:items-start md:m-16">
        <span className="block text-sm text-gray-700">Logo <span className="text-red-500">*</span></span>
        <label className="relative cursor-pointer">
          <div className="w-24 h-24 md:w-28 md:h-28 mb-6 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden group hover:bg-gray-200 transition-colors">
            {previewImage.url ? (
              <Image
                src={previewImage.url}
                alt="Profilepreview"
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
            ) : (
              <Camera className="w-8 h-8 md:w-10  md:h-10 text-primary group-hover:text-primary" />
            )}
            <div className="absolute inset-0 mb-6 bg-primary bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all flex items-center justify-center">
              <Camera className="w-8 h-8 md:w-10  md:h-10 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
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
      {/* column 2 */}

      <div className="w-full my-10 max-w-screen-lg rounded-xl ">
        <Formik<FormValues>
          initialValues={{
            name: Name,
            email: Email,
            contact: undefined,
            foundedAt: new Date(),
            password: "",
            cpassword: "",
            IndustryType: "",
            founder: "",
            address: {
              landmark: "",
              country: "",
              state: "",
              city: "",
              pincode: "",
            },
          }}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    placeholder="company name"
                    name="name"
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Founder <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    placeholder="founder name"
                    name="founder"
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                  />
                  <ErrorMessage
                    name="founder"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Founded At
                    <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="date"
                    name="foundedAt"
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                  />
                  <ErrorMessage
                    name="foundedAt"
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
                    <PhoneInput
                      country={"in"}
                      value={values.contact}
                      onChange={(phone) => setFieldValue("contact", phone)} // Update Formik state
                      inputProps={{
                        name: "contact",
                        required: true,
                        className:
                          "w-full px-12 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm md:text-base",
                      }}
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
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="email"
                    placeholder="email@gmail.com"
                    readOnly
                    name="email"
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
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
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••"
                      name="password"
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
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
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
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
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                    value={values.IndustryType || ""}
                    onChange={(e: SelectChangeEvent) => {
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

                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Landmark <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="address.landmark"
                    type="text"
                    placeholder="landmark"
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
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
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                      value={values.address.country || ""}
                      onChange={(e: SelectChangeEvent) => {
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
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                      value={values.address.state || ""}
                      onChange={(e: SelectChangeEvent) => {
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {/* City Dropdown */}
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                      value={values.address.city || ""}
                      onChange={(e: SelectChangeEvent) =>
                        setFieldValue("address.city", e.target.value)
                      }
                      name="city"
                    >
                      <option value="">Select City</option>
                      {values.address.state &&
                        City.getCitiesOfState(
                          values?.address?.country,
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
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
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
                className="w-full bg-primary text-white p-3 rounded-lg hover:bg-gray-800 transition-colors text-sm md:text-base font-medium"
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
