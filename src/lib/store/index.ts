


import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";


import themeReducer from "./features/them";
import registerReducer from "./features/registerSlice";
import paymentReducer from "./features/paymentSlice";
import loginReducer from "./features/userSlice";
import userReducer from "./features/userSlice";
import ratingReducer from "./features/ratingSlice"
import postReducer from "./features/postSlice"
<<<<<<< HEAD
import adminReducer from './features/adminSlice'
=======


>>>>>>> 950d06c95f10f967498429ce0726cd8c0dfe2a5a
// Create persist configs for specific reducers
const userPersistConfig = { key: "user", storage };
const loginPersistConfig = { key: "login", storage };
const ratingPersistConfig={key:"login",storage}
const registerPersistConfig={key:"register",storage}
const postPersistConfig={key:"post",storage}
const adminPersistConfig={key:"admin",storage}


// Wrap reducers with persistReducer
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedRegisterReducer = persistReducer(registerPersistConfig, registerReducer);
const persistedLoginReducer = persistReducer(loginPersistConfig, loginReducer);
const persistedRatingReducer=persistReducer(ratingPersistConfig,ratingReducer)
const persistedpostReducer=persistReducer(postPersistConfig,postReducer)
<<<<<<< HEAD
const persistedadminReducer=persistReducer(adminPersistConfig,adminReducer)
=======


>>>>>>> 950d06c95f10f967498429ce0726cd8c0dfe2a5a
// Configure the store
export const makeStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer,
      register: persistedRegisterReducer,//persisted
      payment: paymentReducer,
      login: persistedLoginReducer,  // Persist login state
      user: persistedUserReducer, //persist
      rating:persistedRatingReducer ,  // Persist rating state
<<<<<<< HEAD
      post:persistedpostReducer  , // Persist rating state
      admin:persistedadminReducer
=======
      post:persistedpostReducer ,
       

>>>>>>> 950d06c95f10f967498429ce0726cd8c0dfe2a5a
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
