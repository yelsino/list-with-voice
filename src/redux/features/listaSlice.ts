import {
  Abono,
  Error,
  ItemList,
  Lista,
  ListaState,
} from "@/interfaces/list.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { saveAs } from "file-saver";
import { obtenerImagenLista, registrarUsuario } from "../chunks/listaChunk";

const initialState: ListaState = {
  abono: null,
  itemSelected: null,
  lista: {
    abonos: [],
    completado: false,
    items: [],
    pagado: false,
    errors: [],
    montoTotal: 0,
    id: "",
    cliente: null,
  },
  cargando: false,
};

export const listaSlice = createSlice({
  name: "lista",
  initialState,
  reducers: {
    addItemsToList: (state, action: PayloadAction<ItemList[]>) => {
      // filtrar todas las voces que no esten en el payload
      const missingVoices: ItemList[] = action.payload.filter(
        (item) => !state.lista.items.some((i) => i.voz === item.voz)
      );

      state.lista.items = state.lista.items.concat(missingVoices);
    },
    limpiarLista: (state) => {
      state = initialState;
    },
    listaPagada: (state, action: PayloadAction<boolean>) => {
      state.lista.pagado = action.payload;
    },
    deleteItem: (state, action: PayloadAction<ItemList>) => {
      const filtrarItems = state.lista.items.filter(
        (i) => i.id !== action.payload.id
      );
      state.lista.errors.push({ itemList: action.payload });
      state.lista.items = filtrarItems;
    },
    updateItem: (state, action: PayloadAction<ItemList>) => {
      // buscar itema a actualizar
      console.log(action.payload);

      const itemIndex = state.lista.items.findIndex(
        (item) => item.id === action.payload.id
      );
      // actualizar itemsList con el nuevo item
      if (itemIndex !== -1) {
        
        const errors:Error[] = Array.from(state.lista.errors);
        errors.push({ itemList: { ...action.payload, status: "error" }});

        const unicErrors =  errors.reduce((acc,b)=>{
            const comparar = acc.some((e)=>e.itemList.voz === b.itemList.voz);
            if(!comparar){
                acc.push(b)
            }
            return acc
        },[] as Error[])

        state.lista.errors = Array.from(unicErrors);
        state.lista.items[itemIndex] = action.payload;
      }
    },
    updateItems: (state, action: PayloadAction<ItemList[]>) => {
      const nuevosItems = state.lista.items.map((item) => {
        const existe = action.payload.find((p) => item.id === p.id);
        return existe ? existe : item;
      });

      state.lista.items = nuevosItems;
    },
    selectItem: (state, action: PayloadAction<ItemList | null>) => {
      state.itemSelected = action.payload;
    },
    updateLista: (state, action: PayloadAction<Lista>) => {
      // const { items, pagado, id } = action.payload;
      state.lista = action.payload;
    },
    abonarLista: (state, action: PayloadAction<Abono>) => {
      state.abono = action.payload;
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
  limpiarLista,
  listaPagada,
  deleteItem,
  updateItem,
  selectItem,
  updateLista,
  abonarLista,
} = listaSlice.actions;

export default listaSlice.reducer;
