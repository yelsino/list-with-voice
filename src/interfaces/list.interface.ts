import { ISODateString } from "next-auth";
import { Cliente } from "./client.interface";
import { Tienda, Usuario } from "./user.interface";

export interface ListaState {
    // id?: string;
    // itemsList: ItemList[];
    abono: Abono | null;
    itemSelected: ItemList | null;
    // montoTotal?: number;
    // edit?: boolean;
    // pagada?: boolean;
    cargando?: boolean;
    lista: Lista
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

export interface Abono {
    createdAt: string;
    monto: number;
}

export interface Error {
    id?: string;
    itemList : ItemList
}

export interface Lista {
    id?: string;
    numero?: number;
    clienteId?: string;
    items: ItemList[];
    abonos: Abono[];
    cliente: Cliente | null; 
    pagado: boolean;
    completado: boolean;
    montoTotal?: number;
    createdAt?: Date;
    updatedAt?: Date;
    errors: Error[]
}

export interface PrintLista {
    lista: Lista,
    tienda: Tienda
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
