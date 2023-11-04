import { VoiceControlProvider } from "@/context/voice.context";
import { Providers } from "@/redux/provider";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import ButtonBack from "./components/ButtonBack";
import ButtonRegister from "./components/ButtonRegister";
import { Cinta } from "./components/Cinta";
import MicrophoneVoice from "./components/Voice/MicrophoneVoice";
import RecordVoice from "./components/Voice/RecordVoice";
import "./globals.css";
import AudioRecorder from "./components/Voice/VoiceUML";
import { Dosis, Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});
const dosis = Dosis({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-dosis",
});



export const metadata: Metadata = {
    title: "Asistente de lista",
    description: "Crea e imprime tus listas",
    // manifest: "/manifest.webmanifest",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="bg-primary-200">
            <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </head>
            <body className={`
                ${inter.variable} 
                ${dosis.variable}
                ${dosis.className}
            `}>
                <main className="h-screen flex  sm:pt-10  bg-primary-200 sm:bg-primary-100 selection:bg-secondary-100 selection:text-text-100 font-sans">
                    <div className="max-w-sm mx-auto sm:py-10  px-4  w-full  sm:h-[calc(100vh-100px)] sm:rounded-3xl flex flex-col  relative bg-primary bg-primary-200 text-secondary-200">
                        <Providers>
                            <VoiceControlProvider>
                                <Cinta />
                                <div>
                                    {children}
                                </div>
                                <MicrophoneVoice />
                                <AudioRecorder/>
                                <ButtonBack />
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
