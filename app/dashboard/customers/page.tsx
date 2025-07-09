import { Metadata } from "next";
import { fetchFilteredCustomers } from "@/app/lib/data";
import Table from "@/app/ui/customers/table";
import { FormattedCustomersTable } from "@/app/lib/definitions";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page() {
  const customers: FormattedCustomersTable[] = await fetchFilteredCustomers("");

  return (
    <div className="w-full">
      <Table customers={customers} />
    </div>
  );
}
