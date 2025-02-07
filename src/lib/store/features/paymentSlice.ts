
// import { createSlice } from "@reduxjs/toolkit";

// interface PaymentState {
//     clientsecret: string;
// }

// const initialState: PaymentState = {
//     clientsecret: "",
// };

// const paymentSlice = createSlice({
//   name: "payment",
//   initialState,
//   reducers: {
//     setClientSecret: (state,action) => {
//       state.clientsecret = action.payload; 
//       console.log("secret",state.clientsecret)
//     },
    
//   },
// });

// export const { setClientSecret } = paymentSlice.actions;
// export default paymentSlice.reducer;


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
      console.log("secret", state.clientsecret);
    },
    setSubscription: (state, action: PayloadAction<SubscriptionData>) => {
      state.subscription = action.payload;
      console.log("Subscription Data:", state.subscription);
    },
  },
});

export const { setClientSecret, setSubscription } = paymentSlice.actions;
export default paymentSlice.reducer;
