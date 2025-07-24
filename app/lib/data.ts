import { prisma } from "@/lib/prisma";
import type { Customer } from "@prisma/client";
import { formatCurrency } from "./utils";

const ITEMS_PER_PAGE = 10;

export async function fetchRevenue() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return await prisma.revenue.findMany();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await prisma.invoice.findMany({
      take: 5,
      orderBy: { date: "desc" },
      include: { customer: true },
    });

    return data.map((invoice) => ({
      id: invoice.id,
      amount: formatCurrency(invoice.amount),
      name: invoice.customer.name,
      image_url: invoice.customer.image_url,
      email: invoice.customer.email,
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchCardData() {
  try {
    const [invoiceCount, customerCount] = await Promise.all([
      prisma.invoice.count(),
      prisma.customer.count(),
    ]);

    const paidSum = await prisma.invoice.aggregate({
      _sum: { amount: true },
      where: { status: "paid" },
    });

    const pendingSum = await prisma.invoice.aggregate({
      _sum: { amount: true },
      where: { status: "pending" },
    });

    return {
      numberOfCustomers: customerCount,
      numberOfInvoices: invoiceCount,
      totalPaidInvoices: formatCurrency(paidSum._sum.amount ?? 0),
      totalPendingInvoices: formatCurrency(pendingSum._sum.amount ?? 0),
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const invoices = await prisma.invoice.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      orderBy: { date: "desc" },
      where: {
        OR: [
          { customer: { name: { contains: query, mode: "insensitive" } } },
          { customer: { email: { contains: query, mode: "insensitive" } } },
          { amount: { equals: Number(query) || 0 } },
          { status: { contains: query, mode: "insensitive" } },
        ],
      },
      include: { customer: true },
    });

    return invoices.map((i) => ({
      id: i.id,
      amount: i.amount,
      date: i.date,
      status: i.status,
      name: i.customer.name,
      email: i.customer.email,
      image_url: i.customer.image_url,
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await prisma.invoice.count({
      where: {
        OR: [
          { customer: { name: { contains: query, mode: "insensitive" } } },
          { customer: { email: { contains: query, mode: "insensitive" } } },
          { amount: { equals: Number(query) || 0 } },
          { status: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    return Math.ceil(count / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
    });
    if (!invoice) return null;
    return {
      ...invoice,
      amount: invoice.amount / 100,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}

export async function fetchCustomers() {
  try {
    const customers = await prisma.customer.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
    return customers;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all customers.");
  }
}

export async function fetchCustomerPages(query: string) {
  try {
    const count = await prisma.customer.count({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    return Math.ceil(count / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch customer pages.");
  }
}

export async function fetchFilteredCustomers(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const customers = await prisma.customer.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      orderBy: { name: "asc" },
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        invoices: true,
      },
    });

    return customers.map((c) => {
      const total_pending = c.invoices
        .filter((i) => i.status === "pending")
        .reduce((acc, i) => acc + i.amount, 0);
      const total_paid = c.invoices
        .filter((i) => i.status === "paid")
        .reduce((acc, i) => acc + i.amount, 0);

      return {
        id: c.id,
        name: c.name,
        email: c.email,
        image_url: c.image_url,
        total_invoices: c.invoices.length,
        total_pending: formatCurrency(total_pending),
        total_paid: formatCurrency(total_paid),
      };
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch customer table.");
  }
}

export async function fetchCustomerById(id: string): Promise<Customer | null> {
  try {
    return await prisma.customer.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch customer by ID:", error);
    return null;
  }
}

export async function fetchProductPages(query: string): Promise<number> {
  try {
    const count = await prisma.product.count({
      where: { name: { contains: query, mode: "insensitive" } },
    });
    return Math.ceil(count / 10);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product pages.");
  }
}
