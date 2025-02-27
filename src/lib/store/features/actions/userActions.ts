
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { setActive, setConnectionRequest, setforgotPassword, SetLogout, setPeopleKnow, UserProfile } from "../userSlice";
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
      location:{country: string,
        countryName: string,
        state: string,
        stateName: string,
        city: string};
        gender:string;
      education: { college: string; startYear: string; endYear: string }[];
      jobTitle: string[];
      jobLocation:{country: string,
        countryName: string,
        state: string,
        stateName: string,
        city: string}[]
    },
    { dispatch, rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse<RegisterResponse>>(() =>
      api.post("/user/registration", state)
    );
    if (!response) {
      return rejectWithValue("registration falied.please try again.");
    }
    dispatch(setActive(response?.data?.user as UserProfile));
    return response?.data?.user;
  }
);


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

            ///////////////// GOOLE AUTH LOGIN ////////////////

export const googlloginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: { email: string; name: string; image: string }, { dispatch, rejectWithValue }) => {
    const response = await  api.post("/user/googleauthlogin", data);
    if (!response) {
      return rejectWithValue("Login failed. Please try again.");
    }
    dispatch(setActive(response?.data?.finduser as UserProfile));
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
    dispatch(SetLogout());
    const status: number = response.status;
    if (status >= 200 && status < 300) {
     
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

      dispatch(setAllRatings([response.data.newRating]));
      return response.data.newRating;
    } catch {
      return rejectWithValue("An error occurred while submitting the rating.");
    }
  }
);



//request to connect
interface ConnectRequestResponse {
  finduser: UserProfile;
}

export const connectionRequest = createAsyncThunk(
  "auth/connectionRequest",
  async (
    { id, connecting }: { id: string; connecting: { connectionID: string; status: boolean }[] },
    { dispatch, rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse<ConnectRequestResponse>>(() =>
      api.post(`/connecting/conectting/${id}`, { connecting })
    );
    if (!response) {
      return rejectWithValue("Login failed. Please try again.");
    }

    dispatch(setConnectionRequest(response?.data?.finduser as UserProfile));
    return response?.data?.finduser;
  }
);


export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (state: { email: string }, { dispatch, rejectWithValue }) => {
    try {
      console.log("loginmail",state.email)
      const response = await api.post(`/user/sendotp/${state.email}`);
      dispatch(setforgotPassword({ email: state.email, otp: response.data.otp }));
      return response.data;
    } catch {
      return rejectWithValue("An error occurred while submitting the rating.");
    }
  }
)

// fetch the people might i know
export const fetchPeopleKnow = createAsyncThunk(
  "post/fetchPeopleKnow",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<{ suggestedUsers: UserProfile[] }> = await api.get(
        "/user/people-you-might-know"
      );

      if (!response.data || !response.data.suggestedUsers) {
        return rejectWithValue("No user found");
      }

      dispatch(setPeopleKnow(response.data.suggestedUsers)); // ✅ Update Redux store
      return response.data.suggestedUsers;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return rejectWithValue("Failed to fetch posts.");
    }
  }
);