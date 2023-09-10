import {
    ItemList,
    Lista,
    ListaState,
    Usuario,
} from "@/interfaces/list.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { obtenerImagenLista, registrarUsuario } from "../chunks/listaChunk";
import { saveAs } from "file-saver";

const initialState: ListaState = {
    id: "",
    nombreCliente: "",
    itemsList: [],
    itemList: null,
    montoTotal: 0,
    edit: false,
    pagada: false,
    cargando: false,
};

export const listaSlice = createSlice({
    name: "lista",
    initialState,
    reducers: {
        addItemToList: (state, action: PayloadAction<ItemList>) => {
            const { id: index } = action.payload;
            const itemIndex = state.itemsList.findIndex(
                (item) => item.id === index
            );
            if (itemIndex !== -1) {
                // Si el índice ya existe, reemplaza el contenido
                state.itemsList[itemIndex] = { id: index, ...action.payload };
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
            state = initialState;
        },
        listaPagada: (state, action: PayloadAction<boolean>) => {
            state.pagada = action.payload;
        },
        changeCargando: (state, action: PayloadAction<boolean>) => {
            state.cargando = action.payload;
        },
        deleteItem: (state, action: PayloadAction<ItemList>) => {
            const filtrarItems = state.itemsList.filter(
                (i) => i.id !== action.payload.id
            );
            state.itemsList = filtrarItems;
        },
        updateItem: (state, action: PayloadAction<ItemList>) => {
            // buscar itema a actualizar
            const itemIndex = state.itemsList.findIndex(
                (item) => item.id === action.payload.id
            );

            // actualizar itemsList con el nuevo item
            if (itemIndex !== -1) {
                state.itemsList[itemIndex] = action.payload;
            }
        },
        selectItem: (state, action: PayloadAction<ItemList | null>) => {
            state.itemList = action.payload;
        },
        updateLista: (state, action: PayloadAction<Lista>) => {
            console.log("voy a actualziar");

            const { items, nombreCliente, pagado, id } = action.payload;

            state.nombreCliente = nombreCliente;
            state.itemsList = items;
            state.edit = true;
            state.pagada = pagado;
            state.id = id;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(obtenerImagenLista.fulfilled, (state, action) => {
            const url = URL.createObjectURL(action.payload);

            saveAs(url, "archivo.jpeg");

            URL.revokeObjectURL(url);

            return state;
        });
        builder.addCase(registrarUsuario.fulfilled, (state) => state);
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
    updateItem,
    selectItem,
    updateLista,
} = listaSlice.actions;

export default listaSlice.reducer;
