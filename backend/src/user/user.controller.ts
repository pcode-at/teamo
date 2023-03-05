import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { SearchDto } from "./dto/search.dto";
import { SkillDto } from "./dto/skill.dto";
import { UserResponse } from "src/entities/user-response.entity";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { LocationResponse } from "src/entities/location.entity";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SkillResponse } from "src/entities/skill.entity";

@ApiBearerAuth()
@ApiTags("user")
@Controller("api/user")
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 201, type: UserResponse })
  async create(@Body() create: CreateUserDto): Promise<UserResponse> {
    return await this.userService.create(create);
  }

  @Get("/all")
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: UserResponse })
  async findAll(): Promise<UserResponse> {
    return await this.userService.findAll();
  }

  @Get('/bookmarks')
  @ApiOperation({ summary: "Get all bookmarks" })
  @ApiResponse({ status: 200, type: UserResponse })
  async getBookmarks(@Req() request: Request) {
    const jwt = request.headers.authorization.split(" ")[1];
    return await this.userService.getBookmarks(jwt);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Search for users" })
  @ApiResponse({ status: 200, type: UserResponse })
  findOne(@Req() request: Request) {
    const jwt = request.headers.authorization.split(" ")[1];
    return this.userService.findOneDetailed(jwt);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update user" })
  @ApiResponse({ status: 200, type: UserResponse })
  update(@Param("id") id: string, @Body() update: UpdateUserDto): Promise<UserResponse> {
    return this.userService.update(id, update);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({ status: 200, type: UserResponse })
  remove(@Param("id") id: string): Promise<UserResponse> {
    return this.userService.remove(id);
  }

  @Post("skill")
  @ApiOperation({ summary: "Add skill to user" })
  @ApiResponse({ status: 200, type: SkillResponse })
  async addSkill(@Body() skill: SkillDto): Promise<SkillResponse> {
    return await this.userService.addSkill(skill);
  }

  @Get("skill/:skillId")
  @ApiOperation({ summary: "Get skill and user by id" })
  @ApiResponse({ status: 200, type: UserResponse })
  async getSkills(@Param("skillId") skillId: string) {
    return await this.userService.getSkills(skillId);
  }

  @Get("skill/user/:identifier")
  @ApiOperation({ summary: "Get skills for user" })
  @ApiResponse({ status: 200, type: SkillResponse })
  async getSkillsByUser(@Param("identifier") identifier: string) {
    return await this.userService.getSkillsForUser(identifier);
  }

  @Get("locations")
  @ApiOperation({ summary: "Get all locations" })
  @ApiResponse({ status: 200, type: LocationResponse })
  async getLocations(): Promise<LocationResponse> {
    return await this.userService.getLocations();
  }

  @Get(":identifier")
  @ApiOperation({ summary: "Search for users" })
  @ApiResponse({ status: 200, type: UserResponse })
  async getUserByIdentifier(@Param("identifier") identifier: string) {
    return await this.userService.getUserByIdentifier(identifier);
  }

  @Post("changeWorkHours")
  @ApiOperation({ summary: "Change work hours" })
  @ApiResponse({ status: 200, type: UserResponse })
  async changeWorkHours(@Body() workHourChanges: any, @Req() request: Request) {
    const jwt = request.headers.authorization.split(" ")[1];
    return await this.userService.changeWorkHours(workHourChanges, jwt);
  }

  @Get("workHours/:identifier")
  @ApiOperation({ summary: "Get work hours" })
  @ApiResponse({ status: 200, type: UserResponse })
  async getWorkHours(@Param("identifier") identifier: string) {
    return await this.userService.getWorkHours(identifier);
  }
}
