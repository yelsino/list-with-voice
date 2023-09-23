import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions  = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                nombreUsuario: {
                    label: "Nombre de usuario",
                    type: "text",
                    placeholder: "ej: minombre",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // await connectDB();
                const userFound = await prisma.usuario.findFirst({
                    where: { nombreUsuario: credentials?.nombreUsuario },
                });

                if (!userFound) throw new Error("Invalid credentials");

                const passwordMatch = await bcrypt.compare(
                    credentials!.password,
                    userFound.password as string
                );

                if (!passwordMatch) throw new Error("Invalid credentials");
                    console.log("userFound: ", userFound);
                    
                return userFound;
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    // secret: process.env.NEXTAUTH_URL
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        async session({ session, token }) {
            session.user = token.user as any;
            return session;
        },
    },
};

const handler  = NextAuth(authOptions)

export { handler as GET, handler as POST };

