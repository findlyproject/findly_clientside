// store/actions/authActions.ts
import { Dispatch } from "redux";
import api from "../../../../utils/api"; 
import handleAsync from "../../../../utils/handleAsync"
import { setActive } from "../loginSlice";


export const LOGOUT_USER = "LOGOUT_USER";
export const CLEAR_SAVED_FOLDERS = "CLEAR_SAVED_FOLDERS";


// export const loginUser =(state:{email:string;password:string},router: any)=> handleAsync(async (dispatch: Dispatch,e: React.FormEvent) => {
//     e.preventDefault();

//       const response = await api.post("/user/login", state)
//       console.log("response", response?.data.logeduser);
//       alert("Login Successful!")
//       router.push("/home")
//       dispatch(setActive(response?.data?.logeduser))
   
    

//   });

  
export const logoutUser = () => handleAsync ( async (dispatch: Dispatch)=> {
  
    const response = await api.post("/user/logout");


    console.log("response",response)
    if (response.status >= 200 && response.status < 300) {
      dispatch({ type: LOGOUT_USER });
      dispatch({ type: CLEAR_SAVED_FOLDERS });
    } else {
      throw new Error(response.data.message || "An error occurred");
    }
  
});

