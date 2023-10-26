import { NextResponse } from "next/server";
import { completion } from "../../record/completion";
import { mapItemToList2 } from "@/interfaces/mapper";

interface Body {
  texto: string
}

export async function POST(request: Request) {
  
  const body: Body = await request.json();

  const itemsgpt = await completion(body.texto);
  // const itemsgpt = await completion("2 kilos y 200 gramos de naranjas a 5 soles, 1 kilo y medio de uvas a 7 soles, 2 kilos y 3 cuartos de tomate a 4 soles, 1 kilo y 800 gramos de fresa a 9 soles, 900 gramos de papaya a 5 soles, 19 soles 20 de sandía, 3 soles 90 de pimentones, 8 soles 40 de berenjenas, 1 sol 20 de calabacines, 9 soles de lechuga, medio kilo de espinaca a 2 soles cada kilo.");

  const itemsList = itemsgpt.map((item) => mapItemToList2(item));

  return NextResponse.json(itemsList);

}
