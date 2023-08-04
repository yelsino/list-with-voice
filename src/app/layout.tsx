"use client";
import { Providers } from "@/redux/provider";
import "./globals.css";
import { Inter } from "next/font/google";
import ButtonBack from "./components/ButtonBack";
import Voice from "./components/Voice/Voice";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Asistente de lista",
    description: "Crea e imprime tus listas",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="h-screen flex  sm:pt-10  bg-primary-200 sm:bg-primary-100 selection:bg-secondary-100 selection:text-text-100">
                    <div className="max-w-sm mx-auto py-10 px-9  w-full  sm:h-[calc(100vh-100px)] sm:rounded-3xl flex flex-col gap-y-3 relative bg-primary bg-primary-200 ">
                        <Providers>
                            {children}
                            <Voice />
                            <ButtonBack />
                        </Providers>
                        <Toaster toastOptions={{
                             style: {
                                background: '#141e27',
                                color: '#0BE9FD',
                                boxShadow: '0 0 5px #0BE9FD',
                            },
                        }} />
                    </div>
                </main>
            </body>
        </html>
    );
}
