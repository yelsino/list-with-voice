import { URLBASE } from "@/interfaces/constantes";
import { ResponseRecord, SearchParams } from "@/interfaces/global.interface";
import {
    Lista
} from "@/interfaces/list.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
        convertRecordToJson: builder.mutation<ResponseRecord, FormData>({
            query: (bodyFormData) => ({
                url: `${URLBASE.LOCAL}/record`,
                method: "POST",
                body: bodyFormData,
                formData:true
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
    useUpdateListMutation,
} = listaApi;
