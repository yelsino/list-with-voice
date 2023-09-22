import { createAsyncThunk } from "@reduxjs/toolkit";
import { URLBASE } from "../services/listaApi";
import { Lista } from "@/interfaces/list.interface";
import { fetchSinToken } from "../fetch";
import { Usuario } from "@/interfaces/user.interface";
import { ResponseParams, SearchParams } from "@/interfaces/global.interface";
import axios from "axios";
import { Cliente } from "@/interfaces/client.interface";

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
