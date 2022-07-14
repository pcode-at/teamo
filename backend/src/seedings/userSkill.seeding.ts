import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedUserSkills() {
  const users = await prisma.users.findMany();

  const skills = await prisma.skills.findMany();

  await prisma.userSkills.deleteMany();

  let userSkills = [];

  users.forEach(user => {
    // Get 10 random values of skills
    const randomSkills = skills.filter(skill => skill.name != "English" && skill.name != "German").sort(() => Math.random() - 0.5).slice(0, 10);

    // Add the 10 skills with the user and a rating to the userSkills Array
    randomSkills.forEach(skill => {
      userSkills.push({
        user: user.identifier,
        skill: skill.id,
        rating: Math.floor(Math.random() * 10) + 1,
      });
    });

    // Add German to the User
    userSkills.push({
      user: user.identifier,
      skill: skills.find(skill => skill.name == "German").id,
      rating: Math.floor(Math.random() * 5) + 5,
    });

    // Add English to the User with an 80% chance
    if (Math.random() > 0.2) {
      userSkills.push({
        user: user.identifier,
        skill: skills.find(skill => skill.name == "English").id,
        rating: Math.floor(Math.random() * 8) + 2,
      });
    }

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
