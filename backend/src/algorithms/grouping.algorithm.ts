import { PrismaClient } from "@prisma/client";
const { ObjectId } = require("mongodb");

const prisma = new PrismaClient();

async function getAllSkillsFromAProject(projectId: string) {
  return await prisma.projects.findUnique({
    where: {
      id: projectId,
    },
    select: {
      skills: {
        select: {
          skill: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });
}

async function getMatchingPercentage(skillId1: string, skillId2: string) {
  const agg = [
    {
      $match: {
        skillsId: new ObjectId(skillId1),
      },
    },
    {
      $count: "numberOfSkillOccourences",
    },
  ];

  const agg2 = [
    {
      $match: {
        $or: [
          {
            skillsId: new ObjectId(skillId1),
          },
          {
            skillsId: new ObjectId(skillId2),
          },
        ],
      },
    },
    {
      $group: {
        _id: "$identifier",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $match: {
        count: {
          $gte: 2,
        },
      },
    },
    {
      $count: "occourences",
    },
  ];

  const totalOccourences = await prisma.userSkills.aggregateRaw({
    pipeline: agg,
  });

  const combinedOccourences = await prisma.userSkills.aggregateRaw({
    pipeline: agg2,
  });

  return parseInt(combinedOccourences.occourences.toString()) / parseInt(totalOccourences.numberOfSkillOccourences.toString());
}

async function getAllAggregationPercentagesOfSkills(projectId: string) {
  const skills = await getAllSkillsFromAProject(projectId);
  const skillIds = skills.skills.map(skill => skill.skill.id);
  const percentages = [];
  for (let i = 0; i < skillIds.length; i++) {
    for (let j = i + 1; j < skillIds.length; j++) {
      percentages.push({
        skill1: skillIds[i],
        skill2: skillIds[j],
        percentage: await getMatchingPercentage(skillIds[i], skillIds[j]),
      });
    }
  }
  return percentages;
}

function getSkillGroupings(projectId: string) {
  const skillGroupings = [];
  const percentages = getAllAggregationPercentagesOfSkills(projectId);

  console.log(percentages);
}
