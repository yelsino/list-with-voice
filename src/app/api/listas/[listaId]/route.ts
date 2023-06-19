import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface IParams {
    listaId?: string
}

export async function GET(request: Request, {params}: {params: IParams}){

    const { listaId } = params;

    if (!listaId || typeof listaId !== 'string') {
      throw new Error('Invalid ID');
    }

    const lista = await prisma.lista.findUnique({
        where: {
            id: listaId,
        },
    });

    if (!lista) {
        return NextResponse.json({ error: 'No record found for the given ID' });
    }

    return NextResponse.json(lista);
    
}