import Breadcrumbs from "@/app/ui/products/breadcrumbs";
import CreateProductForm from "@/app/ui/products/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product",
};

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/dashboard/products" },
          {
            label: "Create Product",
            href: "/dashboard/products/create",
            active: true,
          },
        ]}
      />
      <CreateProductForm />
    </main>
  );
}
