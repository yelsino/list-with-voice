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
        // addVoicesToList: (state, action: PayloadAction<string[]>) => {
        //     // filtrar todas las voces que no esten en el payload
        //     const missingVoices: string[] = action.payload.filter(
        //         (text) => !state.voices.some((voice) => voice.voz === text)
        //     );

        //     if (missingVoices.length === 0) return;

        //     // si hay un voice seleccionado entonces actualizarlo
        //     if (state.voiceSelected) {
        //         const codigo = state.voiceSelected.codigo

        //         const newVoice: Voice = {
        //             voz: missingVoices[0],
        //             status: "pending",
        //             enviado: false,
        //             codigo: codigo,
        //         };

        //         const newVoices = state.voices.map((voice) => {
        //             if (voice.codigo === codigo) {
        //                 return newVoice;
        //             }
        //             return voice;
        //         });
        //         state.voices = newVoices;
        //         state.voiceSelected = null;
        //         return;
        //     }

        //     // crear un array de voces con el status pending
        //     const newVoices: Voice[] = missingVoices.map((text) => ({
        //         voz: text,
        //         status: "pending",
        //         enviado: false,
        //         codigo: uuidv4(),
        //     }));

        //     state.voices = [...state.voices, ...newVoices];
        //     state.phases = []
        // },
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
} = listaSlice.actions;

export default listaSlice.reducer;
