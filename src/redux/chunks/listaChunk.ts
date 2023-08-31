import { createAsyncThunk } from "@reduxjs/toolkit";
import { URLBASE } from "../services/listaApi";
import { Lista } from "@/interfaces/list.interface";

export const obtenerImagenLista = createAsyncThunk(
    '',
    async (lista: Lista):Promise<Blob> => {
        console.log('hice click');
        
        const response = await fetch(`${URLBASE.API_NEGOCIO}/reporte`,{
            method:'POST',
            body: JSON.stringify(lista),
        });
        console.log("RESPONSE: ", response);
        
        const blob = await response.blob();
        console.log(blob);
        
        return blob
    }
)


// export const obtenerImagenLista = createAsyncThunk(
//     '',
//     async ({listaId}: {listaId:string}):Promise<Blob> => {
//         const response = await fetch(`/api/listas/${listaId}/print`,{
//             method:'GET',
//         });
//         console.log(response);
        
//         const blob = await response.blob();

//         return blob
//     }
// )


