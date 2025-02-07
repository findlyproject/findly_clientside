import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';
import { setActive, SetLogout, UserProfile } from '../userSlice';
import handleAsync from '@/utils/handleAsync';
import { AxiosResponse } from "axios";


interface LoginResponse {
  logeduser: UserProfile
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (state: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    const response = await handleAsync<AxiosResponse<LoginResponse>>(() => api.post("/user/login", state));
    if (!response) {
      return rejectWithValue("Login failed. Please try again.");
    }

    dispatch(setActive(response?.data?.logeduser as UserProfile));
    return response?.data?.logeduser;
  }
);


export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch, rejectWithValue }) => {
    
    const response = await handleAsync<AxiosResponse<LoginResponse>>(() => api.post("/user/logout"));

    if (!response) {
      return rejectWithValue("logout failed")
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




