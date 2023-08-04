import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface IParams {
    params: {
        listaId?: string;
    };
}

export async function GET(request: Request, { params }: IParams) {
    const { listaId } = params;

    if (!listaId) {
        return NextResponse.json(
            { error: "No se proporcionó el ID de la lista." },
            { status: 400 }
        );
    }

    try {
        const lista = await prisma.lista.findUnique({
            where: {
                id: listaId,
            },
            include: {
                items: true, // Incluimos los items relacionados en la respuesta
            },
        });

        if (!lista) {
            return NextResponse.json(
                { error: "No se encontró la lista con el ID proporcionado." },
                { status: 404 }
            );
        }

        return NextResponse.json(lista);
    } catch (error) {
        console.error("Error al obtener la lista:", error);
        return NextResponse.json(
            { error: "Ocurrió un error al obtener la lista." },
            { status: 500 }
        );
    }
}
