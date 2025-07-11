"use client";

import { updateProduct } from "@/app/lib/actions";
import { Product } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "@/app/ui/button";

export default function EditProductForm({ product }: { product: Product }) {
  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <form action={updateProductWithId}>
      <input type="hidden" name="id" value={product.id} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            defaultValue={product.name}
            required
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={product.description || ""}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Price (in cents)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="1"
            min="0"
            defaultValue={product.price}
            required
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image_url" className="block text-sm font-medium mb-1">
            Image URL
          </label>
          <input
            id="image_url"
            name="image_url"
            defaultValue={product.image_url || ""}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Link
          href="/dashboard/products"
          className="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
}
