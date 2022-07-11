import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { skills, users, userSkills } from "@prisma/client";
import * as fs from "fs";
import { SearchDto } from "src/user/dto/search.dto";

import { estypes } from "@elastic/elasticsearch";

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
  constructor() {} //private readonly elasticsearchService: ElasticsearchService

  // insert Data from user into elastic user with skills

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

    console.log(result);

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

    let skills = skillsNeeded.map(skill => {
      return skill.skill;
    });

    const searchQuery = {
      index: "users",
      body: {
        query: {
          function_score: {
            query: {
              bool: {
                must: {
                  match_all: {},
                },
                should: [
                  {
                    terms: {
                      "skills.skill": skills,
                    },
                  },
                ],
                minimum_should_match: Math.floor(skillsPerPerson),
              },
            },
            functions: [],
          },
        },
      },
    };

    skillsNeeded.forEach(paramter => {
      searchQuery.body.query.function_score.functions.push({
        filter: {
          bool: {
            must: {
              match: {
                "skills.skill": paramter.skill,
              },
            },
          },
        },
        gauss: {
          "skills.rating": {
            origin: paramter.rating,
            scale: 1,
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

  async search(search: SearchDto) {
    const attributes = search.parameters.filter(search => search.required).map(search => search.attribute);

    const required = search.parameters.filter(search => search.required).map(search => search.value);

    const searchQuery = {
      index: "users",
      body: {
        query: {
          function_score: {
            query: {
              bool: {
                must: {
                  match_all: {},
                },
                should: [
                  {
                    terms: {
                      "skills.skill": [],
                    },
                  },
                ],
                filter: [],
              },
            },
            functions: [],
          },
        },
      },
    };

    if (required.length > 0) {
      searchQuery.body.query.function_score.query.bool.filter.push({
        terms: {
          "skills.skill": required,
        },
      });
    }

    if (attributes.includes("location")) {
      searchQuery.body.query.function_score.query.bool.filter.push({
        terms: {
          location: search.parameters.find(search => search.attribute === "location").value,
        },
      });
    }
    if (attributes.includes("department")) {
      searchQuery.body.query.function_score.query.bool.filter.push({
        terms: {
          departments: search.parameters.find(search => search.attribute === "department").value,
        },
      });
    }

    let skills = search.parameters.filter(paramter => paramter.attribute === "skill");

    skills.forEach((paramter, index) => {
      if (!paramter.required) {
        searchQuery.body.query.function_score.query.bool.should[0].terms["skills.skill"].push(paramter.value);
      }

      searchQuery.body.query.function_score.functions.push({
        filter: {
          bool: {
            must: {
              match: {
                "skills.skill": paramter.value,
              },
            },
          },
        },
        weight: ((skills.length - index) / skills.length) * 10,
        gauss: {
          "skills.rating": {
            origin: paramter.rating,
            scale: 1,
          },
        },
      });
    });

    if (searchQuery.body.query.function_score.query.bool.filter.length === 0) {
      delete searchQuery.body.query.function_score.query.bool.filter;
    }

    console.log(JSON.stringify(searchQuery, null, 4));

    let modified: boolean = false;

    let result = await client.search(searchQuery);

    if (result.hits.hits.length === 0 && searchQuery.body.query.function_score.query.bool.filter.length > 0) {
      let skillsFromMustToShould = searchQuery.body.query.function_score.query.bool.filter;
      delete searchQuery.body.query.function_score.query.bool.filter;
      //types object wrong
      //@ts-ignore
      searchQuery.body.query.function_score.query.bool.should.push(skillsFromMustToShould.map(paramter => paramter.terms));
      result = await client.search(searchQuery);
      modified = true;
    }

    const resultDTO = {
      searchModified: modified,
      maxScore: result.hits.max_score,
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
