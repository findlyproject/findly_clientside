// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface EditState {
//   firstName: string | null | undefined;
//   lastName: string | null | undefined;
//   email: string | null | undefined;
//   phoneNumber: string | null | undefined;
//   dateOfBirth: string | null | undefined;
//   banner: string | null | undefined;
//   profileImage: string | null | undefined;
//   about: string | null | undefined;
//   skills: string[] |[] | undefined;
//   education: string[] |[] | undefined;
//   jobLocation: string[] |[] | undefined;
//   jobTitle: string[] |[] | undefined;
//   projects: string[] |[] | undefined;
//   location: string[] |[] | undefined;
// }

// const initialState: EditState = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   phoneNumber: "",
//   dateOfBirth: "",
//   banner: "",
//   profileImage: "",
//   about: "",
//   skills: [],
//   education: [],
//   jobLocation: [],
//   jobTitle: [],
//   projects: [],
//   location: [],
// };

// const editSlice = createSlice({
//   name: "edit",
//   initialState,
//   reducers: {
//     setActive: (state, action: PayloadAction<Partial<EditState>>) => {
//       state.firstName = action.payload.firstName ;
//       state.lastName = action.payload.lastName ;
//       state.email = action.payload.email ;
//       state.phoneNumber = action.payload.phoneNumber ;
//       state.dateOfBirth = action.payload.dateOfBirth ;
//       state.banner = action.payload.banner ;
//       state.profileImage = action.payload.profileImage ;
//       state.about = action.payload.about 
//       state.skills = action.payload.skills ;
//       state.education = action.payload.education ;
//       state.jobLocation = action.payload.jobLocation ;
//       state.jobTitle = action.payload.jobTitle ;
//       state.projects = action.payload.projects ;
//       state.location = action.payload.location ;
//       console.log("sdhfjkdhkf",action.payload);
      
//     },
//     setEducation:(state,action: PayloadAction<Partial<EditState>>)=>{
//       state.education?.push(action.payload)
//     },
//     setRemoveEducation: (state, action: PayloadAction<number>) => {
//       state.education = state.education.filter((_, index) => index !== action.payload);
//     },
//     setjobLocations:(state, action: PayloadAction<number>)=>{
//       state.jobLocation?.push(action.payload)
//     },
//     setRemovejoblocation: (state, action: PayloadAction<number>)=>{
//       state.jobLocation=state.jobLocation?.filter((_, index)=>index !== action.payload)
//     },
//     setjobTItles:(state, action: PayloadAction<number>)=>{
//       state.jobTitle?.push(action.payload)
//     },
//     setRemovjobTItles: (state, action: PayloadAction<number>)=>{
//       state.jobTitle=state.jobTitle?.filter((_, index)=>index !== action.payload)
//     },
//     setLocation:(state, action: PayloadAction<number>)=>{
//       state.location?.push(action.payload)
//     },
//     setRemovlocation: (state, action: PayloadAction<number>)=>{
//       state.location=state.location?.filter((_, index)=>index !== action.payload)
//     },
//     setPersonalDetails: (state, action: PayloadAction<Partial<EditState>>) => {
//       state.firstName = action.payload.firstName ?? state.firstName;
//       state.lastName = action.payload.lastName ?? state.lastName;
//       state.email = action.payload.email ?? state.email;
//       state.phoneNumber = action.payload.phoneNumber ?? state.phoneNumber;
//       state.dateOfBirth = action.payload.dateOfBirth ?? state.dateOfBirth;
//       state.about = action.payload.about ?? state.about;
//     },
//     setProject: (state, action: PayloadAction<number>)=>{
//       state.projects?.push(action.payload)
//     },
//     setremovproject: (state, action: PayloadAction<number>)=>{
//       state.projects=state.projects?.filter((_, index)=>index !== action.payload)
//     },
//     setskils:(state, action: PayloadAction<number>)=>{
//       state.skills?.push(action.payload)
//     },
//     setRemovskils: (state, action: PayloadAction<number>)=>{
//       state.skills=state.skills?.filter((_, index)=>index !== action.payload)
//     },
    
//   },
// });

// export const { setActive,setEducation,setRemoveEducation,setjobLocations,setRemovejoblocation,setjobTItles,setRemovjobTItles,setLocation,setRemovlocation,setPersonalDetails,setProject,setremovproject,setskils,setRemovskils } = editSlice.actions;
// export default editSlice.reducer;
