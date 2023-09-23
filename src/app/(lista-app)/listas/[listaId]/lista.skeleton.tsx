"use client";
import { Header } from "@/app/components/Header";
import { IconHome, IconTool } from "@/app/components/Icons";
import { SuperTitle } from "@/app/components/SuperTitle";
import { formatText } from "@/interfaces/FormatReact";

import Link from "next/link";

function ListasIdSkeleton() {
    return (
        <>
            <div className="flex flex-col gap-y-4">
                <Header
                    childrenLeft={
                        <Link href="/" className="text-2xl">
                            <IconHome />
                        </Link>
                    }
                    childrenRight={
                        <button className="w-full h-full flex items-center justify-center">
                            <IconTool />
                        </button>
                    }
                />

                <div className="">
                    <SuperTitle title={formatText("Cargando Lista")}>
                        <div className="text-lg text-secondary-200">
                            <p>Cargando...</p>
                        </div>
                    </SuperTitle>
                </div>

                <div>
                    <p className="text-secondary-100 font-semibold pb-2">
                        PRODUCTOS
                    </p>
                    <div className="flex flex-col gap-y-4 h-[calc(100vh-320px)] pb-10 overflow-x-hidden overflow-y-scroll">
                        {[1, 2, 3, 4, 5, 6].map((item, index) => (
                            <div
                                className="text-secondary-100 flex items-center gap-x-2 bg-primary-100 py-4 animate-pulse"
                                key={index}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListasIdSkeleton;
