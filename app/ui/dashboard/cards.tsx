import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { poppins } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = await fetchCardData();

  return (
    <>
      <DashboardCard
        title="Collected"
        value={totalPaidInvoices}
        type="collected"
      />
      <DashboardCard
        title="Pending"
        value={totalPendingInvoices}
        type="pending"
      />
      <DashboardCard
        title="Total Invoices"
        value={numberOfInvoices}
        type="invoices"
      />
      <DashboardCard
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

function DashboardCard({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold tracking-tight ${poppins.className}`}
        >
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
