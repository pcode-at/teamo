import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { SkillEntity, SkillResponse } from "src/entities/skill.entity";
import { SkillService } from "./skill.service";

@Controller("api/skill")
@UseInterceptors(ClassSerializerInterceptor)
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<SkillResponse> {
    return await this.skillService.findAll();
  }

  @Get(":id")
  async getOne(@Param("id") id: string): Promise<SkillResponse> {
    return await this.skillService.findOne(id);
  }

  @Post()
  async create(@Body() skill): Promise<SkillResponse> {
    return await this.skillService.create(skill);
  }
}
