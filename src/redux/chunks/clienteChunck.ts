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
        
        console.log("RESPONSE AXIOS: ", response);
        
        if(response.status !== 200) return [];

        return response.data.data
        
        
    }
);
