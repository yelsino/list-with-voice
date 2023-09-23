import { Tienda } from "@/interfaces/user.interface";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
    const body: Tienda = await request.json();
    try {
        const tiendaActualizada = await prisma.tienda.update({
            where: { id: body.id },
            data: {
                codigoBarra: body.codigoBarra,
                codigoQr: body.codigoQr,
                email: body.email,
                logo: body.logo,
                nombreTienda: body.nombreTienda,
                numeroContacto: body.numeroContacto,
                referencia: body.referencia,
                texto1: body.texto1,
                texto2: body.texto2,
                ubicacion: body.ubicacion,
                urlTienda: body.urlTienda,
            },
        });

        return NextResponse.json(tiendaActualizada);
    } catch (error) {
        NextResponse.error();
    }
}
