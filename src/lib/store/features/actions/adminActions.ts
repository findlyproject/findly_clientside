

import { createAsyncThunk } from "@reduxjs/toolkit";
import handleAsync from "@/utils/handleAsync";
import { AxiosResponse } from "axios";
import api from "@/utils/api";
import { AdminProfile, setAdmin } from "../adminSlice";

//login
interface LoginResponse {
  findAdmin: AdminProfile;
  }
  
  export const loginAdmin = createAsyncThunk(
    "auth/loginAdmin",
    async (
      state: { email: string; password: string },
      { dispatch, rejectWithValue }
    ) => {
      const response = await handleAsync<AxiosResponse<LoginResponse>>(() =>
        api.post("/admin/login", state)
      );
      console.log("response of admin login",response);
      
      if (!response) {
        return rejectWithValue("Login failed. Please try again.");
      }
      
  
      dispatch(setAdmin(response?.data?.findAdmin as AdminProfile));
      return response?.data?.findAdmin;
    }
  );