import {
    Abono,
    ItemList,
    Lista,
    ListaState,
} from "@/interfaces/list.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { saveAs } from "file-saver";
import { obtenerImagenLista, registrarUsuario } from "../chunks/listaChunk";

const initialState: ListaState = {
    id: "",
    itemsList: [],
    abono: null,
    itemSelected: null,
    montoTotal: 0,
    edit: false,
    pagada: false,
    cargando: false,
};

export const listaSlice = createSlice({
    name: "lista",
    initialState,
    reducers: {
        addItemsToList: (state, action: PayloadAction<ItemList[]>) => {
            // filtrar todas las voces que no esten en el payload
            const missingVoices: ItemList[] = action.payload.filter(
                (item) => !state.itemsList.some((i) => i.voz === item.voz)
            );

            state.itemsList = state.itemsList.concat(missingVoices);
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
        updateItems: (state, action: PayloadAction<ItemList[]>) => {
            const nuevosItems = state.itemsList.map((item) => {
                const existe = action.payload.find((p) => item.id === p.id);
                return existe ? existe : item;
            });

            state.itemsList = nuevosItems;
        },
        selectItem: (state, action: PayloadAction<ItemList | null>) => {
            state.itemSelected = action.payload;
        },
        updateLista: (state, action: PayloadAction<Lista>) => {
            const { items, pagado, id } = action.payload;

            state.itemsList = items;
            state.edit = true;
            state.pagada = pagado;
            state.id = id;
            state.abono = null;
        },
        abonarLista: (state, action: PayloadAction<Abono>) => {
            state.abono = action.payload
        },
        actualizarAbono: (state, action: PayloadAction<Abono[]>) => {
            // state.abonos = action.payload
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
    addItemsToList,
    updateItems,
    sumarLista,
    limpiarLista,
    listaPagada,
    changeCargando,
    deleteItem,
    updateItem,
    selectItem,
    updateLista,
    abonarLista,
    actualizarAbono
} = listaSlice.actions;

export default listaSlice.reducer;
