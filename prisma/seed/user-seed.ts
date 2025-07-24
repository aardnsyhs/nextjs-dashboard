import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  const id = randomUUID();
  const name = "Default User";
  const email = "user@nextmail.com";
  const plainPassword = "123456";

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(`✅ User with email "${email}" already exists.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const newUser = await prisma.user.create({
    data: {
      id,
      name,
      email,
      password: hashedPassword,
    },
  });

  console.log("✅ User created:", {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
  });
}

main()
  .catch((e) => {
    console.error("❌ Error seeding user:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
