import { ItemList, Lista, ListaState } from "@/interfaces/list.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ListaState = {
    nombreCliente: "",
    itemsList: [],
    montoTotal: 0,
    edit: true
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
        sumarLista: (state, action: PayloadAction<number>) => {
            state.montoTotal = action.payload;
        },
        limpiarLista: (state) => {
            state = { nombreCliente: "", itemsList: [], montoTotal: 0, edit: true };
        },
        editarLista: (state, action: PayloadAction<boolean>) => {
            state.edit = action.payload
        }
    },
});

export const { addItemToList, nameLista, sumarLista, limpiarLista,editarLista } = listaSlice.actions;

export default listaSlice.reducer;
