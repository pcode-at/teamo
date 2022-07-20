import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectResponse } from "src/entities/project.entity";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("api/project")
@ApiTags("project")
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: "Create project" })
  @ApiResponse({ status: 200, type: ProjectResponse })
  create(@Body() body: CreateProjectDto): Promise<ProjectResponse> {
    return this.projectService.create(body);
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
  update(@Param("id") id: string, @Body() updateProject: UpdateProjectDto): Promise<ProjectResponse> {
    return this.projectService.update(id, updateProject);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete project" })
  @ApiResponse({ status: 200, type: ProjectResponse })
  remove(@Param("id") id: string): Promise<ProjectResponse> {
    return this.projectService.remove(id);
  }
}
