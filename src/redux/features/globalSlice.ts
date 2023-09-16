import { ListaState } from "@/interfaces/list.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format, subDays } from "date-fns";
import { GlobalState, SearchParams } from "@/interfaces/global.interface";

const initialState: GlobalState = {
    searchParams: {
        startDate: format(subDays(new Date(), 7), "yyyy-MM-dd"),
        endDate: format(new Date(), "yyyy-MM-dd"),
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
            state.searchParams = initialState.searchParams;
        },
    },
});

export const { udateSearchParams,cleanSearchParams  } = globalSlice.actions;

export default globalSlice.reducer;
