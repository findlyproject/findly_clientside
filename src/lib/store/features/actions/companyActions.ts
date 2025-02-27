
import api from "@/utils/api";
import handleAsync from "@/utils/handleAsync";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";



import { setActiveCompany, setAppliedUsers, setCompanyLogOut } from "../companyslice";
import { setforgotPassword } from "../companyslice";


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

  export const logOutCompany=createAsyncThunk(
    "logoutcompany",
    async (_,{ dispatch, rejectWithValue }) => {
 
 
      const response = await handleAsync<AxiosResponse>(() => api.post("/company/logout"));
  

      if (!response) {
        return rejectWithValue("logout failed")
      }
      console.log("logout response",response);
      
  
      dispatch(setCompanyLogOut())
  return true
     
    } )


    export const applicationList=createAsyncThunk(
      "applicationlist",
      async(_,{dispatch,rejectWithValue})=>{
 
        const response = await handleAsync<AxiosResponse>(() => api.get("/company/findapplications"));
        if(!response){
          return rejectWithValue("application failed")
        }
        console.log("response",response);
        const data=response.data.appliedUsers       
        dispatch(setAppliedUsers(data)) 
        

       
      }
    )


    export const forgotPassword = createAsyncThunk(
      "auth/forgotPassword",
      async (state: { email: string }, { dispatch, rejectWithValue }) => {
        
     console.log("state",state);
     
          const response = await handleAsync<AxiosResponse>(() => api.post(`/company/sendotp/${state.email}`));
          if(!response){
            return rejectWithValue("dd")
          }

          console.log("responseottttpp",response);
          
          dispatch(setforgotPassword({ email: state.email, otp: response.data.otp }));
          return response.data;
       
      }
    )
  