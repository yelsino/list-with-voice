import { Lista, Status } from "./list.interface";
import { Usuario } from "./user.interface";


export interface Cliente {
    id?: string;
    usuario?: Usuario;
    usuarioId?: string;
    nombres: string;
    celular: string;
    listas?: Lista[];
    status?: Status
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ClienteState {
    clientes: Cliente[]
    cliente: Cliente | null
}