import { configureStore } from "@reduxjs/toolkit";
import { listaApi } from "./services/listaApi";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import clienteReducer from "./features/clienteSlice";
import globalReducer from './features/globalSlice';
import listaReducer from "./features/listaSlice";
import { clienteApi } from "./services/clienteApi";

export const store = configureStore({
  reducer: {
    listaReducer, 
    clienteReducer,
    globalReducer,
    [listaApi.reducerPath]: listaApi.reducer,
    [clienteApi.reducerPath]: clienteApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([listaApi.middleware,clienteApi.middleware ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
