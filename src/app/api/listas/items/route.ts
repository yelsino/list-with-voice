import { NextResponse } from "next/server";
import { completion } from "../../record/completion";
import { mapItemToList2 } from "@/interfaces/mapper";

interface Body {
  texto: string
}

export async function POST(request: Request) {
  
  const body: Body = await request.json();

  const itemsgpt = await completion(body.texto);

  const itemsList = itemsgpt.map((item) => mapItemToList2(item));

  return NextResponse.json(itemsList);

}
