import openai from "./openia";

export async function completion(texto: string) {

  if (!texto) return []
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Convierte texto de productos peruanos en formato JSON envuelto en un string plano sin saltos de linea, sin espacio, sin nada solo texto como el formato indicado. Formato: 
        [{nombre:"",precio:0,cantidad:0,medida:"kilogramos", montoTotal:0,calculado:false, texto:""}]
        El atributo texto es la fraccion del texto para crear el item.
        Ejemplos de productos alimenticios: 'camote', 'papa', 'naranja', 'fideos', 'pa peruanita', 'platanos', etc. Texto en español Perú con precios en nuevos soles.  
        Ejemplos de medidas: kilogramos, litros, gramos, unidades, sacos, bolsas, cajas, etc la conversion de la 'medida' siempre va en plural, '1 kilo de papa a 3 soles' -> valor del atributo 'medida' seria 'kilogramos'. 
        Ejemplo de texto de usuario: 
        '10 soles de tomate 10 kilos de tomate a 3 soles 20 soles de tomate' -> si analizas está información encontraras 3 items.
        Item 1 -> '10 soles de tomate' item calculado.
        Converción -> [{nombre:"tomate",precio:0,cantidad:0,medida:"", montoTotal:10,calculado:true, texto:"10 soles de tomate"}]
        Item 2 -> '10 kilos de tomate a 3 soles' item no calculado.
        Converción -> [{nombre:"tomate",precio:3,cantidad:10,medida:"kilogramos", calculado:false, texto:"10 kilos de tomate a 3 soles"}]
        Item 3 -> '20 soles de tomate' item calculado.
        Converción -> [{nombre:"tomate",precio:0,cantidad:0,medida:"", montoTotal:20,calculado:true, texto:"20 soles de tomate"}]
        El item 1 y 3 tiene la caracteristica que el usuario ya ha indicado el monto en dinero del item.
        El item 2 tiene la caracteristica de un item no calculado por que en la descripcion no contiene el monto en dinero por ende el atributo 'montoTotal' no se incluye.
        Esto solos son ejemplos casi nunca la información será con la mis estructura, debes analizarlos correctamente y convertirlos a JSON. está completamente prohivido inventar productos que no existen en la informacion enviada por el usuario`
      },
      {
        role: "user",
        content: texto
      }
    ],
    temperature: 0.8,
  });
  // '[{nombre:"manzana",precio:4,cantidad:3,medida:"cuartos", montoTotal:0,calculado:false, texto:"3 cuartos de manzana a 4 soles"}]'
  console.log("response completion: ", completion.choices[0].message.content);
  const textResponse: any = completion.choices[0].message.content ?? "[]"
  const itemsJson: object[] = JSON.parse(textResponse.replace("'",""));

  // const listObject:object[] = JSON.parse(completion.choices[0].message.content ?? "[]");

  return itemsJson
}