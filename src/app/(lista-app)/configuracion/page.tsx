"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/app/components/Header";
import { IconHome, IconSave } from "@/app/components/Icons";
import { Puntos } from "@/app/components/Puntos";
import { SuperTitle } from "@/app/components/SuperTitle";
import { useSession, signOut } from "next-auth/react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { comando } from "@/app/components/Voice/comandos";

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

            <p className="font-catamaran text-text1 leading-tight text-secondary-200 pb-3 text-lg">
                Comandos del asistente
            </p>

            <LayoutGroup>
                <motion.div className="flex flex-col  h-[calc(100vh-320px)] pb-20 overflow-hidden overflow-y-scroll text-secondary-100 text-lg">
                    {Object.entries(comando).map(
                        ([key, subcomandos], index) => {
                            return (
                                <ItemsComando title={`> Comandos de ${key}`}>
                                    {Object.entries(subcomandos).map(
                                        ([key2, subcomandos2], index2) => {
                                            return (
                                                <ItemsComando
                                                    title={`> para ${key2}`}
                                                    stilo="ml-6"
                                                >
                                                    {subcomandos2.map(
                                                        (comando: any) => {
                                                            return (
                                                                <div className="ml-6 text-secondary-200">
                                                                    <p>
                                                                        {
                                                                           "-"+ comando
                                                                        }
                                                                    </p>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </ItemsComando>
                                            );
                                        }
                                    )}
                                </ItemsComando>
                            );
                        }
                    )}
                </motion.div>
            </LayoutGroup>
        </div>
    );
}

export default ConfiguracionPage;

const ItemsComando = ({ title, children, stilo }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={` 
            ${stilo && stilo} 
            ${isOpen ?  'bg-primary-100 ' : ''} 
             p-2 rounded-md box-content
        `}
            onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
            }}
        >
            <h2>{title}</h2>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className=""
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
