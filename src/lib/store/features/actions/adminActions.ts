

import { createAsyncThunk } from "@reduxjs/toolkit";
import handleAsync from "@/utils/handleAsync";
import { AxiosResponse } from "axios";
import api from "@/utils/api";
import {  setAdmin, setCompanies, setJOBTitles, setReviews, setSkills, setUsers } from "../adminSlice";
import { Admin } from "@/types/Types";

//login
interface LoginResponse {
  findAdmin: Admin;
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
    console.log("response of admin login", response);

    if (!response) {
      return rejectWithValue("Login failed. Please try again.");
    }


    dispatch(setAdmin(response?.data?.findAdmin as Admin));
    return response?.data?.findAdmin;
  }
);

export const logOutAdmin = createAsyncThunk(
  "auth/logoutAdmin",
  async (
    _, { dispatch, rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse<LoginResponse>>(() =>
      api.post("/admin/logout")
    );


    if (!response) {
      return rejectWithValue("Logout failed. Please try again.");
    }


    dispatch(setAdmin(null));
    return response?.data?.findAdmin;
  }
);


export const fetchCompanies = createAsyncThunk(
  "find/companies",
  async (
    _,
    { dispatch, rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.get("admin/companies"));
    if (!response) {
      return rejectWithValue("fetch company failed.");
    }

    const data = response.data.companies
   

    dispatch(setCompanies(data))
    return data
  }
);
export const fetchUsers = createAsyncThunk(
  "find/uses",
  async (
    _,
    { dispatch, rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.get("admin/users"));
    if (!response) {
      return rejectWithValue("fetch users failed.");
    }

    const data = response.data.users


    dispatch(setUsers(data))
    return data
  }
);

export const blockUser = createAsyncThunk(
  "block/uses",
  async (
    id: string,
    { rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.patch(`/admin/blockandunblock/${id}`));
    if (!response) {
      return rejectWithValue("blocking the user failed.");
    }

    const data = response.data


    return data
  }
);


export const handleBlock = createAsyncThunk(
  "block/companies",
  async (id: string, { rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.patch(`/admin/block/${id}`));
    if (!response) {
      return rejectWithValue("block company failed.");
    }
    const updatedCompany = response.data.data;


    return updatedCompany
  }
);

export const showSkills = createAsyncThunk(
  "fetch/skills",
  async (_, { dispatch, rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.get(`/admin/allskills`));
    if (!response) {
      return rejectWithValue("fetch skills failed.");
    }
    const data = response.data.skills
    console.log("dddddddd", data);

    dispatch(setSkills(data))
    return data
  }
);

export const showSTitles = createAsyncThunk(
  "fetch/titles",
  async (_, { dispatch, rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.get(`/admin/alladmin`));
    if (!response) {
      return rejectWithValue("d=fetch titles failed.");
    }
    const data = response.data.titles
    console.log("dddddddd", data);

    dispatch(setJOBTitles(data))
    return data
  }
);



export const editSkill = createAsyncThunk(
  "edit/skills",
  async ({ skill, editingSkill }: { skill: string, editingSkill: string }, { rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.patch(`/admin/editskill/${editingSkill}`, {
      newskill: skill,
    }));
    if (!response) {
      return rejectWithValue("edit skill failed.");
    }
    const data = response.data.skills


    return data
  }
);


export const postSkill = createAsyncThunk(
  "post/skills",
  async (formattedSkill: string, { rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.post(`/admin/addskill`, {
      name: formattedSkill,
    }));
    if (!response) {
      return rejectWithValue("post skill failed.");
    }
    const data = response.data.skills


    return data
  }
);


export const editTitle = createAsyncThunk(
  "edit/Title",
  async ({ titles, titleEditing }: { titles: string, titleEditing: string }, { rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.patch(`/admin/edittitle/${titleEditing}`, {
      newTitle: titles,
    }));
    if (!response) {
      return rejectWithValue("edit title failed.");
    }
    const data = response.data.skills


    return data
  }
);

export const postTitle = createAsyncThunk(
  "post/Title",
  async (formattedTitles: string, { rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.post(`/admin/addtitle`, {
      name: formattedTitles,
    }));
    if (!response) {
      return rejectWithValue("post title failed.");
    }
    const data = response.data


    return data
  }
);

export const handleApproveSkill = createAsyncThunk(
  "approve/skills",
  async (skillid: string, { rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.patch(`/admin/approveskill/${skillid}`));
    if (!response) {
      return rejectWithValue("approved skills failed.");
    }
    const data = response.data


    return data
  }
);


export const handleApproveTitle = createAsyncThunk(
  "approve/title",
  async (titleid: string, { rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.patch(`/admin/approvetitle/${titleid}`));
    if (!response) {
      return rejectWithValue("approved title failed.");
    }
    const data = response.data


    return data
  }
);

export const handleRemoveTitle = createAsyncThunk(
  "remove/title",
  async (titleId: string, { rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.patch(`/admin/removetitle/${titleId}`));
    if (!response) {
      return rejectWithValue("title removing failed.");
    }
    const data = response.data


    return data
  }
);



export const handleRemoveSkill = createAsyncThunk(
  "remove/skill",
  async (skillId: string, { rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.patch(`/admin/removeskill/${skillId}`));
    if (!response) {
      return rejectWithValue(" skill removing failed.");
    }
    const data = response.data


    return data
  }
);



export const editAdminProfile = createAsyncThunk(
  "edit/admin",
  async (formDataToSend: FormData, { dispatch, rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.patch(`/admin/editprofile`, formDataToSend, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }));
    if (!response) {
      return rejectWithValue("admin edit profile  failed.");
    }
    const data = response.data.admin
    dispatch(setAdmin(data))

    return data
  }
);

export const adminRemoveRating = createAsyncThunk(
  "remove/reviews",
  async (ratingID: string, { rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.patch(`/admin/remove/${ratingID}`));
    if (!response) {
      return rejectWithValue("admin edit profile  failed.");
    }
    const data = response.data


    return data
  }
);

export const adminApproveReviews = createAsyncThunk(
  "approve/reviews",
  async (id: string, { rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.patch(`/admin/approve/${id}`));
    if (!response) {
      return rejectWithValue("admin remove reviews failed.");
    }
    const data = response.data


    return data
  }
);



export const findlyReviews = createAsyncThunk(
  "reviews/findly",
  async (_, { dispatch, rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.get(`/admin/ratings`));
    if (!response) {
      return rejectWithValue("review finding failed.");
    }
    const data = response.data.ratings


    dispatch(setReviews(data))

    return data
  }
);



export const adminDeletePost = createAsyncThunk(
  "delete/post",
  async (postId: string, { dispatch, rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.patch(`admin/deletepost/${postId}`, {
      isDeleted: true,
    }));
    if (!response) {
      return rejectWithValue("post deleting failed.");
    }
    const data = response.data.ratings


    dispatch(setReviews(data))

    return data
  }
);


export const removeReports = createAsyncThunk(
  "remove/reports",
  async (reportId: string, { rejectWithValue }
  ) => {
    const response = await handleAsync<AxiosResponse>(() => api.post(`/admin/dismissreports/${reportId}`));
    if (!response) {
      return rejectWithValue("report deleting failed.");
    }
    const data = response.data.report

    return data
  }
);




