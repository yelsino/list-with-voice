"use client";
import { Header } from "@/app/components/Header";

import SelectDate from "@/app/components/SelectDate";
import { SuperTitle } from "@/app/components/SuperTitle";
import Link from "next/link";
import AutoComplete from "./AutoComplete";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { IconDelete, IconLists } from "@/app/components/Icons";
import { useRouter } from "next/navigation";
import { cleanSearchParams } from "@/redux/features/globalSlice";
import { seleccionarCliente } from "@/redux/features/clienteSlice";
import { formatText } from "@/interfaces/FormatReact";

function FiltrarPage() {
    const dispatch = useAppDispatch();
    // const [selected, setSelected] = useState<Cliente | null>(null)
    const router = useRouter()
    const resetFiltros = () => {
        dispatch(cleanSearchParams());
        dispatch(seleccionarCliente(null))
    };

    return (
        <div className="text-secondary-100 flex flex-col gap-y-5">
            <Header
                childrenLeft={
                    <Link href="/listas" className="text-2xl">
                        <IconLists estilo="" />
                    </Link>
                }
                childrenRight={
                    <div onClick={resetFiltros} className="cursor-pointer">
                        <IconDelete />
                    </div>
                }
            />
            <SuperTitle  title={formatText("Filtros De busqueda")}>
                <p className="text-base font-medium text-secondary-200 break-words">
                    <span className="text-secondary-200">
                        Tambien te puede interesar ver los comandos de filtros
                        por voz, para verlos dirigete{" "}
                        <span className="text-secondary-100">aquí</span>
                    </span>
                </p>
            </SuperTitle>
               
            <AutoComplete />
            <SelectDate />
            <button onClick={()=> router.back()} className="bg-secondary-100 p-3 rounded-lg text-black font-semibold">
                Aplicar Filtro
            </button>
        </div>
    );
}

export default FiltrarPage;
