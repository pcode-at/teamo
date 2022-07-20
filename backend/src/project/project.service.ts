import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { PrismaClient } from "@prisma/client";
import { ProjectEntity, ProjectResponse } from "src/entities/project.entity";

const prisma = new PrismaClient();

@Injectable()
export class ProjectService {
  async create(creatProject: CreateProjectDto): Promise<ProjectResponse> {
    try {
      let project = await prisma.projects.create({
        data: {
          ...creatProject,
          creationDate: new Date(creatProject.creationDate.toString()),
          lastEdited: new Date(Date.now().toString()),
        },
      });

      return new ProjectResponse({
        statusCode: 200,
        message: "Successfully created project",
        data: new ProjectEntity(project),
      });
    } catch {
      throw new BadRequestException("Something went wrong trying to create the project");
    }
  }

  async findAll(): Promise<ProjectResponse> {
    try {
      let projects = await prisma.projects.findMany();

      return new ProjectResponse({
        statusCode: 200,
        message: "Successfully fetched projects",
        data: projects.map(project => new ProjectEntity(project)),
      });
    } catch {
      throw new BadRequestException("Something went wrong trying to fetch the projects");
    }
  }

  async findOne(id: string): Promise<ProjectResponse> {
    try {
      let project = await prisma.projects.findUnique({ where: { id } });

      return new ProjectResponse({
        statusCode: 200,
        message: "Successfully fetched project",
        data: new ProjectEntity(project),
      });
    } catch {
      throw new BadRequestException("Something went wrong trying to fetch the project");
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectResponse> {
    try {
      let project = await prisma.projects.update({
        where: { id },
        data: {
          ...updateProjectDto,
          lastEdited: new Date(Date.now().toString()),
        },
      });

      return new ProjectResponse({
        statusCode: 200,
        message: "Successfully updated project",
        data: new ProjectEntity(project),
      });
    } catch {
      throw new BadRequestException("Something went wrong trying to update the project");
    }
  }

  async remove(id: string): Promise<ProjectResponse> {
    try {
      await prisma.projects.delete({ where: { id } });
      
      return new ProjectResponse({
        statusCode: 200,
        message: "Successfully deleted project",
      });
    } catch {
      throw new BadRequestException("Something went wrong trying to delete the project");
    }
  }
}
