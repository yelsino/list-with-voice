
export type Categorie = | "tuberculos" | "verduras" | "frutas"

export interface Price {
  nombre: string;
  precio: number;
  categoria: Categorie;
  id: string;
  tiendaId: string
}

export interface ProductState {
  prices: Price[];
  price: Price | null;
}