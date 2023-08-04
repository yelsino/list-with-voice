import { GptRequest, Lista, ResponseGPT } from "@/interfaces/list.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URLBASE = {
    // LOCAL: "http://localhost:3000/api/",
     LOCAL: "https://list-with-voice.vercel.app/api/",
    GPT: "https://api.openai.com/v1/chat/completions",
};

export const listaApi = createApi({
    reducerPath: "listaApi",
    refetchOnFocus: true, // when the window is refocused, refetch the data
    baseQuery: fetchBaseQuery({
        baseUrl: "",
    }),

    endpoints: (builder) => ({
        getListas: builder.query<Lista[], null>({
            query: () => `${URLBASE.LOCAL}/listas`,
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
        convertVoiceToItem: builder.mutation<ResponseGPT, GptRequest>({
            query: ({ message }) => ({
                url: URLBASE.GPT,
                method: "POST",
                body: {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: `
                            Eres un asistente inteligente que convierte descripciones de productos en un formato de objeto JSON. Tu objetivo es extraer información relevante de las instrucciones proporcionadas en español peruano y generar una respuesta en formato JSON.
                            
                            A continuación, se detallan las reglas mejoradas para la conversión:
                            
                            1. Si la instrucción contiene información clara y precisa de cantidad, medida, nombre y precio del producto, la respuesta debe incluir todos estos datos La propiedad "calculated" debe establecerse en "false".
                            
                            2. Si la instrucción contiene únicamente el montoItem y el nombre del producto, la respuesta debe incluir estos datos, y la propiedad "calculated" debe establecerse en "true".
                            
                            3. Si la instrucción contiene el nombre del producto y una palabra similar a "solvente" (por ejemplo, "solvente"), debes considerar este texto como mal escrito y debes intuir que se trata de una cantidad en soles y céntimos. Por ejemplo, "solvente" sería "1 sol con veinte centavos" (1.20).
                            
                            4. Si la instrucción tiene información de varios productos, pero algunos detalles son vagos o no se pueden interpretar correctamente, se deben incluir los productos con información completa y omitir los productos ambiguos en la respuesta.
                            
                            5. Si la instrucción es demasiado confusa o no se puede extraer información relevante, la respuesta debe ser un objeto vacío.
                            
                            Aquí tienes algunos ejemplos mejorados para ilustrar el funcionamiento:
                            
                            - Instrucción: 'cinco kilos y medio de manzana son 2 soles'
                              Respuesta: "{ 'cantidad': 5.5, 'medida': 'kg', 'nombre': 'manzana', 'precio': 2, 'calculated': false }"
                              
                            - Instrucción: 'un litro de aceite a 7 soles'
                              Respuesta: "{ 'cantidad': 1, 'medida': 'kg', 'nombre': 'aceite', 'precio': 7, 'calculated': false }"

                              - Instrucción: '15 kg de zanahorias a un solvente'
                              Respuesta: "{ 'cantidad': 15, 'medida': 'kg', 'nombre': 'zanahorias', 'precio': 1.20, 'calculated': false }"
                            
                            - Instrucción: 'manzana'
                              Respuesta: "{ 'cantidad': 0, 'medida': '', 'nombre': 'manzana', 'precio': 0, 'calculated': false }"
                            
                            - Instrucción: '25 soles de manzana'
                              Respuesta: "{ 'nombre': 'manzana', 'montoItem': 25, 'calculated': true }"

                              - Instrucción: '20 soles 10 de carne de res'
                              Respuesta: "{ 'nombre': 'carne de res', 'montoItem': 20.1, 'calculated': true }"
                            
                            - Instrucción: '15 kg de zanahorias a un sol veinte 10 litros de leche a un sol 10 8 kg de arroz a un sol 50'
                              Respuesta: "{}" (objeto vacío)

                            `,
                        },
                        {
                            role: "user",
                            content:
                                "cinco kilos y medio de cebolla son 2 soles cincuenta",
                        },
                        {
                            role: "assistant",
                            content: JSON.stringify({
                                cantidad: 5.5,
                                medida: "kg",
                                nombre: "cebolla",
                                precio: 2.5,
                                calculated: false,
                            }),
                        },
                        {
                            role: "user",
                            content:
                                "tres litros y cuarto de aceite a 3 soles veinte",
                        },
                        {
                            role: "assistant",
                            content: JSON.stringify({
                                cantidad: 3.25,
                                medida: "l",
                                nombre: "aceite",
                                precio: 3.2,
                                calculated: false,
                            }),
                        },
                        {
                            role: "user",
                            content: "300 gramos de queso a 6 soles 50",
                        },
                        {
                            role: "assistant",
                            content: JSON.stringify({
                                cantidad: 0.3,
                                medida: "g",
                                nombre: "queso",
                                precio: 6.5,
                                calculated: false,
                            }),
                        },
                        {
                            role: "user",
                            content: "trece soles de rocoto",
                        },
                        {
                            role: "assistant",
                            content: JSON.stringify({
                                nombre: "rocoto",
                                montoItem: 13,
                                calculated: true,
                            }),
                        },
                        { role: "user", content: message },
                    ],
                    temperature: 1,
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: process.env.GPT_TOKEN,
                },
            }),
        }),
        registrarListDB: builder.mutation<Lista, Lista>({
            query: (lista) => ({
                method: "POST",
                url: `${URLBASE.LOCAL}/listas`,
                body: JSON.stringify(lista),
            }),
        }),
        getListaById: builder.query<Lista, { id: string }>({
            query: ({ id }) => `${URLBASE.LOCAL}/listas/${id}`,
        }),
    }),
});

export const {
    useGetListasQuery,
    useGetListaByIdQuery,
    // useConvertItemCalculadoMutation,
    useConvertVoiceToItemMutation,
    useSendListaToGPTMutation,
    useRegistrarListDBMutation,
} = listaApi;

// INTRUCCCION 1 FUNCIONALIDAD

// messages: [
//     {
//         role: "system",
//         content: `Eres un asistente inteligente que convierte descripciones de productos en un formato de objeto JSON; ejemplo
//         Instruccion: 'cinco kilos  de manzana son 2 soles'
//         Respuesta: "{ "cantidad": 5, "medida": "kg", "nombre": "manzana", "precio": 2, "montoItem": 10, "calculated": false }"

//         Nota que el 'montoItem' se calculan de (cantidad * precio) y que la cadena se encierra entre comillas dobles ("). La respuesta solo debe ser la cadena JSON, sin ningún texto adicional.

//         Los textos estan en español Perú. por ende si encuentras palabras como  o '1 sol 20' es porque 'sol' se refiere a la moneda de Perú que son los 'nuevos soles' y 'solvente' es un error de pronunciación que se refiere a '1 sol veinte'.

//         Si solo proporcionan montoItem y nombre de producto entonces responde de esta forma.

//         Instruccion: '25 soles de manzana'
//         Respuesta: "{'nombre': 'manzana', 'montoItem': 25, 'calculated': true}"

//         No importa lo descabellado o incoherente que suene el texto solo conviertelo

//         Si la instruccion no es clara, intenta capturar algunos valores. ejemplo-> 'manzana' entonces devolverias -> '{ 'cantidad': 0, 'medida': '', 'nombre': 'manzana', 'precio': 0, 'montoItem': 0 }'

//         Si la instruccion es demasiada extraña a los ejemplos indicados, entonces solo responde un objeto vacio;ejemplo

//         Instruccion: '15 kg de zanahorias a un solvente 10 litros de leche a un sol 10 8 kg de arroz a un sol 5'
//         Respuesta: "{}"

//         `,
//     },
//     {
//         role: "user",
//         content:
//             "cinco kilos y medio de cebolla son 2 soles cincuenta",
//     },
//     {
//         role: "assistant",
//         content: JSON.stringify({
//             cantidad: 5.5,
//             medida: "kg",
//             nombre: "cebolla",
//             precio: 2.5,
//             montoItem: 13.75,
//             calculated: false,
//         }),
//     },
//     {
//         role: "user",
//         content:
//             "tres litros y cuarto de aceite cuesta a 3 soles veinte",
//     },
//     {
//         role: "assistant",
//         content: JSON.stringify({
//             cantidad: 3.25,
//             medida: "l",
//             nombre: "aceite",
//             precio: 3.2,
//             montoItem: 10.4,
//             calculated: false,
//         }),
//     },
//     {
//         role: "user",
//         content: "trece soles de rocoto",
//     },
//     {
//         role: "assistant",
//         content: JSON.stringify({
//             nombre: "rocoto",
//             montoItem: 13,
//             calculated: true,
//         }),
//     },
//     { role: "user", content: message },
// ],
