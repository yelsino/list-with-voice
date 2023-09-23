import { Cliente } from "@/interfaces/client.interface";
import { URLBASE } from "@/interfaces/constantes";
import { ResponseParams, SearchParams } from "@/interfaces/global.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Response<T>{
    data: T
    cantidad: number
}

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
                url: `${URLBASE.LOCAL}/clientes`,
                method: "GET",
                params: params,
                headers: {
                    "Content-Type": "application/json",
                }
            }),
            providesTags: ["clientes"]
        }),
        getCostumer: builder.query<ResponseParams<Cliente>, { id: string }>({
            query: ({ id }) => `${URLBASE.LOCAL}/clientes/${id}`,
            providesTags: ["cliente"]
        }),
        updateList: builder.mutation<ResponseParams<Cliente>, Cliente>({
            query: (lista) => ({
                method: "PUT",
                url: `${URLBASE.LOCAL}/clientes`,
                body: JSON.stringify(lista),
            }),
            invalidatesTags: ["clientes","cliente"]
        }),
        registerCostumer: builder.mutation<ResponseParams<Cliente>, Cliente>({
            query: (cliente) => ({
                method: "POST",
                url: `${URLBASE.LOCAL}/clientes`,
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
