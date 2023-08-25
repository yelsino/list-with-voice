import { createAsyncThunk } from "@reduxjs/toolkit";

export const obtenerImagenLista = createAsyncThunk(
    '',
    async ({listaId}: {listaId:string}) => {
        const response = await fetch(`/api/listas/${listaId}/print`,{
            method:'GET',
        });

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'nombre_de_archivo.png'; // Asigna un nombre de archivo para la descarga
        link.click();
      
        URL.revokeObjectURL(url);
    }
)
