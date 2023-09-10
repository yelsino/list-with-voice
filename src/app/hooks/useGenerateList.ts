import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    useConvertVoiceToItemMutation,
    useRegistrarListDBMutation,
} from "@/redux/services/listaApi";
import {
    addPhase,
    addVoicesToList,
    cleanVoices,
    getVoice,
    updateVoice,
} from "@/redux/features/voiceSlice";
import {
    addItemToList,
    limpiarLista,
    listaPagada,
    nameLista,
    selectItem,
} from "@/redux/features/listaSlice";
import { usePathname, useRouter } from "next/navigation";
import { comando } from "../components/Voice/comandos";
import { Voice } from "@/interfaces/list.interface";
import {
    buildCommandRegex,
    responseToItemList,
    mapItemToList,
} from "@/interfaces/mapper";
import { useSpeechRecognition } from "react-speech-recognition";
import toast, { Toaster } from "react-hot-toast";

interface Props {
    resetTranscript: () => void;
    finalTranscript: string;
}

function useGenerateList({ resetTranscript, finalTranscript }: Props) {
    const pathname = usePathname();
    const { push } = useRouter();
    const dispatch = useAppDispatch(); 

    // const [frases,setFrases] = useState<string[]>([])
    const [convertVoiceToItem] = useConvertVoiceToItemMutation();

    const [registrarListDB] = useRegistrarListDBMutation();
    const { itemsList, nombreCliente, pagada } = useAppSelector(
        (state) => state.listaReducer
    );
    const { voices, phases } = useAppSelector((state) => state.VoiceReducer);

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
                dispatch(listaPagada(true));
                resetTranscript();
            },
        },
        {
            command: "lista para *",
            callback: (algo: any) => {
                dispatch(nameLista(algo));
            },
            matchInterim: true,
        },

        {
            command: buildCommandRegex(comando.finishList),
            callback: async () => {
                if (!nombreCliente) {
                    toast.error("Indica el nombre del cliente", {
                        icon: "👏",
                    });
                    return;
                }

                const someItemFailed = itemsList.some(
                    (voice) =>
                        voice.status === "error" || voice.status === "pending"
                );

                if (someItemFailed) return;

                toast
                    .promise(
                        registrarListDB({
                            items: itemsList,
                            nombreCliente: nombreCliente,
                            completado: false,
                            pagado: pagada ?? false,
                        }).unwrap(),
                        {
                            loading: "Generando...",
                            success: "Lista generada!",
                            error: "Error al generar lista.",
                        }
                    )
                    .then((resp) => {
                        if (resp.id) {
                            dispatch(limpiarLista());
                            push(`/listas/${resp.id}`);
                        }
                    });
            },
        },
    ];

    const breakPhrases = ["punto", "mas", "más", "coma", "\\+"];

    function speakToArray(text: string): string[] {
        const regex = new RegExp(
            `\\s*\\b(?:${breakPhrases.join("|")})\\b\\s*`,
            "gi"
        );

        // "5 kg de tomate a 3 soles más 1kg de mango a 2.50"
        const convertSimbols: string = text.replace(/\+\s*/g, " más ");

        // ['5 kg de tomate a 3 soles', '']
        const sentences = Array.from(new Set([...convertSimbols.split(regex)])); // Dividimos el texto en frases
     
        // obtenemos la ultima frase
        console.log("sentences", sentences);
        const lastSentence = sentences[sentences.length - 1];
        // evaluamos si la ultima frase termina con una palabra de breakPhrases
        console.log("lastSentence", lastSentence);

        if (
            !lastSentence.match(
                new RegExp(`\\b(?:${breakPhrases.join("|")})\\b$`, "i")
            )
        ) {
            sentences.pop();
        }

        // ['5 kg de tomate a 3 soles']
        return sentences.map((sentence) => sentence.trim());
    }

    useSpeechRecognition({
        commands: pathname === "/generar" ? commands : [],
    });

    const sendVoiceGPT2 = async (voicesNotSend: Voice[]) => {
        let newItemsList = voicesNotSend.map((voice) => {
            const itemFetch = mapItemToList({
                status: "pending",
                id: voice.codigo,
                voz: voice.voz,
            });

            return dispatch(addItemToList(itemFetch)).payload;
        });

        const promises = newItemsList.map((item) => {
            return () =>
                convertVoiceToItem({
                    message: item.voz,
                    codigo: item.id,
                }).unwrap();
        });

        const responses = await Promise.all(promises.map((p) => p()));

        // validamos si hay error en alguna respuesta
        const someError = responses.some((response) => !response);

        if (someError) {
            voicesNotSend.forEach((voice) => {
                dispatch(
                    updateVoice({ ...voice, status: "error", enviado: true })
                );
            });
            return;
        }

        responses.forEach((response) => {
            const newItem = responseToItemList({ response });

            // buscar codigo en voicesNotSend
            const voice = voicesNotSend.find(
                (voice) => voice.codigo === newItem.id
            );

            if (!voice) return;

            dispatch(addItemToList({ ...newItem, voz: voice.voz }));
            dispatch(
                updateVoice({ ...voice, status: newItem.status, enviado: true })
            );
            dispatch(getVoice(null));
            dispatch(selectItem(null));

            // dispatch(cleanVoices())
        });
    };

    useEffect(() => {
        if (pathname !== "/generar") return;
        if (finalTranscript.trim() === "") return;

        const newPhases = new Set([
            ...phases,
            ...speakToArray(finalTranscript.trim().toLowerCase()),
        ]);
        dispatch(addPhase(Array.from(newPhases)));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finalTranscript, pathname]);

    useEffect(() => {
        if (pathname !== "/generar") return;
        if (finalTranscript.trim() === "") return;
        if (phases.length > 0) {
            dispatch(addVoicesToList(phases));
        }
    }, [phases]);

    useEffect(() => {
        if (pathname !== "/generar") return;

        if (voices.length > 0) {
            // obtener todas las voces que no esten enviadas
            const voicesNotSend = voices.filter(
                (voice) => voice.status === "pending" && !voice.enviado
            );

            if (voicesNotSend.length >= 1) {
                sendVoiceGPT2(voicesNotSend);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [voices, pathname]);
}

export default useGenerateList;
