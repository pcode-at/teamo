import { Injectable } from '@nestjs/common';
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
            data: skills.map(skill => new SkillEntity(skill))
        });
    }
}