import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  IlocationType,
  setLocation,
  UserProfile,
} from "@/lib/store/features/userSlice";

function Location() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state) => state.user.activeuser as UserProfile | null
  );
  const [newLocation, setNewLocation] = useState<IlocationType>({
    country: "",
    countryName: "",
    state: "",
    stateName: "",
    city: "",
  });

  const countries = Country.getAllCountries();
  const states = newLocation.country
    ? State.getStatesOfCountry(newLocation.country)
    : [];
  const cities = newLocation.state
    ? City.getCitiesOfState(newLocation.country, newLocation.state)
    : [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "country") {
      const selectedCountry = countries.find((c) => c.isoCode === value);
      setNewLocation({
        country: selectedCountry?.isoCode || "",
        countryName: selectedCountry?.name || "",
        state: "",
        stateName: "",
        city: "",
      });
    } else if (name === "state") {
      const selectedState = states.find((s) => s.isoCode === value);
      setNewLocation({
        ...newLocation,
        state: selectedState?.isoCode || "",
        stateName: selectedState?.name || "",
        city: "",
      });
    } else if (name === "city") {
      setNewLocation({ ...newLocation, city: value });
    }
  };

  const handleAddLocation = () => {
    if (newLocation.country && newLocation.state && newLocation.city) {
      dispatch(setLocation(newLocation));
      setNewLocation({
        country: "",
        countryName: "",
        state: "",
        stateName: "",
        city: "",
      });
    }
  };

  return (
    <div>
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg mt-4 w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Locations</h2>

        <select
          name="country"
          className="border p-3 w-full rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newLocation.country}
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>

        {/* State Dropdown */}
        <select
          name="state"
          className="border p-3 w-full rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newLocation.state}
          onChange={handleChange}
          disabled={!newLocation.country}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>

        {/* City Dropdown */}
        <select
          name="city"
          className="border p-3 w-full rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newLocation.city}
          onChange={handleChange}
          disabled={!newLocation.state}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddLocation}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-3"
          disabled={
            !newLocation.country || !newLocation.state || !newLocation.city
          }
        >
          Add Location
        </button>

        <div className="mt-4">
          <h3 className="text-xl font-semibold">Added Locations</h3>
          <ul className="mt-2">
            <li className="bg-gray-200 p-3 rounded-md mb-2 flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  {user?.location?.countryName} - {user?.location?.stateName} -{" "}
                  {user?.location?.city}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Location;