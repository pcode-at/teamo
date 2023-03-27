import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Req, UseGuards } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectResponse } from "src/entities/project.entity";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AddSkillDTO } from "./dto/add-skill.dto";
import { SkillGroupResponse } from "./dto/find-skillgroups.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("api/project")
@ApiTags("project")
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  @ApiOperation({ summary: "Create project" })
  @ApiResponse({ status: 200, type: ProjectResponse })
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProjectDto: CreateProjectDto, @Req() request): Promise<ProjectResponse> {
    return this.projectService.create(createProjectDto, request);
  }

  @Patch('bookmark/:id')
  @ApiOperation({ summary: "Bookmark a user to a project" })
  @ApiResponse({ status: 201, type: ProjectResponse })
  @UseGuards(JwtAuthGuard)
  async bookmark(@Body() bookmarks: string[], @Param('id') id: string, @Req() request): Promise<ProjectResponse> {
    return this.projectService.bookmark(id, bookmarks, request);
  }

  @Get('bookmark/:id')
  @ApiOperation({ summary: "Get all bookmarks for a project" })
  @ApiResponse({ status: 200, type: ProjectResponse })
  @UseGuards(JwtAuthGuard)
  async getBookmarks(@Param("id") projectId: string, @Req() request): Promise<ProjectResponse> {
    return this.projectService.getBookmarks(projectId, request);
  }



  @Get()
  @ApiOperation({ summary: "Get all projects" })
  @ApiResponse({ status: 200, type: ProjectResponse })
  async findAll(): Promise<ProjectResponse> {
    return this.projectService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get project by id" })
  @ApiResponse({ status: 200, type: ProjectResponse })
  findOne(@Param("id") id: string): Promise<ProjectResponse> {
    return this.projectService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update project" })
  @ApiResponse({ status: 200, type: ProjectResponse })
  update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<ProjectResponse> {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete project" })
  @ApiResponse({ status: 200, type: ProjectResponse })
  remove(@Param("id") id: string): Promise<ProjectResponse> {
    return this.projectService.remove(id);
  }

  @Post("skill/add")
  addSkill(@Body() skillRating: AddSkillDTO): Promise<ProjectResponse> {
    return this.projectService.addSkill(skillRating);
  }

  @Get("skill/groupings/:id")
  getSkillGroupings(@Param("id") projectId: string): Promise<SkillGroupResponse> {
    let test = this.projectService.getSkillGroupings(projectId);
    return test;
  }
}
