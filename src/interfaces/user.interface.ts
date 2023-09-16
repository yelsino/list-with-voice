import { Lista } from "./list.interface";

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
    password?: string;
    validPassword?: string;
    nombres?: string;
    apellidos?: string;
    tiendas?: Tienda[];
    listas?: Lista[];
    createdAt?: Date;
    updatedAt?: Date;
}
