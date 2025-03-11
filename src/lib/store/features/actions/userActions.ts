
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { setActive, setConnectionRequest, setforgotPassword, SetLogout, setPeopleKnow, setSavedJobs, UserProfile } from "../userSlice";
import handleAsync from "@/utils/handleAsync";
import { AxiosResponse } from "axios";
import {setAllRatings,Rating} from '../ratingSlice'
import { toast } from "react-toastify";
import { setAlljobs } from "../jobSlice";
import { resetPostState } from "../postSlice";

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
    const status: number = response.status;
    if (status >= 200 && status < 300) {
    dispatch(SetLogout());
     dispatch(resetPostState())
     
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

      dispatch(setPeopleKnow(response.data.suggestedUsers)); 
      return response.data.suggestedUsers;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return rejectWithValue("Failed to fetch posts.");
    }
  }
);

// get saved jobs//


export const fetchSavedJobs = createAsyncThunk<UserProfile[],number,{rejectWithValue:string}>(
  "/user/getsavedjobs",
  async (page, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<{ suggestedUsers: UserProfile[] }> = await api.get(
        `/user/getsavedjobs?page=${page}`
      );
      
      if (!response.data.data || !response.data.data) {
        return rejectWithValue("No user found");
      }
      dispatch(setSavedJobs(response.data?.data)); 
      return response.data.suggestedUsers;
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
      dispatch(setSavedJobs([])); 
      return rejectWithValue("Failed to fetch saved jobs.");
    }
  }
);

// save jobs 

interface SaveJobsResponse {
  message: string;
}

export const saveJobs = createAsyncThunk<SaveJobsResponse,string, { rejectValue: string }>(
  "/user/savejobs",
  async (id, { dispatch,rejectWithValue }) => {
    try {
      const response: AxiosResponse<{ suggestedUsers: UserProfile[] }> = await api.post(
       `/user/saveJobs/${id}`
      );
      dispatch(fetchSavedJobs())
      toast.success(response.data.message)
      return response.data;
    } catch (error) {
      console.error("Error save job:", error);
      return rejectWithValue("Failed to save job.");
    }
  }
);


export const deleteAccount = createAsyncThunk(
  "delete/account",
  async (route:string, { rejectWithValue }) => {
    try {
      const response = await handleAsync<AxiosResponse<RatingResponse>>(() =>api.post(`/${route}/accountdeletionreqst`));

      if (!response) {
        return rejectWithValue("delete account failed. Please try again.");
      }


      return response.data;
    } catch {
      return rejectWithValue("An error occurred while submitting the rating.");
    }
  }
);


export const deleteAccountVerification = createAsyncThunk(
  "delete/account/verification",
  async ({otp,reasonStrings,route}:{otp:string,reasonStrings:string[],route:string}, { rejectWithValue }) => {
   
      const response = await handleAsync<AxiosResponse<RatingResponse>>(() =>api.post(`/${route}/verifyOtp`, {
        otp,
        reasons: reasonStrings,
      }));

      if (!response) {
        return rejectWithValue(" account verification failed. Please try again.");
      }


      return response.data;

  }
);