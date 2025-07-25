import CardWrapper from "@/app/ui/dashboard/cards";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import { poppins } from "@/app/ui/fonts";
import {
  CardSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from "@/app/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  return (
    <main>
      <h1 className={`${poppins.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8 items-stretch">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart className="md:col-span-4 lg:col-span-5 h-full" />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <div className="md:col-span-4 lg:col-span-3 h-full">
            <LatestInvoices />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
