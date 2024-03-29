import { Injectable } from "@nestjs/common";
import { SkillEntity, SkillResponse } from "src/entities/skill.entity";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Injectable()
export class SkillService {
  async findAll(): Promise<SkillResponse> {
    const skills = await prisma.skills.findMany();
    return new SkillResponse({
      statusCode: 200,
      message: "Skills found successfully",
      data: skills.map(skill => new SkillEntity(skill)),
    });
  }

  async findOne(id: string): Promise<SkillResponse> {
    const skill = await prisma.skills.findUnique({
      where: {
        id,
      },
    });
    return new SkillResponse({
      statusCode: 200,
      message: "Skill found successfully",
      data: new SkillEntity(skill),
    });
  }

  async create(skill): Promise<SkillResponse> {
    const newSkill = await prisma.skills.create({
      data: {
        ...skill,
      },
    });
    return new SkillResponse({
      statusCode: 200,
      message: "Skill created successfully",
      data: new SkillEntity(newSkill),
    });
  }

  async delete(id: string): Promise<SkillResponse> {

    //delete skill from all projects
    await prisma.skillRating.deleteMany({
      where: {
        skillId: id,
      },
    });

    //delte skill from all users
    await prisma.userSkills.deleteMany({
      where: {
        skillsId: id,
      },
    });

    await prisma.skills.delete({
      where: {
        id,
      },
    });

    return new SkillResponse({
      statusCode: 200,
      message: "Skill deleted successfully",
      data: null,
    });
  }
}
