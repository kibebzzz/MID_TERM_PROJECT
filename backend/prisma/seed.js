import bcrypt from "bcrypt";
import prisma from "../src/config/prisma.js";

async function main() {

  const adminExists = await prisma.user.findUnique({
    where: {
      email: "admin@palette.com",
    },
  });

  if (adminExists) {
    console.log("✅ Admin account already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.user.create({
    data: {
      fullName: "Palette Administrator",
      email: "admin@palette.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin account created successfully.");

}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });