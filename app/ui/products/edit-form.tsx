"use client";

import { updateProduct } from "@/app/lib/actions";
import { Product } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function EditProductForm({ product }: { product: Product }) {
  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <form action={updateProductWithId}>
      <input type="hidden" name="id" value={product.id} />
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={product.name}
              required
              placeholder="e.g. T-Shirt"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={product.description || ""}
              placeholder="Product description..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (in cents)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="1"
              min="0"
              required
              defaultValue={product.price}
              placeholder="e.g. 10000 for Rp100.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              name="image_url"
              defaultValue={product.image_url || ""}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="h-10 px-4 flex items-center rounded-md text-sm font-medium border border-input bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Cancel
        </Link>
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
}
