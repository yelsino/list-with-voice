import { Cliente } from "@/interfaces/client.interface";
import { URLBASE } from "@/interfaces/constantes";
import { ResponseParams, SearchParams } from "@/interfaces/global.interface";
import { Tienda } from "@/interfaces/user.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actualizarNegocio = async (tienda: Tienda) => {
    const response = await axios.put<ResponseParams<Tienda>>(
        `${URLBASE.LOCAL}/negocio`,
        tienda
    );

    return response
};
