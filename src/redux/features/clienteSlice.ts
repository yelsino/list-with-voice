import { Cliente, ClienteState } from "@/interfaces/client.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { obtenerClientes } from "../chunks/clienteChunck";

const initialState: ClienteState = {
    clientes: [],
    cliente: {nombres:"", celular: ""},
};

export const clienteSlice  = createSlice({
    name: "global",
    initialState,
    reducers: {
        recuperarClientes: (state, action: PayloadAction<Cliente[]>) => {
            state.clientes = action.payload;
        },
        cleanStateCliente: (state) => {
            state = initialState;
        },
        seleccionarCliente: (state, action: PayloadAction<Cliente | null>) => {
            state.clientes = [];
            state.cliente = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(obtenerClientes.fulfilled, (state, action) => {
            state.clientes = action.payload;
        });
    },
});

export const { recuperarClientes, cleanStateCliente, seleccionarCliente } = clienteSlice.actions;

export default clienteSlice.reducer;
