import { Cliente } from "@/interfaces/client.interface";
import { ResponseParams, SearchParams } from "@/interfaces/global.interface";
import { API_URL_CLIENTS } from "@/types/uri.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const obtenerClientes = createAsyncThunk(
    "obtener_clientes",
    async (params: SearchParams) => {
        const response = await axios.get<ResponseParams<Cliente[]>>(
            API_URL_CLIENTS,
            {
                headers: {
                    Accept: "application/json",
                },
                params: params,
            }
        );
        
        if(response.status !== 200) return [];

        return response.data.data
        
        
    }
);
