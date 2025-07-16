import Pagination from "@/app/ui/products/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/products/table";
import { CreateProduct } from "@/app/ui/products/buttons";
import { poppins } from "@/app/ui/fonts";
import { fetchProductPages } from "@/app/lib/productsApi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page || 1);
  const totalPages = await fetchProductPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${poppins.className} text-2xl`}>Products</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search products..." />
        <CreateProduct />
      </div>
      <Table query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
