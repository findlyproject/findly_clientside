import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  setprofessionalUserData,
  setRemoveField,
} from "@/lib/store/features/userSlice";

function Experience() {
  const professionalUserData = useAppSelector(
    (state) => state.user.professionalData
  );
  const dispatch = useAppDispatch();

  // Validation Schema
  const validationSchema = Yup.object({
    jobRole: Yup.string().required("* Job Role required"),
    companyName: Yup.string().required("* Company Name required"),
    description: Yup.string().required("* Description required"),
    startYear: Yup.string().required("* Start Year required"),
    endYear: Yup.string().required("* End Year required"),
  });

  const handleRemove = (index: number) => {
    if (!professionalUserData?.experience) return;

    dispatch(setRemoveField({ field: "experience", index }));
  };

  return (
    <div className="px-4 md:px-10 lg:px-20">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Experience</h2>

      <Formik
        initialValues={{
          jobRole: "",
          companyName: "",
          description: "",
          startYear: "",
          endYear: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(
            setprofessionalUserData({
              ...professionalUserData,
              experience: [...(professionalUserData?.experience || []), values],
            })
          );
          resetForm();
        }}
      >
        {({ isValid, dirty }) => (
          <Form className="grid gap-4">
            <Field
              type="text"
              name="jobRole"
              placeholder="Job Role"
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <ErrorMessage
              name="jobRole"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

            <Field
              type="text"
              name="companyName"
              placeholder="Company Name"
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <ErrorMessage
              name="companyName"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

            <Field
              as="textarea"
              name="description"
              placeholder="Description"
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

            <Field
              type="text"
              name="startYear"
              placeholder="Start Year"
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <ErrorMessage
              name="startYear"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

            <Field
              type="text"
              name="endYear"
              placeholder="End Year"
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <ErrorMessage
              name="endYear"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

            <button
              type="submit"
              className="bg-primary text-white w-full md:w-auto px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 mt-5"
              disabled={!isValid || !dirty}
            >
              Add Experience
            </button>
          </Form>
        )}
      </Formik>

      {/* Display Added Experiences */}
      {professionalUserData?.experience &&
        professionalUserData?.experience?.length > 0 && (
          <div className="mt-6">
            <ul className="mt-3">
              {professionalUserData.experience.map((experience, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-3 rounded-md mb-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
                >
                  <div>
                    <p className="font-semibold">
                      {experience.jobRole} at {experience.companyName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {experience.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {experience.startYear} - {experience.endYear}
                    </p>
                  </div>
                  <button onClick={() => handleRemove(index)}>
                    <RxCross2 className="text-red-500 text-xl cursor-pointer hover:text-red-700 transition" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}

export default Experience;
