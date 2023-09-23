"use client";
import "regenerator-runtime/runtime";
import { comando } from "@/app/components/Voice/comandos";
import useGenerateList from "@/app/hooks/useGenerateList";
import { buildCommandRegex } from "@/interfaces/mapper";
import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";
import toast from "react-hot-toast";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

interface VoiceControlContextProps {
    transcript: string;
    listening: boolean;
    finalTranscript: string;
    interimTranscript: string;
    startListening: () => Promise<void>
    resetTranscript: () => void;
    browserSupportsSpeechRecognition: boolean;
}

const VoiceControlContext = createContext<VoiceControlContextProps | undefined>(
    undefined
);

export function useVoiceControl() {
    const context = useContext(VoiceControlContext);
    if (!context) {
        throw new Error(
            "useVoiceControl debe usarse dentro de un VoiceControlProvider"
        );
    }
    return context;
}

interface Props {
    children: React.ReactNode;
}

export const VoiceControlProvider = ({ children }: Props) => {
    const { push } = useRouter();

    const commands = [
        {
            command: "* limpiar",
            callback: () => {
                context.resetTranscript();
            },
            matchInterim: true,
        },
        {
            command: "limpiar",
            callback: () => {
                context.resetTranscript();
                toast.success("Se limpió el texto", {
                    icon: "🧹",
                });
            },
            matchInterim: true,
        },
        {
            command: buildCommandRegex(comando.direccion.configuracion),
            callback: () => {
                push("/configuracion");
                context.resetTranscript();
            },
            matchInterim: true,
        },
        // Otros comandos aquí
    ];

    const {
        transcript,
        listening,
        resetTranscript,
        finalTranscript,
        interimTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition({ commands });


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

    const context = {
        transcript,
        listening,
        startListening,
        resetTranscript,
        finalTranscript,
        interimTranscript,
        browserSupportsSpeechRecognition,
    };


    useGenerateList({ finalTranscript, resetTranscript,interimTranscript  });



    return (
        <VoiceControlContext.Provider value={context}>
            {children}
        </VoiceControlContext.Provider>
    );
};
