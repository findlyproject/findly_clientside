
import api from "@/utils/api";
import handleAsync from "@/utils/handleAsync";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
<<<<<<< HEAD
import { setActiveCompany, setCompanyLogOut } from "../companyslice";
=======
import { setActiveCompany, setAppliedUsers, setCompanyLogOut } from "../companyslice";
>>>>>>> 0e7888464bd06148eee8a0fd7563175062a8f8d6


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
<<<<<<< HEAD
=======

    export const applicationList=createAsyncThunk(
      "applicationlist",
      async(_,{dispatch,rejectWithValue})=>{
 
        const response = await handleAsync<AxiosResponse>(() => api.get("/company/findapplications"));
        if(!response){
          return rejectWithValue("logout failed")
        }
        console.log("response",response);
        const data=response.data.appliedUsers       
        dispatch(setAppliedUsers(data)) 
        

       
      }
    )
>>>>>>> 0e7888464bd06148eee8a0fd7563175062a8f8d6
  