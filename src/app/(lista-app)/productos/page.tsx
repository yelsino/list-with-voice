import Link from "next/link"

function ProductosPage() {

  return <>
    <h1 className="text-secondary-100 font-bold pb-5">PRODUCTOS</h1>
    <Link href="/productos/crear" className="border rounded-full px-5 py-1 mb-3">CREAR</Link>
    <div className="flex flex-wrap gap-3">
      {productos.map((producto, index) => (
        <Link href={`/productos/${index}`} key={index} className="w-28 h-28 border flex flex-col justify-center items-center cursor-pointer">
          <p className="text-xl font-bold">{producto.nombre}</p>
          <img src="/naranja.png" alt="" className="w-20 h-20" />
        </Link>
      ))}
    </div>
  </>
}

export default ProductosPage

const productos = [
  {
    nombre: "Fideos",
    categoria: "Abarrotes",
    imagen: "",
    genericos: [
      {
        nombre: "Fideos",
        categoria: "Abarrotes",
        marca: "Lavalle",
        unidadMedida: "unidad",
        precioCompra: 15,
        precioVenta: 20,
        cantidadPorUnidad: 10,
        cantidad: 50,
        pesoUnidad: 250,
        precioUnidad: 2.8,
        envoltorioProducto: "Bolsa",
        imagen: "URL_imagen_Lavalle",
      },
      {
        nombre: "Fideos",
        categoria: "Abarrotes",
        marca: "Don Victorio",
        unidadMedida: "unidad",
        precioCompra: 30,
        precioVenta: 35,
        cantidadPorUnidad: 20,
        cantidad: 70,
        pesoUnidad: 250,
        precioUnidad: 2.8,
        envoltorioProducto: "Bolsa",
        imagen: "URL_imagen_Don_Victorio",
      },
    ],
  },
  {
    nombre: "ATUN"
  },
  {
    nombre: "FRUTAS"
  },
  {
    nombre: "ACEITE"
  },
  {
    nombre: "LECHE"
  },
  {
    nombre: "GASEOSAS"
  },
]