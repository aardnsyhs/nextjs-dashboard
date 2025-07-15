import { generateYAxis } from "@/app/lib/utils";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { poppins } from "@/app/ui/fonts";
import { fetchRevenue } from "@/app/lib/data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

type RevenueChartProps = {
  className?: string;
};

export default async function RevenueChart({ className }: RevenueChartProps) {
  const revenue = await fetchRevenue();
  const chartHeight = 350;

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-muted-foreground">No data available.</p>;
  }

  return (
    <div className={`${className}`}>
      <Card className="w-full h-full flex flex-col">
        <CardHeader>
          <CardTitle className={`${poppins.className} text-xl md:text-2xl`}>
            Recent Revenue
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Last 12 months
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="grid grid-cols-12 sm:grid-cols-13 items-end gap-2 md:gap-4 bg-muted p-4 rounded-md">
            <div
              className="hidden sm:flex flex-col justify-between text-sm text-muted-foreground mb-6"
              style={{ height: `${chartHeight}px` }}
            >
              {yAxisLabels.map((label) => (
                <p key={label}>{label}</p>
              ))}
            </div>
            {revenue.map((month) => (
              <div
                key={month.month}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-md bg-primary/70 transition-all duration-300"
                  style={{
                    height: `${(chartHeight / topLabel) * month.revenue}px`,
                  }}
                ></div>
                <p className="-rotate-90 text-xs text-muted-foreground sm:rotate-0">
                  {month.month}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
