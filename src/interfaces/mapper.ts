import { ItemList, ResponseGPT } from "./list.interface";
import { v4 as uuid } from "uuid";

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
        voz: item.voz ?? "",
        status: item.status,
        id: item.id,
        calculated: item.calculated ?? true,
    };
};

export const stringToItem = (voice: string): ItemList => {
    return {
        nombre: "",
        precio: 0,
        cantidad: 0,
        montoItem: 0,
        medida: "",
        voz: voice,
        status: "pending",
        id: uuid(),
        calculated: false,
    };
};

export const moneyFormat = (value: any) => {
    const numero = Number(value);
    const formater = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
    });
    if (typeof numero !== "number") return formater.format(0);

    return formater.format(numero);
};

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
        console.log(`${words[0]} \n${words[1]} ${words[2]}`);

        return `${words[0]} \n${words[1]} ${words[2]}`;
    }

    if (totalWords === 4) {
        console.log(`${words[0]} ${words[1]} \n${words.slice(2).join(" ")}`);

        return `${words[0]} ${words[1]} \n${words.slice(2).join(" ")}`;
    }

    return input;
};
