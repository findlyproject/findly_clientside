// "use client";

// import { useRef } from "react";
// import { Provider } from "react-redux";
// import { makeStore, AppStore } from "./";

// export default function StoreProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const storeRef = useRef<AppStore>(null);
//   if (!storeRef.current) {
//     storeRef.current = makeStore();
//   }
//   return <Provider store={storeRef.current}>{children}</Provider>;
// }



"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore, AppStore } from "./";
import { persistStore } from "redux-persist";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<{ store: AppStore; persistor: ReturnType<typeof persistStore> } | null>(null);
  
  if (!storeRef.current) {
    const store = makeStore();
    storeRef.current = { store, persistor: persistStore(store) };
  }

  return (
    <Provider store={storeRef.current.store}>
      <PersistGate loading={null} persistor={storeRef.current.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
