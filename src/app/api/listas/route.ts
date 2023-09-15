import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { Lista } from "@/interfaces/list.interface";
import { generarItemListBD, montoTotalLista } from "./mapper/listas";
import getCurrentUser from "@/actions/getCurrentUser";
// import { Lista } from "@/interfaces/list.interface";
const prisma = new PrismaClient();

// localhost/listas/
// POST
export async function POST(request: Request) {
    const body: Lista = await request.json();

    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) return NextResponse.error();

        const ordenLista = await prisma.lista.count();

        // calcular monto total
        const montoTotal = montoTotalLista(body.items);

        const completado = body.items.every(
            (item) => item.status === "success"
        );

        const nuevaLista = await prisma.lista.create({
            data: {
                numero: ordenLista + 1,
                nombreCliente: body.nombreCliente,
                montoTotal: montoTotal,
                pagado: body.pagado,
                completado: completado,
                items: {
                    create: body.items.map((item) => generarItemListBD(item)),
                },
                usuarioId: currentUser?.id as any,
            },
            include: {
                items: true,
            },
        });

        return NextResponse.json(nuevaLista);
    } catch (error) {
        NextResponse.error();
    }
}

export async function GET(request: NextRequest) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const startDate = request.nextUrl.searchParams.get("startDate");
    const endDate = request.nextUrl.searchParams.get("endDate");
    const page = request.nextUrl.searchParams.get("page");
    const pageSize = request.nextUrl.searchParams.get("pageSize");
    // Convierte la página y el tamaño de página en números
    const pageNumber = parseInt(page || "1", 10);
    const pageSizeNumber = parseInt(pageSize || "10", 10);

    const skip = (pageNumber - 1) * pageSizeNumber;

    // Construye el objeto de filtro
    const where: Prisma.ListaWhereInput = {
        usuarioId: currentUser.id,
        createdAt: {
            lte: dateStringToStringISO(endDate, true), //menores a
            gte: dateStringToStringISO(startDate, false), //mayores a
        },
    };

    const total = await prisma.lista.count({ where });

    const listas = await prisma.lista.findMany({
        where,
        include: { items: true },
        skip,
        take: pageSizeNumber,
    });

    return NextResponse.json({
        data: listas,
        cantidad: total
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
            nombreCliente: body.nombreCliente,
            montoTotal: montoTotalNuevo,
            pagado: body.pagado,
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

function dateStringToStringISO(
    input: string | null,
    useEndTime: boolean = false
): string | undefined {
    // Verifica si el formato de entrada es válido (YYYY-MM-DD).
    if (!input) return undefined;

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(input)) {
        return undefined;
    }

    try {
        if (useEndTime) {
            // Utiliza la última hora del día.
            const fecha = new Date(input + "T23:59:59.999Z");
            return fecha.toISOString();
        } else {
            // Utiliza la primera hora del día.
            const fecha = new Date(input + "T00:00:00.000Z");
            return fecha.toISOString();
        }
    } catch (error) {
        console.error("Error al convertir la fecha:", error);
        return undefined;
    }
}
