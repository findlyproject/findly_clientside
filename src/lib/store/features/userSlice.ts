import { createSlice,PayloadAction  } from "@reduxjs/toolkit";

interface UserState {
    details:object[];
}

const initialState: UserState = {
    details : [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetailes: (state,action:PayloadAction<object[]>) => {
      state.details  = action.payload
    },
  },
});

export const { setUserDetailes } = userSlice.actions;
export default userSlice.reducer;
