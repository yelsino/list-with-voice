"use client";
import React from "react";
import Link from "next/link";
import { Header } from "@/app/components/Header";
import { IconHome, IconSave } from "@/app/components/Icons";
import { Puntos } from "@/app/components/Puntos";
import { SuperTitle } from "@/app/components/SuperTitle";
import { useSession, signOut } from "next-auth/react";

function ConfiguracionPage() {
    return (
        <div>
            <Header
                childrenLeft={
                    <Link href="/">
                        <IconHome />
                    </Link>
                }
                childrenRight={
                    <button onClick={() => signOut()} className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                            />
                        </svg>
                    </button>
                }
            />

            <SuperTitle>
                <p className="">
                    <span>Que</span>
                    <br /> <span>Configurar?</span>
                </p>
            </SuperTitle>

            <p className="font-catamaran text-text1 leading-tight text-secondary-200 pb-3">
                Comandos del asistente
            </p>

            <div className="flex gap-5 flex-wrap">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((e, i) => (
                    <div
                        key={i}
                        className="text-secondary-100 text-xl bg-primary-100 p-3 rounded-lg"
                    >
                        <IconSave estilo="h-8 w-8" />
                        <p className="text-sm text-center">lista</p>
                    </div>
                ))}
            </div>

            {/* <div className="bg-primary-100 p-3 py-4 rounded-lg mt-10 flex justify-between text-secondary-100">
                <span className="text-secondary-200">Cerrar Sesion</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </div> */}
        </div>
    );
}

export default ConfiguracionPage;
