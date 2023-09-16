"use client";
import { useSession } from "next-auth/react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import React from "react";
import Link from "next/link";
import { deleteItem, limpiarLista } from "@/redux/features/listaSlice";
import { LayoutGroup, motion } from "framer-motion";
import { ItemList } from "@/interfaces/list.interface";
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

function GenerarPage() {
    const dispatch = useAppDispatch();
    const { push } = useRouter();

    const [registrarListDB] = useRegistrarListDBMutation();
    const [updateListDB] = useUpdateListMutation();
    const { itemsList, pagada, nombreCliente, cargando } = useAppSelector(
        (state) => state.listaReducer
    );
    const listaState = useAppSelector((state) => state.listaReducer);

    const guardarLista = async () =>
        listaState.edit ? actualizarLista() : crearListaNueva();

    const crearListaNueva = async () => {
        console.log("voy a registrar lista");
        if (!nombreCliente) {
            toast.error("Indica el nombre del cliente", {
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
                    nombreCliente: nombreCliente,
                    completado: false,
                    pagado: pagada ?? false,
                    clienteId:"65054a98b07a6c2f8c267b38"
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

        if (!nombreCliente) {
            toast.error("Indica el nombre del cliente", {
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
                    nombreCliente: nombreCliente,
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

                    <SuperTitle>
                        {nombreCliente ? (
                            <p className="text-2xl capitalize">
                                {nombreCliente}
                            </p>
                        ) : (
                            <p className=" font-bold text-2xl">Lista para:</p>
                        )}

                        <p className="text-secondary-200 text-lg font-semibold">
                            Pagada: {pagada ? "Si" : "No"}
                        </p>
                    </SuperTitle>

                    <div>
                        <p className="text-secondary-100 font-semibold text-lg ">
                            Productos
                        </p>
                        {itemsList.length === 0 && (
                            <p className="text-secondary-200">
                                Aún no ha añadido ningun producto a la lista,
                                ver lista de{" "}
                                <span className="text-secondary-100">
                                    comandos
                                </span>{" "}
                                de voz para empezar a registrar los productos
                            </p>
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
