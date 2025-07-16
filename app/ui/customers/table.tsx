import Image from "next/image";
import { FormattedCustomersTable } from "@/app/lib/definitions";
import CustomerActions from "./customer-actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

export default function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="md:hidden space-y-4">
              {customers?.map((customer) => (
                <Card key={customer.id}>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-3 border-b pb-4">
                      <Image
                        src={customer.image_url}
                        className="rounded-full"
                        alt={`${customer.name}'s profile picture`}
                        width={28}
                        height={28}
                      />
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between border-b pb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Pending</p>
                        <p className="font-medium">{customer.total_pending}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Paid</p>
                        <p className="font-medium">{customer.total_paid}</p>
                      </div>
                    </div>
                    <div className="text-sm">
                      <p>{customer.total_invoices} invoices</p>
                    </div>
                    <div className="flex justify-end">
                      <CustomerActions id={customer.id} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Total Invoices</TableHead>
                    <TableHead>Total Pending</TableHead>
                    <TableHead>Total Paid</TableHead>
                    <TableHead className="text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={customer.image_url}
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{customer.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.total_invoices}</TableCell>
                      <TableCell>{customer.total_pending}</TableCell>
                      <TableCell>{customer.total_paid}</TableCell>
                      <TableCell className="text-right pr-6">
                        <CustomerActions id={customer.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
