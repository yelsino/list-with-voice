"use client";
import "regenerator-runtime/runtime";

import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { useRouter } from "next/navigation";
import useGenerateList from "@/app/hooks/useGenerateList";
import { buildCommandRegex } from "@/interfaces/mapper";
import { comando } from "./comandos";
import { IconMicrophone } from "../Icons";
import toast from 'react-hot-toast';

function Voice() {
    const { push } = useRouter();

    const commands = [
        {
            command: "* limpiar",
            callback: () => {
                console.log('*:', transcript);
                resetTranscript()
            },
            matchInterim: true,
        },
        {
            command: "limpiar",
            callback: () => {
                resetTranscript();
                console.log('solo:', transcript);
                
                toast.success('Se limpió el texto', {
                    icon: '🧹',
                });
            },
            matchInterim: true,
        },
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
    ];

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition({ commands });

    useGenerateList({ transcript, resetTranscript });

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

    return (
        <div>
            <button
                onClick={startListening}
                type="button"
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            >
                <div
                    className={`${
                        listening
                            ? " border-secondary-100 "
                            : "bg-primary-100 border-primary-100"
                    } p-5 relative rounded-full flex justify-center items-center transition ease-in-out duration-500 border-4`}
                >
                    <IconMicrophone />
                </div>
            </button>
        </div>
    );
}

export default Voice;
