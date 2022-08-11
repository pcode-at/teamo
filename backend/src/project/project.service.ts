import { BadRequestException, Injectable } from "@nestjs/common";
import { ProjectEntity, ProjectResponse } from "src/entities/project.entity";
import { SkillGroupEntity, SkillGroupResponse } from "./dto/find-skillgroups.dto";

import { AddSkillDTO } from "./dto/add-skill.dto";
import { CreateProjectDto } from "./dto/create-project.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { getSkillGroupingsForProject } from "src/algorithms/grouping.algorithm";

const prisma = new PrismaClient();

@Injectable()
export class ProjectService {
  constructor(private readonly jwtService: JwtService) { }

  async create(createProject: CreateProjectDto, request): Promise<ProjectResponse> {
    let project;
    let bearer = request.headers.authorization.split(" ")[1];
    const decoded = await this.jwtService.decode(bearer);
    //@ts-ignore
    const identifier = decoded.identifier;

    const user = await prisma.users.findUnique({ where: { identifier } });
    const { skills, ...rest } = createProject;

    try {
      project = await prisma.projects.create({
        data: {
          ...rest,
          creationDate: new Date(Date.now()),
          lastEdited: new Date(Date.now()),
          creatorId: user.id,
          status: "active",
          skillGroups: Object.create(null),
        },
      });

      skills.forEach(async (skill) => {
        await prisma.skillRating.create({
          data: {
            rating: 9,
            skill: {
              connect: {
                id: skill,
              },
            },
            projects: {
              connect: {
                id: project.id,
              },
            },
          },
        });
      });
    } catch (err) {
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
      project = await prisma.projects.findUnique({
        where: { id }, include: { skills: true },
      });

      for await (const skill of project.skills) {
        skill.name = await (await prisma.skills.findUnique({ where: { id: skill.skillId }, select: { name: true } })).name;

        delete skill.skillRatingId;
        delete skill.projectsId;
      }

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

    const { skills, ...rest } = updateProjectDto;

    try {
      project = prisma.projects.update({
        where: { id },
        data: {
          ...rest,
          lastEdited: new Date(Date.now()),
        },
      });

      const currentProject = await prisma.projects.findUnique({ where: { id }, include: { skills: true } });

      const currentSkills = currentProject.skills.map(skill => skill.skillId);
      const givenSkills = skills.map(skill => skill);

      const skillsToDelete = currentSkills.filter(skill => !givenSkills.includes(skill));
      const skillsToAdd = givenSkills.filter(skill => !currentSkills.includes(skill));

      await prisma.skillRating.deleteMany({
        where: {
          skillRatingId: { in: skillsToDelete }, AND: [
            { projectsId: { equals: id } },
          ]
        }
      });

      skillsToAdd.forEach(async (skill) => {
        await prisma.skillRating.create({
          data: {
            rating: 9,
            skill: {
              connect: {
                id: skill,
              },
            },
            projects: {
              connect: {
                id,
              },
            },
          },
        });
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
        skillGroups: {
          select: {
            nodes: true,
            edges: true,
          },
        },
      },
    });

    let skillGroupIds = [];
    let skillIds = [];
    skills.skillGroups.nodes.forEach(skillGroup => {
      skillGroupIds.push(skillGroup.id);
    });
    skills.skills.forEach(skill => {
      skillIds.push(skill.skill.id);
    });

    if (skillGroupIds.every(id => skillIds.includes(id))) {
      console.log("stayed the same");

      return {
        statusCode: 200,
        message: "Successfully computed skill groups",
        data: new SkillGroupEntity(skills.skillGroups.nodes, skills.skillGroups.edges),
      };
    }

    let data = await getSkillGroupingsForProject(projectId);

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

    await prisma.projects.update({
      where: { id: projectId },
      data: {
        skillGroups: {
          nodes: nodes,
          edges: edges,
        },
      },
    });

    return {
      statusCode: 200,
      message: "Successfully computed skill groups",
      data: new SkillGroupEntity(nodes, edges),
    };
  }

  async bookmark(userIdentifier, bookmarks, request): Promise<ProjectResponse> {

    let bearer = request.headers.authorization.split(" ")[1];
    const decoded = await this.jwtService.decode(bearer);
    //@ts-ignore
    const identifier = decoded.identifier;

    const userId = await (await prisma.users.findUnique({ where: { identifier: userIdentifier }, select: { id: true } })).id;

    const projects = await prisma.projects.findMany();

    projects.forEach(async (project) => {
      if (project.bookmarkIds.includes(userId) && !bookmarks.includes(project.id)) {
        await prisma.projects.update({
          where: { id: project.id },
          data: {
            bookmarkIds: {
              set: project.bookmarkIds.filter(id => id != userId)
            },
          },
        });
      }
      if (!project.bookmarkIds.includes(userId) && bookmarks.includes(project.id)) {
        await prisma.projects.update({
          where: { id: project.id },
          data: {
            bookmarkIds: {
              push: userId
            },
          },
        });
      }
    });
    return null;
  }

  async getBookmarks(identifier, request): Promise<any> {

    // let bearer = request.headers.authorization.split(" ")[1];
    // const decoded = await this.jwtService.decode(bearer);
    // //@ts-ignore
    // const identifier = decoded.identifier;

    const userId = await (await prisma.users.findUnique({ where: { identifier: identifier }, select: { id: true } })).id;

    const projects = await prisma.projects.findMany();

    let bookmarks = [{}];

    projects.forEach((project) => {
      if (project.bookmarkIds.includes(userId)) {
        bookmarks.push({
          projectId: project.id,
          projectName: project.name,
        });
      }
    });

    return {
      statusCode: 200,
      message: "Successfully fetched bookmarks",
      data: bookmarks,
    };
  }
}

