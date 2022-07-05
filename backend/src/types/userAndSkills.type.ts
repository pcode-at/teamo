import { SkillsSkillMatrix } from "@prisma/client";

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
  skillMatrix: SkillsSkillMatrix[];
  rating: string;
  name: string;
}
