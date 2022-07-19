import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedUserSkills() {
  const users = await prisma.users.findMany();

  const skills = await prisma.skills.findMany();

  await prisma.userSkills.deleteMany();

  let userSkills = [];

  users.forEach(user => {
    // Get 10 random values of skills
    const randomSkills = skills
      .filter(skill => skill.name != "English" && skill.name != "German")
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    // Add the 10 skills with the user and a rating to the userSkills Array
    randomSkills.forEach(skill => {
      userSkills.push({
        user: user.identifier,
        skill: skill.id,
        rating: Math.floor(Math.random() * 9) + 1,
      });
    });

    // Add German to the User
    userSkills.push({
      user: user.identifier,
      skill: skills.find(skill => skill.name == "German").id,
      rating: Math.floor(Math.random() * 6) + 4,
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
        rating: userSkills[i].rating,
      },
    });
  }
}

async function seedUserSkillsWithGrouping(skillGroupings) {
  const users = await prisma.users.findMany();

  await prisma.userSkills.deleteMany();

  let userSkills = [];

  users.forEach(user => {
    const skillsToAdd = [];

    let chance = 1;

    while (Math.random() <= chance) {
      const randomSkills = skillGroupings[Math.floor(Math.random() * skillGroupings.length)];
      skillsToAdd.push(randomSkills.filter(skill => !skillsToAdd.includes(skill)));
      chance -= 0.15;
    }

    skillsToAdd.forEach(skills => {
      let base = Math.floor(Math.random() * 7) + 1;

      skills.forEach(skill => {
        userSkills.push({
          user: user.identifier,
          skill: skill,
          rating: Math.floor(Math.random() * 2) + base,
        });
      });
    });

    // Add German to the User
    userSkills.push({
      user: user.identifier,
      skill: "62ce7763f6b3d5251eb5ab76",
      rating: Math.floor(Math.random() * 6) + 4,
    });

    // Add English to the User with an 80% chance
    if (Math.random() > 0.2) {
      userSkills.push({
        user: user.identifier,
        skill: "62ce7760f6b3d5251eb5ab75",
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
        rating: userSkills[i].rating,
      },
    });
  }
}

const Skillgroupings = [
  ["62ce771df6b3d5251eb5ab6b", "62ce773df6b3d5251eb5ab6c", "62ce79cbf6b3d5251eb5ab7e", "62ce7754f6b3d5251eb5ab72", "62ce775df6b3d5251eb5ab74"],
  [
    "62ce7741f6b3d5251eb5ab6d",
    "62ce7746f6b3d5251eb5ab6e",
    "62ce774af6b3d5251eb5ab6f",
    "62ce774df6b3d5251eb5ab70",
    "62ce7751f6b3d5251eb5ab71",
    "62ce79adf6b3d5251eb5ab7b",
    "62ce79aff6b3d5251eb5ab7c",
  ],
  ["62ce7741f6b3d5251eb5ab6d", "62ce7746f6b3d5251eb5ab6e", "62ce774af6b3d5251eb5ab6f", "62ce79bcf6b3d5251eb5ab7d"],
  ["62ce775af6b3d5251eb5ab73", "62ce7775f6b3d5251eb5ab77", "62ce7779f6b3d5251eb5ab78", "62ce777bf6b3d5251eb5ab79", "62ce7a1df6b3d5251eb5ab85", "62ce7a23f6b3d5251eb5ab86"],
  ["62ce79d9f6b3d5251eb5ab7f", "62ce79dcf6b3d5251eb5ab80", "62ce79e6f6b3d5251eb5ab81"],
  ["62ce79ebf6b3d5251eb5ab82"],
  ["62ce7796f6b3d5251eb5ab7a", "62ce79f6f6b3d5251eb5ab83", "62ce7a1df6b3d5251eb5ab85", "62ce7a32f6b3d5251eb5ab87", "62ce775af6b3d5251eb5ab73"],
];

seedUserSkillsWithGrouping(Skillgroupings);
