import { VoiceControlProvider } from "@/context/voice.context";
import { Providers } from "@/redux/provider";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ButtonBack from "./components/ButtonBack";
import ButtonRegister from "./components/ButtonRegister";
import { Cinta } from "./components/Cinta";
import Voice from "./components/Voice/Voice";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Asistente de lista",
    description: "Crea e imprime tus listas",
    manifest: "/manifest.webmanifest",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {


    return (
        <html lang="en" className="bg-primary-200">
            <body className={inter.className}>
                <main className="h-screen flex  sm:pt-10  bg-primary-200 sm:bg-primary-100 selection:bg-secondary-100 selection:text-text-100">
                    <div className="max-w-sm mx-auto sm:py-10 pt-5 px-4  w-full  sm:h-[calc(100vh-100px)] sm:rounded-3xl flex flex-col gap-y-3 relative bg-primary bg-primary-200 ">
                        <Providers>
                            <VoiceControlProvider>
                                <Cinta />
                                <div className="flex flex-col">{children}</div>
                                <Voice />
                                {/* <ButtonBack /> */}
                                <ButtonRegister />
                            </VoiceControlProvider>
                        </Providers>

                        <Toaster
                            toastOptions={{
                                style: {
                                    background: "#141e27",
                                    color: "#0BE9FD",
                                    boxShadow: "0 0 5px #0BE9FD",
                                },
                            }}
                        />
                    </div>
                </main>
            </body>
        </html>
    );
}
