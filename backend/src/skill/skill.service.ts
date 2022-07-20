import { BadRequestException, Injectable } from "@nestjs/common";
import { SkillEntity, SkillResponse } from "src/entities/skill.entity";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Injectable()
export class SkillService {
  async findAll(): Promise<SkillResponse> {
    try {
      const skills = await prisma.skills.findMany();

      return new SkillResponse({
        statusCode: 200,
        message: "Skills found successfully",
        data: skills.map(skill => new SkillEntity(skill)),
      });
    } catch {
      throw new BadRequestException("Something went wrong trying to fetch the skills");
    }
  }

  async findOne(id: string): Promise<SkillResponse> {
    try {
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
    } catch {
      throw new BadRequestException("Something went wrong trying to fetch the skill");
    }
  }

  async create(skill): Promise<SkillResponse> {
    try {
      const created = await prisma.skills.create({
        data: {
          ...skill,
        },
      });
      
      return new SkillResponse({
        statusCode: 200,
        message: "Skill created successfully",
        data: new SkillEntity(created),
      });
    } catch {
      throw new BadRequestException("Something went wrong trying to create the skill");
    }
  }
}
