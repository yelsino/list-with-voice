import { imageListGenerate } from "@/util/print.util"

async function imprimir() {
  await imageListGenerate(data);
}

async function ListasIdPage() {
  return (
    <button onClick={async()=> imprimir()}>IMPRIMIR</button>
  )
}

const data:any = {
  "lista": {
    "id": "653e71b14d6e2a660f0f0a03",
    "clienteId": "6534359b098ac69190003fdf",
    "numero": 11,
    "abonos": [],
    "montoTotal": 163.6,
    "pagado": false,
    "completado": true,
    "createdAt": "2023-10-29T14:52:33.427Z",
    "updatedAt": "2023-10-29T14:52:33.427Z",
    "items": [
      {
        "id": "653e71b24d6e2a660f0f0a04",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "plátanos",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 4,
        "medida": "und",
        "texto": "4 soles de plátanos",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b24d6e2a660f0f0a05",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "manzana",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 3,
        "medida": "und",
        "texto": "3 soles de manzana",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b24d6e2a660f0f0a06",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "zanahoria",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 5,
        "medida": "und",
        "texto": "5 soles de zanahoria",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b24d6e2a660f0f0a07",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "naranjas",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 11,
        "medida": "und",
        "texto": "11 soles de naranjas",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b24d6e2a660f0f0a08",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "uvas",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 10.5,
        "medida": "und",
        "texto": "10 soles con 50 de uvas",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b24d6e2a660f0f0a09",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "tomate",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 11,
        "medida": "und",
        "texto": "11 soles de tomate",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b24d6e2a660f0f0a0a",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "fresa",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 16.2,
        "medida": "und",
        "texto": "16 soles 20 de fresa",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b24d6e2a660f0f0a0b",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "papaya",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 4.5,
        "medida": "und",
        "texto": "4 soles 50 de papaya",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b34d6e2a660f0f0a0c",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "sandía",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 19.2,
        "medida": "und",
        "texto": "19 soles 20 de sandía",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b34d6e2a660f0f0a0d",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "pimentones",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 3.9,
        "medida": "und",
        "texto": "3 soles 90 de pimentones",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b34d6e2a660f0f0a0e",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "berenjenas",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 8.4,
        "medida": "und",
        "texto": "8 soles 40 de berenjenas",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b34d6e2a660f0f0a0f",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "calabacines",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 1.2,
        "medida": "und",
        "texto": "1 sol 20 de calabacines",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b34d6e2a660f0f0a10",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "lechuga",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 9,
        "medida": "und",
        "texto": "9 soles de lechuga",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b34d6e2a660f0f0a11",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "cebollas",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 11.6,
        "medida": "und",
        "texto": "11 soles 60 de cebollas",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b34d6e2a660f0f0a12",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "espinaca",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 1,
        "medida": "und",
        "texto": "1 sol de espinaca",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b34d6e2a660f0f0a13",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "apio",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 3.5,
        "medida": "und",
        "texto": "3 soles con 50 de apio",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b34d6e2a660f0f0a14",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "calabacines",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 1.6,
        "medida": "und",
        "texto": "1 sol con 60 de calabacines",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b44d6e2a660f0f0a15",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "limones",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 13.8,
        "medida": "und",
        "texto": "13 soles con 80 de limones",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      },
      {
        "id": "653e71b44d6e2a660f0f0a16",
        "listaId": "653e71b14d6e2a660f0f0a03",
        "nombre": "mangos",
        "precio": 0,
        "cantidad": 0,
        "montoItem": 25.2,
        "medida": "und",
        "texto": "25 soles 20 de mangos",
        "calculado": true,
        "createdAt": "2023-10-29T14:52:33.427Z",
        "updatedAt": "2023-10-29T14:52:33.427Z"
      }
    ],
    "cliente": {
      "id": "6534359b098ac69190003fdf",
      "usuarioId": "65343599098ac69190003fdd",
      "nombres": "cliente tienda",
      "celular": "",
      "createdAt": "2050-01-01T00:00:00.000Z",
      "updatedAt": "2023-10-21T20:33:31.411Z"
    },
    "errors": []
  },
  "tienda": {
    "id": "6534359a098ac69190003fde",
    "usuarioId": "65343599098ac69190003fdd",
    "nombreTienda": "tienda",
    "logo": "",
    "ubicacion": "",
    "texto1": "Bienvenido a nuestro negocio",
    "texto2": "de frutas y verduras",
    "numeroContacto": "",
    "email": "",
    "referencia": "",
    "urlTienda": "",
    "codigoQr": false,
    "codigoBarra": false,
    "createdAt": "2023-10-21T20:33:30.970Z",
    "updatedAt": "2023-10-21T20:33:30.970Z"
  }
}

export default ListasIdPage