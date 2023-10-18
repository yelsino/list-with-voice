import { URLBASE } from "@/interfaces/constantes";
import { SearchParams } from "@/interfaces/global.interface";
import {
    GptRequest,
    ItemList,
    Lista,
    ResponseGPT,
} from "@/interfaces/list.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const URLBASE = {
//     LOCAL: `${process.env.NEXTAUTH_URL}/api`,
//     // LOCAL: "http://localhost:3000/api/",
//     // LOCAL: "https://list-with-voice.vercel.app/api/",
//     API_NEGOCIO: "https://api-ns-carlos-3b46dcee2dd0.herokuapp.com",
//     // API_NEGOCIO: "http://localhost:3002",
//     GPT: "https://api.openai.com/v1/chat/completions",
// };

interface Response<T> {
    data: T
    cantidad: number
}

export const listaApi = createApi({
    reducerPath: "listaApi",
    refetchOnFocus: true, // when the window is refocused, refetch the data
    baseQuery: fetchBaseQuery({
        baseUrl: "",
    }),
    tagTypes: ["lists"],
    endpoints: (builder) => ({
        getListas: builder.query<Response<Lista[]>, SearchParams>({
            query: (params) => ({
                url: `${URLBASE.LOCAL}/listas`,
                method: "GET",
                params: params,
                headers: {
                    "Content-Type": "application/json",
                }
            }),
            providesTags: ["lists"]
        }),
        convertRecordToJson: builder.mutation<ResponseGPT, GptRequest>({
            query: ({ texto }) => ({
                url: URLBASE.GPT,
                method: "POST",
                body: {
                    model: "gpt-3.5-turbo",
                    temperature: 0.7,
                    messages: [
                        {
                            role: "system",
                            content: `Convierte texto de productos peruanos en formato JSON envuelto en un string plano sin saltos de linea, sin espacio, sin nada solo texto como el formato indicado. Formato: 
                            [{nombre:'',precio:0,cantidad:0,medida:'kg', montoTotal:0,calculado:false}].
                            Ejemplos de productos: 'camote', 'papa', 'naranja', 'fideos', 'papa peruanita', 'platanos', etc.
                            Texto en español Perú con precios en nuevos soles. 
                            Ejemplos de medida: kilogramos, litros, gramos, unidades, sacos, bolsas, cajas, etc. Si hay montoTotal quiere decir que es un item calculado por ende la propiedad calculado es true. 
                            Por ejemplo: 
                            '3 soles de camote' (solo cuenta con montoTotal y nombre), 
                            '3 kilos de camote a 2 soles ' (no cuenta con montotTotal), 
                            '3 kilos de camote a 2 soles cada kilo' (no cuenta con montoTotal).
                            Esto solos son ejemplos casi nunca la información será con la misma estructura, debes analizarlos correctamente y convertirlos a JSON 
                           `,
                        },
                        {
                            role: "user",
                            content: texto,
                        },
                    ]
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.GPT_TOKEN}`,
                }
            })
        }),
        registrarListDB: builder.mutation<Lista, Lista>({
            query: (lista) => ({
                method: "POST",
                url: `${URLBASE.LOCAL}/listas`,
                body: JSON.stringify(lista),
            }),
            invalidatesTags: ["lists"]
        }),
        getListaById: builder.query<Lista, { id: string }>({
            query: ({ id }) => `${URLBASE.LOCAL}/listas/${id}`,
            providesTags: ["lists"]
        }),
        addItem: builder.mutation<ItemList, ItemList>({
            query: (item) => ({
                method: "POST",
                url: `${URLBASE.LOCAL}/listas/${item.listaId}/items`,
                body: item,
            }),
        }),
        updateItem: builder.mutation<ItemList, ItemList>({
            query: (item) => ({
                method: "PUT",
                url: `${URLBASE.LOCAL}/listas/${item.listaId}/items`,
                body: item,
                params: {
                    id: item.id,
                },
            }),
        }),
        deleteItem: builder.mutation<ItemList, ItemList>({
            query: (item) => ({
                method: "DELETE",
                url: `${URLBASE.LOCAL}/listas/${item.listaId}/items`,
                params: {
                    id: item.id,
                },
            }),
        }),
        updateList: builder.mutation<Lista, Lista>({
            query: (lista) => ({
                method: "PUT",
                url: `${URLBASE.LOCAL}/listas`,
                body: JSON.stringify(lista),
            }),
            invalidatesTags: ["lists"]
        }),
    }),
});

export const {
    useGetListasQuery,
    useGetListaByIdQuery,
    useConvertRecordToJsonMutation,
    useRegistrarListDBMutation,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
    useUpdateListMutation,
} = listaApi;
