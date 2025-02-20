

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 export interface Rating {
  _id: string;
  review: string;
  starsRating: number;
  userId: {
    firstName: string;
    lastName: string;
    profileImage?: string; 
    jobTitle?: string; 
  };
}

interface RatingState {
  ratings: Rating[];
}

const initialState: RatingState = {
  ratings: [], 
};

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    setAllRatings: (state, action: PayloadAction<Rating[]>) => {
      state.ratings = action.payload;
    },
    removeRating: (state, action: PayloadAction<string>) => {
      state.ratings = state.ratings.filter((rating) => rating._id !== action.payload);
    },
    approveRating:(state,action:PayloadAction<string>)=>{
      state.ratings = state.ratings.map((rating) => rating._id === action.payload?{ ...rating, status: true } : rating);

      console.log(" state.ratings", state.ratings);
      
    }
  },
});

export const { setAllRatings,removeRating,approveRating } = ratingSlice.actions;
export default ratingSlice.reducer;
