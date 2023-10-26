// con esta informacion -> crear producto fideos de categoria abarrotes, tengo 50 bolsas de 10 undiades de la marca lavalle que me costó a 15 soles, lo vendo a 20 soles por mayor y 2.8 por unidad, cada unidad pesa 250 gramos, ademas tengo 70 bolsas de 20 unidades de la marca Don Victorio que me costo a 30 soles, lo vendo a 35 soles y 2.8 por unidad, cada unidad pesa 250 gramos

// con esta informacion -> crear producto fideos, tengo 50 bolsas de 10 undiades de la marca lavalle que me costó a 15 soles, lo vendo a 20 soles por mayor y 2.8 por unidad, cada unidad pesa 250 gramos, ademas tengo 70 bolsas de 20 unidades de la marca Don Victorio que me costo a 30 soles, lo vendo a 35 soles y 2.8 por unidad, cada unidad pesa 250 gramos

// aceite-caja,botella,bidon
// atun-lata,caja,
// fideos-bolsa,caja,
// gaseosa-botella,bolsa-paquete
// huevos-por-kilo,paquete
// arroz-saco,kg,bolsa,
// harina, enbolsado, harina suelta
// fruta-kg,caja
// carne-peso, descuento
// queso-bollo,kg,molde
// mantequilla-marca,peso,frascos
/**
 * categoria
 * seccion
 * categoria general
 * marca
 * 
*/

const peticion = {
  nombre: "",
  categoria: "",
  imagen: "",
  genericos: [
    {
      nombre: "",
      categoria: "",
      marca: "",
      unidadMedida: "",
      precioCompra: 0,
      precioVenta: 0,
      cantidadPorUnidad: 0,
      cantidad: 0,
      pesoUnidad: 0,
      precioUnidad: 0,
      envoltorioProducto: "",
      imagen: "",
    },
  ],
};

const productos = {
  nombre: "Fideos",
  categoria: "Abarrotes",
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
};
