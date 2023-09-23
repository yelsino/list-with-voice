
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {

        const { nombreUsuario, password } = await request.json();

        if (password < 6)
            return NextResponse.json(
                {
                    data: null,
                    status: false,
                    message: "Password must be at least 6 characters",
                },
                { status: 400 }
            );

        const userFound = await prisma.usuario.findFirst({
            where: { nombreUsuario },
        });

        if (userFound)
            return NextResponse.json(
                {
                    data: null,
                    status: false,
                    message: "Email already exists",
                },
                {
                    status: 409,
                }
            );

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.usuario.create({
            data: {
                apellidos: "",
                nombres: "",
                nombreUsuario: nombreUsuario,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            {
                data: {
                    apellidos: newUser.apellidos,
                    nombres: newUser.nombres,
                    nombreUsuario: newUser.nombreUsuario,
                    createdAt: newUser.createdAt,
                    updatedAt: newUser.updatedAt,
                },
                status: true,
                mensaje: "Usuario Generado",
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.error();
    }
}
