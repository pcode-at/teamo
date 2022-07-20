import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { PrismaClient, SkillGroup } from "@prisma/client";
import { ProjectEntity, ProjectResponse } from "src/entities/project.entity";
import { AddSkillDTO } from "./dto/add-skill.dto";
import { getSkillGroupingsForProject } from "src/algorithms/grouping.algorithm";
import { SkillGroupEntity, SkillGroupResponse } from "./dto/find-skillgroups.dto";


const prisma = new PrismaClient();

@Injectable()
export class ProjectService {
  async create(creatProject: CreateProjectDto): Promise<ProjectResponse> {
    let project;
    try {
      let skillGroups: SkillGroup = {
        nodes: [],
        edges: []
      };
      project = await prisma.projects.create({
        data: {
          ...creatProject,
          creationDate: new Date(creatProject.creationDate.toString()),
          lastEdited: new Date(Date.now().toString()),
          skillGroups: skillGroups,
        },
      });
    } catch {
      throw new BadRequestException("Something went wrong trying to create the project");
    }
    return {
      statusCode: 200,
      message: "Successfully created project",
      data: new ProjectEntity(project),
    };
  }

  async findAll(): Promise<ProjectResponse> {
    let projects;
    try {
      projects = await prisma.projects.findMany();
    } catch {
      throw new BadRequestException("Something went wrong trying to fetch the projects");
    }
    return {
      statusCode: 200,
      message: "Successfully fetched projects",
      data: projects.map(project => new ProjectEntity(project)),
    };
  }

  async findOne(id: string): Promise<ProjectResponse> {
    let project;
    try {
      project = await prisma.projects.findUnique({ where: { id } });
    } catch {
      throw new BadRequestException("Something went wrong trying to fetch the project");
    }
    return {
      statusCode: 200,
      message: "Successfully fetched project",
      data: new ProjectEntity(project),
    };
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectResponse> {
    let project;
    try {
      project = prisma.projects.update({
        where: { id },
        data: {
          ...updateProjectDto,
          lastEdited: new Date(Date.now().toString()),
        },
      });
    } catch {
      throw new BadRequestException("Something went wrong trying to update the project");
    }
    return {
      statusCode: 200,
      message: "Successfully updated project",
      data: new ProjectEntity(project),
    };
  }

  async remove(id: string) {
    try {
      await prisma.projects.delete({ where: { id } });
    } catch {
      throw new BadRequestException("Something went wrong trying to delete the project");
    }
    return {
      statusCode: 200,
      message: "Successfully deleted project",
    };
  }

  async addSkill(skillRating: AddSkillDTO): Promise<ProjectResponse> {
    let project;
    try {
      let skillRatingEntry = await prisma.skillRating.create({
        data: {
          rating: skillRating.rating,
          skill: {
            connect: {
              id: skillRating.skillId,
            },
          },
          projects: {
            connect: {
              id: skillRating.projectId,
            },
          },
        },
      });

      project = await prisma.projects.update({
        where: { id: skillRating.projectId },
        data: {
          skills: {
            connect: {
              skillRatingId: skillRatingEntry.skillRatingId,
            },
          },
        },
      });
    } catch {
      throw new BadRequestException("Something went wrong trying to add a skill to the project");
    }
    return {
      statusCode: 200,
      message: "Successfully added skill to project",
      data: new ProjectEntity(project),
    };
  }

  async getSkillGroupings(projectId: string): Promise<SkillGroupResponse> {
    let data = await getSkillGroupingsForProject(projectId);


    let skills = await prisma.projects.findUnique({
      where: {
        id: projectId,
      },
      select: {
        skills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    let nodes = [];

    for (let node of data.keys()) {
      nodes.push({
        id: node,
        label: skills.skills.find(skill => skill.skill.id === node).skill.name,
      });
    }


    let edges = [];

    for (let edge of data.entries()) {
      edge[1].skillConnections.forEach(skillConnection => {
        if (skillConnection.skillId2 && skillConnection.percentage > 0.25)
          edges.push({
            from: skillConnection.skillId1.skillId,
            to: skillConnection.skillId2.skillId,
            label: skillConnection.percentage * 100 + "%",
          });
      });
    }

    const dataBaseInsert: SkillGroup = {
      nodes: nodes,
      edges: edges
    }

    await prisma.projects.update({
      where: { id: projectId },
      data: {
        skillGroups: dataBaseInsert,
      }
    });



    return {
      statusCode: 200,
      message: "Successfully computed skill groups",
      data: new SkillGroupEntity(nodes, edges),
    };
  }
}
