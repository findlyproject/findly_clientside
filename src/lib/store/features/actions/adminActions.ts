

import { createAsyncThunk } from "@reduxjs/toolkit";
import handleAsync from "@/utils/handleAsync";
import { AxiosResponse } from "axios";
import api from "@/utils/api";
import { AdminProfile, setAdmin } from "../adminSlice";
//login
interface LoginResponse {
    findadmin: AdminProfile;
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
      if (!response) {
        return rejectWithValue("Login failed. Please try again.");
      }
  
      dispatch(setAdmin(response?.data?.findadmin as AdminProfile));
      return response?.data?.findadmin;
    }
  );