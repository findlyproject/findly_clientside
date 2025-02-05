import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api'; // Assuming the API is set up
import { setActive, SetLogout } from '../userSlice';

// login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (state: { email: string; password: string}, { dispatch, rejectWithValue }) => {
   
    try {
      const response = await api.post("/user/login", state);
      console.log("response",response.data?.logeduser)
    
      dispatch(setActive(response?.data?.logeduser));
      return response?.data?.logeduser; 
    } catch (error: any) {
      console.error("Login error:", error);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/user/logout");
      if (response.status >= 200 && response.status < 300) {
        dispatch(SetLogout()); 
        localStorage.removeItem("user"); 
        return null;
      } else {
        throw new Error("Logout failed");
      }
    } catch (error: any) {
      // Handling logout errors
      console.error("Logout error:", error);
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);
