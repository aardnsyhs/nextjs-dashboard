import axios from "axios";
import { CustomerField, FormattedCustomersTable } from "./definitions";

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

export async function getFilteredCustomers(
  query: string,
  page: number
): Promise<FormattedCustomersTable[]> {
  try {
    const response = await api.get("/customers", {
      params: { q: query, page },
    });
    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch filtered customers:", error);
    return [];
  }
}

export async function getCustomerPages(query: string): Promise<number> {
  try {
    const response = await api.get("/customers/pages", {
      params: { q: query },
    });
    return response.data.totalPages ?? 1;
  } catch (error) {
    console.error("Failed to fetch total customer pages:", error);
    return 1;
  }
}

export async function createCustomer(
  name: string,
  email: string,
  imageUrl?: string
): Promise<void> {
  try {
    await api.post("/customers", { name, email, image_url: imageUrl });
  } catch (error) {
    console.error("Failed to create customer:", error);
    throw error;
  }
}

export async function updateCustomer(
  id: string,
  data: {
    name: string;
    email?: string;
    image_url?: string;
  }
): Promise<void> {
  try {
    await api.put(`/customers/${id}`, data);
  } catch (error) {
    console.error("Failed to update customer:", error);
    throw error;
  }
}

export async function deleteCustomer(id: string): Promise<void> {
  try {
    await api.delete(`/customers/${id}`);
  } catch (error) {
    console.error("Failed to delete customer:", error);
    throw error;
  }
}
