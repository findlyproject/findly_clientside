
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { setActive, setConnectionRequest, setforgotPassword, SetLogout, setPeopleKnow, setSavedJobs,  } from "../userSlice";
import handleAsync from "@/utils/handleAsync";
import { AxiosResponse } from "axios";
import {setAllRatings,Rating} from '../ratingSlice'
import { resetPostState } from "../postSlice";
import { User } from "@/types/Types";

//register
interface RegisterResponse {
  user: User
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
    dispatch(setActive(response?.data?.user as User));
    return response?.data?.user;
  }
);


interface LoginResponse {
  logeduser: User;
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

    dispatch(setActive(response?.data?.logeduser as User));
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
    dispatch(setActive(response?.data?.finduser as User));
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
  finduser: User;
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

    dispatch(setConnectionRequest(response?.data?.finduser as User));
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

//update profile//

// Update Banner
export const updateBanner = createAsyncThunk(
  "user/updateBanner",
  async (banner: string, { dispatch,rejectWithValue }) => {
    try {
      const response = await handleAsync<AxiosResponse<RegisterResponse>>(() => api.put(
        `user/update-banner`,
        { banner },
      ));
      console.log("response",response)
      dispatch(setActive(response?.data.user));
      return response?.data;

    } catch  {
      return rejectWithValue("the banner not updated");
    }
  }
);

// Update Profile Image
export const updateProfileImage = createAsyncThunk(
  "user/updateProfileImage",
  async (profileImage: string, { dispatch,rejectWithValue }) => {
    try {
      const response = await handleAsync<AxiosResponse<RegisterResponse>>(() => api.put(
      
        `user/update-profile-image`,
        { profileImage },
      ));
      dispatch(setActive(response?.data.user));
      return response?.data.user;
    } catch {
      return rejectWithValue("the profileimage not updated");
    }
  }
);

// Update Personal Details
export const updateBasicInfo = createAsyncThunk(
  "user/updateBasicInfo",
  async (basicInfo: object, {dispatch, rejectWithValue }) => {
    try {
      const response = await handleAsync<AxiosResponse<RegisterResponse>>(() => api.put(
     
        `user/update-basic-info`,
        basicInfo,
      ));
      dispatch(setActive(response?.data.user));
      return response?.data.user;
    } catch  {
      return rejectWithValue("proffessional detail not updated");
    }
  }
);

// Update Professional Details
export const updateOtherDetails = createAsyncThunk(
  "user/updateOtherDetails",
  async (otherDetails: object, {dispatch, rejectWithValue }) => {
    try {
      console.log(otherDetails)
      const response = await handleAsync<AxiosResponse<RegisterResponse>>(() => api.put(

        `user/update-other-details`,
        otherDetails,
      ));
      dispatch(setActive(response?.data.user));
      return response?.data.user;
    } catch {
      return rejectWithValue("professional details not updated");
    }
  }
);

//update profile//


// fetch the people might i know
export const fetchPeopleKnow = createAsyncThunk(
  "post/fetchPeopleKnow",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<{ suggestedUsers: User[] }> = await api.get(
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


export const fetchSavedJobs = createAsyncThunk(
  "/user/getsavedjobs",
  async (page:number, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<{ data: User[] }> = await api.get(
        `/user/getsavedjobs?page=${page}`
      );
      if (!response.data.data || !response.data.data) {
        return rejectWithValue("No user found");
      }
      dispatch(setSavedJobs(response.data?.data)); 
      return response.data.data;
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
      dispatch(setSavedJobs([])); 
      return rejectWithValue("Failed to fetch saved jobs.");
    }
  }
);


export const saveJobs = createAsyncThunk(
  "/user/savejobs",
  async (_id:string, {rejectWithValue }) => {
    try {
      const response: AxiosResponse<{ data: User[] }> = await api.post(
       `/user/saveJobs/${_id}`
      );
      console.log("response",response)
      // dispatch(fetchSavedJobs())
      // toast.success(response.data.message)
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

export const savePosts = createAsyncThunk(
  "save/posts",
  async ({postId,route}:{postId:string,route:string}, { rejectWithValue }) => {
   
      const response = await handleAsync<AxiosResponse>(() =>api.post(`/${route}/save/${postId}`));

      if (!response) {
        return rejectWithValue(" save post failed. Please try again.");
      }


      return response.data;

  }
);


export const reportPost = createAsyncThunk(
  "report/posts",
  async ({reason,postId,route}:{reason:string,postId:string,route:string}, { rejectWithValue }) => {
   
      const response = await handleAsync<AxiosResponse>(() =>api.post(`/post/${route}/reportpost`, {
        reason: reason,
        postId,
      }));

      if (!response) {
        return rejectWithValue(" report failed. Please try again.");
      }
  
      return response.data;

  }
);



export const reportUser = createAsyncThunk(
  "report/user",
  async ({reason,repoteduserid}:{reason:string,repoteduserid:string}, { rejectWithValue }) => {
   
      const response = await handleAsync<AxiosResponse>(() =>api.post(`/user/reportuser`, {
        reason: reason,
        repoteduserid:repoteduserid,
      }));

      if (!response) {
        return rejectWithValue(" report failed. Please try again.");
      }
  
      return response.data;

  }
);



