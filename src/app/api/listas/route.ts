import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Lista } from "@/interfaces/list.interface";
import { generarItemListBD, montoTotalLista } from "./mapper/listas";
// import { Lista } from "@/interfaces/list.interface";
const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body: Lista = await request.json();

    const ordenLista = await prisma.lista.count();

    // calcular monto total
    const montoTotal = montoTotalLista(body.items);

    const completado = body.items.every((item) => item.status === "success");

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
        },
        include: {
            items: true,
        },
    });

    // el id de cada elemento se añadira al

    return NextResponse.json(nuevaLista);
}

export async function GET() {
    const listas = await prisma.lista.findMany({
        include: { items: true },
    });

    return NextResponse.json(listas);
}
