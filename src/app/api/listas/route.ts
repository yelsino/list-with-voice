import getCurrentUser from "@/actions/getCurrentUser";
import { Lista } from "@/interfaces/list.interface";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {
    createSearchParams,
    dateStringToStringISO,
} from "../utils/back.global.utils";
import { generarItemListBD, montoTotalLista } from "./mapper/listas";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body: Lista = await request.json();
    console.log("BODY::::", JSON.stringify(body)); 

    try {
        const currentUser = await getCurrentUser();
        console.log(currentUser);
        
        if (!currentUser) {
            return NextResponse.error();
        }
        if (!body.cliente) {
            return NextResponse.error();
        }
        console.log("validaciones");
        
        const ordenLista = await prisma.lista.count();

        const montoTotal = montoTotalLista(body.items);
        
        let clienteId: string = body.cliente.id ?? currentUser.defaultCliente;

        console.log(clienteId);
        

        const nuevaLista = await prisma.lista.create({
            data: {
                numero: ordenLista + 1,
                montoTotal: montoTotal,
                pagado: body.pagado,
                completado: true,
                items: {
                    create: body.items.map((item) => generarItemListBD(item)),
                },
                clienteId: clienteId,
                abonos: body.abonos as any,
            },
            include: {
                items: true,
            },
        });

        const errores:any[] = body.errors ?? [];
        if(errores.length > 0){
            await prisma.error.createMany({
                data: errores as any
            })
        }

        return NextResponse.json(nuevaLista);
    } catch (error) {
        console.log(error);

        NextResponse.json(error);
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
                    mode: "insensitive",
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
    try {
        // Obtener la lista actual
        console.log(body);
        
        const listaActual = await prisma.lista.findUnique({
            where: { id: body.id },
            include: { items: true },
        });

        if (!listaActual) {
            return new Response("Lista no encontrada", { status: 404 });
        }

        if (!body.cliente) {
            return NextResponse.error();
        }

        // Calcular el nuevo monto total
        const montoTotalNuevo = montoTotalLista(body.items);

        const abonos: any = listaActual.abonos;
        console.log("antes de crear");
        

        // console.log(body);
        
        const listaActualizada = await prisma.lista.update({
            where: { id: body.id },
            data: {
                montoTotal: montoTotalNuevo,
                pagado: body.pagado,
                clienteId: body.cliente.id ?? "",
                completado: true,
                abonos: [...abonos, ...body.abonos] as any,
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
        console.log("despues de actualizar");
        return NextResponse.json(listaActualizada);
    } catch (error) {
        console.log(error);
        NextResponse.json(error);
    }
}
