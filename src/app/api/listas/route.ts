import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { Lista } from "@/interfaces/list.interface";
import { generarItemListBD, montoTotalLista } from "./mapper/listas";
import getCurrentUser from "@/actions/getCurrentUser";
import {
    createSearchParams,
    dateStringToStringISO,
} from "../utils/back.global.utils";

// import { Lista } from "@/interfaces/list.interface";
const prisma = new PrismaClient();

// localhost/listas/
// POST
export async function POST(request: Request) {
    const body: Lista = await request.json();

    try {
        const currentUser = await getCurrentUser();
        
        if (!currentUser) {
            return NextResponse.error();
        }

        const ordenLista = await prisma.lista.count();

        const montoTotal = montoTotalLista(body.items);

        const completado = body.items.every(
            (item) => item.status === "success"
        );

        let clienteId: string = "";
        if (!body.cliente.id) {
            const nuevoCliente = await prisma.cliente.create({
                data: {
                    celular: body.cliente.celular,
                    nombres: body.cliente.nombres,
                    usuarioId: currentUser.id,
                },
            });

            clienteId = nuevoCliente.id;
        }else {
            clienteId = body.cliente.id as string;
        }


        const nuevaLista = await prisma.lista.create({
            data: {
                numero: ordenLista + 1,
                montoTotal: montoTotal,
                pagado: body.pagado,
                completado: completado,
                items: {
                    create: body.items.map((item) => generarItemListBD(item)),
                },
                clienteId: clienteId,
            },
            include: {
                items: true,
            },
        });

        return NextResponse.json(nuevaLista);
    } catch (error) {
        console.log(error);
        
        NextResponse.error();
    }
}

export async function GET(request: NextRequest) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { endDate, skip, startDate, take, textfilter } = createSearchParams(
        request.nextUrl.searchParams
    );

    const where: Prisma.ListaWhereInput = {
        cliente: {
            usuarioId: currentUser.id,
        },
        createdAt: {
            lte: dateStringToStringISO(endDate, true), //menores a
            gte: dateStringToStringISO(startDate, false), //mayores a
        },
        OR: {
            cliente: {
                nombres: {
                    contains: textfilter,
                    mode: 'insensitive'
                },
            },
        },
    };

    const total = await prisma.lista.count({ where });

    const listas = await prisma.lista.findMany({
        where,
        skip,
        take,
        include: { items: true, cliente: true },
    });

    return NextResponse.json({
        data: listas,
        cantidad: total,
    });
}

export async function PUT(request: Request) {
    const body: Lista = await request.json();

    // Obtener la lista actual
    const listaActual = await prisma.lista.findUnique({
        where: { id: body.id },
        include: { items: true },
    });

    if (!listaActual) {
        return new Response("Lista no encontrada", { status: 404 });
    }

    // Calcular el nuevo monto total
    const montoTotalNuevo = montoTotalLista(body.items);

    const listaActualizada = await prisma.lista.update({
        where: { id: body.id },
        data: {
            montoTotal: montoTotalNuevo,
            pagado: body.pagado,
            clienteId: body.cliente.id ?? "",
            completado: body.items.every((item) => item.status === "success"),
            items: {
                upsert: body.items.map((item) => ({
                    where: { id: item.id },
                    create: generarItemListBD(item),
                    update: generarItemListBD(item),
                })),
            },
        },
        include: { items: true },
    });

    return NextResponse.json(listaActualizada);
}
