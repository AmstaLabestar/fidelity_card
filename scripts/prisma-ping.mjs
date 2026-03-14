import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
  await prisma.$queryRaw`SELECT 1`;
  console.log("Prisma DB ping: OK");
} catch (error) {
  console.error("Prisma DB ping: FAILED");
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}

