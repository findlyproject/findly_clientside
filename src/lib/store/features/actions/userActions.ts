import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { setActive, SetLogout, UserProfile } from "../userSlice";
import handleAsync from "@/utils/handleAsync";
import { AxiosResponse } from "axios";
import {setAllRatings,Rating} from '../ratingSlice'

//register
interface RegisterResponse {
  user: UserProfile;
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    state: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      location: string;
      education: { college: string; startYear: string; endYear: string }[];
      jobTitle: string[];
      jobLocation: string[];
    },
    { dispatch, rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse<RegisterResponse>>(() =>
      api.post("/user/registration", state)
    );
    console.log("responseresponsev", response);

    if (!response) {
      return rejectWithValue("registration falied.please try again.");
    }
    dispatch(setActive(response?.data?.user as UserProfile));
    return response?.data?.user;
  }
);


//login
interface LoginResponse {
  logeduser: UserProfile;
}
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    state: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse<LoginResponse>>(() =>
      api.post("/user/login", state)
    );
    if (!response) {
      return rejectWithValue("Login failed. Please try again.");
    }

    dispatch(setActive(response?.data?.logeduser as UserProfile));
    return response?.data?.logeduser;
  }
);

//logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch, rejectWithValue }) => {
    const response = await handleAsync<AxiosResponse<LoginResponse>>(() =>
      api.post("/user/logout")
    );

    if (!response) {
      return rejectWithValue("logout failed");
    }

    const status: number = response.status;
    if (status >= 200 && status < 300) {
      dispatch(SetLogout());

      return null;
    } else {
      throw new Error("Logout failed");
    }
  }
);

//craete rating

interface RatingResponse {
  newRating : Rating;
}

export const RateFindly = createAsyncThunk(
  "rating/RateUs",
  async (
    state: { starsRating: number; review: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await handleAsync<AxiosResponse<RatingResponse>>(() =>
        api.post("/rating/createreview", {
          ...state,
          starsRating: Number(state.starsRating),
         
        })
      );

      if (!response) {
        return rejectWithValue("Rating failed. Please try again.");
      }

      dispatch(setAllRatings([response.data.newRating])); // Wrap in array
      return response.data.newRating;
    } catch (error) {
      return rejectWithValue("An error occurred while submitting the rating.");
    }
  }
);