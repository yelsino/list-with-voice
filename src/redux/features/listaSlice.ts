import {
    ItemList,
    Lista,
    ListaState,
} from "@/interfaces/list.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { obtenerImagenLista, registrarUsuario } from "../chunks/listaChunk";
import { saveAs } from "file-saver";
import { DateValueType } from "react-tailwindcss-datepicker";
import { format, subDays, startOfWeek, endOfWeek } from "date-fns";


const initialState: ListaState = {
    id: "",
    nombreCliente: "",
    itemsList: [],
    itemSelected: null,
    montoTotal: 0,
    edit: false,
    pagada: false,
    cargando: false,
    startDate: format(
        subDays(new Date(), 7),
        "yyyy-MM-dd"
    ),
    endDate: format(new Date(), "yyyy-MM-dd"),
    
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
        updateItems: (state, action: PayloadAction<ItemList[]>) => {
          
            const nuevosItems = state.itemsList.map((item)=>{
                const existe = action.payload.find((p)=>item.id === p.id);
                return existe ? existe : item;
            })

            state.itemsList = nuevosItems
        },
        selectItem: (state, action: PayloadAction<ItemList | null>) => {
            state.itemSelected = action.payload;
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
        selectDate: (state, action:PayloadAction<DateValueType>)=>{
            state.startDate = action.payload?.startDate
            state.endDate = action.payload?.endDate
        }
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
    nameLista,
    sumarLista,
    limpiarLista,
    listaPagada,
    changeCargando,
    deleteItem,
    updateItem,
    selectItem,
    updateLista,
    selectDate
} = listaSlice.actions;

export default listaSlice.reducer;
