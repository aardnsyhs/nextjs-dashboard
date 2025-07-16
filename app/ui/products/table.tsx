"use client";

import Image from "next/image";
import { formatCurrency } from "@/app/lib/utils";
import { Product } from "@/app/lib/definitions";
import { DeleteProduct, UpdateProduct } from "@/app/ui/products/buttons";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getProducts } from "@/app/lib/productsApi";
import { ProductsTableSkeleton } from "../skeletons";

export default function ProductTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 10;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const allProducts = await getProducts();
        const filtered = allProducts.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );
        const paginated = filtered.slice(offset, offset + ITEMS_PER_PAGE);
        setProducts(paginated);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [query, currentPage]);

  if (loading) {
    return <ProductsTableSkeleton />;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="md:hidden space-y-4">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center gap-3 border-b pb-4">
                    {product.image_url && (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="rounded-md object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium break-words max-w-[250px]">
                        {product.name}
                      </p>
                      <p className="text-sm text-muted-foreground break-words max-w-[300px]">
                        {product.description || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">
                      {formatCurrency(product.price)}
                    </p>
                    <div className="flex gap-2">
                      <UpdateProduct id={product.id} />
                      <DeleteProduct id={product.id} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Product</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        {product.image_url && (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="rounded-md object-cover"
                          />
                        )}
                        <p className="break-words max-w-[200px]">
                          {product.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground break-words max-w-[400px]">
                      {product.description || "-"}
                    </TableCell>
                    <TableCell>{formatCurrency(product.price)}</TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-2">
                        <UpdateProduct id={product.id} />
                        <DeleteProduct id={product.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
