"use server";

import { signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";

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
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  image_url: z.string(),
});

const CreateCustomerSchema = CustomerSchema.omit({ id: true });

const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.coerce.number().int().nonnegative(),
  image_url: z.string().optional(),
});

const CreateProductSchema = ProductSchema.omit({ id: true });
const UpdateProductSchema = ProductSchema.omit({ id: true });

const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function registerUser(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const { name, email, password } = RegisterSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  try {
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if ((existingUser.rowCount ?? 0) > 0) {
      return "Email already exists.";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword});
    `;
  } catch (err) {
    console.error("Registration failed:", err);
    return "Something went wrong.";
  }

  redirect("/login");
}

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

export async function createInvoice(formData: FormData): Promise<void> {
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
    console.error("Database Error: Failed to create invoice", err);
    return;
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(
  id: string,
  formData: FormData
): Promise<void> {
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
    console.error("Database Error: Failed to update invoice", err);
    return;
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

export async function createCustomer(formData: FormData): Promise<void> {
  const { name, email, image_url } = CreateCustomerSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    image_url: formData.get("image_url")?.toString() || undefined,
  });

  try {
    await sql`
      INSERT INTO customers (name, email, image_url)
      VALUES (${name}, ${email}, ${image_url ?? null})
    `;
  } catch (err) {
    console.error("Database Error:", err);
    return;
  }

  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
}

export async function updateCustomer(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const image_url = formData.get("image_url") as string;

  if (!id || !name || !email) {
    console.error("Missing required customer data");
    return;
  }

  try {
    await sql`
      UPDATE customers
      SET name = ${name}, email = ${email}, image_url = ${image_url}
      WHERE id = ${id}
    `;
  } catch (err) {
    console.error("Database error:", err);
    return;
  }

  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
}

export async function deleteCustomer(id: string): Promise<void> {
  try {
    await sql`DELETE FROM customers WHERE id = ${id}`;
  } catch (err) {
    console.error("Database Error: Failed to delete customer", err);
    return;
  }

  revalidatePath("/dashboard/customers");
}

export async function createProduct(formData: FormData): Promise<void> {
  const { name, description, price, image_url } = CreateProductSchema.parse({
    name: formData.get("name"),
    description: formData.get("description")?.toString() || "",
    price: formData.get("price"),
    image_url: formData.get("image_url")?.toString() || undefined,
  });

  try {
    await sql`
      INSERT INTO products (name, description, price, image_url)
      VALUES (${name}, ${description}, ${price}, ${image_url ?? null});
    `;
  } catch (error) {
    console.error("Failed to create product:", error);
    return;
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function updateProduct(
  id: string,
  formData: FormData
): Promise<void> {
  const { name, description, price, image_url } = UpdateProductSchema.parse({
    name: formData.get("name"),
    description: formData.get("description")?.toString() || "",
    price: formData.get("price"),
    image_url: formData.get("image_url")?.toString() || undefined,
  });

  try {
    await sql`
      UPDATE products
      SET name = ${name},
          description = ${description},
          price = ${price},
          image_url = ${image_url ?? null}
      WHERE id = ${id};
    `;
  } catch (error) {
    console.error("Failed to update product:", error);
    return;
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    await sql`DELETE FROM products WHERE id = ${id};`;
    revalidatePath("/dashboard/products");
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
}
