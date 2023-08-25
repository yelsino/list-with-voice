import { ItemList, Lista } from "@/interfaces/list.interface";
import { dateFormat, moneyFormat } from "@/interfaces/mapper";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function generarItemListBD(item: any): ItemList {
    return {
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
        montoItem: item.montoItem,
        medida: item.medida,
        voz: item.voz,
        status: item.status,
        calculated: item.calculated as boolean,
    };
}

export function montoTotalLista(items: ItemList[]): number {
    return items.reduce((acc, item) => {
        return acc + item.montoItem;
    }, 0);
}

export async function obtenerLista(listaId: string) {
    const lista = await prisma.lista.findUnique({
        where: { id: listaId },
        include: { items: true },
    });

    return lista;
}

interface ItemPrint {
    descripcion: string;
    monto: string;
}
interface ListaPrint {
    fecha: string;
    nombreCliente: string;
    montoTotal: string;
    items: ItemPrint[];
}

export function listaToPrint(lista: Lista): ListaPrint {
    return {
        fecha: dateFormat(lista.createdAt),
        montoTotal: moneyFormat(lista.montoTotal),
        nombreCliente: lista.nombreCliente,
        items: lista.items.map((item) => ({
            descripcion: `${item.cantidad} ${item.nombre} ${item.precio} x und`,
            monto: moneyFormat(item.montoItem),
        })),
    };
}
