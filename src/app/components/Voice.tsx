"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import {
    useConvertTextOnItemGPTMutation,
    useRegistrarListDBMutation,
} from "@/redux/services/listaApi";
import {
    addItemToList,
    editarLista,
    limpiarLista,
    nameLista,
    sumarLista,
} from "@/redux/features/listaSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

function Voice() {
    const transcriptRef = useRef<string>(""); // Se usará useRef en lugar de useState
    const recognitionReference = useRef<any | null>(null);

    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const { params } = useParams();
    const { push } = useRouter();

    const { itemsList, nombreCliente, edit } = useAppSelector(
        (state) => state.listaReducer
    );

    const [isListening, setIsListening] = useState<boolean>(false);
    const [chatGPTResponse, setChatGPTResponse] = useState<string[]>([]);
    const [convertToItemGPT] = useConvertTextOnItemGPTMutation();
    const [registrarListDB] = useRegistrarListDBMutation();

    const montoTotal = itemsList.reduce((acc, curr) => {
        return Number(acc) + Number(curr.costoTotal);
    }, 0);

    useEffect(() => {
        if ("webkitSpeechRecognition" in window) {
            recognitionReference.current = new (
                window as any
            ).webkitSpeechRecognition();
            recognitionReference.current.interimResults = true;
            recognitionReference.current.continuous = true;

            recognitionReference.current.onresult = (event: any) => {
                const transcriptArray = [...event.results]
                    .map((result) => result[0])
                    .map((result) => result.transcript);
                const transcript = transcriptArray.join("");
                transcriptRef.current = transcript;
            };

            recognitionReference.current.onend = () => {
                if (transcriptRef.current === "configuración") {
                    push("/configuracion");
                }
                if (transcriptRef.current === "nueva lista") {
                    push("/generar");
                }
                if (transcriptRef.current === "ver listas") {
                    push("/listas");
                }

                if (pathname === "/generar") {
                    if (transcriptRef.current.includes("lista para")) {
                        console.log("lista para ?");

                        const remainingText = transcriptRef.current
                            .split("lista para")[1]
                            .trimStart();
                        dispatch(nameLista(remainingText));
                        transcriptRef.current = "";
                        return;
                    }
                    const phrases = [
                        "Lo siento",
                        "como modelo",
                        "soy incapaz",
                        "no entiendo",
                    ];

                    const phFinishList = [
                        "generar lista",
                        "finalizar lista",
                        "terminar lista",
                        "acabar lista",
                        "concluir lista",
                        "guardar lista",
                        "completar lista",
                    ];

                    const phEditList = [
                        "editar lista",
                        "modificar lista",
                        "cambiar lista",
                        "actualizar lista",
                        "ajustar lista",
                        "modificar elementos de lista",
                        "editar contenido de lista",
                        "rectificar lista",
                        "agregar más productos",
                        "agregar más productos a la lista",
                        "agregar productos",
                    ];

                    const phCloseRegister = [
                        "cancelar registro",
                        "anular registro",
                        "cerrar registro",
                        "detener registro",
                        "abortar registro",
                        "finalizar registro",
                        "terminar registro",
                        "concluir registro",
                        "cancelar creación de lista",
                        "salir del registro de lista",
                    ];

                    if (phFinishList.includes(transcriptRef.current)) {
                        console.log(
                            "ok, finalizar entonces",
                            itemsList.length,
                            montoTotal
                        );

                        dispatch(sumarLista(montoTotal));
                        registrarListDB({
                            items: itemsList,
                            nombreCliente: nombreCliente,
                        }).then(()=>{
                            dispatch(editarLista(false))
                        });
                        return;
                    }

                    if (phEditList.includes(transcriptRef.current))
                        return dispatch(editarLista(true));

                    if (phCloseRegister.includes(transcriptRef.current))
                        return dispatch(limpiarLista());

                    convertToItemGPT({ message: transcriptRef.current })
                        .then((response: any) => {
                            // @ts-ignore

                            const messageResult =
                                response?.data?.choices[0].message.content;
                            const responseValida = phrases.some((phrase) =>
                                messageResult.includes(phrase)
                            );
                            console.log(responseValida);

                            if (responseValida) {
                                transcriptRef.current = "";
                                return;
                            }

                            const itemJson = JSON.parse(messageResult);

                            const indexItem = itemsList.length + 1;

                            // @ts-ignore
                            dispatch(
                                addItemToList({ ...itemJson, index: indexItem })
                            );
                        })
                        .catch((error: unknown) => {});
                    transcriptRef.current = "";
                }
            };
        } else {
            alert(
                "Lo siento, tu navegador no soporta la API de reconocimiento de voz. Por favor, prueba con Google Chrome."
            );
        }
    }, [pathname, itemsList]);

    useEffect(() => {
        const responsesLStorage: string[] = JSON.parse(
            localStorage.getItem("responseChatGtp") ?? "[]"
        ) as string[];
        setChatGPTResponse(responsesLStorage);
    }, []);

    useEffect(() => {
        if (isListening) {
            recognitionReference.current?.start();
        } else {
            recognitionReference.current?.stop();
        }
    }, [isListening]);
    return (
        <button
            type="button"
            onClick={() => {
                setIsListening((previousState) => !previousState);
                if (!isListening) {
                    transcriptRef.current = ""; // Limpia el transcripto cuando el usuario comienza a hablar
                }
            }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
            {pathname}
            <div className="bg-primary-100 h-20 w-20 relative rounded-full flex justify-center items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-8 h-8 text-secondary-100"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                    />
                </svg>
            </div>
        </button>
    );
}

export default Voice;

const comandos = {
    nuevaLista: "nueva lista",
    cancelarLista: "cancelar lista",
    borrarItem: "borrar item",
    verTodo: "ver listas",
    imprimirLista: "imprimir lista",
    cancelarAccion: "cancelar",
};

const paginas = {
    nuevaLista: "/nueva-lista",
    verLista: "/ver-lista",
    imprimirLista: "/imprimir-lista",
    imprimirMultiples: "/imprimir-multiple",
};
