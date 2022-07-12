import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaClient } from '@prisma/client';
import { ProjectEntity, ProjectResponse } from 'src/entities/project.entity';

const prisma = new PrismaClient();

@Injectable()
export class ProjectService {
  async create(creatProject: CreateProjectDto): Promise<ProjectResponse> {
    let project;
    try {
      project = await prisma.projects.create({
        data: {
          ...creatProject,
          creationDate: new Date(creatProject.creationDate.toString()),
          lastEdited: new Date(creatProject.lastEdited.toString()),
        }
      });
    } catch {
      throw new BadRequestException('Something went wrong trying to create the project');
    }
    return {
      statusCode: 200,
      message: 'Successfully created project',
      data: new ProjectEntity(project)
    }
  }

  async findAll(): Promise<ProjectResponse> {
    let projects;
    try {
      projects = await prisma.projects.findMany();
    } catch {
      throw new BadRequestException('Something went wrong trying to fetch the projects');
    }
    return {
      statusCode: 200,
      message: 'Successfully fetched projects',
      data: projects.map(project => new ProjectEntity(project))
    }
  }

  async findOne(id: string): Promise<ProjectResponse> {
    let project;
    try {
      project = await prisma.projects.findUnique({ where: { id } });
    } catch {
      throw new BadRequestException('Something went wrong trying to fetch the project');
    }
    return {
      statusCode: 200,
      message: 'Successfully fetched project',
      data: new ProjectEntity(project)
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectResponse> {
    let project;
    try {
      project = prisma.projects.update({
        where: { id },
        data: {
          ...updateProjectDto,
          lastEdited: new Date(updateProjectDto.lastEdited.toString()),
        }
      });
    } catch {
      throw new BadRequestException('Something went wrong trying to update the project');
    }
    return {
      statusCode: 200,
      message: 'Successfully updated project',
      data: new ProjectEntity(project)
    }
  }

  async remove(id: string) {
    try {
      await prisma.projects.delete({ where: { id } });
    } catch {
      throw new BadRequestException('Something went wrong trying to delete the project');
    }
    return {
      statusCode: 200,
      message: 'Successfully deleted project',
    }

  }
}
