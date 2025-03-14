import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  setprofessionalUserData,
  setRemoveField,
} from "@/lib/store/features/userSlice";
import { Ieducation } from "@/types/Types";

function Education() {
  const professionalUserData = useAppSelector(
    (state) => state.user.professionalData
  );
  const dispatch = useAppDispatch();

  // Validation Schema
  const validationSchema = Yup.object({
    qualification: Yup.string().required("* qualification required"),
    startYear: Yup.string()
      .matches(/^\d{4}$/, "* Enter a valid year")
      .required("* Year required"),
    endYear: Yup.string()
      .matches(/^\d{4}$/, "* Enter a valid year")
      .required("* Year required"),
    college: Yup.string().required("* College required"),
    subject: Yup.string().required("Subject required"),
  });

  const handleRemove = (index: number) => {
    if (!professionalUserData?.education) return;
    dispatch(setRemoveField({ field: "education", index }));
  };

  return (
    <div className="px-4 md:px-10 lg:px-20">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Education Details
      </h2>

      <Formik<Ieducation>
        initialValues={{
          qualification: "",
          startYear: "",
          endYear: "",
          college: "",
          subject: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(
            setprofessionalUserData({
              ...professionalUserData, // Keep other fields
              education: [...(professionalUserData?.education || []), values],
            })
          );
          resetForm();
        }}
      >
        {({ isValid, dirty }) => (
          <Form className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Field
                  type="text"
                  name="qualification"
                  placeholder="Qualification"
                  className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <ErrorMessage
                  name="qualification"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
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
              </div>

              <div>
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
              </div>
            </div>

            <Field
              type="text"
              name="college"
              placeholder="College/University"
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <ErrorMessage
              name="college"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

            <button
              type="submit"
              className="bg-primary text-white w-full md:w-auto px-4 py-2 rounded-lg font-medium disabled:opacity-50  disabled:cursor-not-allowed  transition duration-200 mt-5"
              disabled={!isValid || !dirty}
            >
              Add Education
            </button>
          </Form>
        )}
      </Formik>

      {/* Display Added Education */}
      {professionalUserData?.education?.length > 0 && (
        <div className="mt-6">
          <ul className="mt-3">
            {professionalUserData.education.map((edu, index) => (
              <li
                key={index}
                className="bg-gray-100 p-3 rounded-md mb-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
              >
                <div>
                  <p className="font-semibold">{edu.qualification}</p>
                  <p className="text-sm text-gray-600">
                    {edu.startYear} - {edu.endYear}
                  </p>
                  <p className="text-sm">{edu.college}</p>
                  <p className="text-sm">{edu.subject}</p>
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

export default Education;
