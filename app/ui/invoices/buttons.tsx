"use client";

import { deleteInvoice } from "@/app/lib/actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export function CreateInvoice() {
  return (
    <Button asChild>
      <Link href="/dashboard/invoices/create" className="gap-2">
        <span className="hidden md:block">Create Invoice</span>
        <PlusIcon className="h5 w-5" />
      </Link>
    </Button>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Button asChild variant="outline" size="icon">
      <Link href={`/dashboard/invoices/${id}/edit`}>
        <PencilIcon className="h-5 w-5" />
      </Link>
    </Button>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("id", id);
      await deleteInvoice(formData);
      router.refresh();
    } catch (err) {
      console.error("Failed to delete invoice:", err);
      setError("Failed to delete invoice");
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
        <form onSubmit={handleDelete}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this invoice?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              invoice from the system.
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
