"use client";

import { Product } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { updateProduct } from "@/app/lib/productsApi";

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: product.name,
    description: product.description || "",
    price: product.price.toString(),
    image_url: product.image_url || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateProduct(product.id, {
        ...form,
        price: Number(form.price),
      });
      router.push("/dashboard/products");
    } catch (err) {
      console.error("Failed to update product:", err);
      setError("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={product.id} />
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={form.name}
              required
              placeholder="e.g. T-Shirt"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={form.description || ""}
              placeholder="Product description..."
              onChange={handleChange}
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
              defaultValue={form.price}
              placeholder="e.g. 10000 for Rp100.00"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              name="image_url"
              defaultValue={form.image_url || ""}
              placeholder="https://example.com/image.jpg"
              onChange={handleChange}
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
        {loading ? (
          <Button disabled className="h-10 px-4">
            Updating...
          </Button>
        ) : (
          <Button type="submit" className="h-10 px-4">
            Update
          </Button>
        )}
      </div>
    </form>
  );
}
