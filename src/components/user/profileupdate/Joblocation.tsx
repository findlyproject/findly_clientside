import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Country, State, City } from "country-state-city";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setprofessionalUserData,
  setRemoveField,
} from "@/lib/store/features/userSlice";
import { JobLocationType } from "@/types/Types";

function JobLocation() {
  const dispatch = useAppDispatch();
  const professionalUserData = useAppSelector(
    (state) => state.user.professionalData
  );
  const countries = Country.getAllCountries();

  const validationSchema = Yup.object({
    country: Yup.string().required("* Country is required"),
  });
  const handleRemove = (index: number) => {
    if (!professionalUserData?.jobLocation) return;

    dispatch(setRemoveField({ field: "jobLocation", index }));
  };

  return (
    <div className="px-4 md:px-10 lg:px-20">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Job Locations
      </h2>

      <Formik
        initialValues={{ country: "", state: "", city: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const selectedCountry = countries.find(
            (c) => c.isoCode === values.country
          );
          const selectedState = State.getStatesOfCountry(values.country).find(
            (s) => s.isoCode === values.state
          );

          const newLocation: JobLocationType = {
            country: values.country,
            countryName: selectedCountry?.name || "",
            state: values.state,
            stateName: selectedState?.name || "",
            city: values.city,
          };

          dispatch(
            setprofessionalUserData({
              ...professionalUserData, // Keep other fields
              jobLocation: [
                ...(professionalUserData?.jobLocation || []),
                newLocation,
              ],
            })
          );
          resetForm();
        }}
      >
        {({ values }) => (
          <Form className="grid gap-4">
            <div>
              <Field
                as="select"
                name="country"
                className="border p-3 w-full rounded-lg"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                as="select"
                name="state"
                className="border p-3 w-full rounded-lg"
                disabled={!values.country}
              >
                <option value="">Select State</option>
                {State.getStatesOfCountry(values.country).map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="state"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                as="select"
                name="city"
                className="border p-3 w-full rounded-lg"
                disabled={!values.state}
              >
                <option value="">Select City</option>
                {City.getCitiesOfState(values.country, values.state).map(
                  (city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  )
                )}
              </Field>
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-white w-full px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Location
            </button>
          </Form>
        )}
      </Formik>

      {professionalUserData?.jobLocation &&
        professionalUserData.jobLocation.length > 0 && (
          <div className="mt-4">
            <ul className="grid gap-3">
              {professionalUserData.jobLocation.map((loc, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-3 rounded-md flex justify-between items-center shadow-md"
                >
                  <p className="font-semibold">
                    {loc.countryName} - {loc.stateName} - {loc.city}
                  </p>
                  <button onClick={() => handleRemove(index)}>
                    <RxCross2 className="text-red-500 text-xl cursor-pointer" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}

export default JobLocation;
