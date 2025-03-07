import api from "@/utils/api";
import handleAsync from "@/utils/handleAsync";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { setMembers } from "../communitySlice";



export const findnMembers=createAsyncThunk(
    "findmessage",
    async(_,{dispatch,rejectWithValue})=>{
        const response=await handleAsync<AxiosResponse>(()=>api.get(`/connecting/getconnection`))
        if(!response){
            return rejectWithValue("members listing failed")
        }
        console.log("response",response);
        
      if(response.status===200){
        dispatch(setMembers(response.data.connections))
        // setMembers(response.data.connections);
      }
       

    }

)