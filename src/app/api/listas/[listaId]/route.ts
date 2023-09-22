import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ItemList } from "@/interfaces/list.interface";
const prisma = new PrismaClient();

interface GetParams {
    params: {
        listaId?: string;
        item?: ItemList;
    };
}

// get lista por ID
export async function GET(request: Request, { params }: GetParams) {
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
                items: true, 
                cliente: true,
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
