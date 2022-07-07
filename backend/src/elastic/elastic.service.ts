import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { skills, users, userSkills } from "@prisma/client";
import * as fs from "fs";

const { events } = require("@elastic/elasticsearch");
console.log(events);

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

  async insertUser(user: users & { skills: (userSkills & { skill: skills })[] }) {
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
        skills: [skills],
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
}

class SkillElastic {
  rating: number;
  skill: string;
}

client.diagnostic.on("request", (err, result) => {
  const { id } = result.meta.request;
  const { context } = result.meta;
  if (err) {
    console.log({ error: err, reqId: id, context });
  }
});

client.diagnostic.on("request", (err, result) => {
  if (err) {
    console.log("Error:");
    console.error(err);
  } else {
    console.log("Info:");
    console.info(result);
  }
});

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
