import { createAsyncThunk } from "@reduxjs/toolkit";

// export const obtenerImagenLista = createAsyncThunk(
//     '',
//     async ({listaId}: {listaId:string}) => {
//         const response = await fetch(`/api/listas/${listaId}/print`,{
//             method:'GET',
//         });

//         const blob = await response.blob();
//         const url = URL.createObjectURL(blob);

//         const link = document.createElement('a');
//         link.href = url;
//         link.download = 'nombre_de_archivo.png'; // Asigna un nombre de archivo para la descarga
//         link.textContent = 'Haz clic aquí para descargar el archivo'; // Texto del enlace de descarga

//         // Agrega el enlace al DOM
//         document.body.appendChild(link);

//         // Abre una nueva pestaña con el enlace de descarga
//         link.target = '_blank';

//         // Limpia la URL del objeto cuando el enlace se elimina del DOM
//         link.addEventListener('DOMNodeRemoved', () => {
//             URL.revokeObjectURL(url);
//         });

//         // Elimina el enlace del DOM después de que el usuario lo haya descargado
//         link.addEventListener('click', () => {
//             setTimeout(() => {
//                 document.body.removeChild(link);
//             }, 100);
//         });
//     }
// )

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
