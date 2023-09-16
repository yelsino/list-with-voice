import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import getCurrentUser from "@/actions/getCurrentUser";
import { Cliente } from "@/interfaces/client.interface";
import { ResponseParams } from "@/interfaces/global.interface";
import {
    createSearchParams,
    dateStringToStringISO,
} from "../utils/global.utils";
// import { Lista } from "@/interfaces/list.interface";
const prisma = new PrismaClient();

// localhost/listas/
// POST
export async function POST(request: Request) {
    const body: Cliente = await request.json();

    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) return NextResponse.error();

        const nuevoUsuario = await prisma.cliente.create({
            data: {
                nombres: body.nombres,
                celular: body.celular,
                usuarioId: currentUser.id,
            },
        });

        return NextResponse.json({
            data: nuevoUsuario,
            status: true,
        });
    } catch (error) {
        NextResponse.error();
    }
}

export async function GET(request: NextRequest) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { endDate, skip, startDate, take, textfilter } = createSearchParams(
        request.nextUrl.searchParams
    );
        console.log("textfilter",textfilter);
        
    const where: Prisma.ClienteWhereInput = {
        usuarioId: currentUser.id,
        createdAt: {
            lte: dateStringToStringISO(endDate, true), //menores a
            gte: dateStringToStringISO(startDate, false), //mayores a
        },
        OR: [
            {
                nombres: {
                    contains: textfilter,
                },
            },
        ],
    };

    const cantidad = await prisma.cliente.count({ where });

    const data = await prisma.cliente.findMany({
        where,
        skip,
        take,
    });

    return NextResponse.json({
        data,
        cantidad,
    });
}

export async function PUT(request: Request) {}
