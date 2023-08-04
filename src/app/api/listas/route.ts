import { NextResponse } from "next/server";
import {  PrismaClient } from "@prisma/client";
import { Lista } from "@/interfaces/list.interface";
// import { Lista } from "@/interfaces/list.interface";
const prisma = new PrismaClient();

export async function POST(request: Request) {

    const body: Lista = await request.json();
    
    const ordenLista = await prisma.lista.count();

    // calcular monto total 
    const montoTotal = body.items.reduce((acc, item) => {
        return acc + item.montoItem
    }, 0)


    const completado = body.items.every((item) => item.status === "success")
    
    const nuevaLista = await prisma.lista.create({
        data: {
            numero:ordenLista + 1,
            nombreCliente: body.nombreCliente,
            montoTotal: montoTotal,
            pagado: body.pagado,
            completado: completado,
            items: {
                create: body.items.map((item) => ({
                    nombre: item.nombre,
                    precio: item.precio,
                    cantidad: item.cantidad,
                    montoItem: item.montoItem,
                    medida: item.medida,
                    voz: item.voz,
                    status: item.status,
                    calculated: item.calculated as boolean,
                  })),
            }
        },
        include: {
            items: true
        }
    })


    
    
    return NextResponse.json(nuevaLista);
}

export async function GET() {

    const listas = await prisma.lista.findMany({
        include: {items: true}
    })

    return NextResponse.json(listas)
    
}

