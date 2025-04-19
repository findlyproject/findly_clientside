
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Subscription } from "@/types/Types";


interface PaymentState {
  clientsecret: string;
  subscription: Subscription | null;
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
    setSubscription: (state, action: PayloadAction<Subscription>) => {
      state.subscription = action.payload;
  
    },
  },
});

export const { setClientSecret, setSubscription } = paymentSlice.actions;
export default paymentSlice.reducer;
