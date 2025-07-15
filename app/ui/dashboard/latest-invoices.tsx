import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { poppins } from "@/app/ui/fonts";
import { fetchLatestInvoices } from "@/app/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className={`${poppins.className} text-xl md:text-2xl`}>
          Latest Invoices
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between p-0">
        <div className="divide-y divide-muted bg-white">
          {latestInvoices.map((invoice, i) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center">
                <Image
                  src={invoice.image_url}
                  alt={`${invoice.name}'s profile picture`}
                  className="mr-4 rounded-full"
                  width={32}
                  height={32}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">
                    {invoice.name}
                  </p>
                  <p className="hidden text-sm text-muted-foreground sm:block">
                    {invoice.email}
                  </p>
                </div>
              </div>
              <p
                className={`${poppins.className} truncate text-sm font-medium md:text-base`}
              >
                {invoice.amount}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center px-6 pb-4 pt-6 text-sm text-muted-foreground">
          <ArrowPathIcon className="h-5 w-5 text-muted-foreground" />
          <span className="ml-2">Updated just now</span>
        </div>
      </CardContent>
    </Card>
  );
}
