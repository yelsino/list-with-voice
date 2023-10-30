import { imageListGenerate } from "@/util/print.util";
import { createCanvas, registerFont } from "canvas";
import path from "path";
import { DATALIST } from "../../prueba/page";
import PrintFile from "../../prueba/PrintFile";

async function getProjects(texto: string) {

  const buffer = await imageListGenerate(DATALIST);
  return buffer
}

interface IParams {
  listaId: string;
}

export default async function PrintPage({ params }: { params: IParams }) {

  // const buffer = await getProjects(params.listaId);

  return (
    <div>
      <PrintFile />
    </div>
  )
}