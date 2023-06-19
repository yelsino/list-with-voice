import { NextResponse } from "next/server";
import { Lista, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export async function POST(request: Request) {

    const body: Lista = await request.json();
    const { cosas, nombreCliente, } = body

    const ordenLista = await prisma.lista.count();
    const nuevaLista = await prisma.lista.create({
        data: {
            numero: ordenLista + 1,
            items: items,
            nombreCliente: nombreCliente
        },
    })

    return NextResponse.json(nuevaLista);
}

export async function GET() {

    const listas = await prisma.lista.findMany()

    return NextResponse.json(listas)
    
}

