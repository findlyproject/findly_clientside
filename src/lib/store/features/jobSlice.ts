import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  alljobs: string[];
}
const initialState = {
  allJobs: [],
};

const jobSlice = createSlice({
  name: "Job",
  initialState,
  reducers: {
    setjobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAlljobs: (state, action) => {
      state.allJobs = [...state.allJobs, ...action.payload];
    },
  },
});

export const { setjobs, setAlljobs } = jobSlice.actions;
export default jobSlice.reducer;
