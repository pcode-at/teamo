import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedUserSkills() {
  const users = await prisma.users.findMany();

  const skills = await prisma.skills.findMany();

  await prisma.userSkills.deleteMany();

  let userSkills = [];

  users.forEach(user => {
    // Get 4 random values of skills
    const randomSkills = skills.sort(() => Math.random() - 0.5).slice(0, 4);
    // Add the 4 skills with the user and a rating to the userSkills Array
    randomSkills.forEach(skill => {
      userSkills.push({
        user: user.identifier,
        skill: skill.id,
        rating: Math.floor(Math.random() * 10) + 1,
      });
    });
  });

  for (let i = 0; i < userSkills.length; i++) {
    await prisma.userSkills.create({
      data: {
        user: {
          connect: {
            identifier: userSkills[i].user,
          },
        },
        skill: {
          connect: {
            id: userSkills[i].skill,
          },
        },
        rating: "" + userSkills[i].rating,
      },
    });
  }
}

seedUserSkills();
