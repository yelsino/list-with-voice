import { ItemList } from "@/interfaces/list.interface";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {
    generarItemListBD,
    montoTotalLista,
    obtenerLista,
} from "../../mapper/listas";

const prisma = new PrismaClient();

interface Params<T> {
    params: T;
}

interface Delete {
    listaId: string;
}

export async function GET() {
    const allItems = await prisma.itemList.findMany();

    return NextResponse.json(allItems);
}

export async function DELETE(request: NextRequest, { params }: Params<Delete>) {
    const itemId = request.nextUrl.searchParams.get("id");
    const listaId = params.listaId;

    if (!itemId || !listaId)
        return NextResponse.json({ error: "falta listaId o itemId" });

    try {
        const lista = await obtenerLista(listaId);

        const montoTotal = lista?.items.reduce((acc, item) => {
            if (item.id === itemId) return 0;
            return acc + item.montoItem;
        }, 0);

        const listUpdated = await prisma.lista.update({
            where: { id: listaId },
            data: {
                items: {
                    delete: { id: itemId },
                },
                montoTotal,
            },
            include: { items: true },
        });

        return NextResponse.json("Se eliminó este item");
    } catch (error) {
        if (error) return NextResponse.json({ error: "el proceso falló" });
    }
}


// http://localhost:3000/api/listas/321312/items?id=2&perPage=10&sortBy=name
interface Update {
    listaId: string;
}
export async function PUT(request: NextRequest, { params }: Params<Update>) {
    const itemUpdated = await request.json();

    const itemId = request.nextUrl.searchParams.get("id");
    const listaId = params.listaId;

    if (!itemId || !listaId)
        return NextResponse.json({ error: "falta listaId o itemId" });

    const lista = await obtenerLista(listaId);

    const montoTotal = lista?.items
        .map((item) => {
            if (item.id === itemUpdated.id) {
                return itemUpdated;
            } else {
                return item;
            }
        })
        .reduce((acc, item) => {
            if (item.id === itemId) return 0;
            return acc + item.montoItem;
        }, 0);

    const updateLista = await prisma.lista.update({
        where: { id: listaId },
        data: {
            items: {
                update: {
                    where: { id: itemId },
                    data: generarItemListBD(itemUpdated),
                },
            },
            montoTotal,
        },
        include: { items: true },
        
    });

    return NextResponse.json(updateLista);
}

export async function POST(request: NextRequest, { params }: Params<Update>) {
    const itemParams = await request.json();
    const listaId = params.listaId;

    const item = await prisma.itemList.create({
        data: {
            ...generarItemListBD(itemParams),
            listaId: listaId,
        },
    });

    const lista_bd = await prisma.lista.findUnique({
        where: { id: listaId },
        include: { items: true },
    });

    if (!lista_bd) return NextResponse.json("lista no encontrada");
    const items: ItemList[] = lista_bd.items.map((item) =>
        generarItemListBD(item)
    );

    const montoTotal = montoTotalLista([...items, generarItemListBD(item)]);

    await prisma.lista.updateMany({
        where: { id: listaId },
        data: {
            montoTotal: montoTotal,
        },
    });

    return NextResponse.json("lista actualizada");
}
