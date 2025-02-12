

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

import handleAsync from "@/utils/handleAsync";
import { AxiosResponse } from "axios";
import { setRemoveResume, setResume } from "../userSlice";


export const postresume = createAsyncThunk(
  "post/resume",
  async (formData:FormData, { dispatch, rejectWithValue }) => {
    const response = await handleAsync<AxiosResponse>(() =>
      api.post("/user/uploadressume", formData)
    );
console.log("formData",formData);

    if (!response) {
      return rejectWithValue("logout failed");
    }

    const status: number = response.status;
    if (status >= 200 && status < 300) {
     console.log("respomce",response);
     const resume=response.data.user.resumePDF
     const introductionVideo=response.data.user.resumeVideo
     dispatch(setResume({ resumePDF: resume, resumeVideo: introductionVideo }));
     
      return null;
    } else {
      throw new Error("resume uploaded failed");
    }
  }
);

export const removeResume = createAsyncThunk(
  "remove/resume",
  async (type:string, { dispatch, rejectWithValue }) => {
    const response = await handleAsync<AxiosResponse>(() =>
      api.delete(`/user/removeresume?fileType=${type}`)
    );
console.log("formData",type);

    if (!response) {
      return rejectWithValue("logout failed");
    }

    const status: number = response.status;
    if (status >= 200 && status < 300) {
     console.log("respomce",response);
    dispatch(setRemoveResume(type))
      return null;
    } else {
      throw new Error("resume removed failed");
    }
  }
);