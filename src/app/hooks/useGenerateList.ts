import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    useConvertVoiceToItemMutation,
    useRegistrarListDBMutation,
} from "@/redux/services/listaApi";
import {
    addVoicesToList,
    getVoice,
    updateVoice,
} from "@/redux/features/voiceSlice";
import {
    addItemToList,
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
    const [convertVoiceToItem] = useConvertVoiceToItemMutation();

    const [registrarListDB] = useRegistrarListDBMutation();
    const { itemsList, nombreCliente, pagada } = useAppSelector(
        (state) => state.listaReducer
    );
    const { voices } = useAppSelector((state) => state.VoiceReducer);

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

                const resp = await registrarListDB({
                    items: itemsList,
                    nombreCliente: nombreCliente,
                    completado: false,
                    pagado: pagada ?? false,
                }).unwrap();

                if (resp.id) {
                    push(`/listas/${resp.id}`);
                    resetTranscript();
                }
            },
        },
    ];

    const breakPhrases = [
        "punto",
        "mas",
        "más",
        "puntos",
        "puntos",
        "coma",
        "\\+",
    ];

    function speakToArray(text: string): string[] {
        const regex = new RegExp(
            `\\s*\\b(?:${breakPhrases.join("|")})\\b\\s*`,
            "gi"
        );

        // "5 kg de tomate a 3 soles más 1kg de mango a 2.50"
        const convertSimbols: string = text.replace(/\+\s*/g, " más ");

        // ['5 kg de tomate a 3 soles', '']
        const sentences = convertSimbols.split(regex); // Dividimos el texto en frases

        // obtenemos la ultima frase
        const lastSentence = sentences[sentences.length - 1];
        // evaluamos si la ultima frase termina con una palabra de breakPhrases
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
        console.log(someError, 'someError');
        
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
        });

        console.log('Fisnish');
    };

    useEffect(() => {
        if (pathname !== "/generar") return;
        if (finalTranscript.trim() === "") return;

        const phrases = speakToArray(finalTranscript.trim().toLowerCase());

        dispatch(addVoicesToList(phrases));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finalTranscript, pathname]);

    useEffect(() => {
        if (pathname !== "/generar") return;

        if (voices.length > 0) {
            // const voice = voices.find(
            //     (voice) => voice.status === "pending" && !voice.enviado
            // );

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

// const sendVoiceGPT = async (voice: Voice) => {
//     if (!voice.voz) return;

//     let index = itemsList.length + 1;
//     const indexExistsInItems = itemsList.some(
//         (item) => item.codigo === voice.codigo
//     );

//     // await resetTranscript();

//     if (indexExistsInItems) {
//         index = voice.codigo as string;
//     }

//     const itemFetch = mapItemToList({ status: "pending", index });
//     dispatch(addItemToList(itemFetch));
//     const response = await convertVoiceToItem({
//         message: voice.voz,
//     })
//         .unwrap()
//         .finally(() => {});

//     if (!response) {
//         console.log("hay error response");

//         dispatch(updateVoice({ ...voice, status: "error", enviado: true }));
//         return;
//     }
//     console.log("hay error response");
//     const newItem = convertResponseToItemList({
//         voice,
//         index,
//         response,
//     });

//     dispatch(addItemToList(newItem));
//     dispatch(
//         updateVoice({ ...voice, status: newItem.status, enviado: true })
//     );
//     dispatch(getVoice(null));
//     dispatch(selectItem(null));
// };
