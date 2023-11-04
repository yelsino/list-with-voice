import { Price } from "@/interfaces/product.interface";
import { PRICE_LIST } from "@/types/uri.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    refetchOnFocus: true, // when the window is refocused, refetch the data
    baseQuery: fetchBaseQuery({
        baseUrl: "", 
    }),
    tagTypes: ["prices"],
    endpoints: (builder) => ({
        getPrices: builder.query<Price[],null>({
            query: () => ({
                url: PRICE_LIST,
                method: "GET",
            }),
            
            providesTags: ["prices"]
        }),
        deletePrice: builder.mutation< Price[], string>({
            query: (priceId) => ({
                url: `${PRICE_LIST}/${priceId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["prices"]
        }),
        createPrices: builder.mutation< Price[], string>({
            query: (texto) => ({
                url: PRICE_LIST,
                method: "POST",
                body:{texto:texto}
            }),
            invalidatesTags: ["prices"]
        }),
        
       
    }),
});



export const {
  useGetPricesQuery,
  useDeletePriceMutation,
  useCreatePricesMutation
} = productApi;
