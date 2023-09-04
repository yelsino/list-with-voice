export interface ListaState {
    nombreCliente: string;
    itemsList: ItemList[];
    itemList: ItemList | null;
    montoTotal?: number;
    edit?: boolean;
    pagada?: boolean;
    cargando?: boolean;
}

export type Status = "pending" | "success" | "error" | "updating";

export interface Voice {
    voz: string;
    status: Status;
    codigo?: string;
    calculado?: boolean;
    enviado?: boolean;
}
export interface VoiceState {
    voices: Voice[];
    transcriptState: string;
    calculated: boolean;
    voiceSelected: Voice | null;
}

export interface Tienda {
    id: string;
    nombreTienda: string;
    logo: string;
    ubicacion: string;
    numeroContacto: string;
    email: string;
    referencia: string;
    urlTienda: string;
    codigoQr: string;
    codigoBarra: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Usuario {
    id?: string;
    nombreUsuario: string;
    password: string;
    validPassword?: string
    nombres?: string;
    apellidos?: string;
    tiendas?: Tienda[];
    createdAt?: Date;
    updatedAt?: Date;
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
