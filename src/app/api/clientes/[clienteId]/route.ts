import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface GetParams {
    params: {
        clienteId?: string;
    };
}

// get lista por ID
export async function GET(request: Request, { params }: GetParams) {
    const { clienteId } = params;

    if (!clienteId) {
        return NextResponse.json(
            { error: "No se proporcionó el ID de la lista." },
            { status: 400 }
        );
    }

    try {
        const cliente = await prisma.cliente.findUnique({
            where: {
                id: clienteId,
            },
            include: {
                listas: true
            }
          
        });

        if (!cliente) {
            return NextResponse.json(
                { error: "No se encontró la lista con el ID proporcionado." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            data: cliente,
            status: true
        });
    } catch (error) {
        console.error("Error al obtener la lista:", error);
        return NextResponse.json(
            { error: "Ocurrió un error al obtener la lista." },
            { status: 500 }
        );
    }
}
