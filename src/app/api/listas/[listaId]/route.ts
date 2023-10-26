import { ItemList } from "@/interfaces/list.interface";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
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
    console.log("listaId", listaId);
    
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
        console.log(lista);
        
        if (!lista) {
            return NextResponse.json(
                { error: "No se encontró la lista con el ID proporcionado." },
                { status: 404 }
            );
        }

        const updateResponse = Object.assign({},lista,{
            errors: []
        })

        return NextResponse.json(updateResponse);
    } catch (error) {
        console.error("Error al obtener la lista:", error);
        return NextResponse.json(
            { error: "Ocurrió un error al obtener la lista." },
            { status: 500 }
        );
    }
}
