import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/ui/products/breadcrumbs";
import EditProductForm from "@/app/ui/products/edit-form";
import { Metadata } from "next";
import { getProductById } from "@/app/lib/productsApi";
import { Product } from "@/app/lib/definitions";

export const metadata: Metadata = {
  title: "Edit Product",
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  let product: Product | null = null;

  try {
    product = await getProductById(id);
  } catch (error) {
    console.error("Error fetching product:", error);
  }

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
