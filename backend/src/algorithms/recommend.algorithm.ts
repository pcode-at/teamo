import { users, userSkills, skills, PrismaClient, projects } from "@prisma/client";
import { UserAndSkills } from "src/types/userAndSkills.type";

const prisma = new PrismaClient();

export async function recommendUsers(projectId: string, stage: number, numberOfRecommendations: number): Promise<UserAndSkills[]> {
  let skillsNeeded: Map<string, any> = new Map();

  if (stage === 0) {
    const projectGroup = await prisma.projects.findMany({
      where: {
        id: projectId,
      },
      include: {
        members: {
          include: {
            skills: {
              include: {
                skill: true,
              },
            },
          },
        },
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });

    // Get all skills needed for the project
    projectGroup[0].skills.forEach(skill => {
      skillsNeeded.set(skill.skill.id, { skill: skill, ratingNeeded: skill.rating, rating: 0 });
    });

    // Go through each member
    projectGroup[0].members.forEach(member => {
      // Go through each skill from the member
      member.skills.forEach(skill => {
        // Check if the skill is needed for the project
        if (skillsNeeded.has(skill.skill.id)) {
          // If the skill rating equals the Rating needed then remove the skill
          // or if the rating of all memebers together in this skill is greater or equals than 150% of the rating needed then remove the skill
          if (
            skill.rating == skillsNeeded.get(skill.skill.id).ratingNeeded ||
            parseInt(skill.rating) + skillsNeeded.get(skill.skill.id).ratingNeeded >= skillsNeeded.get(skill.skill.id).ratingNeeded * 1.5
          ) {
            skillsNeeded.delete(skill.skill.id);
          }
          // If the skill rating is less than the Needed Rating then set the Rating to the Rating of the member
          else {
            skillsNeeded.get(skill.skill.id).rating += parseInt(skill.rating);
          }
        }
      });
    });
  } else {
    //Get data from chache
  }

  let numberOfSkillsPerPerson = skillsNeeded.size / numberOfRecommendations;

  let usersToBeEvaluated;

  usersToBeEvaluated = await prisma.users.findMany({
    where: {
      skills: {
        some: {
          skill: {
            id: {
              in: Array.from(skillsNeeded.keys()),
            },
          },
        },
      },
    },
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });

  let usersAndSkills: UserAndSkills[] = [];

  usersToBeEvaluated.forEach(user => {
    let skillsPossessed = 0;
    skillsNeeded.forEach(skill => {
      if (stage === 0) user.skills.includes(skill) && user.skills.rating === skill.rating ? skillsPossessed++ : 0;
      if (stage === 1) user.skills.includes(skill) && Math.abs(user.skills.rating - skill.rating) <= 3 ? skillsPossessed++ : 0;
    });
    if (skillsPossessed >= Math.floor(numberOfSkillsPerPerson)) {
      let userToAdd = new UserAndSkills({
        identifier: user.identifier,
        id: user.id,
        score: skillsPossessed,
        birthDate: user.birthDate,
        email: user.email,
        name: user.name,
        password: user.password,
        photo: user.photo,
        roles: user.roles,
        skills: user.skills,
      });

      usersAndSkills.push(userToAdd);
    }
  });

  usersAndSkills.sort((a, b) => b.score - a.score);

  return usersAndSkills;
}
