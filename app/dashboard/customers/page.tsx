import Pagination from "@/app/ui/customers/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/customers/table";
import { CreateCustomer } from "@/app/ui/customers/buttons";
import { poppins } from "@/app/ui/fonts";
import { CustomersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchCustomerPages } from "@/app/lib/data";
import { Metadata } from "next";
import { fetchFilteredCustomers } from "@/app/lib/data";
import { FormattedCustomersTable } from "@/app/lib/definitions";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || "";
  const currentPage = Number(resolvedSearchParams?.page || 1);
  const totalPages = await fetchCustomerPages(query);

  const customers: FormattedCustomersTable[] = await fetchFilteredCustomers(
    query,
    currentPage
  );

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${poppins.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <CreateCustomer />
      </div>
      <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
        <Table customers={customers} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
