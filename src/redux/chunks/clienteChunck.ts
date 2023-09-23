import { Cliente } from "@/interfaces/client.interface";
import { URLBASE } from "@/interfaces/constantes";
import { ResponseParams, SearchParams } from "@/interfaces/global.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const obtenerClientes = createAsyncThunk(
    "obtener_clientes",
    async (params: SearchParams) => {
        console.log(params);
        
        const response = await axios.get<ResponseParams<Cliente[]>>(
            `${URLBASE.LOCAL}/clientes`,
            {
                headers: {
                    Accept: "application/json",
                },
                params: params,
            }
        );
        
        if(response.statusText !== "OK") return [];

        return response.data.data
        
        
    }
);
