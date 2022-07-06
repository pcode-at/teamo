import { SkillMatrix } from "@prisma/client";

export class UserAndSkills {
  identifier: string;
  id: string;
  score: number;
  birthDate: Date;
  departments: string[];
  email: string;
  gender: string;
  location: string;
  name: string;
  password: string;
  photo: string;
  roles: string[];
  skills: SkillAndRating[];
}

export class SkillAndRating {
  skillMatrix: SkillMatrix[];
  rating: string;
  name: string;
}
