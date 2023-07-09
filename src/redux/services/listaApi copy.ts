import { GptRequest, Lista, ResponseGPT } from "@/interfaces/list.interface";
import {
    createApi,
    fetchBaseQuery,
    BaseQueryFn,
} from "@reduxjs/toolkit/query/react";



type MyFetchArgs = { url: string; method?: string; body?: any };

// Define una baseQuery personalizada
const customBaseQuery: BaseQueryFn<
    MyFetchArgs | string,
    unknown,
    unknown
> = async (args, api, extraOptions) => {
    let url = "";
    let headers = {};
    let fetchOptions: RequestInit = {};

    if (typeof args === "string") {
        url = "http://localhost:3000/api/listas/";
        headers = {
            "Content-Type": "application/json",
        };
        fetchOptions = {
            method: "GET",
            headers,
        };
    } else if ("url" in args) {
        if (args.url.includes("gpt")) {
            url = "https://api.openai.com/v1/chat/completions";
            headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer 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`,
            };
            fetchOptions = {
                method: args.method ?? "GET",
                headers,
                body:
                    args.body !== null && args.method !== "GET"
                        ? JSON.stringify(args.body)
                        : undefined,
            };
        }
    }

    const result = await fetch(url, fetchOptions);

    if (result.ok) {
        return { data: await result.json() };
    } else {
        return { error: { status: result.status, data: await result.json() } };
    }
};

export const listaApi = createApi({
    reducerPath: "listaApi",
    refetchOnFocus: true, // when the window is refocused, refetch the data
    baseQuery: customBaseQuery,

    endpoints: (builder) => ({
        getListas: builder.query<Lista[], null>({
            query: () => "listas" as any,
        }),
        getListaById: builder.query<Lista, { id: string }>({
            query: ({ id }) => `listas/${id}` as any,
        }),
        sendListaToGPT: builder.mutation<null, GptRequest>({
            query: ({ message }) => ({
                url: "gpt",
                method: "POST",
                body: {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content:
                                "Estás trabajando en una lista de compras. Tu trabajo es tomar descripciones de productos y convertirlas en una lista de compras con formato. Por ejemplo, 'un kilo y medio de manzana son 15 soles' debería convertirse en '1.5 kg manzana 15.00', la unica respuesta que debes dar es el resultado convetido como este -> '1.5 kg manzana 15.00'",
                        },
                        { role: "user", content: message },
                    ],
                    temperature: 1,
                },
            }),
        }),
        convertTextOnItemGPT: builder.mutation<ResponseGPT, GptRequest>({
            query: ({ message }) => ({
                url: "gpt",
                method: "POST",
                body: {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: `Eres un asistente inteligente que convierte descripciones de productos en un formato de objeto JSON. Por ejemplo, si se te proporciona la frase 'cinco kilos  de manzana son 2 soles', debes convertirla en el siguiente formato JSON:

                            "{ 'cantidad': '5', 'medida': 'kg', 'nombreProducto': 'manzana', 'precio': '2', 'costoTotal': '10.00' }"
            
                            Nota que la 'cantidad' y 'costoTotal' se calculan y que la cadena se encierra entre comillas dobles ("). La respuesta solo debe ser la cadena JSON, sin ningún texto adicional.
                            
                            No importa lo descabellado o incoherente que suene el texto solo conviertelo`,
                        },
                        {
                            role: "user",
                            content:
                                "cinco kilos y medio de manzana son 2 soles cincuenta",
                        },
                        {
                            role: "assistant",
                            content:
                                '{ "cantidad": "5.500", "medida": "kg", "nombreProducto": "manzana", "precio": "2.5", "costoTotal": "13.75" }',
                        },
                        {
                            role: "user",
                            content: "tres litros y cuarto de aceite cuesta a 3 soles veinte",
                        },
                        {
                            role: "assistant",
                            content:
                                '{ "cantidad": "3.250", "medida": "l", "nombreProducto": "aceite", "precio": "3.2", "costoTotal": "10.40" }',
                        },
                        { role: "user", content: message },
                    ],
                    temperature: 1,
                },
            }),
        }),
        registrarListDB: builder.mutation<Lista, Lista>({
            query: (lista) => ({
                method: 'POST',
                url: 'listas',
                body: JSON.stringify(lista)
            })
        })
    }),
});

export const {
    useGetListasQuery,
    useGetListaByIdQuery,
    useConvertTextOnItemGPTMutation,
    useSendListaToGPTMutation,
    useRegistrarListDBMutation
} = listaApi;
