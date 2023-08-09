export interface ListaState {
    nombreCliente: string;
    itemsList: ItemList[];
    montoTotal?: number;
    edit?: boolean;
    pagada?: boolean;
    cargando?: boolean;
}

export type Status = "pending" | "success" | "error" | "updating";

export interface Voice {
    voz: string;
    status: Status;
    index?: number;
    calculado?: boolean;
}
export interface VoiceState {
    voices: Voice[];
    calculated: boolean;
    voiceSelected: Voice | null
}


export interface ItemList {
    nombre: string;
    precio: number;
    cantidad: number;
    montoItem: number;
    medida: string;
    voz: string;
    status: Status
    index?: number;
    id?: string;
    listaId?: string;
    calculated?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Lista {
    id?: string;
    numero?: number;
    items: ItemList[];
    nombreCliente: string;
    pagado: boolean;
    completado: boolean;
    montoTotal?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Message {
    role: string;
    content: string;
}

export interface GptRequest {
    message: string;
}

export interface ResponseGPT {
    id: string;
    object: string;
    created: number;
    model: string;
    usage: Usage;
    choices: Choice[];
}

// export interface DataGPT {
//     data: ResponseGPT;
// }

export interface Choice {
    message: Message;
    finish_reason: string;
    index: number;
}

export interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}
