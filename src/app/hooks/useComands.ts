import { buildCommandRegex } from "@/interfaces/mapper";
import { useRouter } from "next/navigation";
import { comando } from "../components/Voice/comandos";
import SpeechRecognition from "react-speech-recognition";
interface Props {
    transcript: string;
    listening: boolean;
    resetTranscript: () => void;
}

export function useComands({ listening, resetTranscript }: Props) {
    const { push } = useRouter();

    const startListening = async () => {
        if (listening) {
            await SpeechRecognition.stopListening();
            await resetTranscript();
            return;
        }

        await SpeechRecognition.startListening({
            continuous: true,
            language: "es-PE",
        });

        return;
    };

    const commands = [
        {
            command: buildCommandRegex(comando.app.goconfig),
            callback: () => {
                push("/configuracion");
                resetTranscript();
            },
            matchInterim: true,
        },
        {
            command: buildCommandRegex(comando.app.back),
            callback: () => {
                window.history.back();
                resetTranscript();
            },
        },
        {
            command: buildCommandRegex(comando.app.golistas),
            callback: () => {
                push("/listas");
                resetTranscript();
            },
        },
        {
            command: buildCommandRegex(comando.app.gogenerar),
            callback: () => {
                push("/generar");
                resetTranscript();
            },
        },
        {
            command: buildCommandRegex(comando.app.goinicio),
            callback: () => {
                push("/");
                resetTranscript();
            },
        },
        {
            command: buildCommandRegex(comando.app.cleanvoice),
            callback: () => resetTranscript(),
        },
    ];

    return { commands, startListening };
}
