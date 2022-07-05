import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { SearchDto } from "./dto/search.dto";
import { SkillDto } from "./dto/skill.dto";

@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() create: CreateUserDto) {
    return await this.userService.create(create);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Post("search")
  async search(@Body() search: SearchDto) {
    return await this.userService.search(search);
  }

  @Get(":identifier")
  findOne(@Param("identifier") identifier: string) {
    return this.userService.findOne(identifier);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() update: UpdateUserDto) {
    return this.userService.update(+id, update);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }

  @Post('skill')
  async addSkill(@Body() skill: SkillDto) {
    return await this.userService.addSkill(skill);
  }

  @Get('skill/:skillId')
  async getSkills(@Param('skillId') skillId: string) {
    return await this.userService.getSkills(skillId);
  }

  @Get('skill/user/:identifier')
  async getSkillsByUser(@Param('identifier') identifier: string) {
    return await this.userService.getSkillsForUser(identifier);
  }
}
