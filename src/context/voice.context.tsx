// VoiceControlContext.tsx
import React, { createContext, useContext } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { buildCommandRegex } from "@/interfaces/mapper";
import { comando } from "@/app/components/Voice/comandos";
import { useSpeechRecognition } from "react-speech-recognition";

interface VoiceControlContextProps {
    transcript: string;
    listening: boolean;
    finalTranscript: string;
    interimTranscript: string;
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
            command: buildCommandRegex(comando.app.goconfig),
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

    const context = {
        resetTranscript,
        transcript,
        listening,
        finalTranscript,
        interimTranscript,
        browserSupportsSpeechRecognition,
    };

    return (
        <VoiceControlContext.Provider value={context}>
            {children}
        </VoiceControlContext.Provider>
    );
};
