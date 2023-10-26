import { Lista } from "./list.interface";

export interface Tienda {
    id: string;
    nombreTienda: string;
    logo: string;
    ubicacion: string;
    numeroContacto: string;
    email: string;
    referencia: string;
    texto1: string;
    texto2: string;
    urlTienda: string;
    codigoQr: boolean;
    codigoBarra: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Usuario {
    id?: string;
    nombreUsuario: string;
    password?: string;
    validPassword?: string;
    nombres?: string;
    apellidos?: string;
    defaultCliente?: string
    tiendas?: Tienda[];
    listas?: Lista[];
    createdAt?: Date;
    updatedAt?: Date;
}
