import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { PrismaClient, skills, users, userSkills } from "@prisma/client";
import * as fs from "fs";
import { SearchEntity, SearchResponse } from "src/entities/search.entity";
import { SkillEntity } from "src/entities/skill.entity";
import { UserEntity } from "src/entities/user.entity";
import { SearchDto } from "src/user/dto/search.dto";

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
  constructor() { }

  async migrateUser(user: users & { skills: (userSkills & { skill: skills })[] }) {
    const skills: SkillElastic[] = [];

    user.skills.forEach(skill => {
      skills.push({
        rating: parseInt(skill.rating),
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

  async recommend(skillsNeeded: SkillElastic[], accurate: boolean, peopleNeeded: number) {
    let skillsPerPerson = 1;

    if (accurate) skillsPerPerson = skillsNeeded.length / peopleNeeded;

    const searchQuery = {
      index: "users",
      body: {
        query: {
          function_score: {
            boost_mode: "replace",
            query: {
              bool: {
                should: [],
                minimum_should_match: Math.floor(skillsPerPerson),
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

    searchQuery.body.query.function_score.query.bool.should.push({
      match_all: {},
    });

    skillsNeeded.forEach(paramter => {
      searchQuery.body.query.function_score.query.bool.should.push({
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
                      offset: 0,
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

    const resultDTO = {
      users: [],
    };

    result.hits.hits.forEach(hit => {
      resultDTO.users.push({
        identifier: hit._id,
        score: hit._score,
      });
    });

    return resultDTO;
  }

  async search(search: SearchDto): Promise<SearchResponse> {
    const results = await this.prepareSearch(search);

    const requiredSkillIds = search.parameters.map((paramter) => {
      return paramter.value
    });

    const requiredSkills = search.parameters.map((paramter) => {
      return { id: paramter.value, rating: paramter.rating }
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

      userData.skills.map((currentSkill) => {
        if (requiredSkillIds.includes(currentSkill.skill.id) && requiredSkills.find(skill => skill.id === currentSkill.skill.id).rating == Number(currentSkill.rating)) {
          userSkills.push(new SkillEntity({
            ...currentSkill,
            opacity: 1,
          }));
        }
        else if (requiredSkillIds.includes(currentSkill.skill.id) && ((requiredSkills.find(skill => skill.id === currentSkill.skill.id).rating == Number(currentSkill.rating) + 2 || requiredSkills.find
          (skill => skill.id === currentSkill.skill.id).rating == Number(currentSkill.rating) - 2))) {
          userSkills.push(new SkillEntity({
            ...currentSkill,
            opacity: 0.5,
          }));
        }
        else {
          userSkills.push(new SkillEntity({
            ...currentSkill,
            opacity: 0,
          }));
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
    const attributes = search.parameters.filter(search => search.required).map(search => search.attribute);

    const required = search.parameters
      .filter(search => search.required)
      .map(search => {
        if (search.value) search.value;
      });

    if (!required) return;

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

    searchQuery.body.query.function_score.query.bool.should.push({
      match_all: {},
    });

    // searchQuery.body.query.function_score.functions.push({
    //   script_score: {
    //     script: 0,
    //   },
    // });

    if (attributes.includes("location")) {
      searchQuery.body.query.function_score.query.bool.must.push({
        terms: {
          location: search.parameters.find(search => search.attribute === "location").value,
        },
      });
    }
    if (attributes.includes("department")) {
      searchQuery.body.query.function_score.query.bool.must.push({
        terms: {
          departments: search.parameters.find(search => search.attribute === "department").value,
        },
      });
    }

    let skills = search.parameters.filter(paramter => paramter.attribute === "skill");

    skills.forEach((paramter, index) => {
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
                      }
                    }
                  },
                  gauss: {
                    "skills.rating": {
                      offset: 0,
                      origin: paramter.rating,
                      scale: 1,
                      decay: 0.5,
                    },
                  },
                  weight: ((skills.length - index) / skills.length) * 100,
                },
                {
                  filter: {
                    range: {
                      "skills.rating": {
                        gt: paramter.rating,
                      }
                    }
                  },
                  gauss: {
                    "skills.rating": {
                      offset: 0,
                      origin: paramter.rating,
                      scale: 1,
                      decay: 0.51
                    },
                  },
                  weight: ((skills.length - index) / skills.length) * 100,
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

    // console.log(JSON.stringify(searchQuery, null, 4));

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

class SkillElastic {
  rating: number;
  skill: string;
}

// client.diagnostic.on("request", (err, result) => {
//   const { id } = result.meta.request;
//   const { context } = result.meta;
//   if (err) {
//     console.log({ error: err, reqId: id, context });
//   }
// });

// client.diagnostic.on("request", (err, result) => {
//   if (err) {
//     console.log("Error:");
//     console.error(err);
//   } else {
//     console.log("Info:");
//     console.info(result);
//   }
// });

// client.diagnostic.on("serialization", (err, result) => {
//   console.log(err, result);
// });

// client.diagnostic.on("deserialization", (err, result) => {
//   console.log(err, result);
// });

// client.diagnostic.on("response", (err, result) => {
//   console.log(err, result);
// });

// client.diagnostic.on("sniff", (err, result) => {
//   console.log(err, result);
// });

// client.diagnostic.on("resurrect", (err, result) => {
//   console.log(err, result);
// });
