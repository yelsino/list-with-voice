"use client";

import { moneyFormat } from "@/interfaces/mapper";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import React from "react";
import { Header } from "../components/Header";
import { IconHome, IconSave } from "../components/Icons";
import { SuperTitle } from "../components/SuperTitle";
import Link from "next/link";
import { Loader } from "../components/Loader/Loader";
import { deleteItem } from "@/redux/features/listaSlice";
import { ItemLista } from "../components/Lista/ItemLista";
import { LayoutGroup, motion } from "framer-motion";
import { ItemList } from "@/interfaces/list.interface";

function GenerarPage() {
    const dispatch = useAppDispatch();

    const { itemsList, pagada, nombreCliente, cargando } = useAppSelector(
        (state) => state.listaReducer
    );

    const { voices: voicesList, calculated } = useAppSelector(
        (state) => state.VoiceReducer
    );

    const deteleItem = (item: ItemList) => {
        dispatch(deleteItem(item));
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
                            <button>
                                <IconSave estilo="" />
                            </button>
                        }
                    />

                    <button
                        onClick={() => console.log(voicesList)}
                        className="text-secondary-100"
                    >
                        IMPRIMIR VOICES
                    </button>
                    <button
                        onClick={() => console.log(itemsList)}
                        className="text-secondary-100"
                    >
                        IMPRIMIR ITEMS
                    </button>

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
                        <motion.div className="flex flex-col  h-[calc(100vh-320px)] pb-10 overflow-x-hidden overflow-y-scroll">
                            {itemsList.map((item, index) => (
                                <ItemLista
                                    key={index}
                                    index={index}
                                    item={item}
                                    deteleItem={deteleItem}
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
