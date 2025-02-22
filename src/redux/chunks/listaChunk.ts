import { PrintLista } from "@/interfaces/list.interface";
import { Usuario } from "@/interfaces/user.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSinToken } from "../fetch";
import { API_LOCAL } from "@/types/apis.types";
// import { imageListGenerate } from "@/util/print.util";

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
      endpoint: `${API_LOCAL}/auth/signup`,
      body: { nombreUsuario, password },
      method: "POST",
    });

    return response;
  }
);

