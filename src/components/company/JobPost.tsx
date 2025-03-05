"use client";
import api from "@/utils/api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Job title is required"),
  industry: Yup.string().required("Industry is required"),
  jobType: Yup.string().required("Job type is required"),
  salary: Yup.object().shape({
    rate: Yup.string().required("Salary rate is required"),
    min: Yup.number()
      .typeError("Minimum salary must be a number")
      .positive("Minimum salary must be positive")
      .required("Minimum salary is required"),
    max: Yup.number()
      .typeError("Maximum salary must be a number")
      .positive("Maximum salary must be positive")
      .required("Maximum salary is required")
      .moreThan(
        Yup.ref("min"),
        "Maximum salary must be greater than minimum salary"
      ),
  }),
  experienceLevel: Yup.string().required("Experience level is required"),
  location: Yup.string().required("Location is required"),
  applicationDeadline: Yup.date()
    .required("Application deadline is required")
    .min(new Date(), "Deadline cannot be in the past"),
  qualification: Yup.string().required("Qualification is required"),
  jobResponsibilities:  Yup.array()
  .of(Yup.string().required("responsibility cannot be empty"))
  .min(1, "At least one responsibility is required"),
  benefits: Yup.array()
  .of(Yup.string().required("Benefits cannot be empty"))
  .min(1, "At least one benefits is required"),
  
  description: Yup.string().required("Job description is required"),
  requirements: Yup.array()
    .of(Yup.string().required("Requirement cannot be empty"))
    .min(1, "At least one requirement is required"),
  contactEmail: Yup.string()
    .email("Invalid email format")
    .required("Contact email is required"),
  contactPhone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Phone number must be between 10 and 15 digits")
    .required("Contact phone is required"),
});

export const JobPost = () => {
  const [requirementInput, setRequirementInput] = useState("");
  const [requirement, setRequirement] = useState<string[]>([]);

  const [benefitInput, setBenefitInput] = useState("");
  const [benefit, setBenefit] = useState<string[]>([]);

  const [responsibleInput, setResponsibleInput] = useState("");
  const [responsible, setResponsible] = useState<string[]>([]);

  // Generalized function for handling Enter key events
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    values: any,
    setFieldValue: (field: string, value: any) => void,
    fieldName: string
  ) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
  
      const updatedList = [...values[fieldName], inputValue.trim()];
      setFieldValue(fieldName, updatedList.join(", ")); // ✅ Store as string in Formik
      setList(updatedList); // ✅ Update local state for UI
      setInputValue(""); // Clear input
    }
  };
  const handleSubmit = async (values) => {
    values.requirements = requirement;
    values.benefits = benefit;
    values.jobResponsibilities = responsible;

    console.log(values);

    // const response = await api.post("/company/final-register", formData);
    // if (response.status == 201) {
    //   console.log("Registration successful:", response.data);
    //   toast.success("Registration successful");
    //   // router.push("/company/home");
    // }
  };
  return (
    <div className="max-w-screen-2x1 container mx-auto xl">
      {/* form */}
      <div className=" bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <Formik
          initialValues={{
            title: "",
            industry: "",
            jobType: "",
            salary: { rate: "", min: "", max: "" },
            experienceLevel: "",
            location: "",
            applicationDeadline: "",
            qualification: "",
            jobResponsibilities: "",
            description: "",
            requirements: "",
            contactEmail: "",
            contactPhone: "",
            benefits:""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-5">
              {/* 1st row */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Job Title</label>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Ex:Web Developer"
                    className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Industry Type</label>
                  <Field
                    as="select"
                    name="industry"
                    className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  >
                    <option value="">Choose your industry</option>
                    <option value="Full-time">IT</option>
                    <option value="Part-time"></option>
                    <option value="Temporary"></option>
                  </Field>
                  <ErrorMessage
                    name="industry"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Employment Type</label>
                  <Field
                    as="select"
                    name="jobType"
                    className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  >
                    <option value="">Choose your experience</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Temporary">Temporary</option>
                  </Field>
                  <ErrorMessage
                    name="jobType"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              {/* 2nd row */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Salary Type</label>
                  <Field
                    as="select"
                    name="salary.rate"
                    className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  >
                    <option value="">Choose your salary</option>
                    <option value="Hourly">Hourly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </Field>
                  <ErrorMessage
                    name="salary.rate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Minimum Salary</label>
                  <Field
                    type="text"
                    placeholder="$20k"
                    name="salary.min"
                    className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  />
                  <ErrorMessage
                    name="salary.min"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Maximum Salary</label>
                  <Field
                    name="salary.max"
                    type="text"
                    placeholder="$120k"
                    className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  />
                  <ErrorMessage
                    name="salary.max"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              {/* 3rd row */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Experience level</label>
                  <Field
                    as="select"
                    name="experienceLevel"
                    className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  >
                    <option value="">choose your experience level</option>
                    <option value="Hourly">Entry</option>
                    <option value="Monthly">Mid</option>
                    <option value="Yearly">Senior</option>
                    <option value="Yearly">Expert</option>
                  </Field>
                  <ErrorMessage
                    name="experienceLevel"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Job Location</label>
                  <Field
                    type="text"
                    placeholder="Ex: New York"
                    name="location"
                    className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              {/* 4th row */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">
                    Application Deadline
                  </label>
                  <Field
                    type="date"
                    placeholder="Ex: 2023-10-28"
                    name="applicationDeadline"
                    className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  />
                  <ErrorMessage
                    name="applicationDeadline"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Qualification</label>
                  <Field
                    type="text"
                    name="qualification"
                    placeholder="Ex:Gaduate"
                    className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  />
                  <ErrorMessage
                    name="qualification"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              {/* 5th row */}
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                {/* Requirements Section */}
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Requirements</label>
                  <Field
                    type="text"
                    name="requirements"
                    value={requirementInput}
                    onChange={(e) => setRequirementInput(e.target.value)}
                    onKeyDown={(e) =>
                      handleKeyDown(
                        e, requirementInput, setRequirementInput, setRequirement, values, setFieldValue, "requirements"
                        
                      )
                    }
                    placeholder="Type a requirement and press Enter"
                    className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  />
                  <ErrorMessage
                    name="requirements"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <div
                    className={`mt-2 p-3 w-full rounded-md ${
                      requirement.length ? "bg-gray-100" : "bg-transparent"
                    }`}
                  >
                    {requirement.length !== 0 && (
                      <ul className="list-disc list-inside w-full">
                        {requirement.map((req, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center text-gray-800 break-words overflow-hidden"
                          >
                            <span className="truncate">{req}</span>
                            <button
                              onClick={() =>
                                setRequirement((prev) =>
                                  prev.filter((_, i) => i !== index)
                                )
                              }
                              className="ml-3 px-1 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-900"
                            >
                              X
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Benefits</label>
                  <Field
                    type="text"
                    value={benefitInput}
                    name="benefits"
                    onChange={(e) => setBenefitInput(e.target.value)}
                    onKeyDown={(e) =>
                      handleKeyDown(
                        e, benefitInput, setBenefitInput, setBenefit, values, setFieldValue, "benefit" 
                      )
                    }
                    placeholder="Type a benefit and press Enter"
                    className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  />
 <ErrorMessage
                    name="benefits"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <div
                    className={`mt-2 p-3 w-full rounded-md ${
                      benefit.length ? "bg-gray-100" : "bg-transparent"
                    }`}
                  >
                    {benefit.length !== 0 && (
                      <ul className="list-disc list-inside w-full">
                        {benefit.map((ben, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center text-gray-800 break-words overflow-hidden"
                          >
                            <span className="truncate">{ben}</span>
                            <button
                              onClick={() =>
                                setBenefit((prev) =>
                                  prev.filter((_, i) => i !== index)
                                )
                              }
                              className="ml-3 px-1 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-900"
                            >
                              X
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* 6th row */}
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                {/* Job Responsibilities Section */}
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">
                    Job Responsibilities
                  </label>
                  <Field
                  as="textarea"
                    rows={2}
                    value={responsibleInput}
                    onChange={(e) => setResponsibleInput(e.target.value)}
                    onKeyDown={(e) =>
                      handleKeyDown(
                        e, responsibleInput, setResponsibleInput, setResponsible, values, setFieldValue, "responsible"
                      )
                    }
                    name="jobResponsibilities"

                    placeholder="Type a responsibility and press Enter"
                    className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  />
<ErrorMessage
                    name="jobResponsibilities"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <div
                    className={`mt-2 p-3 w-full rounded-md ${
                      responsible.length ? "bg-gray-100" : "bg-transparent"
                    }`}
                  >
                    {responsible.length !== 0 && (
                      <ul className="list-disc list-inside w-full">
                        {responsible.map((res, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center text-gray-800 break-words overflow-hidden"
                          >
                            <span className="truncate">{res}</span>
                            <button
                              onClick={() =>
                                setResponsible((prev) =>
                                  prev.filter((_, i) => i !== index)
                                )
                              }
                              className="ml-3 px-1 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-900"
                            >
                              X
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Job Description Section */}
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Job Description</label>
                  <Field
                    as="textarea"
                    name="description"
               className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                    rows={6}
                    placeholder="Enter Job Description"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* last row */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Contact Email</label>
                  <Field
                    type="email"
                     name="contactEmail"
                    placeholder="your email"
                    className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  />
                  <ErrorMessage
                    name="contactEmail"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Contact Number</label>
                  <Field
                    type="tel"
                    name="contactPhone"
                    placeholder="0000 0000"
                    className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  />
                  <ErrorMessage
                    name="contactPhone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="block bg-red-600 mt-12bg-blueI text-white font-semibold px-8 py-2 rounded-sm
cursor-pointer"
              >
                {" "}
                submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
