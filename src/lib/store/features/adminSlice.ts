
import { createSlice } from "@reduxjs/toolkit";



export interface AdminProfile {
  email:string
  password:string
}
 interface AdminState{
admin:AdminProfile|null
 }
const initialState: AdminState = {
  admin:null
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state,action) => {
      state.admin = action.payload
    },
  }, 
});

export const { setAdmin } = adminSlice.actions;
export default adminSlice.reducer;
