import { notFound } from "next/navigation";
import { sql } from "@vercel/postgres";
import { Product } from "@/app/lib/definitions";
import Breadcrumbs from "@/app/ui/products/breadcrumbs";
import EditProductForm from "@/app/ui/products/edit-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Product",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const { rows } = await sql`SELECT * FROM products WHERE id = ${id} LIMIT 1;`;
  const product = rows[0] as Product | undefined;

  if (!product) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/dashboard/products" },
          {
            label: "Edit",
            href: `/dashboard/products/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditProductForm product={product} />
    </main>
  );
}
