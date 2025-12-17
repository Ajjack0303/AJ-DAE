import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@inkconnect.dev" },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("test123", 10);

    const adminUser = await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@inkconnect.dev",
        password: hashedPassword,
        role: "admin",
      },
    });

    console.log("Admin user created:", adminUser);
  } else {
    console.log("Admin user already exists");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
