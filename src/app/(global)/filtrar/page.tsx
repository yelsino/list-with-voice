"use client";
import { Header } from "@/app/components/Header";

import { IconDelete, IconLists } from "@/app/components/Icons";
import SelectDate from "@/app/components/SelectDate";
import { SuperTitle } from "@/app/components/SuperTitle";
import { formatText } from "@/interfaces/FormatReact";
import { seleccionarCliente } from "@/redux/features/clienteSlice";
import { cleanSearchParams } from "@/redux/features/globalSlice";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AutoComplete from "./AutoComplete";

function FiltrarPage() {
    const dispatch = useAppDispatch();
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
                    <button type="button" onClick={resetFiltros} className="cursor-pointer">
                        <IconDelete />
                    </button>
                }
            />
            <SuperTitle  title={formatText("Filtros De busqueda")}>
                <p className="text-base font-medium text-secondary-200 break-words">
                    <span className="text-secondary-200">
                        Tambien te puede interesar ver los comandos de filtros
                        por voz, para verlos dirigete{" "}
                        <Link href="/configuracion" className="text-secondary-100">aquí</Link>
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
