import { Controller, Post, Get, Param, Body, ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";
import { ElasticService } from "./elastic.service";
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
}
