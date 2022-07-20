import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SkillEntity, SkillResponse } from "src/entities/skill.entity";
import { SkillService } from "./skill.service";

@Controller("api/skill")
@ApiTags("skill")
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Get all" })
  @ApiResponse({ status: 200, type: SkillResponse })
  async getAll(): Promise<SkillResponse> {
    return await this.skillService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get skill by id" })
  @ApiResponse({ status: 200, type: SkillResponse })
  async getOne(@Param("id") id: string): Promise<SkillResponse> {
    return await this.skillService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create skill" })
  @ApiResponse({ status: 200, type: SkillResponse })
  async create(@Body() skill): Promise<SkillResponse> {
    return await this.skillService.create(skill);
  }
}
