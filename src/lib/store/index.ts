// import { configureStore } from "@reduxjs/toolkit";

// import themeReducer from "./features/them"
// import registerReducer from './features/registerSlice'
// import paymentReducer from "./features/paymentSlice"
// import loginReducer from './features/loginSlice'
// import userReducer from "./features/userSlice"
// export const makeStore = () => {
//     return configureStore({
//      reducer:{
       
//        theme:themeReducer,
//        register:registerReducer,
//        payment:paymentReducer,
//        login:loginReducer,
//        user:userReducer
//      }
//     });
//   };
  
//   export type AppStore = ReturnType<typeof makeStore>;
//   export type RootState = ReturnType<AppStore["getState"]>;
//   export type AppDispatch = AppStore["dispatch"];




import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// Import your reducers
import themeReducer from "./features/them";
import registerReducer from "./features/registerSlice";
import paymentReducer from "./features/paymentSlice";
import loginReducer from "./features/userSlice";
import userReducer from "./features/userSlice";

// Create persist configs for specific reducers
const userPersistConfig = { key: "user", storage };
const loginPersistConfig = { key: "login", storage };

// Wrap reducers with persistReducer
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedLoginReducer = persistReducer(loginPersistConfig, loginReducer);

// Configure the store
export const makeStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer,
      register: registerReducer,
      payment: paymentReducer,
      login: persistedLoginReducer,  // Persist login state
      user: persistedUserReducer,    // Persist user state
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

// Create persistor
export const store = makeStore();
export const persistor = persistStore(store);

// Define types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
