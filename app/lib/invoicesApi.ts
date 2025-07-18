import axios from "axios";
import { Invoice } from "./definitions";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function createInvoice(data: {
  customer_id: string;
  amount: number;
  status: string;
  date: string;
}): Promise<void> {
  try {
    await api.post("/invoices", data);
  } catch (error) {
    console.error("Failed to create invoice:", error);
    throw error;
  }
}

export async function updateInvoice(
  id: string,
  data: {
    customer_id: string;
    amount: number;
    status: string;
    date: string;
  }
): Promise<void> {
  try {
    await api.put(`/invoices/${id}`, data);
  } catch (error) {
    console.error("Failed to update invoice:", error);
    throw error;
  }
}

export async function deleteInvoice(id: string): Promise<void> {
  try {
    await api.delete(`/invoices/${id}`);
  } catch (error) {
    console.error("Failed to delete invoice:", error);
    throw error;
  }
}

export async function getInvoices(): Promise<Invoice[]> {
  try {
    const response = await api.get("/invoices");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch invoices:", error);
    throw error;
  }
}

export async function getInvoiceById(id: string): Promise<Invoice | null> {
  try {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch invoice by ID:", error);
    throw error;
  }
}

export async function fetchInvoicePages(
  query: string,
  itemsPerPage: number = 10
): Promise<number> {
  try {
    const response = await getInvoices();
    const filtered = response.filter((i) =>
      i.customer_id.toLowerCase().includes(query.toLowerCase())
    );
    return Math.ceil(filtered.length / itemsPerPage);
  } catch (error) {
    console.error("Failed to fetch invoice pages:", error);
    throw error;
  }
}

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
  itemsPerPage: number = 10
): Promise<Invoice[]> {
  try {
    const response = await api.get("/invoices", {
      params: {
        search: query,
        page: currentPage,
        limit: itemsPerPage,
      },
    });
    return response.data.data || response.data;
  } catch (error) {
    console.error("Failed to fetch filtered invoices:", error);
    throw error;
  }
}
