import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    useConvertVoiceToItemMutation,
    useRegistrarListDBMutation,
} from "@/redux/services/listaApi";
import { addVoicesToList, updateVoice } from "@/redux/features/voiceSlice";
import {
    addItemToList,
    changeCargando,
    listaPagada,
    nameLista,
} from "@/redux/features/listaSlice";
import { usePathname, useRouter } from "next/navigation";
import { comando } from "../components/Voice/comandos";
import { Voice } from "@/interfaces/list.interface";
import {
    buildCommandRegex,
    convertResponseToItemList,
    mapItemToList,
} from "@/interfaces/mapper";
import { useSpeechRecognition } from "react-speech-recognition";
import toast, { Toaster } from "react-hot-toast";

interface Props {
    transcript: string;
    resetTranscript: () => void;
}

function useGenerateList({ resetTranscript }: Props) {
    const pathname = usePathname();
    const { push } = useRouter();
    const dispatch = useAppDispatch();
    const [convertVoiceToItem] = useConvertVoiceToItemMutation();

    const [registrarListDB] = useRegistrarListDBMutation();
    const { itemsList, nombreCliente, pagada } = useAppSelector(
        (state) => state.listaReducer
    );
    const { voices: voicesList, calculated } = useAppSelector(
        (state) => state.VoiceReducer
    );

    const [pending, setPending] = useState(false);

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

                const someItemFailed = voicesList.some(
                    (voice) =>
                        voice.status === "error" || voice.status === "pending"
                );

                if (someItemFailed) return;

                dispatch(changeCargando(true));
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

    const { transcript } = useSpeechRecognition({
        commands: pathname === "/generar" ? commands : [],
    });

    // simplemente tengo que configurar el voice para saber que ya se envio o no
    const sendVoiceGPT = async (voice: Voice) => {
        if (!voice.voz) return;
        
        let index = itemsList.length +1;
        const indexExistsInItems = itemsList.some(item => item.index === voice.index);
        if(indexExistsInItems){
            index = voice.index as number;
        }

        const itemFetch = mapItemToList({ status: "pending", index });
        dispatch(addItemToList(itemFetch));
        const response = await convertVoiceToItem({
            message: voice.voz,
        }).unwrap();

        if (!response) {
            dispatch(updateVoice({ ...voice, status: "error" }));
            setPending(false);
            return;
        }

        const newItem = convertResponseToItemList({
            voice,
            index,
            response,
        });
        // const newVoice = upDateStatusVoice({voice, newItem})
        dispatch(addItemToList(newItem));
        dispatch(updateVoice({ ...voice, status: newItem.status }));
        setPending(false);
    };

    useEffect(() => {
        if (pathname !== "/generar") return;
        if (transcript.trim() === "") return;

        const phrases = speakToArray(transcript.trim().toLowerCase());

        dispatch(addVoicesToList(phrases));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transcript, pathname]);

    useEffect(() => {
        if (pathname !== "/generar") return;

        if (voicesList.length > 0) {
            // obtener el primer Voice que tenga status pending
            const voice = voicesList.find(
                (voice) => voice.status === "pending"
            );

            console.log("voicesList", voicesList);
            console.log("hay pending?", voice);
            console.log("pending", pending);
            

            if (voice && !pending) {
                console.log('entro al if de registro');
                
                setPending(true);
                sendVoiceGPT(voice);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [voicesList, pathname, calculated]);
}

export default useGenerateList;
