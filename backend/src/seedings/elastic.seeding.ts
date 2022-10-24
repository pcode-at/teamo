import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();

async function seedElastic() {
  const users = await prisma.users.findMany();

  await fetch(`http://localhost:3000/api/elastic/reimport`, {
    method: "GET",
  });

  users.forEach(async user => {
    await fetch(`http://localhost:3000/api/elastic/insertUser/${user.identifier}`, {
      method: "POST",
    });
    setTimeout(() => {}, 10);
  });
}

seedElastic();
