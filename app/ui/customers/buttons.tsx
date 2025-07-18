"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { deleteCustomer } from "@/app/lib/customersApi";
import { AlertTriangle } from "lucide-react";

export function CreateCustomer() {
  return (
    <Button asChild>
      <Link href="/dashboard/customers/create" className="gap-2">
        <span className="hidden md:block">Create Customer</span>
        <PlusIcon className="h-5 w-5" />
      </Link>
    </Button>
  );
}

export function UpdateCustomer({ id }: { id: string }) {
  return (
    <Button asChild variant="outline" size="icon">
      <Link href={`/dashboard/customers/${id}/edit`}>
        <PencilIcon className="w-5 h-5" />
        <span className="sr-only">Edit</span>
      </Link>
    </Button>
  );
}

export function DeleteCustomer({ id }: { id: string }) {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await deleteCustomer(id);
      router.refresh();
    } catch (err) {
      console.error("Failed to delete customer:", err);
      setError("Failed to delete customer");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <TrashIcon className="w-4 h-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form
          onSubmit={(e) => {
            handleDelete(e);
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this customer?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              customer from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </form>
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertTriangle className="h-4 w-4" />
            {error}
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
