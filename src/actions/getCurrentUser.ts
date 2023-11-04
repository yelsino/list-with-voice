import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";

const prisma = new PrismaClient();

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {

        const session: any = await getSession();

        if (!session) {
            return null;
        }

        const currentUser = await prisma.usuario.findUnique({
            where: {
                id: session.user.id,
            },
            include: {
                tienda: true
            }
        });
        if (!currentUser) {
            await signOut()
            return null
        }
        return currentUser;
    } catch (error: any) {
        return null;
    }
}
