"use client";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

function ButtonBack() {
    const router = useRouter();
    const pathName = usePathname();

    const validRutes = ["/generar", "/configuracion", "/listas", '/register',"/clientes","/filtrar"];

    const shouldShowButton = validRutes.some((e) => pathName.startsWith(e));

    return (
        <>
            {shouldShowButton && (
                <button
                    onClick={() => router.back()}
                    className=" absolute bottom-5 right-0 text-fuchsia-500  p-4  sm:rounded-3xl cursor-pointer"
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
                            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                        />
                    </svg>

               </button>
            )}
        </>
    );
}

export default ButtonBack;
