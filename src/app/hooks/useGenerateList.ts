import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    useConvertVoiceToItemMutation,
    useRegistrarListDBMutation,
} from "@/redux/services/listaApi";
import {
    addItemsToList,
    limpiarLista,
    listaPagada,
    nameLista,
    selectItem,
    updateItems,
} from "@/redux/features/listaSlice";
import { usePathname, useRouter } from "next/navigation";
import { comando } from "../components/Voice/comandos";
import {
    buildCommandRegex,
    responseToItemList,
    mapItemToList,
    stringToItem,
} from "@/interfaces/mapper";
import { useSpeechRecognition } from "react-speech-recognition";
import toast, { Toaster } from "react-hot-toast";
import { ItemList } from "@/interfaces/list.interface";

interface Props {
    resetTranscript: () => void;
    finalTranscript: string;
}

const breakPhrases = ["punto", "mas", "más", "coma", "\\+"];

function useGenerateList({ resetTranscript, finalTranscript }: Props) {
    const pathname = usePathname();
    const { push } = useRouter();
    const dispatch = useAppDispatch();

    const [convertVoiceToItem] = useConvertVoiceToItemMutation();

    const { itemsList, nombreCliente, pagada } = useAppSelector(
        (state) => state.listaReducer
    );

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
    };

    useEffect(() => {
        if (!finalTranscript || pathname !== "/generar") return;

        const voices: string[] = speakToArray(finalTranscript);
        console.log(voices);

        const items: ItemList[] = voices.map((voice) => stringToItem(voice));

        dispatch(addItemsToList(items));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finalTranscript]);

    useEffect(() => {
        if (pathname !== "/generar") return;
        const itemsNoSend: ItemList[] = itemsList
            .filter((item) => item.status === "pending")
            .map((item) => ({ ...item, status: "sent" }));

        if (itemsNoSend.length > 0) {
            dispatch(updateItems(itemsNoSend));
            sendVoiceGPT2(itemsNoSend);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemsList]);
}

export default useGenerateList;
