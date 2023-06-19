import { ItemList, ListaState } from "@/interfaces/list.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ListaState = {
    nombreCliente: "",
    itemsList: [],
};

export const listaSlice = createSlice({
    name: "lista",
    initialState,
    reducers: {
        addItemToList: (state, action: PayloadAction<ItemList>) => {
            state.itemsList = [...state.itemsList, action.payload];
        },
        nameLista: (state, action: PayloadAction<string>) => {
            state.nombreCliente = action.payload;
        },
    },
});

export const { addItemToList, nameLista } = listaSlice.actions;

export default listaSlice.reducer;
