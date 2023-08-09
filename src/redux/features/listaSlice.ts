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
            const { index } = action.payload;
            const itemIndex = state.itemsList.findIndex(item => item.index === index);
            if (itemIndex !== -1) {
                // Si el índice ya existe, reemplaza el contenido
                state.itemsList[itemIndex] = { index, ...action.payload };
            } else {
                // Si el índice no existe, agrega el nuevo elemento
                // state.itemsList.push({ index, ...action.payload });
                state.itemsList = [...state.itemsList, action.payload];
            }
            
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
        },
        deleteItem: (state, action: PayloadAction<ItemList>) => {
            const filtrarItems = state.itemsList.filter(
                (i) => i.index !== action.payload.index
            );
            state.itemsList = filtrarItems;
        },
        updateItem: (state, action: PayloadAction<ItemList>) => {
            // buscar itema a actualizar
            const itemIndex = state.itemsList.findIndex( item => item.index === action.payload.index);
            // actualizar itemsList con el nuevo item
            if (itemIndex !== -1) {
                state.itemsList[itemIndex] = action.payload;
            }

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
    deleteItem,
    updateItem
} = listaSlice.actions;

export default listaSlice.reducer;
