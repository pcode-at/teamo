import { users, UserSkills, skills } from "@prisma/client";
import { UserAndSkills } from "src/types/userAndSkills.type";

export function recommendUsers(userSkills: (UserSkills & { skill: skills; user: users })[]): UserAndSkills[] {
  return null;
}
