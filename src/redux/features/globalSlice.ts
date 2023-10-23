import { GlobalState, SearchParams } from "@/interfaces/global.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format, subDays } from "date-fns";
import { actualizarNegocio } from "../chunks/negocioChunck";

const initialState: GlobalState = {
    searchParams: {
        startDate: null,
        endDate: null,
        page: 1,
        pageSize: 10,
        texto: "",
    },
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        udateSearchParams: (state, action: PayloadAction<SearchParams>) => {
            state.searchParams = action.payload;
        },
        cleanSearchParams: (state) => {
            state.searchParams = {
                ...initialState.searchParams,
                startDate: null,
                endDate: null,
            };
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(actualizarNegocio.fulfilled, (state, action) => {
    //         return state;
    //     });
       
    // },
});

export const { udateSearchParams, cleanSearchParams } = globalSlice.actions;

export default globalSlice.reducer;
