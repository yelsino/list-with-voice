"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import React from "react";
import Link from "next/link";
import { deleteItem } from "@/redux/features/listaSlice";
import { LayoutGroup, motion } from "framer-motion";
import { ItemList } from "@/interfaces/list.interface";
import { toast } from "react-hot-toast";
import { useRegistrarListDBMutation } from "@/redux/services/listaApi";
import { useRouter } from "next/navigation";
import { Loader } from "@/app/components/Loader/Loader";
import { Header } from "@/app/components/Header";
import { IconHome, IconSave } from "@/app/components/Icons";
import { SuperTitle } from "@/app/components/SuperTitle";
import { ItemLista } from "@/app/components/Lista/ItemLista";

function GenerarPage() {
    const dispatch = useAppDispatch();
    const { push } = useRouter();
    const [registrarListDB] = useRegistrarListDBMutation();
    const { itemsList, pagada, nombreCliente, cargando } = useAppSelector(
        (state) => state.listaReducer
    );
    const { voices, voiceSelected } = useAppSelector(
        (state) => state.VoiceReducer
    );

    const deteleItem = (item: ItemList) => {
        dispatch(deleteItem(item));
    };

    const registrarLista = async () => {
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

        const resp = await registrarListDB({
            items: itemsList,
            nombreCliente: nombreCliente,
            completado: false,
            pagado: pagada ?? false,
        }).unwrap();

        if (resp.id) {
            push(`/listas/${resp.id}`);
        }
    };

    return (
        <>
            {cargando ? (
                <Loader texto="registrando..." />
            ) : (
                <div className="flex flex-col gap-y-6 ">
                    <Header
                        childrenLeft={
                            <Link href="/" className="text-2xl">
                                <IconHome />
                            </Link>
                        }
                        childrenRight={
                            <button onClick={registrarLista}>
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

                    <p className="text-secondary-100 font-semibold text-lg ">
                        Productos
                    </p>

                    <LayoutGroup>
                        <motion.div className="flex flex-col  h-[calc(100vh-320px)] pb-20 overflow-hidden overflow-y-scroll">
                            {itemsList.map((item, index) => (
                                <ItemLista
                                    key={item.id}
                                    index={index}
                                    item={item}
                                    deteleItem={deteleItem}
                                />
                            ))}
                            {
                                itemsList.length === 0 && <div className="flex flex-col gap-y-3">
                                    {[...Array(10)].map((e, i)=>(
                                    <div className="bg-primary-100 py-5 rounded-lg animate-pulse" key={i}></div>
                                ))}
                                </div>
                            }
                        </motion.div>
                    </LayoutGroup>
                </div>
            )}
        </>
    );
}

export default GenerarPage;
