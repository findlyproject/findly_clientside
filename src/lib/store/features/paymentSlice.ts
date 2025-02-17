
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubscriptionData {
  clientSecret: string;
  features: string;
  plan: string;
  price: number;
  paymentStatus: string;
  startDate: string;
  endDate: string;
  userId: string;
  sessionId: string;
  companyId:string
}

interface PaymentState {
  clientsecret: string;
  subscription: SubscriptionData | null;
}

const initialState: PaymentState = {
  clientsecret: "",
  subscription: null, 
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setClientSecret: (state, action: PayloadAction<string>) => {
      state.clientsecret = action.payload;
     
    },
    setSubscription: (state, action: PayloadAction<SubscriptionData>) => {
      state.subscription = action.payload;
  
    },
  },
});

export const { setClientSecret, setSubscription } = paymentSlice.actions;
export default paymentSlice.reducer;
