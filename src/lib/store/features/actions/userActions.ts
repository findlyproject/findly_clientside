// // store/actions/authActions.ts
// import { Dispatch } from "redux";
// import api from "../../../../utils/api"; 
// import handleAsync from "../../../../utils/handleAsync"
// import { setActive } from "../loginSlice";
// import { useAppDispatch } from "../../hooks";

  
import api from "../../../../utils/api";
import handleAsync from "../../../../utils/handleAsync";


import { AppDispatch } from "../..";
import { log } from "console";




export const LOGOUTUSER = "LOGOUT_USER";

  export const CLEAR_SAVED_FOLDERS = "CLEAR_SAVED_FOLDERS";

  
// export const logoutUser = (dispatch: AppDispatch) =>
//   handleAsync(async () => {
//     const response = await api.post("/user/logout");

//     console.log("response", response);
//     if (response.status >= 200 && response.status < 300) {
//         console.log("dfdsgd")
//       dispatch({ type: LOGOUTUSER });
//       dispatch({ type: CLEAR_SAVED_FOLDERS });
//     } else {
//       throw new Error(response.data?.message || "An error occurred");
//     }
//   });


  export const logoutUser=async()=>{
    const response = await api.post("/user/logout");
    console.log("response",response);
    

  }


