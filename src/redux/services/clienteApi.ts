import { Cliente } from "@/interfaces/client.interface";
import { ResponseParams, SearchParams } from "@/interfaces/global.interface";
import { API_URL_CLIENTS } from "@/types/uri.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clienteApi = createApi({
    reducerPath: "clienteApi",
    refetchOnFocus: true, // when the window is refocused, refetch the data
    baseQuery: fetchBaseQuery({
        baseUrl: "",
    }),
    tagTypes: ["clientes", "cliente"],
    endpoints: (builder) => ({
        getCostumers: builder.query<ResponseParams<Cliente[]>, SearchParams>({
            query: (params) => ({
                url: API_URL_CLIENTS,
                method: "GET",
                params: params,
                headers: {
                    "Content-Type": "application/json",
                }
            }),
            providesTags: ["clientes"]
        }),
        getCostumer: builder.query<ResponseParams<Cliente>, { id: string }>({
            query: ({ id }) => `${API_URL_CLIENTS}/${id}`,
            providesTags: ["cliente"]
        }),
        updateList: builder.mutation<ResponseParams<Cliente>, Cliente>({
            query: (lista) => ({
                method: "PUT",
                url: API_URL_CLIENTS,
                body: JSON.stringify(lista),
            }),
            invalidatesTags: ["clientes","cliente"]
        }),
        registerCostumer: builder.mutation<ResponseParams<Cliente>, Cliente>({
            query: (cliente) => ({
                method: "POST",
                url: API_URL_CLIENTS,
                body: JSON.stringify(cliente),
            }),
            invalidatesTags: ["clientes"]
        }),
       
    }),
});

export const {
    useGetCostumersQuery,
    useGetCostumerQuery,
    useRegisterCostumerMutation
} = clienteApi;
