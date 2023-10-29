import { v4 as uuid } from "uuid";
import { ItemList, ResponseGPT } from "./list.interface";

interface Props {
    response: ResponseGPT;
}

export const responseToItemList = ({ response }: Props): ItemList => {
    const messageResult = response?.choices[0].message.content;
    const itemJson = JSON.parse(messageResult);
    const itemList = mapItemToList({
        ...itemJson,
        id: itemJson.codigo,
    });

    return itemList;
};

export function isMongoId(value: string | undefined | null): boolean {
    if (!value) return false;
    const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
    return mongoIdRegex.test(value);
}

export const mapItemToList = (item: any): ItemList => {
    const precio = item.precio ?? 0;
    const cantidad = item.cantidad ?? 0;
    const monto = item.montoItem ?? 0;

    const montoItem = precio && cantidad ? cantidad * precio : monto;

    return {
        nombre: item.nombre ?? "",
        precio: item.precio ?? 0,
        cantidad: item.cantidad ?? 0,
        montoItem: montoItem,
        medida: item.medida ?? "",
        texto: item.voz ?? "",
        id: item.id,
        calculado: item.calculado ?? true,
    };
};
export const mapItemToList2 = (item: any): ItemList => {
    const precio = item.precio ?? 0;
    const cantidad = item.cantidad ?? 0;
    const monto = item.montoTotal ?? 0;

    const montoItem = precio && cantidad ? cantidad * precio : monto;
    return {
        nombre: item.nombre ?? "",
        precio: item.precio ?? 0,
        cantidad: item.cantidad ?? 0,
        montoItem: montoItem,
        medida: unidadMedida(item.medida ?? ""),
        texto: item.texto ?? "",
        id: uuid(),
        calculado: item.calculado ?? true,
    };
};

export enum UdMedida {
    kilogramos = 'kilogramos',
    gramos = 'gramos',
    cajas = 'cajas',
    botellas = 'botellas',
    litros = 'litros',
    sacos = 'sacos',
    bidones = 'bidones',
    unidades = 'unidades',
    bolsas = 'bolsas',
    metros = "metros",
    barras = "barras",
    docenas = "docenas",
    paquetes = "paquetes",
    latas = "latas",
    cartones = "cartones",
    porciones = "porciones",
    onzas = "onzas",
    galones = "galones",
    cubos = "cubos",
    frascos = "frascos",
    bandejas = "bandejas",
    potes = "potes",

}

export type SimbolMedida =
    | 'kg'
    | 'g'
    | 'caj'
    | 'bot'
    | 'lt'
    | 'sac'
    | 'bid'
    | 'und'
    | 'bols'
    | 'mtr'
    | 'barr'
    | 'doc'
    | 'paq'
    | 'lat'
    | 'cart'
    | 'porc'
    | 'oz'
    | 'gal'
    | 'cub'
    | 'fras'
    | 'banj'
    | 'pote';

export const unidadMedida = (medida: UdMedida): SimbolMedida => {
    switch (medida) {
        case UdMedida.kilogramos: return "kg";
        case UdMedida.gramos: return "g";
        case UdMedida.cajas: return "caj";
        case UdMedida.botellas: return "bot";
        case UdMedida.litros: return "lt";
        case UdMedida.sacos: return "sac";
        case UdMedida.bidones: return "bid";
        case UdMedida.unidades: return "und";
        case UdMedida.bolsas: return "bols";
        case UdMedida.metros: return "mtr";
        case UdMedida.barras: return "barr";
        case UdMedida.docenas: return "doc";
        case UdMedida.paquetes: return "paq";
        case UdMedida.latas: return "lat";
        case UdMedida.cartones: return "cart";
        case UdMedida.porciones: return "porc";

        case UdMedida.onzas: return "oz";
        case UdMedida.galones: return "gal";
        case UdMedida.cubos: return "cub";
        case UdMedida.frascos: return "fras";
        case UdMedida.bandejas: return "banj";
        case UdMedida.potes: return "pote";
        default: return "und";
    }
}


export const stringToItem = (voice: string): ItemList => {
    return {
        nombre: "",
        precio: 0,
        cantidad: 0,
        montoItem: 0,
        medida: "",
        texto: voice,
        id: uuid(),
        calculado: false,
    };
};

export const moneyFormatSimbol = (value: any) => {
    const numero = Number(value);
    const formater = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
    });
    if (typeof numero !== "number") return formater.format(0);

    return formater.format(numero);
};

export const moneyFormat = (value: any) => {
    const numero = Number(value);
    if (isNaN(numero)) return ""; // Devuelve una cadena vacía si el valor no es un número.

    // Formatea el número sin el símbolo de la moneda.
    const formattedValue = numero.toLocaleString("es-PE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formattedValue;
};

// "Lunes 26 De agosto De 2023"
export const dateFormat = (value: Date | string | undefined) => {
    if (!value) {
        return ""; // Si el valor es undefined o null, se devuelve una cadena vacía
    }

    const date = typeof value === "string" ? new Date(value) : value;

    if (isNaN(date.getTime())) {
        return ""; // Si el Date resultante es inválido, se devuelve una cadena vacía
    }

    const formatter = new Intl.DateTimeFormat("es-PE", {
        weekday: "long", // Día de la semana (ej: "lunes")
        day: "numeric", // Día del mes (ej: "8")
        month: "long", // Mes (ej: "octubre")
        year: "numeric", // Año (ej: "2023")
        // hour: "numeric", // Hora (ej: "14")
        // minute: "numeric", // Minuto (ej: "01")
    });

    return formatter.format(date);
};

// "Lunes 26/05/2023"
export function dateFormatShort(fecha: Date): string {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const fechaObj = new Date(fecha);
    const diaSemana = diasSemana[3];
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1;
    const año = fechaObj.getFullYear();
    return `${diaSemana} ${dia}/${mes}/${año}`;
}

export const buildCommandRegex = (phrases: string[]) => {
    const escapedPhrases = phrases.map((phrase) =>
        phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );
    const regexString = escapedPhrases.join("|");
    return new RegExp(regexString, "i");
};

export const buildCommandRegex2 = (phrases: string[]) => {
    const escapedPhrases = phrases.map((phrase) =>
        phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );
    const regexString = escapedPhrases.join("|");
    return new RegExp(`.*(${regexString}).*`, "i"); // Agregamos .* antes y después de la expresión regular para usar el comodín *
};

export const formatNameTitle = (input: string) => {
    const words = input.trim().split(" ");
    const totalWords = words.length;

    if (totalWords === 3) {
        return `${words[0]} \n${words[1]} ${words[2]}`;
    }

    if (totalWords === 4) {
        return `${words[0]} ${words[1]} \n${words.slice(2).join(" ")}`;
    }

    return input;
};
