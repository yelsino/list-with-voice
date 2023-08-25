import { ItemList, Lista, ListaState } from "@/interfaces/list.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { obtenerImagenLista } from "../chunks/listaChunk";

const initialState: ListaState = {
    nombreCliente: "",
    itemsList: [],
    itemList: null,
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
            state = {
                nombreCliente: "",
                itemsList: [],
                montoTotal: 0,
                edit: true,
                pagada: false,
                itemList: null,
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
                (i) => i.id !== action.payload.id
            );
            state.itemsList = filtrarItems;
        },
        updateItem: (state, action: PayloadAction<ItemList>) => {
            // buscar itema a actualizar
            console.log(action.payload);

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
    },
    extraReducers: (builder) => {
        builder.addCase(obtenerImagenLista.fulfilled, (state, action) => {
            
            // action.payload == BLOB
            const url = URL.createObjectURL(action.payload);
            const link = document.createElement("a");
            link.href = url;
            link.download = "archivo.png";
            document.body.append(link);
            link.click();

            setTimeout(() => {
                URL.revokeObjectURL(url);
                document.body.removeChild(link);
            }, 2000); // Ajusta el tiempo según tus necesidades
    
            return state;

            // URL.revokeObjectURL(url);
            // document.body.removeChild(link);

            // return ''
            // setTimeout( function () { document.body.removeChild(link) },10 );
        });
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
} = listaSlice.actions;

export default listaSlice.reducer;
