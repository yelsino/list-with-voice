import { ResponseParams } from "@/interfaces/global.interface";
import { Tienda } from "@/interfaces/user.interface";
import { API_LOCAL } from "@/types/apis.types";
import axios from "axios";

export const actualizarNegocio = async (tienda: Tienda) => {
    const response = await axios.put<ResponseParams<Tienda>>(
        `${API_LOCAL}/negocio`,
        tienda
    );

    return response
};
