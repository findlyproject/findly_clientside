import { createSlice } from "@reduxjs/toolkit"


interface loginType {
    activeuser:{firstName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber?: string;
        dateOfBirth?: Date;
        location?: string;
        profileImage?: string;
        banner?: string;
        skills?: string[];
        jobTitle?: string[];
        jobLocation?: string[];
      
        education: {
          qualification: string;
          startYear: string;
          endYear: string;
          location: string;
        };
      
        projects?: {
          title: string;
          description: string;
          link?: string;
        }[];
      
        connecting: mongoose.Types.ObjectId[],
      
        about?: string;
      
        resume?: {
          fileUrl: string;
          type: "PDF" | "Video";
          uploadedAt?: Date;
        }[];
        role:"user"|"premium",
        subscriptionEndDate: Date | null,
        subscriptionStartDate: Date | null,
      
        coverLetter?: string;
        isBlocked?: boolean;
        _id: string;},
}
const state = localStorage.getItem("user")

const initialState:loginType={
    activeuser:state,
}


const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers: {
        setActive: (state,actions) => {
          state.activeuser = actions.payload; 
        },
    }

})



export const {setActive} = loginSlice.actions;
export default loginSlice.reducer