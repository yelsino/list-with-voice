import { ItemList, Lista, ListaState } from "@/interfaces/list.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ListaState = {
    nombreCliente: "",
    itemsList: [],
    montoTotal: 0,
    edit: true,
    pagada: false,
    cargando: false,
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
            state = {
                nombreCliente: "",
                itemsList: [],
                montoTotal: 0,
                edit: true,
            };
        },
        listaPagada: (state, action: PayloadAction<boolean>) => {
            state.pagada = action.payload;
        },
        changeCargando: (state, action: PayloadAction<boolean>) => {
            state.cargando = action.payload;
        }
    },
});

export const {
    addItemToList,
    nameLista,
    sumarLista,
    limpiarLista,
    listaPagada,
    changeCargando,
} = listaSlice.actions;

export default listaSlice.reducer;
