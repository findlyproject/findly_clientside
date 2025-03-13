import api from "@/utils/api";
import handleAsync from "@/utils/handleAsync";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";




export const helpeAndContact = createAsyncThunk(
    "contact/client",
    async ({email,message}:{email:string,message:string}, { rejectWithValue }) => {
     
        const response = await handleAsync<AxiosResponse>(() =>api.post(`/user/emailus`, {
            email: email,
            message,
          }));
  
        if (!response) {
          return rejectWithValue(" report failed. Please try again.");
        }
    
        return response.data;
  
    }
  );