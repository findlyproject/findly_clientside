import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';
import handleAsync from '@/utils/handleAsync';
import { AxiosResponse } from "axios";


import { setClientSecret, setSubscription } from '../paymentSlice';
import { setActive } from '../userSlice';

interface Plan {
    id: number;
    name: string;
    price: number;
    features: string[];
    popular?: boolean;
    bgColor: string;
  }

export const subscription=createAsyncThunk(
    "subscription",
    async (plan:Plan, { dispatch, rejectWithValue }) => {
      console.log("plan",plan);
      
      const response = await handleAsync<AxiosResponse>(() => api.post("/payment/createSubscription",{ 
        plan: plan.name,
        price: plan.price,
        features: plan.features,
      
      }));
  
  console.log("subscrio",response)
      if (!response) {
        return rejectWithValue("subscription  failed")
      }
      const clientSecret= response?.data?.clientSecret
  
  
      dispatch(setClientSecret(clientSecret))
  
  
    } 
  )



  export const features=createAsyncThunk(
    "features",
    async (sessionId:string, { dispatch, rejectWithValue }) => {
      
      const response = await handleAsync<AxiosResponse>(() =>api.post(`/payment/findsubscriptionbyId/${sessionId}`));
  
  console.log("subscrio",response)
      if (!response) {
        return rejectWithValue("subscription  failed")
      }
     const  features=response.data.subscription

     console.log("features",features)
  dispatch(setSubscription(features))
  
  
    } 
  )

  export const verification=createAsyncThunk(
    "verification",
    async(sessionId:string,{dispatch,rejectWithValue})=>{
        const response=await handleAsync<AxiosResponse>(()=>api.post(`/payment/verifySubscription/${sessionId}`))
       

        if(!response){
            rejectWithValue("verification failed")
        }
        const  features=response?.data.subscription
        const  account=response?.data.accountInfo
     dispatch(setSubscription(features))
     dispatch(setActive(account))
    }
  )