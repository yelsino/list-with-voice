import { ResponseRecord, SearchParams } from "@/interfaces/global.interface";
import { Lista} from "@/interfaces/list.interface";
import { API_URL_LISTS, RECORD_TO_JSON, TEXT_TO_ITEMS_LIST } from "@/types/uri.types";
import { ItemList } from "@prisma/client";
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
                url: API_URL_LISTS,
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
                url: RECORD_TO_JSON,
                method: "POST",
                body: bodyFormData,
                formData:true
            })
        }),
        convertTextToJson: builder.mutation<ItemList[], string>({
            query: (texto) => ({
                url: TEXT_TO_ITEMS_LIST,
                method: "POST",
                body: {texto},
            })
        }),
        registrarListDB: builder.mutation<Lista, Lista>({
            query: (lista) => ({
                method: "POST",
                url: API_URL_LISTS,
                body: JSON.stringify(lista),
            }),
            invalidatesTags: ["lists"]
        }),
        getListaById: builder.query<Lista, { id: string }>({
            query: ({ id }) => `${API_URL_LISTS}/${id}`,
            providesTags: ["lists"]
        }),
        updateList: builder.mutation<Lista, Lista>({
            query: (lista) => ({
                method: "PUT",
                url: API_URL_LISTS,
                body: JSON.stringify(lista),
            }),
            invalidatesTags: ["lists"]
        }),
    }),
});

export const {
    useGetListasQuery,
    useGetListaByIdQuery,
    useUpdateListMutation,
    useRegistrarListDBMutation,
    useConvertRecordToJsonMutation,
    useConvertTextToJsonMutation,
} = listaApi;
