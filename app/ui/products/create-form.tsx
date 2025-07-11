import { createProduct } from "@/app/lib/actions";
import Link from "next/link";
import { Button } from "@/app/ui/button";

export default function Form() {
  return (
    <form action={createProduct}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="e.g. T-Shirt"
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
            placeholder="Product description..."
            rows={3}
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
            required
            placeholder="e.g. 10000 for Rp100.00"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image_url" className="block text-sm font-medium mb-1">
            Image URL (optional)
          </label>
          <input
            id="image_url"
            name="image_url"
            placeholder="https://example.com/image.jpg"
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
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
