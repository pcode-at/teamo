import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectResponse } from "src/entities/project.entity";
import { AddSkillDTO } from "./dto/add-skill.dto";
import { SkillGroupResponse } from "./dto/find-skillgroups.dto";

@Controller("api/project")
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<ProjectResponse> {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  async findAll(): Promise<ProjectResponse> {
    return this.projectService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<ProjectResponse> {
    return this.projectService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<ProjectResponse> {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<ProjectResponse> {
    return this.projectService.remove(id);
  }

  @Post("add-skill")
  addSkill(@Body() skillRating: AddSkillDTO): Promise<ProjectResponse> {
    return this.projectService.addSkill(skillRating);
  }

  @Get("skill-groupings/:id")
  getSkillGroupings(@Param("id") projectId: string): Promise<SkillGroupResponse> {
    let test = this.projectService.getSkillGroupings(projectId);
    return test;
  }
}
