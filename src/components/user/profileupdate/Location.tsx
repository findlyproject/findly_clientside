import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { IlocationType } from "@/types/Types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setprofessionalUserData } from "@/lib/store/features/userSlice";
import { RxCross2 } from "react-icons/rx";

const LocationSchema = Yup.object().shape({
  country: Yup.string().required("Country is required"),
});

function Location() {
  const dispatch = useAppDispatch();
  const professionalUserData = useAppSelector(
    (state) => state.user.professionalData
  );
  const handleRemove = () => {
    console.log("first");
    dispatch(
      setprofessionalUserData({
        ...professionalUserData,
        location: undefined, // Set location to undefined
      })
    );
  };

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");

  const countries = Country.getAllCountries();
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry)
    : [];
  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry, selectedState)
    : [];

  return (
    <div className="px-4 md:px-10 lg:px-20">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Locations
      </h2>

      <Formik
        initialValues={{
          country: "",
          countryName: "",
          state: "",
          stateName: "",
          city: "",
        }}
        validationSchema={LocationSchema}
        onSubmit={(values, { resetForm }) => {
          const selectedCountryData = countries.find(
            (c) => c.isoCode === values.country
          );
          const selectedStateData = states.find(
            (s) => s.isoCode === values.state
          );

          const newLocation: IlocationType = {
            country: values.country,
            countryName: selectedCountryData?.name || "",
            state: values.state || "", // Allow empty state
            stateName: selectedStateData?.name || "",
            city: values.city || "", // Allow empty city
          };

          dispatch(
            setprofessionalUserData({
              ...professionalUserData,
              location: newLocation, // Directly update the location object
            })
          );

          resetForm();
          setSelectedCountry("");
          setSelectedState("");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4">
            {/* Country Selection */}
            <div>
              <Field
                as="select"
                name="country"
                className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const value = e.target.value;
                  setSelectedCountry(value);
                  setSelectedState("");
                  setFieldValue("country", value);
                  setFieldValue(
                    "countryName",
                    countries.find((c) => c.isoCode === value)?.name || ""
                  );
                  setFieldValue("state", "");
                  setFieldValue("stateName", "");
                  setFieldValue("city", "");
                }}
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

            {/* State Selection (Optional) */}
            <div>
              <Field
                as="select"
                name="state"
                className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                disabled={!values.country}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const value = e.target.value;
                  setSelectedState(value);
                  setFieldValue("state", value);
                  setFieldValue(
                    "stateName",
                    states.find((s) => s.isoCode === value)?.name || ""
                  );
                }}
              >
                <option value="">Select State (Optional)</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </Field>
            </div>

            {/* City Selection (Optional) */}
            <div>
              <Field
                as="select"
                name="city"
                className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                disabled={!values.state}
              >
                <option value="">Select City (Optional)</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </Field>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white px-4 py-2 rounded-lg font-medium  transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-3"
              disabled={!values.country}
            >
              Add Location
            </button>
          </Form>
        )}
      </Formik>

      {/* Display Selected Location */}
      {professionalUserData?.location && (
        <div className="mt-4">
          <ul className="mt-2">
            <li className="bg-gray-200 p-3 flex justify-between rounded-md text-center font-semibold">
              {professionalUserData.location.countryName}
              {professionalUserData.location.stateName &&
                ` - ${professionalUserData.location.stateName}`}
              {professionalUserData.location.city &&
                ` - ${professionalUserData.location.city}`}

              <button onClick={handleRemove}>
                <RxCross2 className="text-red-500 text-xl cursor-pointer" />
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Display Selected Location */}
    </div>
  );
}

export default Location;
