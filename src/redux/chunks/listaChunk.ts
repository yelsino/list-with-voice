import { createAsyncThunk } from "@reduxjs/toolkit";
import { URLBASE } from "../services/listaApi";
import { Lista, Usuario } from "@/interfaces/list.interface";
import { fetchSinToken } from "../fetch";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const obtenerImagenLista = createAsyncThunk(
    "obtener_imagen",
    async (lista: Lista): Promise<Blob> => {
        console.log("hice click", lista);

        const response = await fetch(`${URLBASE.API_NEGOCIO}/reporte`, {
            method: "POST",
            body: JSON.stringify(lista),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const blob = await response.blob();
        return blob;
    }
);

interface ResFetch<T> {
    message: string;
    status: boolean;
    data: T;
}

export const registrarUsuario = createAsyncThunk(
    "registrar_usuario",
    async (usuario: Usuario): Promise<ResFetch<Usuario | null>> => {

        const { nombreUsuario, password, validPassword } = usuario;

        if (!nombreUsuario || !password || !validPassword) {
            return {
                data: null,
                message: "hay campos no validados",
                status: false,
            };
        }

        const response = await fetchSinToken<ResFetch<Usuario>>({
            endpoint: `${URLBASE.LOCAL}/auth/signup`,
            body: { nombreUsuario, password },
            method: "POST",
        });
        
        return response;
    }
);
