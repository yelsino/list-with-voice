import { Cliente } from "@/interfaces/client.interface";
import { ItemList } from "@/interfaces/list.interface";
import {
    buildCommandRegex,
    responseToItemList,
    stringToItem,
} from "@/interfaces/mapper";
import { obtenerClientes } from "@/redux/chunks/clienteChunck";
import { seleccionarCliente } from "@/redux/features/clienteSlice";
import {
    abonarLista,
    addItemsToList,
    listaPagada,
    selectItem,
    updateItem,
    updateItems,
} from "@/redux/features/listaSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useConvertVoiceToItemMutation } from "@/redux/services/listaApi";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSpeechRecognition } from "react-speech-recognition";
import { comando } from "../components/Voice/comandos";

interface Props {
    resetTranscript: () => void;
    finalTranscript: string;
    interimTranscript: string;
}

const breakPhrases = ["punto", "mas", "más", "coma", "\\+"];

function useGenerateList({
    resetTranscript,
    finalTranscript,
    interimTranscript,
}: Props) {
    const pathname = usePathname();
    const dispatch = useAppDispatch();

    const [convertVoiceToItem] = useConvertVoiceToItemMutation();

    const { lista, itemSelected } = useAppSelector(
        (state) => state.listaReducer
    );
    const clienteState = useAppSelector((state) => state.clienteReducer);

    const commands = [
        {
            command: "lista pagada",
            callback: () => {
                dispatch(listaPagada(true));
                resetTranscript();
            },
        },
        {
            command: "lista no pagada",
            callback: () => {
                dispatch(listaPagada(false));
                resetTranscript();
            },
        },
        {
            command: "abonar :monto soles",
            callback: (monto: string) => {
                dispatch(
                    abonarLista({
                        createdAt: new Date().toISOString(),
                        monto: Number(monto),
                    })
                    );
                    resetTranscript()
                
            },
            matchInterim: true,
        },
        {
            command: "lista para *",
            callback: (texto: string) => {
                dispatch(
                    seleccionarCliente({
                        celular: "",
                        nombres: texto,
                        status: "pending",
                    })
                );
            },
            matchInterim: true,
        },
        {
            command: buildCommandRegex(comando.lista.cerrar),
            callback: async () => {},
        },
    ];

    useSpeechRecognition({
        commands: pathname === "/generar" ? commands : [],
    });

    function speakToArray(transcript: string): string[] {
        const formatTranscript = transcript.trim().toLowerCase();
        const regex = new RegExp(
            `\\s*\\b(?:${breakPhrases.join("|")})\\b\\s*`,
            "gi"
        );

        // "5 kg de tomate a 3 soles más 1kg de mango a 2.50"
        const convertSimbols: string = formatTranscript.replace(
            /\+\s*/g,
            " más "
        );

        // ['5 kg de tomate a 3 soles', '']
        const sentences = Array.from(new Set([...convertSimbols.split(regex)])); // Dividimos el texto en frases

        // obtenemos la ultima frase
        const lastSentence = sentences[sentences.length - 1];
        // evaluamos si la ultima frase termina con una palabra de breakPhrases

        if (
            !lastSentence.match(
                // new RegExp(`\\b(?:${breakPhrases.join("|")})\\b$`, "i")
                new RegExp(`\\b(?:${breakPhrases.join("|")})\\b`, "i")
            )
        ) {
            sentences.pop();
        }

        // ['5 kg de tomate a 3 soles']
        return sentences
            .map((sentence) => sentence.trim())
            .filter((v) => v.length > 0);
    }

    const sendVoiceGPT2 = async (itemsNoSent: ItemList[]) => {
        const promises = itemsNoSent.map((item) => {
            return () =>
                convertVoiceToItem({
                    message: item.voz,
                    codigo: item.id,
                }).unwrap();
        });

        const responses = await Promise.all(promises.map((p) => p()));

        const itemsNuevos: ItemList[] = responses
            .map((response) => responseToItemList({ response }))
            .map((item) => {
                const existe = itemsNoSent.find((p) => item.id === p.id);
                if (existe) {
                    item.voz = existe.voz;
                }
                return item;
            });

        dispatch(updateItems(itemsNuevos));
        if (itemSelected) dispatch(selectItem(null));
    };

    useEffect(() => {
        if (!finalTranscript || pathname !== "/generar") return;

        const voices: string[] = speakToArray(finalTranscript);
        console.log(voices);

        if (!itemSelected) {
            const items: ItemList[] = voices.map((voice) =>
                stringToItem(voice)
            );
            dispatch(addItemsToList(items));
        }

        if (itemSelected && voices.length > 0) {
            const item = stringToItem(voices[0]);
            dispatch(updateItem({ ...item, id: itemSelected.id }));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finalTranscript]);

    useEffect(() => {
        if (pathname !== "/generar") return;
        const itemsNoSend: ItemList[] = lista.items
            .filter((item) => item.status === "pending")
            .map((item) => ({ ...item, status: "sent" }));

        if (itemsNoSend.length > 0) {
            dispatch(updateItems(itemsNoSend));
            sendVoiceGPT2(itemsNoSend);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lista]);

    useEffect(() => {
        if (finalTranscript && clienteState.cliente?.status === "pending") {
            toast
                .promise(
                    dispatch(
                        obtenerClientes({
                            startDate: null,
                            endDate: null,
                            page: 1,
                            pageSize: 20,
                            texto: clienteState.cliente?.nombres ?? "",
                        })
                    ),
                    {
                        loading: "Verificando clientes...",
                        success: "Verificación completa",
                        error: "Error al verificar",
                    }
                )
                .then((res: any) => {
                    if (res.payload.length === 0) {
                        dispatch(
                            seleccionarCliente({
                                ...clienteState.cliente,
                                status: "sent",
                            } as Cliente)
                        );
                    }
                    resetTranscript();
                });
        }
    }, [finalTranscript]);
}

export default useGenerateList;
