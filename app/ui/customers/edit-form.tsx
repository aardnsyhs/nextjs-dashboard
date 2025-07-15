"use client";

import { Customer } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { UserIcon, EnvelopeIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { updateCustomer } from "@/app/lib/actions";

export default function EditCustomerForm({ customer }: { customer: Customer }) {
  return (
    <form action={updateCustomer}>
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
              />
              <PhotoIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="h-10 px-4 flex items-center rounded-md text-sm font-medium border border-input bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Cancel
        </Link>
        <Button type="submit">Update Customer</Button>
      </div>
    </form>
  );
}
