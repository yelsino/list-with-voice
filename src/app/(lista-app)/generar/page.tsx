"use client";
import { useSession } from "next-auth/react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import React, { useEffect } from "react";
import Link from "next/link";
import { limpiarLista } from "@/redux/features/listaSlice";
import { LayoutGroup, motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
    useRegistrarListDBMutation,
    useUpdateListMutation,
} from "@/redux/services/listaApi";
import { useRouter } from "next/navigation";
import { Loader } from "@/app/components/Loader/Loader";
import { Header } from "@/app/components/Header";
import { IconHome, IconSave } from "@/app/components/Icons";
import { SuperTitle } from "@/app/components/SuperTitle";
import { ItemLista } from "@/app/components/Lista/ItemLista";
import { isMongoId } from "@/interfaces/mapper";
import { seleccionarCliente } from "@/redux/features/clienteSlice";
import { useVoiceControl } from "@/context/voice.context";
import { Cliente } from "@/interfaces/client.interface";
import { formatText } from "@/interfaces/FormatReact";

function GenerarPage() {
    const dispatch = useAppDispatch();
    const { push } = useRouter();

    const [registrarListDB] = useRegistrarListDBMutation();
    const [updateListDB] = useUpdateListMutation();
    const { itemsList, pagada, cargando } = useAppSelector(
        (state) => state.listaReducer
    );
    const listaState = useAppSelector((state) => state.listaReducer);
    const clienteState = useAppSelector((state) => state.clienteReducer);
    const { startListening, listening, finalTranscript } = useVoiceControl();

    const guardarLista = async () =>
        listaState.edit ? actualizarLista() : crearListaNueva();

    const crearListaNueva = async () => {
        if (!clienteState.cliente) {
            toast.error("Indica al cliente", {
                icon: "👏",
            });
            return;
        }

        const someItemFailed = itemsList.some(
            (voice) => voice.status === "error" || voice.status === "pending"
        );

        if (someItemFailed) return;

        toast
            .promise(
                registrarListDB({
                    items: itemsList,
                    completado: false,
                    pagado: pagada ?? false,
                    cliente: clienteState.cliente as Cliente,
                }).unwrap(),
                {
                    loading: "Generando...",
                    success: <b>Lista generada!</b>,
                    error: <b>Error al generar lista.</b>,
                }
            )
            .then((resp) => {
                if (resp.id) {
                    dispatch(limpiarLista());
                    push(`/listas/${resp.id}`);
                }
            });
    };
    const actualizarLista = async () => {
        console.log("voy a actualizar lsita");

        if (!clienteState.cliente) {
            toast.error("Indica al cliente", {
                icon: "👏",
            });
            return;
        }

        const someItemFailed = itemsList.some(
            (voice) => voice.status === "error" || voice.status === "pending"
        );

        if (someItemFailed) return;

        toast
            .promise(
                updateListDB({
                    items: itemsList.map((i) => ({
                        ...i,
                        id: isMongoId(i.id) ? i.id : "111112222233333444445555",
                    })),
                    cliente: clienteState.cliente as Cliente,
                    completado: false,
                    pagado: pagada ?? false,
                    id: listaState.id,
                }).unwrap(),
                {
                    loading: "Actualizando...",
                    success: <b>Lista actualizada!</b>,
                    error: <b>Error al actualizar lista.</b>,
                }
            )
            .then((resp) => {
                if (resp.id) {
                    push(`/listas/${resp.id}`);
                    dispatch(limpiarLista());
                }
            });
    };

    useEffect(() => {
        if (clienteState.clientes.length > 1) {
            push("generar/para");
        }
        if (clienteState.clientes.length === 1) {
            const cliente = clienteState.clientes[0];
            dispatch(seleccionarCliente({ ...cliente, status: "sent" }));
        }
    }, [clienteState.clientes]);

    return (
        <>
            {cargando ? (
                <Loader texto="registrando..." />
            ) : (
                <div className="flex flex-col gap-y-4 ">
                    <Header
                        childrenLeft={
                            <Link href="/" className="text-2xl">
                                <IconHome />
                            </Link>
                        }
                        childrenRight={
                            <button onClick={guardarLista}>
                                <IconSave estilo="" />
                            </button>
                        }
                    />

                    <SuperTitle
                        title={formatText(
                            clienteState?.cliente?.nombres ?? "Lista para:"
                        )}
                    >
                        <p className="text-secondary-200 text-lg font-semibold">
                            Pagada: {pagada ? "Si" : "No"} - Adelanto:{" "}
                            {pagada ? "Si" : "No"}
                        </p>
                    </SuperTitle>

                    <div>
                        <p className="text-secondary-100 font-semibold text-lg ">
                            Productos
                        </p>
                        {itemsList.length === 0 && (
                            <div className="flex flex-col gap-y-3">
                                <p className="text-secondary-200">
                                    Aún no ha añadido ningun producto a la
                                    lista, ver lista de{" "}
                                    <Link
                                        href="/configuracion"
                                        className="text-secondary-100"
                                    >
                                        comandos
                                    </Link>{" "}
                                    de voz para empezar a registrar los
                                    productos
                                </p>

                                <div>
                                    <p className="text-secondary-100 text-lg font-semibold">
                                        Añadir items
                                    </p>
                                    <p className="text-secondary-200">
                                        Forma 1: 20 soles de tomates
                                    </p>
                                    <p className="text-secondary-200">
                                        Forma 2: 10 kilos de tomate a 2 soles
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <LayoutGroup>
                        <motion.div className="flex flex-col  h-[calc(100vh-320px)] pb-20 overflow-hidden overflow-y-scroll">
                            {itemsList.map((item, index) => (
                                <ItemLista
                                    key={item.id}
                                    index={index}
                                    item={item}
                                />
                            ))}
                        </motion.div>
                    </LayoutGroup>
                </div>
            )}
        </>
    );
}

export default GenerarPage;
