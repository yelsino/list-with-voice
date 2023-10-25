import { ItemList } from "@prisma/client";
import { type } from "microsoft-cognitiveservices-speech-sdk/distrib/lib/src/common.speech/RecognizerConfig";
import { DateType } from "react-tailwindcss-datepicker";

export interface SearchParams {
    startDate: DateType;
    endDate: DateType;
    page: number;
    pageSize: number;
    texto: string;
}

export interface GlobalState {
    searchParams : SearchParams;
    recordService: Service
}

export interface ResponseRecord {
    items: ItemList[]
    recordUrl: string
}

export interface ResponseParams<T> {
    serviceUrl?: string;
    status?: boolean;
    message?: string;
    metodo?: string;
    cantidad: number;
    data: T;
}



export enum Service {
    Deepgram = 'DEEPGRAM_SERVICE',
    Whisper = 'WHISPER_SERVICE',
    Assembly = 'ASSEMBLY_SERVICE',
    AzureSpeech = 'AZURE_SPEECH_SERVICE'
}