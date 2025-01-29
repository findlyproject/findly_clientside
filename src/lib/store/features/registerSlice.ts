import { createSlice } from "@reduxjs/toolkit";

interface RegisterType {
    email: string;
}

const initialState: RegisterType = {
  email: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setEmail: (state,action) => {
      state.email = action.payload; 
    },
  },
});

export const { setEmail } = registerSlice.actions;
export default registerSlice.reducer;
