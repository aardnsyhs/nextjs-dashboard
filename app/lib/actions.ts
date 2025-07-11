"use server";

import { signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoiceSchema = InvoiceSchema.omit({ id: true, date: true });
const UpdateInvoiceSchema = InvoiceSchema.omit({ id: true, date: true });

const CustomerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  image_url: z.string().url().optional(),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return "Invalid Credentials";
        default:
          return "Something went wrong";
      }
    }
    throw err;
  }
}

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoiceSchema.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (err) {
    return { message: "Database Error: Failed to create invoice" };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoiceSchema.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (err) {
    return { message: "Database Error: Failed to update invoice" };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;

  if (!id) {
    console.error("Missing invoice ID");
    return;
  }

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
  } catch (err) {
    console.error("Database Error: Failed to delete invoice", err);
  }
}

export async function createCustomer(formData: FormData) {
  const parsed = CustomerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    image_url: formData.get("image_url")?.toString() || undefined,
  });

  if (!parsed.success) {
    return { message: "Validation Error: Invalid customer data" };
  }

  const { name, email, image_url } = parsed.data;

  try {
    await sql`
      INSERT INTO customers (name, email, image_url)
      VALUES (${name}, ${email}, ${image_url ?? null})
    `;
  } catch (err) {
    return { message: "Database Error: Failed to create customer" };
  }

  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
}

export async function updateCustomer(id: string, formData: FormData) {
  const parsed = CustomerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    image_url: formData.get("image_url")?.toString() || undefined,
  });

  if (!parsed.success) {
    return { message: "Validation Error: Invalid customer data" };
  }

  const { name, email, image_url } = parsed.data;

  try {
    await sql`
      UPDATE customers
      SET name = ${name}, email = ${email}, image_url = ${image_url ?? null}
      WHERE id = ${id}
    `;
  } catch (err) {
    return { message: "Database Error: Failed to update customer" };
  }

  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
}

export async function deleteCustomer(id: string) {
  try {
    await sql`DELETE FROM customers WHERE id = ${id}`;
  } catch (err) {
    return { message: "Database Error: Failed to delete customer" };
  }

  revalidatePath("/dashboard/customers");
  return { message: "Deleted customer" };
}
