"use client";

import { Customer } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { UserIcon, EnvelopeIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { updateCustomer } from "@/app/lib/customersApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";

export default function EditCustomerForm({ customer }: { customer: Customer }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: customer.name,
    email: customer.email,
    image_url: customer.image_url || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateCustomer(customer.id, { ...form });
      router.push("/dashboard/customers");
    } catch (err) {
      console.error("Failed to update customer:", err);
      setError("Failed to update customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={customer.id} />
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Customer Name</Label>
            <div className="relative">
              <Input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={customer.name}
                placeholder="Enter full name"
                className="pl-10"
                onChange={handleChange}
              />
              <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                required
                defaultValue={customer.email}
                placeholder="example@email.com"
                className="pl-10"
                onChange={handleChange}
              />
              <EnvelopeIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <div className="relative">
              <Input
                id="image_url"
                name="image_url"
                type="text"
                defaultValue={customer.image_url}
                placeholder="/customers/your-name.png"
                className="pl-10"
                onChange={handleChange}
              />
              <PhotoIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertTriangle className="h-4 w-4" />
              {error}
            </div>
          )}
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="h-10 px-4 flex items-center rounded-md text-sm font-medium border border-input bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Cancel
        </Link>
        {loading ? (
          <Button disabled>Updating...</Button>
        ) : (
          <Button type="submit">Update Customer</Button>
        )}
      </div>
    </form>
  );
}
