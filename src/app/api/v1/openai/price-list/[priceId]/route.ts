
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

interface Params {
  params: { priceId: string }
}

const prisma = new PrismaClient();

export async function DELETE(request: Request, {params}: Params) {

  await prisma.price.delete({where:{id: params.priceId}});

  return NextResponse.json("PRICE ELIMINADO")
}
