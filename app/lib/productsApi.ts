import axios from "axios";
import { Product } from "./definitions";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function createProduct(data: {
  name: string;
  description?: string;
  price: number;
  image_url?: string;
}): Promise<void> {
  try {
    await api.post("/products", data);
  } catch (error) {
    console.error("Failed to create product:", error);
    throw error;
  }
}

export async function updateProduct(
  id: string,
  data: {
    name: string;
    description?: string;
    price: number;
    image_url?: string;
  }
): Promise<void> {
  try {
    await api.put(`/products/${id}`, data);
  } catch (error) {
    console.error("Failed to update product:", error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error;
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export async function fetchProductPages(
  query: string,
  itemsPerPage: number = 10
): Promise<number> {
  try {
    const response = await getProducts();
    const filtered = response.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    return Math.ceil(filtered.length / itemsPerPage);
  } catch (error) {
    console.error("Failed to fetch product pages:", error);
    throw error;
  }
}
