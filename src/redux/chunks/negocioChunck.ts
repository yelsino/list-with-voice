import { URLBASE } from "@/interfaces/constantes";
import { ResponseParams } from "@/interfaces/global.interface";
import { Tienda } from "@/interfaces/user.interface";
import axios from "axios";

export const actualizarNegocio = async (tienda: Tienda) => {
    const response = await axios.put<ResponseParams<Tienda>>(
        `${URLBASE.LOCAL}/negocio`,
        tienda
    );

    return response
};
