import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <FaceFrownIcon className="h-16 w-16 text-gray-400" />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        404 – Not Found
      </h1>
      <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
        Sorry, we couldn’t find the page or data you were looking for.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 inline-block rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
      >
        ← Go back to Dashboard
      </Link>
    </main>
  );
}
