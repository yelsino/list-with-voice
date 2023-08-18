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
import toast from "react-hot-toast";

function Voice() {
    const { push } = useRouter();
    const commands = [
        {
            command: "* limpiar",
            callback: () => {
                resetTranscript();
            },
            matchInterim: true,
        },
        {
            command: "limpiar",
            callback: () => {
                resetTranscript();
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
        finalTranscript,
        interimTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition({ commands });

    useGenerateList({ finalTranscript, resetTranscript });

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
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 translate-y-11 w-full flex justify-center bg-primary-200 py-5 sm:rounded-3xl  ">
            {/* <p className="text-secondary-100">{transcript}</p> */}
            {/* <p className="text-secondary-100">{finalTranscript}</p> */}
            <p className="text-secondary-100">{interimTranscript}</p>
            <button onClick={startListening} type="button" className="">
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
