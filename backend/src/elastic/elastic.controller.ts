import { Controller, Post, Get, Param, Body } from "@nestjs/common";
import { ElasticService } from "./elastic.service";
import { PrismaClient } from "@prisma/client";
import { SearchDto } from "src/user/dto/search.dto";

const prisma = new PrismaClient();

@Controller("api/elastic")
export class ElasticController {
  constructor(private readonly elastic: ElasticService) {}

  @Post("/insertUser/:id")
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

    this.elastic.insertUser(user);
  }

  @Post("/search")
  async search(@Body() search: SearchDto) {
    return await this.elastic.search(search);
  }
}
