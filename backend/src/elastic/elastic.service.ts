import * as fs from "fs";

import { PrismaClient, skills, userSkills, users } from "@prisma/client";
import { RecommendEntity, RecommendResponse } from "src/entities/recommend.entity";
import { SearchEntity, SearchResponse } from "src/entities/search.entity";

import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Injectable } from "@nestjs/common";
import { SearchDto } from "src/user/dto/search.dto";
import { SkillDto } from "src/user/dto/skill.dto";
import { SkillEntity } from "src/entities/skill.entity";
import { UserEntity } from "src/entities/user.entity";

const prisma = new PrismaClient();

const client = new ElasticsearchService({
  node: "https://localhost:9200/",
  auth: {
    username: "elastic",
    password: "elastic",
  },
  tls: {
    ca: fs.readFileSync("./src/elastic/ca.crt"),
    rejectUnauthorized: false,
  },
  requestTimeout: 30000,
});

//mapping
// {
//   "mappings": {
//     "properties": {
//       "identifier": {"type": "integer"},
//       "location": {"type":"text"},
//       "departments" : {"type":"text"},
//       "skills":{
//         "type": "nested",
//         "properties": {
//           "rating" : {"type":"integer"},
//           "skill": {"type":"text"}
//           }
//       }
//     }
//   }
// }

@Injectable()
export class ElasticService {
  constructor() {}

  async migrateUser(user: users & { skills: (userSkills & { skill: skills })[] }) {
    const skills: SkillElastic[] = [];

    user.skills.forEach(skill => {
      skills.push({
        rating: Number(skill.rating),
        skill: skill.skill.id,
      });
    });

    const result = await client.create({
      index: "users",
      id: user.identifier,
      document: {
        location: user.location,
        departments: user.departments,
        skills: skills,
      },
    });

    // console.log(result);

    return result;
  }

  async addUser(userIdentifier: string, skills) {
    client.update({
      index: "users",
      id: userIdentifier,
      body: {
        doc: {
          skills: {
            rating: skills.rating,
            skill: skills.skill.id,
          },
        },
      },
    });
  }

  async addSkillToUser(skill: SkillDto) {
    client.update({
      index: "users",
      id: skill.identifier,
      doc: {
        skills: {
          rating: skill.rating,
          skill: skill.skill,
        },
      },
    });
  }

  async reimportData() {
    client.deleteByQuery({
      index: "users",
      body: {
        query: {
          match_all: {},
        },
      },
    });

    client.indices.putMapping({
      index: "users",
      properties: {
        location: { type: "text" },
        departments: { type: "text" },
        skills: {
          type: "nested",
          properties: {
            rating: { type: "integer" },
            skill: { type: "text" },
          },
        },
      },
    });
  }

  async recommend(skillGroups: SkillElastic[][], accurate: boolean): Promise<RecommendResponse> {
    const results = await this.prepareRecommend(skillGroups, accurate);

    let mappedUsers = [] as UserEntity[][];
    let i = 0;
    for (const userGroup of results.users) {
      mappedUsers[i] = [];
      for (const user of userGroup) {
        let userData = await this.getUserData(user.identifier);

        mappedUsers[i].push(new UserEntity({ ...userData, skills: userData.skills, score: user.score }));
      }
      i++;
    }

    mappedUsers = mappedUsers.filter(userGroup => userGroup.length > 0);

    return new RecommendResponse({
      statusCode: 201,
      message: "Successfully found users",
      data: new RecommendEntity({
        users: mappedUsers,
      }),
    });
  }

  async prepareRecommend(skillGroups: SkillElastic[][], accurate: boolean) {
    const resultDTO = {
      users: [[]],
    };

    for (const group of skillGroups) {
      const searchQuery = {
        size: 5,
        index: "users",
        body: {
          query: {
            function_score: {
              boost_mode: "replace",
              query: {
                bool: {
                  should: [],
                  must: [],
                },
              },
              score_mode: "sum",
              functions: [
                {
                  script_score: {
                    script: "_score",
                  },
                },
              ],
            },
          },
        },
      };

      let field = searchQuery.body.query.function_score.query.bool.should;

      field.push({
        match_all: {},
      });

      group.forEach(paramter => {
        field.push({
          nested: {
            path: "skills",
            query: {
              function_score: {
                boost_mode: "sum",
                score_mode: "multiply",
                functions: [
                  {
                    exp: {
                      "skills.rating": {
                        offset: 1,
                        origin: paramter.rating,
                        scale: 1,
                      },
                    },
                  },
                ],
                query: {
                  bool: {
                    should: [
                      {
                        match: {
                          "skills.skill": paramter.skill as string,
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        });
      });

      const result = await client.search(searchQuery);

      const resultToPush = [];

      result.hits.hits.forEach(hit => {
        resultToPush.push({
          identifier: hit._id,
          score: hit._score,
        });
      });

      resultDTO.users.push(resultToPush);
    }

    return resultDTO;
  }

  async search(search: SearchDto): Promise<SearchResponse> {
    const results = await this.prepareSearch(search);

    const requiredSkillIds = search.parameters.map(paramter => {
      return paramter.value;
    });

    const requiredSkills = search.parameters.map(paramter => {
      return { id: paramter.value, rating: paramter.rating };
    });

    const mappedUsers = [] as UserEntity[];
    for (const user of results.users) {
      let userSkills = [] as SkillEntity[];
      let userData = await this.getUserData(user.identifier);

      userData.skills = userData.skills.sort((a, b) => {
        if (requiredSkillIds.includes(a.skill.id)) {
          return -1;
        }
        if (requiredSkillIds.includes(b.skill.id)) {
          return 1;
        }
        return 0;
      });

      userData.skills.map(currentSkill => {
        if (requiredSkillIds.includes(currentSkill.skill.id) && requiredSkills.find(skill => skill.id === currentSkill.skill.id).rating == Number(currentSkill.rating)) {
          userSkills.push(
            new SkillEntity({
              ...currentSkill,
              opacity: 1,
            }),
          );
        } else if (
          requiredSkillIds.includes(currentSkill.skill.id) &&
          (requiredSkills.find(skill => skill.id === currentSkill.skill.id).rating == Number(currentSkill.rating) + 2 ||
            requiredSkills.find(skill => skill.id === currentSkill.skill.id).rating == Number(currentSkill.rating) - 2)
        ) {
          userSkills.push(
            new SkillEntity({
              ...currentSkill,
              opacity: 0.5,
            }),
          );
        } else {
          userSkills.push(
            new SkillEntity({
              ...currentSkill,
              opacity: 0,
            }),
          );
        }
      });

      mappedUsers.push(new UserEntity({ ...userData, skills: userSkills, score: user.score }));
    }

    return new SearchResponse({
      statusCode: 201,
      message: "Successfully found users",
      data: new SearchEntity({
        maxScore: results.maxScore,
        users: mappedUsers.map(user => new UserEntity(user)),
      }),
    });
  }

  async getUserData(identifier: string) {
    return await prisma.users.findUnique({
      where: {
        identifier,
      },
      include: {
        skills: {
          select: {
            rating: true,
            skill: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });
  }

  async prepareSearch(search: SearchDto) {
    const attributes = search.parameters.map(search => search.attribute);

    if (!attributes) return;

    const searchQuery = {
      index: "users",
      body: {
        size: 60,
        query: {
          function_score: {
            boost_mode: "replace",
            query: {
              bool: {
                should: [],
                must: [],
                filter: [],
              },
            },
            score_mode: "sum",
            functions: [
              {
                script_score: {
                  script: "_score",
                },
              },
            ],
          },
        },
      },
    };

    searchQuery.body.query.function_score.query.bool.must.push({
      match_all: {},
    });

    // searchQuery.body.query.function_score.functions.push({
    //   script_score: {
    //     script: 0,
    //   },
    // });

    if (attributes.includes("location")) {
      let searchLocations = [];
      let locations = search.parameters.filter(search => search.attribute === "location").map(search => search.value);

      locations
        .map(location => {
          if (location instanceof Array) {
            return location.map(loc => loc.toLowerCase());
          } else {
            return location.toLowerCase();
          }
        })
        .forEach(location => {
          searchLocations.push(location);
        });

      searchQuery.body.query.function_score.query.bool.filter.push({
        terms: {
          location: searchLocations,
        },
      });
    }
    if (attributes.includes("department")) {
      let searchDeparments = [];
      let departments = search.parameters.find(search => search.attribute === "location").value;

      if (departments instanceof Array) {
        searchDeparments = departments.map(department => department.toLowerCase());
      } else {
        searchDeparments.push(departments.toLowerCase());
      }

      searchQuery.body.query.function_score.query.bool.filter.push({
        terms: {
          departments: searchDeparments,
        },
      });
    }

    let skills = search.parameters.filter(paramter => paramter.attribute === "skill");

    skills.forEach(paramter => {
      let weight = 1;
      if (paramter.bucket === "required") {
        weight = 100;
      }
      if (paramter.bucket === "should") {
        weight = 50;
      }
      searchQuery.body.query.function_score.query.bool.should.push({
        nested: {
          path: "skills",
          query: {
            function_score: {
              boost_mode: "sum",
              score_mode: "multiply",
              functions: [
                {
                  filter: {
                    range: {
                      "skills.rating": {
                        lte: paramter.rating,
                      },
                    },
                  },
                  gauss: {
                    "skills.rating": {
                      offset: 1,
                      origin: paramter.rating,
                      scale: 1,
                      decay: 0.5,
                    },
                  },
                  weight: weight,
                },
                {
                  filter: {
                    range: {
                      "skills.rating": {
                        gt: paramter.rating,
                      },
                    },
                  },
                  gauss: {
                    "skills.rating": {
                      offset: 1,
                      origin: paramter.rating,
                      scale: 1,
                      decay: 0.51,
                    },
                  },
                  weight: weight,
                },
              ],
              query: {
                bool: {
                  should: [
                    {
                      match: {
                        "skills.skill": paramter.value as string,
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      });
    });

    console.log(JSON.stringify(searchQuery, null, 4));

    let modified: boolean = false;

    let result = await client.search(searchQuery);

    const resultDTO = {
      searchModified: modified,
      maxScore: result.hits.max_score,
      users: [],
    };

    // console.log(result.hits.hits.length);

    result.hits.hits.forEach(hit => {
      resultDTO.users.push({
        identifier: hit._id,
        score: hit._score,
      });
    });

    return resultDTO;
  }
}

export class SkillElastic {
  rating: number;
  skill: string;
}
