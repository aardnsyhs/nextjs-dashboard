import { Metadata } from "next";
import { fetchFilteredCustomers } from "@/app/lib/data";
import Table from "@/app/ui/customers/table";
import { FormattedCustomersTable } from "@/app/lib/definitions";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const customers: FormattedCustomersTable[] = await fetchFilteredCustomers(
    query,
    currentPage
  );

  return (
    <div className="w-full">
      <Table customers={customers} />
    </div>
  );
}
