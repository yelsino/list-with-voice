import {
    buildCommandRegex,
} from "@/interfaces/mapper";
import { seleccionarCliente } from "@/redux/features/clienteSlice";
import {
    abonarLista,
    listaPagada,
} from "@/redux/features/listaSlice";
import { useAppDispatch } from "@/redux/hooks";
import { usePathname } from "next/navigation";
import { useSpeechRecognition } from "react-speech-recognition";
import { comando } from "../components/Voice/comandos";

interface Props {
    resetTranscript: () => void;
    finalTranscript: string;
    interimTranscript: string;
}

function useGenerateList({
    resetTranscript,
}: Props) {
    const pathname = usePathname();
    const dispatch = useAppDispatch();

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
            callback: async () => { },
        },
    ];

    useSpeechRecognition({
        commands: pathname === "/generar" ? commands : [],
    });


}

export default useGenerateList;
