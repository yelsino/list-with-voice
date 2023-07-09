import { NextResponse } from "next/server";
import {  PrismaClient } from "@prisma/client";
import { Lista } from "@/interfaces/list.interface";
const prisma = new PrismaClient();




export async function POST(request: Request) {

    const body: Lista = await request.json();

    const ordenLista = await prisma.lista.count();
    
    const nuevaLista = await prisma.lista.create({
        data: {
            items:body.items as any,
            numero:ordenLista + 1,
            nombreCliente: body.nombreCliente
        }
    })
    
    return NextResponse.json(nuevaLista);
}

export async function GET() {

    const listas = await prisma.lista.findMany()

    return NextResponse.json(listas)
    
}

