


import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";


import themeReducer from "./features/them";
import registerReducer from "./features/registerSlice";
import paymentReducer from "./features/paymentSlice";
// import loginReducer from "./features/userSlice";
import userReducer from "./features/userSlice";
import ratingReducer from "./features/ratingSlice"
import postReducer, { resetPostState } from "./features/postSlice"  
import adminReducer from './features/adminSlice'
import companyLoginReducer from "./features/companyslice"
import jobReducer from './features/jobSlice'
import communityReducer from "./features/communitySlice"

// Create persist configs for specific reducers
const userPersistConfig = { key: "user", storage };
// const loginPersistConfig = { key: "login", storage };
const ratingPersistConfig={key:"rating",storage};
const registerPersistConfig={key:"register",storage};
const communityPersistConfig={key:"community",storage}
const postPersistConfig={key:"post",storage}
const adminPersistConfig={key:"admin",storage}
const companyPersistConfig={key:"company",storage}
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    store.dispatch(resetPostState());
  });
}

// Wrap reducers with persistReducer
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedRegisterReducer = persistReducer(registerPersistConfig, registerReducer);
// const persistedLoginReducer = persistReducer(loginPersistConfig, loginReducer);
const persistedRatingReducer=persistReducer(ratingPersistConfig,ratingReducer)
const persistedpostReducer=persistReducer(postPersistConfig,postReducer)
const persistedadminReducer=persistReducer(adminPersistConfig,adminReducer)
const persistedCompanyReducer=persistReducer(companyPersistConfig,companyLoginReducer)
const persistedCommunityReducer=persistReducer(communityPersistConfig,communityReducer)

export const makeStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer,
      register: persistedRegisterReducer,
      payment: paymentReducer,
      // login: persistedLoginReducer, 
      user: persistedUserReducer, 
      rating:persistedRatingReducer , 
      post:persistedpostReducer  , 
      admin:persistedadminReducer,
      companyLogin:persistedCompanyReducer,
      Job:jobReducer,
      community:persistedCommunityReducer
       

    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
 

export const store = makeStore();
export const persistor = persistStore(store);


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
