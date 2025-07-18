import axios from "axios";
import { CustomerField } from "./definitions";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchCustomers(): Promise<CustomerField[]> {
  try {
    const response = await api.get("/customers");
    return response.data.data || response.data;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return [];
  }
}
