"use client";

import Link from "next/link";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteProduct } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
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

export function CreateProduct() {
  return (
    <Button asChild>
      <Link href="/dashboard/products/create">
        <PlusIcon className="mr-2 h-4 w-4" />
        Create Product
      </Link>
    </Button>
  );
}

export function UpdateProduct({ id }: { id: string }) {
  return (
    <Button asChild variant="outline" size="icon">
      <Link href={`/dashboard/products/${id}/edit`}>
        <PencilIcon className="w-4 h-4" />
      </Link>
    </Button>
  );
}

export function DeleteProduct({ id }: { id: string }) {
  const deleteProductWithId = deleteProduct.bind(null, id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <TrashIcon className="w-4 h-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action={deleteProductWithId}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this product?
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
      </AlertDialogContent>
    </AlertDialog>
  );
}
