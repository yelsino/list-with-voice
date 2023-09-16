"use client";
import { Header } from "@/app/components/Header";

import SelectDate from "@/app/components/SelectDate";
import { SuperTitle } from "@/app/components/SuperTitle";
import Link from "next/link";
import AutoComplete from "./AutoComplete";
import { useAppDispatch } from "@/redux/hooks";
import { selectDate } from "@/redux/features/listaSlice";
import { useState } from "react";
import { IconDelete, IconLists } from "@/app/components/Icons";
import { useRouter } from "next/navigation";

function FiltrarPage() {
    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState<any>({})
    const router = useRouter()
    const resetFiltros = () => {
        dispatch(selectDate({ endDate: null, startDate: null }));
        setSelected({})
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
            <SuperTitle>
                <p className="text-4xl">
                    <span>Filtros</span>
                    <br /> <span>De busqueda</span>
                </p>
                <p className="text-base font-medium text-secondary-200 break-words">
                    <span className="text-secondary-200">
                        Tambien te puede interesar ver los comandos de filtros
                        por voz, para verlos dirigete{" "}
                        <span className="text-secondary-100">aquí</span>
                    </span>
                </p>
            </SuperTitle>
               
            <AutoComplete selected={selected} setSelected={setSelected}   />
            <SelectDate />
            <button onClick={()=> router.back()} className="bg-secondary-100 p-3 rounded-lg text-black font-semibold">
                Aplicar Filtro
            </button>
        </div>
    );
}

export default FiltrarPage;
