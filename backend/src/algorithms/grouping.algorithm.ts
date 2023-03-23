import { PrismaClient } from "@prisma/client";
import { SkillConnection, SkillNode } from "src/project/dto/find-skillgroups.dto";

const prisma = new PrismaClient();

async function getMatchingPercentage(skillId1: string, skillId2: string) {
  const totalOccourences = await prisma.userSkills.aggregate({
    where: {
      skillsId: {
        equals: skillId1,
      },
    },
    _count: true,
  });

  const test2 = await prisma.userSkills.groupBy({
    by: ["identifier"],
    where: {
      OR: [
        {
          skillsId: {
            equals: skillId1,
          },
        },
        {
          skillsId: {
            equals: skillId2,
          },
        },
      ],
    },
    _count: true,
    orderBy: {
      _count: {
        identifier: "desc",
      },
    },
  });

  let combinedOccourences = test2.filter(skill => skill._count > 1);

  if (combinedOccourences.length === 0) {
    return 0;
  }

  return combinedOccourences.length / totalOccourences._count;
}

async function getAllAggregationPercentagesOfSkills(projectId: string) {
  const skills = await prisma.projects.findUnique({
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

  const skillIds = skills.skills.map(skill => skill.skill.id);
  // const percentages = [];
  let mapping = new Map<String, SkillMap>();
  for (let i = 0; i < skillIds.length; i++) {
    for (let j = i + 1; j < skillIds.length; j++) {
      let skillMap = mapping.get(skillIds[i]);
      if (skillMap == null) {
        skillMap = {
          compatibility: [],
        };
      }

      skillMap.compatibility.push({
        skill: skillIds[j],
        percentage: await getMatchingPercentage(skillIds[i], skillIds[j]),
      });

      mapping.set(skillIds[i], skillMap);
    }
  }

  return mapping;
}

export async function getSkillGroupingsForProject(projectId: string): Promise<Map<string, SkillNode>> {
  const skillSystem = new Map<string, SkillNode>();
  const percentages = await getAllAggregationPercentagesOfSkills(projectId);


  for (const skillId of percentages.keys()) {
    skillSystem.set(skillId.toString(), new SkillNode(skillId.toString()));
  }


  percentages.forEach((skillMap, skillId) => {
    skillMap.compatibility.forEach(compatibility => {
      const skillNode = skillSystem.get(skillId.toString());
      const compatibilityNode = skillSystem.get(compatibility.skill);
      const skillConnection = new SkillConnection(skillNode, compatibilityNode, compatibility.percentage);
      skillNode.skillConnections.push(skillConnection);
    });
  });

  return skillSystem;
}



type SkillMap = {
  compatibility: SkillCompatibility[];
};

type SkillCompatibility = {
  skill: string;
  percentage: number;
};
