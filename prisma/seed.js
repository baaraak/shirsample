const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

const hashPassword = (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

async function main() {
  const password = await hashPassword(process.env.ADMIN_PASSWORD || "admin");
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      email: "admin@gmail.com",
      password: password,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
