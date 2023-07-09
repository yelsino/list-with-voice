
export interface ListaState  {
    nombreCliente: string;
    itemsList: ItemList[];
    montoTotal: number;
    edit: boolean
};

export interface ItemList  {
    cantidad: number;
    medida: string;
    nombreProducto: string;
    precio: number;
    costoTotal: number;
    index: number
};


export interface Lista {
    id?: string;
    numero?: number;
    items: ItemList[];
    nombreCliente: string;
    createdAt?: Date;
    updatedAt?: Date;
};

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