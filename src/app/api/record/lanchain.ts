import {
  AudioTranscriptLoader,
} from "langchain/document_loaders/web/assemblyai";
import { ItemList } from "@/interfaces/list.interface";

export const transcriptLanchain = async (urlAudio: string) => {
  const audioUrl = urlAudio;

  const loader = new AudioTranscriptLoader(
    {
      audio_url: audioUrl,
      language_code: "es"
    },
    {
      apiKey: `${process.env.API_KEY_ASSEMBLY}`,
    }
  );
  const docs = await loader.load();
  console.log(docs[0].pageContent);

  return docs[0].pageContent
 
}

export const mapItemToList = (item: any): ItemList => {
  const precio = item.precio ?? 0;
  const cantidad = item.cantidad ?? 0;
  const monto = item.montoTotal ?? 0;

  const montoItem = precio && cantidad ? cantidad * precio : monto;

  return {
      nombre: item.nombre ?? "",
      precio: item.precio ?? 0,
      cantidad: item.cantidad ?? 0,
      montoItem: montoItem,
      medida: item.medida ?? "",
      voz: item.voz ?? "",
      status: item.status,
      id: item.id,
      calculated: item.calculated ?? true,
  };
};