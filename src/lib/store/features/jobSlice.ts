


// import { createSlice } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

// interface ThemeState {
//   dark: boolean;
// }  

// const initialState: ThemeState = {
//   dark: false,
// };

// const themeSlice = createSlice({
//   name: "theme",
//   initialState,
//   reducers: {
//     toggleTheme: (state) => {
//       state.dark = !state.dark; 
//     },
//   }, 
// });

// export const { toggleTheme } = themeSlice.actions;
// export default themeSlice.reducer;
interface initialState {
    alljobs: string[],
}
const initialState = {
    allJobs:[]
}

const jobSlice = createSlice({
    name:"Job",
    initialState,
    reducers:{
        setjobs :(state,action)=>{
            state.allJobs = action.payload
        },
        setAlljobs :(state,action)=>{
            state.allJobs= [...state.allJobs, ...action.payload]; 
          }
    }
})


export const {setjobs,setAlljobs} = jobSlice.actions;
export default jobSlice.reducer