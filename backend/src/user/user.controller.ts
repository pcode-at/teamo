import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { SearchDto } from "./dto/search.dto";
import { SkillDto } from "./dto/skill.dto";
import { UserResponse } from "src/entities/user-response.entity";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("api/user")
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() create: CreateUserDto): Promise<UserResponse> {
    return await this.userService.create(create);
  }

  @Get('/all')
  async findAll(): Promise<UserResponse> {
    return await this.userService.findAll();
  }

  @Post("search")
  async search(@Body() search: SearchDto) {
    return await this.userService.search(search);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Req() request: Request) {
    const jwt = request.headers.authorization.split(' ')[1];
    return this.userService.findOneDetailed(jwt);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() update: UpdateUserDto) {
    return this.userService.update(+id, update);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }

  @Post("skill")
  async addSkill(@Body() skill: SkillDto) {
    return await this.userService.addSkill(skill);
  }

  @Get("skill/:skillId")
  async getSkills(@Param("skillId") skillId: string) {
    return await this.userService.getSkills(skillId);
  }

  @Get("skill/user/:identifier")
  async getSkillsByUser(@Param("identifier") identifier: string) {
    return await this.userService.getSkillsForUser(identifier);
  }
}
