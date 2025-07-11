"use client";

import { DeleteCustomer, UpdateCustomer } from "@/app/ui/customers/buttons";

export default function CustomerActions({ id }: { id: string }) {
  return (
    <div className="flex justify-end gap-3">
      <UpdateCustomer id={id} />
      <DeleteCustomer id={id} />
    </div>
  );
}
