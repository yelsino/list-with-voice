import { ISODateString } from "next-auth";
import { DateType } from "react-tailwindcss-datepicker";
import { Usuario } from "./user.interface";
import { Cliente } from "./client.interface";

export interface ListaState {
    id?: string;
    itemsList: ItemList[];
    itemSelected: ItemList | null;
    montoTotal?: number;
    edit?: boolean;
    pagada?: boolean;
    cargando?: boolean;
    // startDate?: DateType;
    // endDate?: DateType;
}

export type Status = "pending" | "sent" | "success" | "error" | "updating";

export interface Sesion {
    user?: Usuario;
    expires: ISODateString;
}

export interface ItemList {
    id?: string;
    listaId?: string;
    nombre: string;
    precio: number;
    cantidad: number;
    montoItem: number;
    medida: string;
    voz: string;
    status: Status;
    calculated?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Lista {
    id?: string;
    numero?: number;
    clienteId?: string;
    items: ItemList[];
    cliente: Cliente; 
    pagado: boolean;
    completado: boolean;
    montoTotal?: number;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface GptRequest {
    message: string;
    codigo?: string;
}

export interface ResponseGPT {
    id: string;
    object: string;
    created: number;
    model: string;
    usage: Usage;
    choices: Choice[];
}

export interface Choice {
    message: Message;
    finish_reason: string;
    index: number;
}

export interface Message {
    role: string;
    content: string;
}

export interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}
