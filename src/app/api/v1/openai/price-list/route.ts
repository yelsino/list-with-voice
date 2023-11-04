import openai from "@/app/api/record/openia";
import { Price } from "@/interfaces/product.interface";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getCurrentUser from "@/actions/getCurrentUser";

interface Body {
  texto: string
}
const prisma = new PrismaClient();

export async function POST(request: Request) {

  const body: Body = await request.json();

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();
    const tiendaId = currentUser.tienda?.id

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0613",
      messages: [
        {
          role: "user",
          content: body.texto,
        },
      ],
      functions: [
        {
          name: "getProductos",
          description: "devuelve una arreglo de productos",
          parameters: {
            type: "object",
            properties: {
              productos: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    nombre: {
                      type: "string",
                      description: "Nombre del producto",
                    },
                    precio: {
                      type: "number",
                      description: "Precio del producto",
                    },
                    categoria: {
                      type: "string",
                      description: "Categoria del producto",
                      enum: ["verduras", "tuberculos", "frutas","abarrotes","bebidas","menestras"],
                    },
                  },
                }
              },
            }

          },
        },
      ],
    });

    const response: any = chatCompletion.choices[0].message.function_call?.arguments;

    const jsonResponse = JSON.parse(response);

    const responseToPrices = (pruductos: any) => {
      const prices: Price[] = pruductos.map((item: any) => ({
        tiendaId: tiendaId,
        categoria: item?.categoria.toLowerCase() ?? "verduras",
        nombre: item.nombre.toLowerCase() ?? "",
        precio: item.precio ?? 0,
      }));
      return prices
    }

    const where = { tiendaId }
    const oldPrices = await prisma.price.findMany({ where: where })
    const newPrices = responseToPrices(jsonResponse.productos);

    const createPrices = newPrices.filter((newPrice) => {
      const existe = oldPrices.find((i) => newPrice.nombre === i.nombre);
      if (!existe) return true
    });

    const updatePrices = newPrices.map((newPrice) => {
      const existe = oldPrices.find((i) => newPrice.nombre === i.nombre);
      if (existe) {
        return {
          ...existe,
          id: existe.id,
          nombre: newPrice.nombre,
          precio: newPrice.precio
        };
      }

    }).filter((price) => !!price);


    if (createPrices.length > 0) {
      await prisma.price.createMany({
        data: createPrices
      })
    }

    if (updatePrices.length > 0) {

      await prisma.tienda.update({
        where: { id: tiendaId },
        include: { prices: true },
        data: {
          prices: {
            updateMany: updatePrices.map((p) => ({
              data: {
                categoria: p?.categoria,
                nombre: p?.nombre,
                precio: p?.precio,
              },
              where: { id: p?.id }
            }))
          }
        },
      })


    }

    console.log("actualziacion de precios");

    return NextResponse.json("OPERACION EXISTOSA")
 
  } catch (error) {
    console.log(error);

    return NextResponse.json(error)
  }


}

export async function GET() {

  const currentUser = await getCurrentUser();
  const prices = await prisma.price.findMany({
    where: {
      tiendaId: currentUser?.tienda?.id
    }
  })

  return NextResponse.json(prices)

}




