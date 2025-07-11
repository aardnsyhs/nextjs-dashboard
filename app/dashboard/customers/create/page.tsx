import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import CreateCustomerForm from "@/app/ui/customers/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers Create",
};

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Customers", href: "/dashboard/customers" },
          {
            label: "Create Customer",
            href: "/dashboard/customers/create",
            active: true,
          },
        ]}
      />
      <CreateCustomerForm />
    </main>
  );
}
