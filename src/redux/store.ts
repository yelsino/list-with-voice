import { configureStore } from "@reduxjs/toolkit";
import { listaApi } from "./services/listaApi";
import listaReducer from "./features/listaSlice";
import VoiceReducer from "./features/voiceSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    VoiceReducer,
    listaReducer,
    [listaApi.reducerPath]: listaApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([listaApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
