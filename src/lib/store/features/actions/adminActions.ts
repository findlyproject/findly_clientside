

import { createAsyncThunk } from "@reduxjs/toolkit";
import handleAsync from "@/utils/handleAsync";
import { AxiosResponse } from "axios";
import api from "@/utils/api";
import { AdminProfile, setAdmin, setCompanies, setJOBTitles, setSkills } from "../adminSlice";

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

  export const fetchCompanies = createAsyncThunk(
    "find/companies",
    async (
      _,
      { dispatch, rejectWithValue }
    ) => {
      const response = await handleAsync<AxiosResponse>(() =>api.get("admin/companies"));
      if (!response) {
        return rejectWithValue("fetch company failed.");
      }

      const data=response.data.companies


      dispatch(setCompanies(data))
      return data
    }
  );


  export const handleBlock = createAsyncThunk(
    "block/companies",
    async (id:string,{ dispatch, rejectWithValue }
    ) => {
      const response = await handleAsync<AxiosResponse>(() =>api.patch(`/admin/blockandunblock/${id}`));
      if (!response) {
        return rejectWithValue("block company failed.");
      }
      const updatedUser = response.data.data;

    
return updatedUser
    }
  );

  export const showSkills = createAsyncThunk(
    "fetch/skills",
    async (_,{ dispatch, rejectWithValue }
    ) => {
      const response = await handleAsync<AxiosResponse>(() =>api.get(`/admin/allskills`));
      if (!response) {
        return rejectWithValue("block company failed.");
      }
      const data = response.data.skills
   console.log("dddddddd",data);
   
    dispatch(setSkills(data))
return data
    }
  );

  export const showSTitles = createAsyncThunk(
    "fetch/titles",
    async (_,{ dispatch, rejectWithValue }
    ) => {
      const response = await handleAsync<AxiosResponse>(() =>api.get(`/admin/alladmin`));
      if (!response) {
        return rejectWithValue("block company failed.");
      }
      const data = response.data.titles
   console.log("dddddddd",data);
   
    dispatch(setJOBTitles(data))
return data
    }
  );


  
  export const editSkill = createAsyncThunk(
    "edit/skills",
    async ({skill,editingSkill}:{skill:string,editingSkill:string },{ dispatch, rejectWithValue }
    ) => {
      const response = await handleAsync<AxiosResponse>(() => api.patch(`/admin/editskill/${editingSkill}`, {
        newskill: skill,
      }));
      if (!response) {
        return rejectWithValue("block company failed.");
      }
      const data = response.data.skills

   
return data
    }
  );

    
  export const postSkill = createAsyncThunk(
    "post/skills",
    async (formattedSkill:string,{ dispatch, rejectWithValue }
    ) => {
      const response = await handleAsync<AxiosResponse>(() =>api.post(`/admin/addskill`, {
        name: formattedSkill,
      }));
      if (!response) {
        return rejectWithValue("block company failed.");
      }
      const data = response.data.skills

   
return data
    }
  );


  export const editTitle = createAsyncThunk(
    "edit/Title",
    async ({titles,titleEditing}:{titles:string,titleEditing:string },{ dispatch, rejectWithValue }
    ) => {
      const response = await handleAsync<AxiosResponse>(() => api.patch(`/admin/edittitle/${titleEditing}`, {
        newTitle: titles,
      }));
      if (!response) {
        return rejectWithValue("block company failed.");
      }
      const data = response.data.skills

   
return data
    }
  );

  export const postTitle = createAsyncThunk(
    "post/Title",
    async (formattedTitles:string,{ dispatch, rejectWithValue }
    ) => {
      const response = await handleAsync<AxiosResponse>(() => api.post(`/admin/addtitle`, {
        name: formattedTitles,
      }));
      if (!response) {
        return rejectWithValue("block company failed.");
      }
      const data = response.data

   
return data
    }
  );





