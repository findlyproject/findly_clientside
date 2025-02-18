
import api from "@/utils/api";
import handleAsync from "@/utils/handleAsync";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { setActiveCompany } from "../companyslice";


export const loginCompany=createAsyncThunk(
    "logincompany",
    async (formData:{email:string,password:string}, { dispatch, rejectWithValue }) => {
 
      console.log("formData",formData);
      
      const response = await handleAsync<AxiosResponse>(() => api.post("/company/login",{email:formData.email,password:formData.password}));
  

      if (!response) {
        return rejectWithValue("login failed")
      }
      const data= response.data.company
      dispatch(setActiveCompany(data))
  
  
    } 
  )