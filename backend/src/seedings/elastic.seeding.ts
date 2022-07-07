import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function seedElastic() {
  const users = await prisma.users.findMany();

  users.forEach(async user => {
    await fetch(`http://localhost:3000/api/elastic/insertUser/${user.identifier}`, {
      method: "POST",
    });
  });
}

seedElastic();
