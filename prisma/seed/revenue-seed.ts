import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const data = [
    { month: "Oct", revenue: 2800 },
    { month: "Feb", revenue: 1800 },
    { month: "Mar", revenue: 2200 },
    { month: "Jan", revenue: 2000 },
    { month: "Apr", revenue: 2500 },
    { month: "Nov", revenue: 3000 },
    { month: "Dec", revenue: 4800 },
    { month: "May", revenue: 2300 },
    { month: "Jun", revenue: 3200 },
    { month: "Aug", revenue: 3700 },
    { month: "Jul", revenue: 3500 },
    { month: "Sep", revenue: 2500 },
  ];

  await prisma.revenue.createMany({ data });
  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
