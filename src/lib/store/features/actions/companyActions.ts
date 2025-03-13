
import api from "@/utils/api";
import handleAsync from "@/utils/handleAsync";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { setActiveCompany, setAppliedUsers, setCompanyLogOut } from "../companyslice";
import { setforgotPassword } from "../companyslice";
import { resetPostState } from "../postSlice";
import { Rating } from "../ratingSlice";
import { ReviewInput } from "@/components/company/CompanyDeatailsPage";
import { modalProps } from "@/components/company/JobPostModal";


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
  
      dispatch(setCompanyLogOut())
      dispatch(resetPostState())
  return null
     
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
          const response = await handleAsync<AxiosResponse>(() => api.post(`/company/sendotp/${state.email}`));
          if(!response){
            return rejectWithValue("dd")
          }

          console.log("responseottttpp",response);
          
          dispatch(setforgotPassword({ email: state.email, otp: response.data.otp }));
          return response.data;
       
      }
    )

    export const applicatioAproving = createAsyncThunk(
      "application/approve",
      async (
        { userId, jobId, offerLetter }: { userId?: string; jobId?: string; offerLetter: string },
        { rejectWithValue }
      ) => {
        if (!userId || !jobId) {
          return rejectWithValue("Invalid userId or jobId");
        }
    
        const response = await handleAsync(() =>
          api.put(`/company/approve/${userId}/${jobId}`, { offerLetter })
        );
    
        if (!response || !response.data) {
          return rejectWithValue("Approving application failed.");
        }
    
        return response.data;
      }
    );


    export const applicatioRejecting = createAsyncThunk(
      "application/rejecting",
      async (
        { userId, jobId }: { userId?: string; jobId?: string; },
        { rejectWithValue }
      ) => {
        if (!userId || !jobId) {
          return rejectWithValue("Invalid userId or jobId");
        }
    
        const response = await handleAsync(() => api.put(`/company/reject-application/${userId}/${jobId}`));
    
        if (!response || !response.data) {
          return rejectWithValue("Approving application failed.");
        }
    
        return response.data;
      }
    );



    export const companyRegistration = createAsyncThunk(
      "company/registration",
      async (formData:FormData,{dispatch, rejectWithValue } ) => {

        const response = await handleAsync(() =>  api.post("/company/final-register", formData));
    
        if (!response || !response.data) {
          return rejectWithValue("Approving application failed.");
        }
        const data = response?.data.company;
        dispatch(setActiveCompany(data));
        return data;
      }
    );


    
    export const registerSendOtp = createAsyncThunk(
      "company/otp/register",
      async (values:{ name: string; email: string },{dispatch, rejectWithValue } ) => {

        const response = await handleAsync(() =>api.post("company/send-otp", values));
    
        if (!response || !response.data) {
          return rejectWithValue("send register otp failed.");
        }

        return response.data;
      }
    );


    export const verifyOtp = createAsyncThunk(
      "company/otp/verification",
      async (values:{ name: string; email: string; otp: string },{dispatch, rejectWithValue } ) => {

        const response = await handleAsync(() =>api.post("company/verify-otp", values));
    
        if (!response || !response.data) {
          return rejectWithValue("send register otp failed.");
        }

          const data = response.data.company;
              dispatch(setActiveCompany(data));

        return response.data;
      }
    );


    export const addReview = createAsyncThunk(
      "review/add",
      async ({route,rewies,rating,targetedId}:{route:string,rewies:ReviewInput,rating:number,targetedId:string},{ rejectWithValue } ) => {

        const response = await handleAsync(() =>api.post(`${route}/companyrating/${targetedId}`,{
          review:rewies.review,
          email:rewies.email,
          name:rewies.name,
          starsRating:rating
      }));
    
        if (!response || !response.data) {
          return rejectWithValue("adding review failed.");
        }

          const data = response;
           

        return data;
      }
    );


    export const deleteReview = createAsyncThunk(
      "review/delete",
      async ({route,id}:{route:string,id:string},{ rejectWithValue } ) => {

        const response = await handleAsync(() => api.delete(`/${route}/deletereview/${id}`));
    
        if (!response || !response.data) {
          return rejectWithValue("delete review failed.");
        }

          const data = response;
           

        return data;
      }
    );


    
    export const editJobDeadline = createAsyncThunk(
      "edit/deadline",
      async ({jobId,newDeadline}:{jobId:string,newDeadline:string},{ rejectWithValue } ) => {

        const response = await handleAsync(() =>api.post(`/company/editdeadline/${jobId}`, {
          applicationDeadline: newDeadline
        }));
    
        if (!response || !response.data) {
          return rejectWithValue("edit deadline failed.");
        }

          const data = response.data;
           

        return data;
      }
    );


    export const deleteJob = createAsyncThunk(
      "delete/job",
      async (jobId:string,{ rejectWithValue } ) => {

        const response = await handleAsync(() => api.delete(`/company/deletejobpost/${jobId}`));
    
        if (!response || !response.data) {
          return rejectWithValue("delete job failed.");
        }

          const data = response;
           

        return data;
      }
    );

    export const editProfile = createAsyncThunk(
      "edit/profile",
      async ({companyId,values}:{companyId?:string,values:any},{ dispatch,rejectWithValue } ) => {

        const response = await handleAsync(() => api.patch(
          `/company/edit/${companyId}`,
          values
        ));
    
        if (!response || !response.data) {
          return rejectWithValue("delete job failed.");
        }
        const data=response.data.company
        dispatch(setActiveCompany(data));
        return data;
      }
    );


    export const uploadLogo = createAsyncThunk(
      "upload/profile/logo",
      async ({companyId,formData}:{companyId?:string,formData:FormData},{ dispatch,rejectWithValue } ) => {

        const response = await handleAsync(() => api.patch(
          `/company/edit/logo/${companyId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        ));
    
        if (!response || !response.data) {
          return rejectWithValue("delete job failed.");
        }
        const data=response.data.company
 dispatch(setActiveCompany(data));
        return data;
      }
    );


    export const uploadBanner = createAsyncThunk(
      "upload/profile/banner",
      async ({companyId,formData}:{companyId?:string,formData:FormData},{ dispatch,rejectWithValue } ) => {

        const response = await handleAsync(() => api.patch(
          `/company/edit/banner/${companyId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        ));
    
        if (!response || !response.data) {
          return rejectWithValue("delete job failed.");
        }
        const data=response.data.company
        dispatch(setActiveCompany(data));
        return data;
      }
    );


    export const handleUnsavePosts = createAsyncThunk(
      "unsave/posts",
      async (postid:string,{ dispatch,rejectWithValue } ) => {

        const response = await handleAsync(() => api.post(`/company/save/${postid}`));
    
        if (!response || !response.data) {
          return rejectWithValue("delete job failed.");
        }
        const data=response.data
        dispatch(setActiveCompany(data));
        return data;
      }
    );

    export const handleSaveApplication = createAsyncThunk(
      "save/application",
      async (applicationId:string,{ rejectWithValue } ) => {

        const response = await handleAsync(() => api.post(`/company/saveapplication`,{
          applicationId
        }));
    console.log("ree",response);
    
        if (!response || !response.data) {
          return rejectWithValue("delete job failed.");
        }
     
      }
    );

    export const getSavedApplication = createAsyncThunk(
      "find/application",
      async (_,{ rejectWithValue } ) => {

        const response = await handleAsync(() => api.post(`/company/findsavedapplication`));
    console.log("ree finded",response);
    
        if (!response || !response.data) {
          return rejectWithValue("delete job failed.");
        }
     
      }
    );

    export const deleteApplcation = createAsyncThunk(
      "delete/application",
      async (applicationId:string,{rejectWithValue } ) => {

        const response = await handleAsync(() =>  api.delete(`/company/deleteapplication`, { data: { applicationId } }));
    console.log("ree finded",response);
    
        if (!response || !response.data) {
          return rejectWithValue("delete job failed.");
        }
     
      }
    );


    
    
    
    