import getCurrentUser from "@/actions/getCurrentUser";
import { Cliente } from "@/interfaces/client.interface";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createSearchParams, dateStringToStringISO } from "../utils/back.global.utils";

// import { Lista } from "@/interfaces/list.interface";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { endDate, skip, startDate, take, textfilter } = createSearchParams(
        request.nextUrl.searchParams
    );

    console.log("TEXTO FILTER: ", textfilter);
    
        
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
                    mode: 'insensitive',
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



export async function PUT(request: Request) {}
