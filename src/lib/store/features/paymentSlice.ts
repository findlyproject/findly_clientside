
import { createSlice } from "@reduxjs/toolkit";

interface PaymentState {
    clientsecret: string;
}

const initialState: PaymentState = {
    clientsecret: "",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setClientSecret: (state,action) => {
      state.clientsecret = action.payload; 
    },
  },
});

export const { setClientSecret } = paymentSlice.actions;
export default paymentSlice.reducer;
