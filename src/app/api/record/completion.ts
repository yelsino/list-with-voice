import openai from "./openia";

export async function completion(texto: string) {
  
  if(!texto) return [] 
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Convierte texto de productos peruanos en formato JSON envuelto en un string plano sin saltos de linea, sin espacio, sin nada solo texto como el formato indicado. Formato: 
        [{nombre:'',precio:0,cantidad:0,medida:'kilogramos', montoTotal:0,calculado:false, texto:''}]
        El atributo texto es la fraccion del texto para crear el item.
        Ejemplos de productos alimenticios: 'camote', 'papa', 'naranja', 'fideos', 'pa peruanita', 'platanos', etc. Texto en español Perú con precios en nuevos soles.  Ejemplos de medida: kilogramos, litros, gramos, unidades, saco bolsas, cajas, etc. Si hay montoTotal quiere decir que es un it calculado por ende la propiedad calculado es true.  Por ejemplo:  '3 soles de camote' (solo cuenta con montoTotal y nombre),  '3 kilos de camote a 2 soles ' (no cuenta con montotTotal),  '3 kilos de camote a 2 soles cada kilo' (no cuenta con montoTotal). Esto solos son ejemplos casi nunca la información será con la mis estructura, debes analizarlos correctamente y convertirlos a JSON. está completamente prohivido inventar productos que no existen en la informacion enviada por el usuario`
      },
      {
        role: "user",
        content: texto
      }
    ],
    temperature: 0.8,
  });
  
  const listObject:object[] = JSON.parse(completion.choices[0].message.content ?? "[]");

  return  listObject
}