import { Lista } from "./list.interface";
import { Usuario } from "./user.interface";

export interface Cliente {
    id?: string;
    usuario?: Usuario;
    usuarioId?: string;
    nombres: string;
    celular: string;
    listas?: Lista[];
}
