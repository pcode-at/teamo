import { Controller, Post, Get, Param, Body, ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";
import { ElasticService, SkillElastic } from "./elastic.service";
import { PrismaClient } from "@prisma/client";
import { SearchDto } from "src/user/dto/search.dto";
import { SearchResponse } from "src/entities/search.entity";

const prisma = new PrismaClient();

@Controller("api/elastic")
@UseInterceptors(ClassSerializerInterceptor)
export class ElasticController {
  constructor(private readonly elastic: ElasticService) { }

  @Post("insertUser/:id")
  async insertUser(@Param("id") identifier: string) {
    const user = await prisma.users.findUnique({
      where: {
        identifier: identifier,
      },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });

    this.elastic.migrateUser(user);
  }

  @Post("search")
  async search(@Body() search: SearchDto): Promise<SearchResponse> {
    return await this.elastic.search(search);
  }

  @Get("reimport")
  async reimport() {
    await this.elastic.reimportData();
  }

  @Get("recommendation/:id/:accurate")
  async recommendation(@Param("id") id: string, @Param("accurate") accurate: boolean) {
    const projectData = await prisma.projects.findFirst({
      where: {
        id: id,
      },
      select: {
        skills: true,
        members: {
          select: {
            skills: {
              select: {
                skill: true,
                rating: true,
              },
            },
          },
        },
        skillGroups: true,
      }
    });

    let skillGroupings = [[]];

    projectData.skillGroups.nodes.forEach(skillGroup => {
      if (skillGroupings[0].length === 0) {
        skillGroupings[0].push({ skill: skillGroup.id, rating: projectData.skills.find(r => r.skillId === skillGroup.id)?.rating });
      }
      else {
        let found = -1;
        console.log(projectData.skillGroups);
        for (let i = 0; i < skillGroupings.length; i++) {
          let connections = projectData.skillGroups.edges.filter(r => r.to === skillGroup.id || r.from === skillGroup.id).map(r => r.from === skillGroup.id ? r.to : r.from);
          if (skillGroupings[i].some(r => connections.includes(r.skill))) {
            found = i;
            break;
          }
        }

        if (found == -1) {
          skillGroupings.push([{ skill: skillGroup.id, rating: projectData.skills.find(r => r.skillId === skillGroup.id)?.rating }]);
        } else {
          skillGroupings[found].push({ skill: skillGroup.id, rating: projectData.skills.find(r => r.skillId === skillGroup.id)?.rating });
        }

      }
    });

    const skills: SkillElastic[] = []

    projectData.skills.forEach(skill => {
      skills.push({
        rating: skill.rating,
        skill: skill.skillId
      });
    });



    if (projectData.members.length > 0) {
      //find Skills that aren't matched yet
      projectData.members.forEach(member => {
        member.skills.forEach(skill => {
          if (skills.find(s => s.skill === skill.skill.id && s.rating === skill.rating)) {
            skills.splice(skills.findIndex(sk => sk.skill === skill.skill.id), 1);
          }
        });
      });
    }


    if (skills.length > 0) {
      skillGroupings.forEach(skillGroup => {
        skillGroup = skillGroup.filter(skill => !skills.flatMap(s => s.skill).includes(skill.skill));
      });
    }

    skillGroupings = skillGroupings.filter(grouping => grouping.length > 0);




    return await this.elastic.recommend(skillGroupings, accurate);
  }
}
