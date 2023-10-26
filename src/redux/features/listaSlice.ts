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
  textRecord: "",
  cargando: false,
  fetchList: null,
  recordUrl: ""
};

export const listaSlice = createSlice({
  name: "lista",
  initialState,
  reducers: {
    addItemsToList: (state, action: PayloadAction<ItemList[]>) => {
      state.lista.items = state.lista.items.concat(action.payload);
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

      const itemIndex = state.lista.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {

        const errors: Error[] = Array.from(state.lista.errors);
        errors.push({ itemList: action.payload });

        const unicErrors = errors.reduce((acc, b) => {
          const comparar = acc.some((e) => e.itemList.texto === b.itemList.texto);
          if (!comparar) {
            acc.push(b)
          }
          return acc
        }, [] as Error[])

        state.lista.errors = Array.from(unicErrors);
        state.lista.items[itemIndex] = action.payload;
      }
    },
    updateItems: (state, action: PayloadAction<ItemList[]>) => {
      // const nuevosItems = state.lista.items.map((item) => {
      //   const existe = action.payload.find((p) => item.id === p.id);
      //   return existe ? existe : item;
      // });

      state.lista.items = action.payload;
    },
    selectItem: (state, action: PayloadAction<ItemList | null>) => {
      state.itemSelected = action.payload;
    },
    updateLista: (state, action: PayloadAction<Lista>) => {
      state.lista = action.payload;
    },
    restaurarItems: (state) =>{
      const items = state.lista.items.map((item)=>{
        delete item.status
        return item
      });
      state.lista.items = items
    },
    abonarLista: (state, action: PayloadAction<Abono>) => {
      state.abono = action.payload;
    },
    fetchingLista: (state, action: PayloadAction<Lista>) => {
      state.fetchList = action.payload;
    },
    catchUrlRecord: (state, action: PayloadAction<string>) => {
      state.recordUrl = action.payload
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
  limpiarLista,
  listaPagada,
  deleteItem,
  updateItem,
  selectItem,
  updateLista,
  abonarLista,
  restaurarItems,
  fetchingLista,
  catchUrlRecord
} = listaSlice.actions;

export default listaSlice.reducer;
