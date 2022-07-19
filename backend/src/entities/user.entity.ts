import { UsersAuthorization } from "@prisma/client";
import { Exclude } from "class-transformer";
import { SkillEntity } from "./skill.entity";

export class UserEntity {
  @Exclude()
  id: string;

  @Exclude()
  authorization: UsersAuthorization | null;

  birthDate: Date;
  departments: string[];
  email: string;
  gender: string;
  identifier: string;
  location: string;
  phoneNumber: string;
  name: string;
  photo: string;
  roles: string[];
  projectIds: string[];
  bookmarkedInIds: string[];
  projectsIds: string[];
  score?: number;
  skills?: SkillEntity | SkillEntity[] | any;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
