"use client";
import "regenerator-runtime/runtime";
import Link from "next/link";
import { IconConfig } from "./components/Icons";
import { Header } from "./components/Header";
import { Puntos } from "./components/Puntos";
import { SuperTitle } from "./components/SuperTitle";

export default function Home() {
    return (
        <>
            <Header
                childrenLeft={
                    <Link href="/configuracion">
                        <IconConfig />
                    </Link>
                }
                childrenRight={
                    <Link href="/listas" className="w-full h-full ">
                        <Puntos />
                    </Link>
                }
            />

            <SuperTitle>
                <p className="">
                    <span>Hola!</span>
                    <br /> <span>Lista Nueva?</span>
                </p>
            </SuperTitle>
            {/* contenido */}
            <div className="flex flex-col gap-y-5">
                <div className="font-poppins text-lg  text-secondary-200">
                    Seré su asistente, todos los comandos de voz lo encuentras
                    en configuracion
                </div>
            </div>

            <Link
                href="/generar"
                className="text-secondary-100 flex mt-3  gap-x-2 cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 "
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                </svg>
                Crear lista
            </Link>
        </>
    );
}
