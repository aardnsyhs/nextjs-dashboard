"use client";

import { useState } from "react";
import { CustomerField } from "@/app/lib/definitions";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createInvoice } from "@/app/lib/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Form({ customers }: { customers: CustomerField[] }) {
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");

  return (
    <form action={createInvoice}>
      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="customer">Choose customer</Label>
            <div className="relative">
              <Select onValueChange={(value) => setSelectedCustomer(value)}>
                <SelectTrigger className="w-full pl-10">
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <UserCircleIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="hidden"
                name="customerId"
                value={selectedCustomer}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (USD)</Label>
            <div className="relative">
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                required
                className="pl-10"
              />
              <CurrencyDollarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Set status</Label>
            <RadioGroup name="status" className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="status-pending" required />
                <Label
                  htmlFor="status-pending"
                  className="flex items-center gap-1 text-sm text-muted-foreground"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paid" id="status-paid" required />
                <Label
                  htmlFor="status-paid"
                  className="flex items-center gap-1 text-sm"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="h-10 px-4 flex items-center rounded-md text-sm font-medium border border-input bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
