import {
    GlobalState,
    SearchParams,
    Service,
} from "@/interfaces/global.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: GlobalState = {
    searchParams: {
        startDate: null,
        endDate: null,
        page: 1,
        pageSize: 10,
        texto: "",
    },
    recordService: Service.Deepgram,
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
        updateRecordService: (state, action: PayloadAction<Service>) => {
            state.recordService = action.payload;
        },
    },
});

export const { 
    udateSearchParams, 
    cleanSearchParams, 
    updateRecordService
 } = globalSlice.actions;

export default globalSlice.reducer;
