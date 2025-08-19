import { IProduct } from "@/app/interfaces/IProduct";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProducts(offset : number , limit : number): Promise<IProduct[]> {
  const res = await fetch(`${API_URL}/products?offset=${offset}&limit=${limit}`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

export async function fetchProductById(id: number): Promise<IProduct> {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
}


export async function fetchRelatedProducts(id: number): Promise<IProduct[]> {
  const res = await fetch(`${API_URL}/products/${id}/related`);
  if (!res.ok) throw new Error("Error al obtener productos relacionados");
  return res.json();
}