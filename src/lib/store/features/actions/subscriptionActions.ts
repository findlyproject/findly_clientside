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
    async ({plan,route}:{plan:Plan,route:string},{ dispatch, rejectWithValue }) => {
      console.log("plan",plan);
      console.log("route",route);
      
      const response = await handleAsync<AxiosResponse>(() => api.post(`/${route}/payment/createSubscription`,{ 
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
    async ({sessionId,route}:{sessionId:string,route:string}, { dispatch, rejectWithValue }) => {
      
      const response = await handleAsync<AxiosResponse>(() =>api.post(`/${route}/payment/findsubscriptionbyId/${sessionId}`));
  
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
    async({sessionId,route}:{sessionId:string,route:string},{dispatch,rejectWithValue})=>{
        const response=await handleAsync<AxiosResponse>(()=>api.post(`/${route}/payment/verifySubscription/${sessionId}`))
       

        if(!response){
            rejectWithValue("verification failed")
        }
        const  features=response?.data.subscription
        const  account=response?.data.accountInfo
     dispatch(setSubscription(features))
     dispatch(setActive(account))
    }
  )