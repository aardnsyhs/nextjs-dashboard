import Image from "next/image";
import { sql } from "@vercel/postgres";
import { formatCurrency } from "@/app/lib/utils";
import { Product } from "@/app/lib/definitions";
import { DeleteProduct, UpdateProduct } from "@/app/ui/products/buttons";

export default async function ProductTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const ITEMS_PER_PAGE = 10;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { rows: products }: { rows: Product[] } = await sql`
    SELECT * FROM products
    WHERE name ILIKE ${`%${query}%`}
    ORDER BY name ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
  `;

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {products.map((product) => (
              <div
                key={product.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center gap-4 border-b pb-4">
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
                    <p className="text-base font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-semibold">
                    {formatCurrency(product.price)}
                  </p>
                  <div className="flex justify-end gap-2">
                    <UpdateProduct id={product.id} />
                    <DeleteProduct id={product.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Product</th>
                <th className="px-3 py-5 font-medium">Description</th>
                <th className="px-3 py-5 font-medium">Price</th>
                <th className="py-3 pl-6 pr-3 text-right">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b text-sm last-of-type:border-none
                    [&:first-child>td:first-child]:rounded-tl-lg
                    [&:first-child>td:last-child]:rounded-tr-lg
                    [&:last-child>td:first-child]:rounded-bl-lg
                    [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {product.image_url && (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          width={28}
                          height={28}
                          className="rounded-md object-cover"
                        />
                      )}
                      <p>{product.name}</p>
                    </div>
                  </td>
                  <td className="text-pretty px-3 py-3 text-gray-600">
                    {product.description || "-"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 font-medium">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-2">
                      <UpdateProduct id={product.id} />
                      <DeleteProduct id={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
